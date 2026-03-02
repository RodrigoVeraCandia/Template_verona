# SKILL: GENERADOR DE i18n (INTERNACIONALIZACIÓN)

## 🎯 PROPÓSITO
Implementar un sistema completo de internacionalización (i18n) en aplicaciones Angular 19+ con Verona, permitiendo soporte multi-idioma con traducción dinámica, cambio de idioma en tiempo real, y formato de fechas/números según locale.

---

## 🔍 CUÁNDO USAR ESTE SKILL

**Activar cuando el usuario:**
- Pide "agregar soporte multi-idioma"
- Solicita "traducir la aplicación"
- Dice "necesito español e inglés"
- Pregunta "¿cómo implementar i18n?"
- Menciona "internacionalización", "traducción", "idiomas"
- Pide "cambiar idioma dinámicamente"

**Ejemplos de disparadores:**
```
✅ "Implementa soporte para inglés y español"
✅ "Necesito traducir toda la app"
✅ "Agrega un selector de idiomas"
✅ "Sistema de traducciones con archivos JSON"
✅ "Formato de fechas según idioma"
✅ "Traducciones dinámicas en tiempo real"
```

---

## 📋 PROTOCOLO DE IMPLEMENTACIÓN

### **FASE 1: INSTALACIÓN Y CONFIGURACIÓN** 🔧

**Opción 1: @ngx-translate/core (Recomendado)**

```bash
npm install @ngx-translate/core @ngx-translate/http-loader
```

**Configuración en app.config.ts:**

```typescript
// filepath: src/app/app.config.ts

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// ngx-translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { routes } from './app.routes';

// Factory para cargar traducciones
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideAnimations(),
        importProvidersFrom(
            TranslateModule.forRoot({
                defaultLanguage: 'es',
                loader: {
                    provide: TranslateLoader,
                    useFactory: createTranslateLoader,
                    deps: [HttpClient]
                }
            })
        )
    ]
};
```

---

### **FASE 2: ESTRUCTURA DE ARCHIVOS** 📁

Crear la siguiente estructura de traducciones:

```
src/assets/i18n/
├── es.json          # Español
├── en.json          # Inglés
├── fr.json          # Francés (opcional)
└── pt.json          # Portugués (opcional)
```

---

### **FASE 3: ARCHIVOS DE TRADUCCIÓN** 🌐

#### **Español (es.json)**

