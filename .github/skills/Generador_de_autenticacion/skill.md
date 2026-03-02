# SKILL: GENERADOR DE AUTENTICACIÓN

## 🎯 PROPÓSITO
Generar un sistema completo de autenticación y autorización para aplicaciones Angular 19+ con Verona, incluyendo login, registro, guards, interceptores JWT, y gestión de roles/permisos.

---

## 🔍 CUÁNDO USAR ESTE SKILL

**Activar cuando el usuario:**
- Pide "crea un sistema de autenticación"
- Solicita "necesito login y registro"
- Dice "implementa guards de rutas"
- Pregunta "¿cómo manejar JWT?"
- Menciona "autenticación", "login", "security", "auth"
- Pide "sistema de roles y permisos"

**Ejemplos de disparadores:**
```
✅ "Crea un sistema de autenticación completo"
✅ "Necesito login con JWT"
✅ "Implementa guards para rutas protegidas"
✅ "Sistema de roles: admin, user, guest"
✅ "Login con email y password"
✅ "Recuperación de contraseña"
```

---

## 📋 PROTOCOLO DE IMPLEMENTACIÓN

### **FASE 1: ESTRUCTURA BASE** 🏗️

Crear la siguiente estructura de archivos:

```
src/app/auth/
├── components/
│   ├── login/
│   │   ├── login.component.ts
│   │   └── login.component.html
│   ├── register/
│   │   ├── register.component.ts
│   │   └── register.component.html
│   ├── forgot-password/
│   │   ├── forgot-password.component.ts
│   │   └── forgot-password.component.html
│   └── reset-password/
│       ├── reset-password.component.ts
│       └── reset-password.component.html
├── guards/
│   ├── auth.guard.ts
│   └── role.guard.ts
├── interceptors/
│   ├── auth.interceptor.ts
│   └── error.interceptor.ts
├── models/
│   ├── user.model.ts
│   ├── login.model.ts
│   └── auth-response.model.ts
├── services/
│   ├── auth.service.ts
│   └── token.service.ts
└── auth.routes.ts
```

---

### **FASE 2: MODELOS** 📝

```typescript
// filepath: src/app/auth/models/user.model.ts

export interface User {
    id: string | number;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    role: UserRole;
    permissions?: string[];
    avatar?: string;
    createdAt?: Date;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest',
    MODERATOR = 'moderator'
}
```

```typescript
// filepath: src/app/auth/models/login.model.ts

export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    firstName?: string;
    lastName?: string;
    acceptTerms: boolean;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
    confirmPassword: string;
}
```

```typescript
// filepath: src/app/auth/models/auth-response.model.ts

export interface AuthResponse {
    user: User;
    token: string;
    refreshToken?: string;
    expiresIn?: number;
}
```

---

### **FASE 3: SERVICIOS** 🔧

#### **Auth Service**

