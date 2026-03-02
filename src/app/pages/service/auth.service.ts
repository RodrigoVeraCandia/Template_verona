import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

export interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
    metadata?: any;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSignal = signal<User | null>(null);
    private isAuthenticatedSignal = signal<boolean>(false);

    currentUser = this.currentUserSignal.asReadonly();
    isAuthenticated = this.isAuthenticatedSignal.asReadonly();

    constructor(
        private router: Router,
        private supabaseService: SupabaseService
    ) {
        this.initAuth();
    }

    private async initAuth(): Promise<void> {
        // Verificar sesión almacenada
        try {
            const session = await this.supabaseService.getSession();
            if (session) {
                const user = await this.supabaseService.getCurrentUser();
                if (user) {
                    this.setUser(user);
                }
            }
        } catch (error) {
            console.error('Error al verificar sesión:', error);
        }

        // Escuchar cambios en autenticación
        this.supabaseService.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event, session);
            
            if (event === 'SIGNED_IN' && session) {
                this.setUser(session.user);
            } else if (event === 'SIGNED_OUT') {
                this.clearUser();
            } else if (event === 'TOKEN_REFRESHED' && session) {
                this.setUser(session.user);
            } else if (event === 'USER_UPDATED' && session) {
                this.setUser(session.user);
            }
        });
    }

    private setUser(supabaseUser: any): void {
        const user: User = {
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0],
            role: supabaseUser.user_metadata?.role || 'user',
            metadata: supabaseUser.user_metadata
        };

        this.currentUserSignal.set(user);
        this.isAuthenticatedSignal.set(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    private clearUser(): void {
        this.currentUserSignal.set(null);
        this.isAuthenticatedSignal.set(false);
        localStorage.removeItem('currentUser');
    }

    /**
     * Inicia sesión con email y contraseña
     */
    async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
        try {
            const result = await this.supabaseService.signIn(email, password);
            
            if (result.user) {
                this.setUser(result.user);
                return { success: true };
            }
            
            return { success: false, error: 'Error al iniciar sesión' };
        } catch (error: any) {
            console.error('Error en login:', error);
            return { 
                success: false, 
                error: this.getErrorMessage(error)
            };
        }
    }

    /**
     * Registra un nuevo usuario
     */
    async signUp(email: string, password: string, name?: string): Promise<{ success: boolean; error?: string }> {
        try {
            const metadata = name ? { name } : undefined;
            const result = await this.supabaseService.signUp(email, password, metadata);
            
            if (result.user) {
                return { 
                    success: true
                };
            }
            
            return { success: false, error: 'Error al registrar usuario' };
        } catch (error: any) {
            console.error('Error en registro:', error);
            return { 
                success: false, 
                error: this.getErrorMessage(error)
            };
        }
    }

    /**
     * Cierra sesión
     */
    async logout(): Promise<void> {
        try {
            await this.supabaseService.signOut();
            this.clearUser();
            this.router.navigate(['/auth/login']);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Limpiar de todas formas
            this.clearUser();
            this.router.navigate(['/auth/login']);
        }
    }

    /**
     * Envía email de recuperación de contraseña
     */
    async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
        try {
            await this.supabaseService.resetPassword(email);
            return { success: true };
        } catch (error: any) {
            console.error('Error al enviar email de recuperación:', error);
            return { 
                success: false, 
                error: this.getErrorMessage(error)
            };
        }
    }

    /**
     * Actualiza la contraseña del usuario
     */
    async updatePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
        try {
            await this.supabaseService.updatePassword(newPassword);
            return { success: true };
        } catch (error: any) {
            console.error('Error al actualizar contraseña:', error);
            return { 
                success: false, 
                error: this.getErrorMessage(error)
            };
        }
    }

    /**
     * Actualiza el perfil del usuario
     */
    async updateProfile(updates: any): Promise<{ success: boolean; error?: string }> {
        try {
            const result = await this.supabaseService.updateProfile(updates);
            if (result.user) {
                this.setUser(result.user);
            }
            return { success: true };
        } catch (error: any) {
            console.error('Error al actualizar perfil:', error);
            return { 
                success: false, 
                error: this.getErrorMessage(error)
            };
        }
    }

    /**
     * Convierte errores de Supabase a mensajes legibles
     */
    private getErrorMessage(error: any): string {
        if (error.message) {
            // Mensajes comunes de Supabase traducidos
            const errorMessages: { [key: string]: string } = {
                'Invalid login credentials': 'Credenciales inválidas',
                'Email not confirmed': 'Email no confirmado',
                'User already registered': 'El usuario ya está registrado',
                'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
                'Unable to validate email address: invalid format': 'Formato de email inválido',
                'Email rate limit exceeded': 'Demasiados intentos, intenta más tarde'
            };

            return errorMessages[error.message] || error.message;
        }
        
        return 'Error desconocido';
    }
}