```json
{
  "COMMON": {
    "SAVE": "Guardar",
    "CANCEL": "Cancelar",
    "DELETE": "Eliminar",
    "EDIT": "Editar",
    "CREATE": "Crear",
    "SEARCH": "Buscar",
    "FILTER": "Filtrar",
    "EXPORT": "Exportar",
    "IMPORT": "Importar",
    "CLOSE": "Cerrar",
    "YES": "Sí",
    "NO": "No",
    "OK": "Aceptar",
    "LOADING": "Cargando...",
    "NO_DATA": "No hay datos disponibles",
    "ERROR": "Error",
    "SUCCESS": "Éxito",
    "WARNING": "Advertencia",
    "INFO": "Información"
  },
  "MENU": {
    "HOME": "Inicio",
    "DASHBOARD": "Dashboard",
    "PRODUCTS": "Productos",
    "CUSTOMERS": "Clientes",
    "ORDERS": "Pedidos",
    "REPORTS": "Reportes",
    "SETTINGS": "Configuración",
    "PROFILE": "Perfil",
    "LOGOUT": "Cerrar Sesión"
  },
  "AUTH": {
    "LOGIN": {
      "TITLE": "Iniciar Sesión",
      "WELCOME": "Bienvenido",
      "EMAIL": "Correo Electrónico",
      "PASSWORD": "Contraseña",
      "REMEMBER_ME": "Recordarme",
      "FORGOT_PASSWORD": "¿Olvidaste tu contraseña?",
      "NO_ACCOUNT": "¿No tienes cuenta?",
      "CREATE_ACCOUNT": "Crear una cuenta",
      "SUBMIT": "Iniciar Sesión",
      "SUCCESS": "Inicio de sesión exitoso",
      "ERROR": "Credenciales inválidas"
    },
    "REGISTER": {
      "TITLE": "Crear Cuenta",
      "FIRST_NAME": "Nombre",
      "LAST_NAME": "Apellido",
      "USERNAME": "Usuario",
      "EMAIL": "Email",
      "PASSWORD": "Contraseña",
      "CONFIRM_PASSWORD": "Confirmar Contraseña",
      "ACCEPT_TERMS": "Acepto los términos y condiciones",
      "HAVE_ACCOUNT": "¿Ya tienes cuenta?",
      "LOGIN": "Iniciar Sesión",
      "SUBMIT": "Registrarse",
      "SUCCESS": "Registro exitoso"
    }
  },
  "PRODUCTS": {
    "TITLE": "Productos",
    "SUBTITLE": "Gestiona tu catálogo de productos",
    "NEW_PRODUCT": "Nuevo Producto",
    "EDIT_PRODUCT": "Editar Producto",
    "DELETE_PRODUCT": "Eliminar Producto",
    "FIELDS": {
      "NAME": "Nombre",
      "DESCRIPTION": "Descripción",
      "PRICE": "Precio",
      "STOCK": "Stock",
      "CATEGORY": "Categoría",
      "STATUS": "Estado",
      "IMAGE": "Imagen"
    },
    "STATUS": {
      "ACTIVE": "Activo",
      "INACTIVE": "Inactivo",
      "OUT_OF_STOCK": "Sin Stock"
    },
    "MESSAGES": {
      "SAVE_SUCCESS": "Producto guardado correctamente",
      "DELETE_SUCCESS": "Producto eliminado correctamente",
      "DELETE_CONFIRM": "¿Estás seguro de eliminar este producto?",
      "LOAD_ERROR": "Error al cargar productos"
    }
  },
  "CUSTOMERS": {
    "TITLE": "Clientes",
    "SUBTITLE": "Administra tu base de clientes",
    "NEW_CUSTOMER": "Nuevo Cliente",
    "FIELDS": {
      "NAME": "Nombre",
      "EMAIL": "Email",
      "PHONE": "Teléfono",
      "ADDRESS": "Dirección",
      "CITY": "Ciudad",
      "COUNTRY": "País",
      "COMPANY": "Empresa"
    }
  },
  "DASHBOARD": {
    "TITLE": "Dashboard",
    "WELCOME": "Bienvenido de nuevo",
    "METRICS": {
      "SALES": "Ventas",
      "USERS": "Usuarios",
      "ORDERS": "Pedidos",
      "REVENUE": "Ingresos"
    },
    "CHARTS": {
      "MONTHLY_SALES": "Ventas Mensuales",
      "DISTRIBUTION": "Distribución"
    },
    "RECENT_TRANSACTIONS": "Últimas Transacciones"
  },
  "VALIDATION": {
    "REQUIRED": "Este campo es requerido",
    "EMAIL": "Email inválido",
    "MIN_LENGTH": "Mínimo {{min}} caracteres",
    "MAX_LENGTH": "Máximo {{max}} caracteres",
    "PATTERN": "Formato inválido",
    "PASSWORD_MISMATCH": "Las contraseñas no coinciden"
  }
}
```

---

#### **Inglés (en.json)**