```typescript
// filepath: src/app/auth/services/auth.service.ts

import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject } from 'rxjs';

import { User, UserRole } from '../models/user.model';
import { LoginRequest, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest } from '../models/login.model';
import { AuthResponse } from '../models/auth-response.model';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private tokenService = inject(TokenService);
    
    private apiUrl = 'http://localhost:3000/api/auth';
    
    // Estado de autenticación con Signals
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    currentUser = signal<User | null>(null);
    
    // Computed signals
    isAuthenticated = computed(() => this.currentUser() !== null);
    isAdmin = computed(() => this.currentUser()?.role === UserRole.ADMIN);
    isModerator = computed(() => 
        this.currentUser()?.role === UserRole.MODERATOR || 
        this.currentUser()?.role === UserRole.ADMIN
    );
    
    constructor() {
        // Cargar usuario desde token al iniciar
        this.loadUserFromToken();
    }
    
    /**
     * Login del usuario
     */
    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
            .pipe(
                tap(response => {
                    this.handleAuthSuccess(response);
                })
            );
    }
    
    /**
     * Registro de nuevo usuario
     */
    register(data: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data)
            .pipe(
                tap(response => {
                    this.handleAuthSuccess(response);
                })
            );
    }
    
    /**
     * Logout del usuario
     */
    logout(): void {
        this.tokenService.removeToken();
        this.tokenService.removeRefreshToken();
        this.currentUser.set(null);
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
    }
    
    /**
     * Solicitar recuperación de contraseña
     */
    forgotPassword(data: ForgotPasswordRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/forgot-password`, data);
    }
    
    /**
     * Restablecer contraseña
     */
    resetPassword(data: ResetPasswordRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/reset-password`, data);
    }
    
    /**
     * Refrescar token
     */
    refreshToken(): Observable<AuthResponse> {
        const refreshToken = this.tokenService.getRefreshToken();
        return this.http.post<AuthResponse>(`${this.apiUrl}/refresh-token`, { refreshToken })
            .pipe(
                tap(response => {
                    this.tokenService.saveToken(response.token);
                    if (response.refreshToken) {
                        this.tokenService.saveRefreshToken(response.refreshToken);
                    }
                })
            );
    }
    
    /**
     * Verificar si el usuario tiene un rol específico
     */
    hasRole(role: UserRole): boolean {
        return this.currentUser()?.role === role;
    }
    
    /**
     * Verificar si el usuario tiene un permiso específico
     */
    hasPermission(permission: string): boolean {
        return this.currentUser()?.permissions?.includes(permission) || false;
    }
    
    /**
     * Verificar si el usuario tiene alguno de los roles especificados
     */
    hasAnyRole(roles: UserRole[]): boolean {
        const userRole = this.currentUser()?.role;
        return userRole ? roles.includes(userRole) : false;
    }
    
    /**
     * Manejar el éxito de autenticación
     */
    private handleAuthSuccess(response: AuthResponse): void {
        this.tokenService.saveToken(response.token);
        if (response.refreshToken) {
            this.tokenService.saveRefreshToken(response.refreshToken);
        }
        this.currentUser.set(response.user);
        this.currentUserSubject.next(response.user);
    }
    
    /**
     * Cargar usuario desde el token almacenado
     */
    private loadUserFromToken(): void {
        const token = this.tokenService.getToken();
        if (token && !this.tokenService.isTokenExpired()) {
            // Decodificar token y obtener usuario
            const user = this.tokenService.getUserFromToken();
            if (user) {
                this.currentUser.set(user);
                this.currentUserSubject.next(user);
            }
        } else {
            this.tokenService.removeToken();
        }
    }
}
```

---

#### **Token Service**

```typescript
// filepath: src/app/auth/services/token.service.ts

import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly TOKEN_KEY = 'auth_token';
    private readonly REFRESH_TOKEN_KEY = 'refresh_token';
    
    /**
     * Guardar token
     */
    saveToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }
    
    /**
     * Obtener token
     */
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }
    
    /**
     * Remover token
     */
    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }
    
    /**
     * Guardar refresh token
     */
    saveRefreshToken(token: string): void {
        localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
    }
    
    /**
     * Obtener refresh token
     */
    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }
    
    /**
     * Remover refresh token
     */
    removeRefreshToken(): void {
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
    
    /**
     * Verificar si el token ha expirado
     */
    isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) return true;
        
        try {
            const payload = this.decodeToken(token);
            if (!payload.exp) return false;
            
            const expirationDate = new Date(payload.exp * 1000);
            return expirationDate < new Date();
        } catch (error) {
            return true;
        }
    }
    
    /**
     * Obtener usuario desde el token
     */
    getUserFromToken(): User | null {
        const token = this.getToken();
        if (!token) return null;
        
        try {
            const payload = this.decodeToken(token);
            return {
                id: payload.sub || payload.userId,
                email: payload.email,
                username: payload.username,
                firstName: payload.firstName,
                lastName: payload.lastName,
                role: payload.role,
                permissions: payload.permissions
            };
        } catch (error) {
            return null;
        }
    }
    
    /**
     * Decodificar token JWT
     */
    private decodeToken(token: string): any {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token');
        }
        
        const payload = parts[1];
        const decoded = atob(payload);
        return JSON.parse(decoded);
    }
}
```

---

### **FASE 4: GUARDS** 🛡️

#### **Auth Guard**

```typescript
// filepath: src/app/auth/guards/auth.guard.ts

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    if (authService.isAuthenticated()) {
        return true;
    }
    
    // Guardar la URL intentada para redireccionar después del login
    router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url }
    });
    
    return false;
};
```

---

#### **Role Guard**

```typescript
// filepath: src/app/auth/guards/role.guard.ts

import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    // Verificar si está autenticado
    if (!authService.isAuthenticated()) {
        router.navigate(['/auth/login'], {
            queryParams: { returnUrl: state.url }
        });
        return false;
    }
    
    // Obtener roles permitidos desde la configuración de la ruta
    const allowedRoles = route.data['roles'] as UserRole[];
    
    if (!allowedRoles || allowedRoles.length === 0) {
        return true;
    }
    
    // Verificar si el usuario tiene alguno de los roles permitidos
    if (authService.hasAnyRole(allowedRoles)) {
        return true;
    }
    
    // Usuario no tiene permiso
    router.navigate(['/access-denied']);
    return false;
};

// Uso en rutas:
// {
//     path: 'admin',
//     canActivate: [authGuard, roleGuard],
//     data: { roles: [UserRole.ADMIN] },
//     loadComponent: () => import('./admin/admin.component')
// }
```

---

### **FASE 5: INTERCEPTORES** 🔌

#### **Auth Interceptor (JWT)**

```typescript
// filepath: src/app/auth/interceptors/auth.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(TokenService);
    const token = tokenService.getToken();
    
    // No agregar token a rutas de autenticación
    const authRoutes = ['/auth/login', '/auth/register', '/auth/refresh-token'];
    const isAuthRoute = authRoutes.some(route => req.url.includes(route));
    
    if (token && !isAuthRoute && !tokenService.isTokenExpired()) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    
    return next(req);
};
```

---

#### **Error Interceptor**

```typescript
// filepath: src/app/auth/interceptors/error.interceptor.ts

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const messageService = inject(MessageService);
    
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                // Token inválido o expirado
                authService.logout();
                messageService.add({
                    severity: 'error',
                    summary: 'Sesión Expirada',
                    detail: 'Por favor, inicia sesión nuevamente'
                });
            } else if (error.status === 403) {
                // Sin permisos
                router.navigate(['/access-denied']);
                messageService.add({
                    severity: 'error',
                    summary: 'Acceso Denegado',
                    detail: 'No tienes permisos para acceder a este recurso'
                });
            } else if (error.status === 0) {
                // Error de red
                messageService.add({
                    severity: 'error',
                    summary: 'Error de Red',
                    detail: 'No se pudo conectar con el servidor'
                });
            }
            
            return throwError(() => error);
        })
    );
};
```

---

### **FASE 6: COMPONENTES** 🎨

#### **Login Component**

```typescript
// filepath: src/app/auth/components/login/login.component.ts

import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        PasswordModule
    ],
    template: `
        <div class="flex align-items-center justify-content-center min-h-screen">
            <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
                <div class="text-center mb-5">
                    <img src="assets/layout/images/logo.svg" alt="Logo" height="50" class="mb-3">
                    <div class="text-900 text-3xl font-medium mb-3">Bienvenido</div>
                    <span class="text-600 font-medium line-height-3">
                        ¿No tienes cuenta?
                    </span>
                    <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                       (click)="goToRegister()">
                        Crear una cuenta
                    </a>
                </div>

                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                    <label for="email" class="block text-900 font-medium mb-2">Email</label>
                    <input pInputText id="email" type="email" 
                           formControlName="email"
                           placeholder="Email" 
                           class="w-full mb-3" />
                    <small class="p-error block mb-3" 
                           *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                        Email requerido
                    </small>

                    <label for="password" class="block text-900 font-medium mb-2">Contraseña</label>
                    <p-password id="password" formControlName="password" 
                                placeholder="Contraseña" 
                                [toggleMask]="true" 
                                [feedback]="false"
                                styleClass="w-full mb-3"
                                inputStyleClass="w-full" />
                    <small class="p-error block mb-3" 
                           *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                        Contraseña requerida
                    </small>

                    <div class="flex align-items-center justify-content-between mb-6">
                        <div class="flex align-items-center">
                            <p-checkbox id="rememberMe" formControlName="rememberMe" 
                                        [binary]="true" styleClass="mr-2" />
                            <label for="rememberMe">Recordarme</label>
                        </div>
                        <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                           (click)="goToForgotPassword()">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    <p-button label="Iniciar Sesión" 
                              icon="pi pi-user" 
                              [loading]="loading()"
                              [disabled]="loginForm.invalid"
                              type="submit"
                              styleClass="w-full" />
                </form>
            </div>
        </div>
    `
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private messageService = inject(MessageService);
    
    loading = signal(false);
    
    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        rememberMe: [false]
    });
    
    onSubmit(): void {
        if (this.loginForm.invalid) return;
        
        this.loading.set(true);
        
        this.authService.login(this.loginForm.value as any).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Inicio de sesión exitoso'
                });
                
                // Redireccionar a la URL solicitada o al dashboard
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigate([returnUrl]);
                
                this.loading.set(false);
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Credenciales inválidas'
                });
                this.loading.set(false);
            }
        });
    }
    
    goToRegister(): void {
        this.router.navigate(['/auth/register']);
    }
    
    goToForgotPassword(): void {
        this.router.navigate(['/auth/forgot-password']);
    }
}
```

---

#### **Register Component**

```typescript
// filepath: src/app/auth/components/register/register.component.ts

import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        PasswordModule
    ],
    template: `
        <div class="flex align-items-center justify-content-center min-h-screen">
            <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div class="text-center mb-5">
                    <div class="text-900 text-3xl font-medium mb-3">Crear Cuenta</div>
                    <span class="text-600 font-medium line-height-3">
                        ¿Ya tienes cuenta?
                    </span>
                    <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                       (click)="goToLogin()">
                        Iniciar Sesión
                    </a>
                </div>

                <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                    <div class="grid formgrid p-fluid">
                        <div class="col-12 md:col-6">
                            <label for="firstName" class="block text-900 font-medium mb-2">Nombre</label>
                            <input pInputText id="firstName" formControlName="firstName"
                                   placeholder="Nombre" class="w-full" />
                        </div>
                        
                        <div class="col-12 md:col-6">
                            <label for="lastName" class="block text-900 font-medium mb-2">Apellido</label>
                            <input pInputText id="lastName" formControlName="lastName"
                                   placeholder="Apellido" class="w-full" />
                        </div>
                        
                        <div class="col-12">
                            <label for="username" class="block text-900 font-medium mb-2">Usuario *</label>
                            <input pInputText id="username" formControlName="username"
                                   placeholder="Usuario" class="w-full" />
                            <small class="p-error block" 
                                   *ngIf="registerForm.get('username')?.invalid && registerForm.get('username')?.touched">
                                Usuario requerido (mínimo 3 caracteres)
                            </small>
                        </div>
                        
                        <div class="col-12">
                            <label for="email" class="block text-900 font-medium mb-2">Email *</label>
                            <input pInputText id="email" type="email" formControlName="email"
                                   placeholder="Email" class="w-full" />
                            <small class="p-error block" 
                                   *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
                                Email válido requerido
                            </small>
                        </div>
                        
                        <div class="col-12">
                            <label for="password" class="block text-900 font-medium mb-2">Contraseña *</label>
                            <p-password id="password" formControlName="password" 
                                        placeholder="Contraseña" 
                                        [toggleMask]="true"
                                        styleClass="w-full"
                                        inputStyleClass="w-full" />
                            <small class="p-error block" 
                                   *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
                                Contraseña requerida (mínimo 6 caracteres)
                            </small>
                        </div>
                        
                        <div class="col-12">
                            <label for="confirmPassword" class="block text-900 font-medium mb-2">Confirmar Contraseña *</label>
                            <p-password id="confirmPassword" formControlName="confirmPassword" 
                                        placeholder="Confirmar Contraseña" 
                                        [toggleMask]="true"
                                        [feedback]="false"
                                        styleClass="w-full"
                                        inputStyleClass="w-full" />
                            <small class="p-error block" 
                                   *ngIf="registerForm.hasError('passwordMismatch') && registerForm.get('confirmPassword')?.touched">
                                Las contraseñas no coinciden
                            </small>
                        </div>
                        
                        <div class="col-12">
                            <div class="flex align-items-center">
                                <p-checkbox id="acceptTerms" formControlName="acceptTerms" 
                                            [binary]="true" styleClass="mr-2" />
                                <label for="acceptTerms">
                                    Acepto los <a class="text-blue-500">términos y condiciones</a>
                                </label>
                            </div>
                            <small class="p-error block" 
                                   *ngIf="registerForm.get('acceptTerms')?.invalid && registerForm.get('acceptTerms')?.touched">
                                Debes aceptar los términos y condiciones
                            </small>
                        </div>
                        
                        <div class="col-12">
                            <p-button label="Registrarse" 
                                      icon="pi pi-user-plus" 
                                      [loading]="loading()"
                                      [disabled]="registerForm.invalid"
                                      type="submit"
                                      styleClass="w-full" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private messageService = inject(MessageService);
    
    loading = signal(false);
    
    registerForm = this.fb.group({
        firstName: [''],
        lastName: [''],
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
    
    passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        
        if (!password || !confirmPassword) {
            return null;
        }
        
        return password.value === confirmPassword.value ? null : { passwordMismatch: true };
    }
    
    onSubmit(): void {
        if (this.registerForm.invalid) return;
        
        this.loading.set(true);
        
        this.authService.register(this.registerForm.value as any).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Registro exitoso. Redirigiendo...'
                });
                
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 1500);
                
                this.loading.set(false);
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.error?.message || 'Error al registrar usuario'
                });
                this.loading.set(false);
            }
        });
    }
    
    goToLogin(): void {
        this.router.navigate(['/auth/login']);
    }
}
```

---

### **FASE 7: CONFIGURACIÓN** ⚙️

#### **Providers en app.config.ts**

```typescript
// filepath: src/app/app.config.ts

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { authInterceptor } from './auth/interceptors/auth.interceptor';
import { errorInterceptor } from './auth/interceptors/error.interceptor';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([authInterceptor, errorInterceptor])
        ),
        provideAnimations(),
        MessageService,
        ConfirmationService
    ]
};
```

---

#### **Rutas de Autenticación**

```typescript
// filepath: src/app/auth/auth.routes.ts