```json
{
  "COMMON": {
    "SAVE": "Save",
    "CANCEL": "Cancel",
    "DELETE": "Delete",
    "EDIT": "Edit",
    "CREATE": "Create",
    "SEARCH": "Search",
    "FILTER": "Filter",
    "EXPORT": "Export",
    "IMPORT": "Import",
    "CLOSE": "Close",
    "YES": "Yes",
    "NO": "No",
    "OK": "OK",
    "LOADING": "Loading...",
    "NO_DATA": "No data available",
    "ERROR": "Error",
    "SUCCESS": "Success",
    "WARNING": "Warning",
    "INFO": "Information"
  },
  "MENU": {
    "HOME": "Home",
    "DASHBOARD": "Dashboard",
    "PRODUCTS": "Products",
    "CUSTOMERS": "Customers",
    "ORDERS": "Orders",
    "REPORTS": "Reports",
    "SETTINGS": "Settings",
    "PROFILE": "Profile",
    "LOGOUT": "Logout"
  },
  "AUTH": {
    "LOGIN": {
      "TITLE": "Login",
      "WELCOME": "Welcome",
      "EMAIL": "Email",
      "PASSWORD": "Password",
      "REMEMBER_ME": "Remember me",
      "FORGOT_PASSWORD": "Forgot your password?",
      "NO_ACCOUNT": "Don't have an account?",
      "CREATE_ACCOUNT": "Create an account",
      "SUBMIT": "Login",
      "SUCCESS": "Login successful",
      "ERROR": "Invalid credentials"
    },
    "REGISTER": {
      "TITLE": "Create Account",
      "FIRST_NAME": "First Name",
      "LAST_NAME": "Last Name",
      "USERNAME": "Username",
      "EMAIL": "Email",
      "PASSWORD": "Password",
      "CONFIRM_PASSWORD": "Confirm Password",
      "ACCEPT_TERMS": "I accept the terms and conditions",
      "HAVE_ACCOUNT": "Already have an account?",
      "LOGIN": "Login",
      "SUBMIT": "Register",
      "SUCCESS": "Registration successful"
    }
  },
  "PRODUCTS": {
    "TITLE": "Products",
    "SUBTITLE": "Manage your product catalog",
    "NEW_PRODUCT": "New Product",
    "EDIT_PRODUCT": "Edit Product",
    "DELETE_PRODUCT": "Delete Product",
    "FIELDS": {
      "NAME": "Name",
      "DESCRIPTION": "Description",
      "PRICE": "Price",
      "STOCK": "Stock",
      "CATEGORY": "Category",
      "STATUS": "Status",
      "IMAGE": "Image"
    },
    "STATUS": {
      "ACTIVE": "Active",
      "INACTIVE": "Inactive",
      "OUT_OF_STOCK": "Out of Stock"
    },
    "MESSAGES": {
      "SAVE_SUCCESS": "Product saved successfully",
      "DELETE_SUCCESS": "Product deleted successfully",
      "DELETE_CONFIRM": "Are you sure you want to delete this product?",
      "LOAD_ERROR": "Error loading products"
    }
  },
  "CUSTOMERS": {
    "TITLE": "Customers",
    "SUBTITLE": "Manage your customer base",
    "NEW_CUSTOMER": "New Customer",
    "FIELDS": {
      "NAME": "Name",
      "EMAIL": "Email",
      "PHONE": "Phone",
      "ADDRESS": "Address",
      "CITY": "City",
      "COUNTRY": "Country",
      "COMPANY": "Company"
    }
  },
  "DASHBOARD": {
    "TITLE": "Dashboard",
    "WELCOME": "Welcome back",
    "METRICS": {
      "SALES": "Sales",
      "USERS": "Users",
      "ORDERS": "Orders",
      "REVENUE": "Revenue"
    },
    "CHARTS": {
      "MONTHLY_SALES": "Monthly Sales",
      "DISTRIBUTION": "Distribution"
    },
    "RECENT_TRANSACTIONS": "Recent Transactions"
  },
  "VALIDATION": {
    "REQUIRED": "This field is required",
    "EMAIL": "Invalid email",
    "MIN_LENGTH": "Minimum {{min}} characters",
    "MAX_LENGTH": "Maximum {{max}} characters",
    "PATTERN": "Invalid format",
    "PASSWORD_MISMATCH": "Passwords do not match"
  }
}
```