import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component')
            .then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/register/register.component')
            .then(m => m.RegisterComponent)
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./components/forgot-password/forgot-password.component')
            .then(m => m.ForgotPasswordComponent)
    },
    {
        path: 'reset-password/:token',
        loadComponent: () => import('./components/reset-password/reset-password.component')
            .then(m => m.ResetPasswordComponent)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
```

---

#### **Rutas Principales con Guards**

```typescript
// filepath: src/app/app.routes.ts

import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { roleGuard } from './auth/guards/role.guard';
import { UserRole } from './auth/models/user.model';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./layout/app.layout.component')
            .then(m => m.AppLayoutComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard.component')
                    .then(m => m.DashboardComponent)
            },
            {
                path: 'admin',
                canActivate: [roleGuard],
                data: { roles: [UserRole.ADMIN] },
                loadComponent: () => import('./pages/admin/admin.component')
                    .then(m => m.AdminComponent)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'access-denied',
        loadComponent: () => import('./pages/access-denied/access-denied.component')
            .then(m => m.AccessDeniedComponent)
    }
];
```

---

## ✅ CHECKLIST DE VALIDACIÓN

### **Estructura**
- [ ] Carpeta `auth/` creada con subcarpetas
- [ ] Modelos definidos (User, Login, AuthResponse)
- [ ] AuthService con signals implementado
- [ ] TokenService con JWT handling
- [ ] Guards funcionales (auth, role)
- [ ] Interceptores configurados

### **Componentes**
- [ ] Login component con formulario reactivo
- [ ] Register component con validaciones
- [ ] Forgot password component
- [ ] Reset password component
- [ ] Todos usan PrimeNG components

### **Seguridad**
- [ ] JWT en localStorage/sessionStorage
- [ ] Token refresh implementado
- [ ] Manejo de expiración de token
- [ ] Interceptor agrega Bearer token
- [ ] Error interceptor maneja 401/403

### **Funcionalidad**
- [ ] Login correcto redirecciona
- [ ] Logout limpia estado
- [ ] Guards protegen rutas
- [ ] Roles y permisos funcionan
- [ ] Mensajes de error/éxito con toast

---

## 🎯 OBJETIVO FINAL

El sistema de autenticación debe ser:
1. **Seguro:** JWT, guards, interceptores
2. **Completo:** Login, registro, recuperación
3. **Flexible:** Roles y permisos configurables
4. **UX:** Mensajes claros, validaciones en tiempo real
5. **Moderno:** Signals, standalone, inject()

Listo para integrar con backend real con mínimas modificaciones.