---

### **FASE 4: SERVICIO DE IDIOMA** 💼

```typescript
// filepath: src/app/core/services/language.service.ts

import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Language {
    code: string;
    name: string;
    flag: string;
}

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private translate = inject(TranslateService);
    
    // Idiomas disponibles
    readonly availableLanguages: Language[] = [
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'pt', name: 'Português', flag: '🇧🇷' }
    ];
    
    // Idioma actual (Signal)
    currentLanguage = signal<Language>(this.availableLanguages[0]);
    
    constructor() {
        this.initializeLanguage();
    }
    
    /**
     * Inicializar idioma desde localStorage o navegador
     */
    private initializeLanguage(): void {
        const savedLang = localStorage.getItem('app_language');
        
        if (savedLang) {
            this.setLanguage(savedLang);
        } else {
            // Detectar idioma del navegador
            const browserLang = this.translate.getBrowserLang();
            const defaultLang = browserLang && this.isLanguageSupported(browserLang) 
                ? browserLang 
                : 'es';
            this.setLanguage(defaultLang);
        }
    }
    
    /**
     * Cambiar idioma
     */
    setLanguage(langCode: string): void {
        if (!this.isLanguageSupported(langCode)) {
            console.warn(`Language ${langCode} not supported, falling back to es`);
            langCode = 'es';
        }
        
        this.translate.use(langCode);
        localStorage.setItem('app_language', langCode);
        
        const language = this.availableLanguages.find(lang => lang.code === langCode);
        if (language) {
            this.currentLanguage.set(language);
        }
        
        // Actualizar dirección del documento (para idiomas RTL)
        document.documentElement.dir = this.isRTL(langCode) ? 'rtl' : 'ltr';
        document.documentElement.lang = langCode;
    }
    
    /**
     * Obtener traducción instant (síncrona)
     */
    getTranslation(key: string, params?: any): string {
        return this.translate.instant(key, params);
    }
    
    /**
     * Verificar si un idioma está soportado
     */
    private isLanguageSupported(langCode: string): boolean {
        return this.availableLanguages.some(lang => lang.code === langCode);
    }
    
    /**
     * Verificar si un idioma es RTL (Right-to-Left)
     */
    private isRTL(langCode: string): boolean {
        const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
        return rtlLanguages.includes(langCode);
    }
}
```

---

### **FASE 5: SELECTOR DE IDIOMA** 🎨

```typescript
// filepath: src/app/components/language-selector/language-selector.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { LanguageService, Language } from '../../core/services/language.service';

@Component({
    selector: 'app-language-selector',
    standalone: true,
    imports: [CommonModule, DropdownModule, ButtonModule],
    template: `
        <!-- Opción 1: Dropdown -->
        <p-dropdown 
            [options]="languageService.availableLanguages"
            [(ngModel)]="languageService.currentLanguage"
            (onChange)="onLanguageChange($event.value)"
            optionLabel="name"
            [style]="{'min-width': '150px'}"
            placeholder="Select Language">
            <ng-template pTemplate="selectedItem">
                <div class="flex align-items-center gap-2" *ngIf="languageService.currentLanguage()">
                    <span>{{languageService.currentLanguage().flag}}</span>
                    <span>{{languageService.currentLanguage().name}}</span>
                </div>
            </ng-template>
            <ng-template pTemplate="item" let-language>
                <div class="flex align-items-center gap-2">
                    <span>{{language.flag}}</span>
                    <span>{{language.name}}</span>
                </div>
            </ng-template>
        </p-dropdown>
        
        <!-- Opción 2: Botones -->
        <!-- <div class="flex gap-2">
            @for (lang of languageService.availableLanguages; track lang.code) {
                <p-button 
                    [label]="lang.flag"
                    [outlined]="languageService.currentLanguage().code !== lang.code"
                    (onClick)="onLanguageChange(lang)"
                    [pTooltip]="lang.name"
                    tooltipPosition="bottom" />
            }
        </div> -->
    `
})
export class LanguageSelectorComponent {
    languageService = inject(LanguageService);
    
    onLanguageChange(language: Language): void {
        this.languageService.setLanguage(language.code);
    }
}
```

---

### **FASE 6: USO EN COMPONENTES** 🎯

#### **En Templates (HTML)**

```html
<!-- filepath: src/app/pages/products/products.component.html -->

<!-- Traducción simple -->
<h1>{{ 'PRODUCTS.TITLE' | translate }}</h1>
<p>{{ 'PRODUCTS.SUBTITLE' | translate }}</p>

<!-- Traducción con parámetros -->
<small class="p-error">
    {{ 'VALIDATION.MIN_LENGTH' | translate:{ min: 3 } }}
</small>

<!-- Botones -->
<p-button [label]="'COMMON.SAVE' | translate" icon="pi pi-save" />
<p-button [label]="'COMMON.CANCEL' | translate" icon="pi pi-times" />

<!-- Placeholder en inputs -->
<input pInputText 
       [placeholder]="'PRODUCTS.FIELDS.NAME' | translate" />

<!-- Headers en tablas -->
<p-table [value]="products">
    <ng-template pTemplate="header">
        <tr>
            <th>{{ 'PRODUCTS.FIELDS.NAME' | translate }}</th>
            <th>{{ 'PRODUCTS.FIELDS.PRICE' | translate }}</th>
            <th>{{ 'PRODUCTS.FIELDS.STOCK' | translate }}</th>
            <th>{{ 'PRODUCTS.FIELDS.STATUS' | translate }}</th>
        </tr>
    </ng-template>
</p-template>

<!-- Mensajes de confirmación -->
<p-confirmDialog 
    [header]="'COMMON.WARNING' | translate"
    [acceptLabel]="'COMMON.YES' | translate"
    [rejectLabel]="'COMMON.NO' | translate" />
```

---

#### **En TypeScript**

```typescript
// filepath: src/app/pages/products/products.component.ts

import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-products',
    standalone: true,
    // ...
})
export class ProductsComponent {
    private translate = inject(TranslateService);
    private messageService = inject(MessageService);
    
    saveProduct(): void {
        // ...guardar producto...
        
        // Mostrar mensaje traducido
        this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('COMMON.SUCCESS'),
            detail: this.translate.instant('PRODUCTS.MESSAGES.SAVE_SUCCESS')
        });
    }
    
    confirmDelete(): void {
        this.confirmationService.confirm({
            message: this.translate.instant('PRODUCTS.MESSAGES.DELETE_CONFIRM'),
            header: this.translate.instant('COMMON.WARNING'),
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: this.translate.instant('COMMON.YES'),
            rejectLabel: this.translate.instant('COMMON.NO'),
            accept: () => {
                this.deleteProduct();
            }
        });
    }
}
```

---

### **FASE 7: PIPES PERSONALIZADOS** 🔧

#### **Pipe para Fechas Localizadas**

```typescript
// filepath: src/app/core/pipes/localized-date.pipe.ts

import { Pipe, PipeTransform, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LanguageService } from '../services/language.service';

@Pipe({
    name: 'localizedDate',
    standalone: true,
    pure: false // Para actualizar cuando cambie el idioma
})
export class LocalizedDatePipe implements PipeTransform {
    private languageService = inject(LanguageService);
    
    transform(value: any, format: string = 'mediumDate'): string | null {
        const datePipe = new DatePipe(this.languageService.currentLanguage().code);
        return datePipe.transform(value, format);
    }
}

// Uso:
// {{ order.date | localizedDate:'short' }}
// {{ order.date | localizedDate:'fullDate' }}
```

---

#### **Pipe para Números Localizados**

```typescript
// filepath: src/app/core/pipes/localized-number.pipe.ts

import { Pipe, PipeTransform, inject } from '@angular/core';
import { DecimalPipe, CurrencyPipe } from '@angular/common';
import { LanguageService } from '../services/language.service';

@Pipe({
    name: 'localizedNumber',
    standalone: true,
    pure: false
})
export class LocalizedNumberPipe implements PipeTransform {
    private languageService = inject(LanguageService);
    
    transform(value: any, digitsInfo?: string): string | null {
        const decimalPipe = new DecimalPipe(this.languageService.currentLanguage().code);
        return decimalPipe.transform(value, digitsInfo);
    }
}

@Pipe({
    name: 'localizedCurrency',
    standalone: true,
    pure: false
})
export class LocalizedCurrencyPipe implements PipeTransform {
    private languageService = inject(LanguageService);
    
    transform(value: any, currencyCode: string = 'USD'): string | null {
        const currencyPipe = new CurrencyPipe(this.languageService.currentLanguage().code);
        return currencyPipe.transform(value, currencyCode);
    }
}

// Uso:
// {{ product.price | localizedCurrency:'USD' }}
// {{ product.stock | localizedNumber:'1.0-2' }}
```

---

### **FASE 8: INTEGRACIÓN EN LAYOUT** 🏗️

```typescript
// filepath: src/app/layout/app.topbar.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';

import { LanguageSelectorComponent } from '../components/language-selector/language-selector.component';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        AvatarModule,
        MenuModule,
        LanguageSelectorComponent
    ],
    template: `
        <div class="layout-topbar">
            <a class="layout-topbar-logo" routerLink="/">
                <img src="assets/layout/images/logo.svg" alt="logo">
                <span>VERONA</span>
            </a>

            <button class="p-link layout-menu-button layout-topbar-button" 
                    (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>

            <div class="layout-topbar-menu">
                <!-- Selector de Idioma -->
                <app-language-selector />
                
                <!-- Otras acciones -->
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-bell"></i>
                    <span class="layout-topbar-item-text">Notifications</span>
                </button>
                
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-cog"></i>
                    <span class="layout-topbar-item-text">Settings</span>
                </button>
                
                <button class="p-link layout-topbar-button" (click)="menu.toggle($event)">
                    <i class="pi pi-user"></i>
                    <span class="layout-topbar-item-text">Profile</span>
                </button>
                
                <p-menu #menu [model]="items" [popup]="true" />
            </div>
        </div>
    `
})
export class AppTopbarComponent {
    layoutService = inject(LayoutService);
    router = inject(Router);
    
    items = [
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => this.router.navigate(['/profile'])
        },
        {
            label: 'Settings',
            icon: 'pi pi-cog',
            command: () => this.router.navigate(['/settings'])
        },
        {
            separator: true
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.logout()
        }
    ];
    
    logout(): void {
        // Lógica de logout
    }
}
```

---

### **FASE 9: TRADUCCIÓN DE PrimeNG** 🎨

PrimeNG también tiene sus propios textos que deben traducirse:

```typescript
// filepath: src/app/app.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `<router-outlet />`
})
export class AppComponent implements OnInit {
    private translateService = inject(TranslateService);
    private primengConfig = inject(PrimeNGConfig);
    
    ngOnInit(): void {
        // Configurar traducciones de PrimeNG
        this.translateService.stream('PRIMENG').subscribe(data => {
            this.primengConfig.setTranslation(data);
        });
    }
}
```

**Agregar a archivos de traducción:**

```json
// es.json
{
  "PRIMENG": {
    "startsWith": "Comienza con",
    "contains": "Contiene",
    "notContains": "No contiene",
    "endsWith": "Termina con",
    "equals": "Igual a",
    "notEquals": "Diferente de",
    "noFilter": "Sin filtro",
    "lt": "Menor que",
    "lte": "Menor o igual a",
    "gt": "Mayor que",
    "gte": "Mayor o igual a",
    "is": "Es",
    "isNot": "No es",
    "before": "Antes",
    "after": "Después",
    "dateIs": "Fecha es",
    "dateIsNot": "Fecha no es",
    "dateBefore": "Fecha antes de",
    "dateAfter": "Fecha después de",
    "clear": "Limpiar",
    "apply": "Aplicar",
    "matchAll": "Coincidir todo",
    "matchAny": "Coincidir cualquiera",
    "addRule": "Agregar regla",
    "removeRule": "Eliminar regla",
    "accept": "Sí",
    "reject": "No",
    "choose": "Elegir",
    "upload": "Subir",
    "cancel": "Cancelar",
    "dayNames": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    "dayNamesShort": ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    "dayNamesMin": ["D", "L", "M", "X", "J", "V", "S"],
    "monthNames": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    "monthNamesShort": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    "today": "Hoy",
    "weekHeader": "Sem",
    "weak": "Débil",
    "medium": "Medio",
    "strong": "Fuerte",
    "passwordPrompt": "Ingrese una contraseña",
    "emptyMessage": "No se encontraron resultados",
    "emptyFilterMessage": "No se encontraron resultados"
  }
}
```

```json
// en.json
{
  "PRIMENG": {
    "startsWith": "Starts with",
    "contains": "Contains",
    "notContains": "Not contains",
    "endsWith": "Ends with",
    "equals": "Equals",
    "notEquals": "Not equals",
    "noFilter": "No Filter",
    "lt": "Less than",
    "lte": "Less than or equal to",
    "gt": "Greater than",
    "gte": "Greater than or equal to",
    "is": "Is",
    "isNot": "Is not",
    "before": "Before",
    "after": "After",
    "dateIs": "Date is",
    "dateIsNot": "Date is not",
    "dateBefore": "Date is before",
    "dateAfter": "Date is after",
    "clear": "Clear",
    "apply": "Apply",
    "matchAll": "Match All",
    "matchAny": "Match Any",
    "addRule": "Add Rule",
    "removeRule": "Remove Rule",
    "accept": "Yes",
    "reject": "No",
    "choose": "Choose",
    "upload": "Upload",
    "cancel": "Cancel",
    "dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "dayNamesShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    "dayNamesMin": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    "monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "today": "Today",
    "weekHeader": "Wk",
    "weak": "Weak",
    "medium": "Medium",
    "strong": "Strong",
    "passwordPrompt": "Enter a password",
    "emptyMessage": "No results found",
    "emptyFilterMessage": "No results found"
  }
}
```

---

## ✅ CHECKLIST DE VALIDACIÓN

### **Configuración**
- [ ] ngx-translate instalado y configurado
- [ ] Archivos JSON creados (mínimo es.json, en.json)
- [ ] LanguageService implementado
- [ ] Selector de idioma en topbar
- [ ] Idioma guardado en localStorage

### **Traducción**
- [ ] Todos los textos usando pipe `| translate`
- [ ] Parámetros dinámicos funcionando
- [ ] Traducciones PrimeNG configuradas
- [ ] Fechas y números localizados
- [ ] Mensajes de validación traducidos

### **Experiencia de Usuario**
- [ ] Cambio de idioma en tiempo real
- [ ] Sin recarga de página
- [ ] Idioma persistente entre sesiones
- [ ] Banderas/nombres de idiomas visibles
- [ ] Dirección RTL funcionando (si aplica)

---

## 🎯 OBJETIVO FINAL

Sistema de i18n completamente funcional con:
1. **Soporte multi-idioma** dinámico
2. **Cambio en tiempo real** sin recargar
3. **Persistencia** en localStorage
4. **Traducciones completas** de la app y PrimeNG
5. **Fechas/números** formateados según locale
6. **Fácil** de extender con nuevos idiomas

Listo para aplicaciones globales profesionales. 🌍
