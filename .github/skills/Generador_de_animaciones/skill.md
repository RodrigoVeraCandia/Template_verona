# SKILL: GENERADOR DE ANIMACIONES

## 🎯 PROPÓSITO
Implementar animaciones profesionales en aplicaciones Angular 19+ con Verona, utilizando Angular Animations, transiciones de PrimeNG, y animaciones CSS personalizadas para mejorar la experiencia de usuario con efectos fluidos y atractivos.

---

## 🔍 CUÁNDO USAR ESTE SKILL

**Activar cuando el usuario:**
- Pide "agregar animaciones"
- Solicita "hacer la UI más dinámica"
- Dice "animar las transiciones"
- Pregunta "¿cómo animar componentes?"
- Menciona "animación", "transición", "efectos"
- Pide "entrada/salida de elementos"

**Ejemplos de disparadores:**
```
✅ "Anima la aparición de las cards"
✅ "Agrega transición al abrir el diálogo"
✅ "Efecto de fade in/out"
✅ "Anima la lista de productos"
✅ "Transición suave al cambiar de vista"
✅ "Efecto de hover en los botones"
```

---

## 📋 PROTOCOLO DE IMPLEMENTACIÓN

### **FASE 1: CONFIGURACIÓN** 🔧

**Activar Angular Animations:**

```typescript
// filepath: src/app/app.config.ts

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // ← Importante

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimations() // ← Habilitar animaciones
    ]
};
```

---

### **FASE 2: BIBLIOTECA DE ANIMACIONES REUTILIZABLES** 📚

```typescript
// filepath: src/app/core/animations/animations.ts

import { 
    trigger, 
    state, 
    style, 
    transition, 
    animate,
    query,
    stagger,
    keyframes,
    group,
    animateChild
} from '@angular/animations';

/**
 * FADE IN / FADE OUT
 */
export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
    ])
]);

export const fadeOut = trigger('fadeOut', [
    transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
    ])
]);

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
    ])
]);

/**
 * SLIDE IN / SLIDE OUT
 */
export const slideInFromLeft = trigger('slideInFromLeft', [
    transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
    ])
]);

export const slideInFromRight = trigger('slideInFromRight', [
    transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
    ])
]);

export const slideInFromTop = trigger('slideInFromTop', [
    transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
    ])
]);

export const slideInFromBottom = trigger('slideInFromBottom', [
    transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
    ])
]);

/**
 * SCALE / ZOOM
 */
export const scaleIn = trigger('scaleIn', [
    transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('300ms cubic-bezier(0.68, -0.55, 0.27, 1.55)', 
                style({ transform: 'scale(1)', opacity: 1 }))
    ])
]);

export const scaleOut = trigger('scaleOut', [
    transition(':leave', [
        animate('200ms ease-in', style({ transform: 'scale(0)', opacity: 0 }))
    ])
]);

/**
 * ROTATE
 */
export const rotateIn = trigger('rotateIn', [
    transition(':enter', [
        style({ transform: 'rotate(-180deg)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'rotate(0)', opacity: 1 }))
    ])
]);

/**
 * BOUNCE
 */
export const bounceIn = trigger('bounceIn', [
    transition(':enter', [
        animate('600ms', keyframes([
            style({ transform: 'scale(0)', offset: 0 }),
            style({ transform: 'scale(1.2)', offset: 0.5 }),
            style({ transform: 'scale(0.9)', offset: 0.75 }),
            style({ transform: 'scale(1)', offset: 1 })
        ]))
    ])
]);

/**
 * SHAKE (para errores)
 */
export const shake = trigger('shake', [
    transition('false => true', [
        animate('400ms', keyframes([
            style({ transform: 'translateX(0)', offset: 0 }),
            style({ transform: 'translateX(-10px)', offset: 0.25 }),
            style({ transform: 'translateX(10px)', offset: 0.5 }),
            style({ transform: 'translateX(-10px)', offset: 0.75 }),
            style({ transform: 'translateX(0)', offset: 1 })
        ]))
    ])
]);

/**
 * PULSE (para notificaciones)
 */
export const pulse = trigger('pulse', [
    transition('false => true', [
        animate('600ms', keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.1)', offset: 0.5 }),
            style({ transform: 'scale(1)', offset: 1 })
        ]))
    ])
]);

/**
 * LIST ANIMATIONS (stagger)
 */
export const listAnimation = trigger('listAnimation', [
    transition('* => *', [
        query(':enter', [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger('100ms', [
                animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ], { optional: true })
    ])
]);

/**
 * EXPAND / COLLAPSE
 */
export const expandCollapse = trigger('expandCollapse', [
    state('collapsed', style({ height: '0', overflow: 'hidden', opacity: 0 })),
    state('expanded', style({ height: '*', overflow: 'visible', opacity: 1 })),
    transition('collapsed <=> expanded', animate('300ms ease-in-out'))
]);

/**
 * ROUTE ANIMATIONS
 */
export const routeAnimations = trigger('routeAnimations', [
    transition('* <=> *', [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                width: '100%'
            })
        ], { optional: true }),
        
        group([
            query(':leave', [
                animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-100px)' }))
            ], { optional: true }),
            
            query(':enter', [
                style({ opacity: 0, transform: 'translateX(100px)' }),
                animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
            ], { optional: true })
        ])
    ])
]);

/**
 * FLIP CARD
 */
export const flipCard = trigger('flipCard', [
    state('front', style({ transform: 'rotateY(0)' })),
    state('back', style({ transform: 'rotateY(180deg)' })),
    transition('front <=> back', animate('600ms ease-in-out'))
]);

/**
 * SLIDE TOGGLE (sidebar, panels)
 */
export const slideToggle = trigger('slideToggle', [
    state('void', style({ width: '0', opacity: 0 })),
    state('*', style({ width: '*', opacity: 1 })),
    transition('void <=> *', animate('300ms ease-in-out'))
]);
```

---

### **FASE 3: EJEMPLOS DE USO EN COMPONENTES** 🎨

#### **Fade In/Out en Lista**

```typescript
// filepath: src/app/pages/products-animated/products-animated.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { fadeInOut, listAnimation } from '../../core/animations/animations';

@Component({
    selector: 'app-products-animated',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule],
    animations: [fadeInOut, listAnimation],
    template: `
        <div class="mb-4">
            <p-button label="Agregar Producto" 
                      icon="pi pi-plus" 
                      (onClick)="addProduct()" />
        </div>
        
        <div class="grid" [@listAnimation]="products().length">
            @for (product of products(); track product.id) {
                <div class="col-12 md:col-6 lg:col-4" @fadeInOut>
                    <p-card>
                        <ng-template pTemplate="header">
                            <img [src]="product.image" 
                                 alt="{{product.name}}"
                                 class="w-full" />
                        </ng-template>
                        
                        <h4>{{product.name}}</h4>
                        <p class="text-600">{{product.description}}</p>
                        <p class="text-2xl font-bold mt-3">
                            {{product.price | currency}}
                        </p>
                        
                        <ng-template pTemplate="footer">
                            <p-button label="Eliminar" 
                                      icon="pi pi-trash" 
                                      severity="danger"
                                      (onClick)="removeProduct(product.id)" />
                        </ng-template>
                    </p-card>
                </div>
            }
        </div>
    `
})
export class ProductsAnimatedComponent {
    products = signal<any[]>([
        { id: 1, name: 'Producto 1', description: 'Descripción 1', price: 100, image: 'assets/demo/images/product/bamboo-watch.jpg' },
        { id: 2, name: 'Producto 2', description: 'Descripción 2', price: 200, image: 'assets/demo/images/product/blue-band.jpg' }
    ]);
    
    private nextId = 3;
    
    addProduct(): void {
        const newProduct = {
            id: this.nextId++,
            name: `Producto ${this.nextId}`,
            description: `Descripción del producto ${this.nextId}`,
            price: Math.floor(Math.random() * 1000),
            image: 'assets/demo/images/product/game-controller.jpg'
        };
        
        this.products.update(products => [...products, newProduct]);
    }
    
    removeProduct(id: number): void {
        this.products.update(products => products.filter(p => p.id !== id));
    }
}
```

---

#### **Expand/Collapse en Accordion**

```typescript
// filepath: src/app/components/animated-accordion/animated-accordion.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { expandCollapse } from '../../core/animations/animations';

@Component({
    selector: 'app-animated-accordion',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule],
    animations: [expandCollapse],
    template: `
        <div class="card">
            @for (item of items; track item.id) {
                <div class="mb-3">
                    <div class="surface-card border-round p-3 cursor-pointer"
                         (click)="toggle(item.id)">
                        <div class="flex justify-content-between align-items-center">
                            <h4 class="m-0">{{item.title}}</h4>
                            <i [class]="isExpanded(item.id) ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"></i>
                        </div>
                    </div>
                    
                    <div [@expandCollapse]="isExpanded(item.id) ? 'expanded' : 'collapsed'"
                         class="surface-50 border-round-bottom p-3">
                        <p>{{item.content}}</p>
                    </div>
                </div>
            }
        </div>
    `
})
export class AnimatedAccordionComponent {
    expandedId = signal<number | null>(null);
    
    items = [
        { id: 1, title: 'Sección 1', content: 'Contenido de la sección 1...' },
        { id: 2, title: 'Sección 2', content: 'Contenido de la sección 2...' },
        { id: 3, title: 'Sección 3', content: 'Contenido de la sección 3...' }
    ];
    
    toggle(id: number): void {
        this.expandedId.update(current => current === id ? null : id);
    }
    
    isExpanded(id: number): boolean {
        return this.expandedId() === id;
    }
}
```

---

#### **Shake en Formulario con Error**

```typescript
// filepath: src/app/pages/login-animated/login-animated.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

import { shake } from '../../core/animations/animations';

@Component({
    selector: 'app-login-animated',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        PasswordModule
    ],
    animations: [shake],
    template: `
        <div class="flex align-items-center justify-content-center min-h-screen">
            <p-card class="w-full max-w-30rem" [@shake]="showError()">
                <ng-template pTemplate="header">
                    <div class="text-center pt-4">
                        <h2>Iniciar Sesión</h2>
                    </div>
                </ng-template>
                
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                    <div class="field">
                        <label for="email">Email</label>
                        <input pInputText id="email" 
                               formControlName="email"
                               class="w-full" />
                    </div>
                    
                    <div class="field">
                        <label for="password">Contraseña</label>
                        <p-password id="password" 
                                    formControlName="password"
                                    [feedback]="false"
                                    styleClass="w-full"
                                    inputStyleClass="w-full" />
                    </div>
                    
                    @if (showError()) {
                        <div class="p-error mb-3">
                            Credenciales inválidas
                        </div>
                    }
                    
                    <p-button label="Iniciar Sesión" 
                              type="submit"
                              class="w-full" />
                </form>
            </p-card>
        </div>
    `
})
export class LoginAnimatedComponent {
    private fb = new FormBuilder();
    
    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });
    
    showError = signal(false);
    
    onSubmit(): void {
        if (this.loginForm.invalid) return;
        
        // Simular error de login
        const { email, password } = this.loginForm.value;
        if (email !== 'admin@example.com' || password !== 'admin') {
            this.showError.set(true);
            
            // Quitar el error después de la animación
            setTimeout(() => this.showError.set(false), 400);
        } else {
            // Login exitoso
            console.log('Login exitoso');
        }
    }
}
```

---

#### **Flip Card**

```typescript
// filepath: src/app/components/flip-card/flip-card.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { flipCard } from '../../core/animations/animations';

@Component({
    selector: 'app-flip-card',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule],
    animations: [flipCard],
    template: `
        <div class="flip-card-container" (click)="flip()">
            <div class="flip-card" [@flipCard]="isFlipped() ? 'back' : 'front'">
                <!-- Front -->
                <div class="flip-card-front">
                    <p-card>
                        <ng-template pTemplate="header">
                            <img src="assets/demo/images/product/bamboo-watch.jpg" 
                                 alt="Product"
                                 class="w-full" />
                        </ng-template>
                        <h3>Producto Premium</h3>
                        <p class="text-600">Click para ver más detalles</p>
                    </p-card>
                </div>
                
                <!-- Back -->
                <div class="flip-card-back">
                    <p-card>
                        <h3>Detalles</h3>
                        <ul class="list-none p-0">
                            <li class="mb-2">✓ Alta calidad</li>
                            <li class="mb-2">✓ Garantía 2 años</li>
                            <li class="mb-2">✓ Envío gratis</li>
                        </ul>
                        <p class="text-3xl font-bold mt-4">$299</p>
                    </p-card>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .flip-card-container {
            perspective: 1000px;
            cursor: pointer;
        }
        
        .flip-card {
            position: relative;
            width: 100%;
            transform-style: preserve-3d;
        }
        
        .flip-card-front,
        .flip-card-back {
            backface-visibility: hidden;
        }
        
        .flip-card-back {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            transform: rotateY(180deg);
        }
    `]
})
export class FlipCardComponent {
    isFlipped = signal(false);
    
    flip(): void {
        this.isFlipped.update(val => !val);
    }
}
```

---

### **FASE 4: ANIMACIONES CSS PERSONALIZADAS** 🎭

```scss
// filepath: src/assets/styles/animations.scss

/* FADE */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.fade-in {
    animation: fadeIn 300ms ease-in;
}

.fade-out {
    animation: fadeOut 300ms ease-out;
}

/* SLIDE */
@keyframes slideInFromLeft {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideInFromRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.slide-in-left {
    animation: slideInFromLeft 400ms ease-out;
}

.slide-in-right {
    animation: slideInFromRight 400ms ease-out;
}

/* BOUNCE */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

.bounce {
    animation: bounce 1s;
}

/* PULSE */
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

.pulse {
    animation: pulse 600ms;
}

/* SHAKE */
@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-10px);
    }
    20%, 40%, 60%, 80% {
        transform: translateX(10px);
    }
}

.shake {
    animation: shake 400ms;
}

/* ROTATE */
@keyframes rotate360 {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.rotate-360 {
    animation: rotate360 500ms ease-in-out;
}

/* GLOW (para notificaciones) */
@keyframes glow {
    0%, 100% {
        box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
    }
    50% {
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
    }
}

.glow {
    animation: glow 2s infinite;
}

/* HOVER EFFECTS */
.hover-lift {
    transition: transform 200ms ease, box-shadow 200ms ease;
}

.hover-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.hover-scale {
    transition: transform 200ms ease;
}

.hover-scale:hover {
    transform: scale(1.05);
}

.hover-rotate {
    transition: transform 300ms ease;
}

.hover-rotate:hover {
    transform: rotate(5deg);
}
```

---

### **FASE 5: DIRECTIVA DE ANIMACIÓN REUTILIZABLE** 🔧

```typescript
// filepath: src/app/core/directives/animate-on-scroll.directive.ts

import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appAnimateOnScroll]',
    standalone: true
})
export class AnimateOnScrollDirective implements OnInit {
    @Input() animationClass = 'fade-in';
    @Input() threshold = 0.1;
    
    constructor(private el: ElementRef) {}
    
    ngOnInit(): void {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.el.nativeElement.classList.add(this.animationClass);
                        observer.unobserve(this.el.nativeElement);
                    }
                });
            },
            { threshold: this.threshold }
        );
        
        observer.observe(this.el.nativeElement);
    }
}

// Uso:
// <div appAnimateOnScroll animationClass="slide-in-left">Contenido</div>
```

---

### **FASE 6: ANIMACIONES DE RUTAS** 🛣️

```typescript
// filepath: src/app/app.component.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './core/animations/animations';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    animations: [routeAnimations],
    template: `
        <div [@routeAnimations]="prepareRoute(outlet)">
            <router-outlet #outlet="outlet" />
        </div>
    `
})
export class AppComponent {
    prepareRoute(outlet: RouterOutlet) {
        return outlet?.activatedRouteData?.['animation'];
    }
}
```

```typescript
// filepath: src/app/app.routes.ts

import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component')
            .then(m => m.HomeComponent),
        data: { animation: 'HomePage' }
    },
    {
        path: 'products',
        loadComponent: () => import('./pages/products/products.component')
            .then(m => m.ProductsComponent),
        data: { animation: 'ProductsPage' }
    }
];
```

---

### **FASE 7: COMPONENTE CON MÚLTIPLES ANIMACIONES** 🎪

```typescript
// filepath: src/app/pages/animated-dashboard/animated-dashboard.component.ts

import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { 
    fadeInOut, 
    slideInFromBottom, 
    scaleIn, 
    listAnimation,
    pulse 
} from '../../core/animations/animations';

@Component({
    selector: 'app-animated-dashboard',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, TagModule],
    animations: [fadeInOut, slideInFromBottom, scaleIn, listAnimation, pulse],
    template: `
        <!-- Header con fade in -->
        <div class="mb-4" @fadeInOut>
            <h1 class="text-4xl font-bold">Dashboard Animado</h1>
            <p class="text-600">Todas las animaciones en acción</p>
        </div>
        
        <!-- Métricas con slide in desde abajo + stagger -->
        <div class="grid mb-4" [@listAnimation]="metrics().length">
            @for (metric of metrics(); track metric.id) {
                <div class="col-12 sm:col-6 lg:col-3" @slideInFromBottom>
                    <p-card styleClass="text-center" [@pulse]="metric.pulse">
                        <i [class]="'pi ' + metric.icon + ' text-5xl text-primary mb-3'"></i>
                        <h3 class="text-4xl font-bold mb-2">{{metric.value}}</h3>
                        <p class="text-600">{{metric.label}}</p>
                    </p-card>
                </div>
            }
        </div>
        
        <!-- Cards con scale in -->
        <div class="grid">
            @for (item of items(); track item.id) {
                <div class="col-12 md:col-6 lg:col-4" @scaleIn>
                    <p-card [header]="item.title">
                        <p>{{item.description}}</p>
                        <ng-template pTemplate="footer">
                            <p-button label="Ver Más" 
                                      icon="pi pi-arrow-right"
                                      [text]="true" />
                        </ng-template>
                    </p-card>
                </div>
            }
        </div>
        
        <!-- Botón para agregar item (fade in/out) -->
        <div class="mt-4">
            <p-button label="Agregar Item" 
                      icon="pi pi-plus" 
                      (onClick)="addItem()" />
        </div>
    `
})
export class AnimatedDashboardComponent implements OnInit {
    metrics = signal([
        { id: 1, label: 'Ventas', value: 1250, icon: 'pi-shopping-cart', pulse: false },
        { id: 2, label: 'Usuarios', value: 420, icon: 'pi-users', pulse: false },
        { id: 3, label: 'Pedidos', value: 180, icon: 'pi-box', pulse: false },
        { id: 4, label: 'Ingresos', value: 45000, icon: 'pi-dollar', pulse: false }
    ]);
    
    items = signal([
        { id: 1, title: 'Item 1', description: 'Descripción del item 1' },
        { id: 2, title: 'Item 2', description: 'Descripción del item 2' },
        { id: 3, title: 'Item 3', description: 'Descripción del item 3' }
    ]);
    
    private nextId = 4;
    
    ngOnInit(): void {
        // Animar métricas cada 5 segundos
        setInterval(() => {
            this.animateRandomMetric();
        }, 5000);
    }
    
    addItem(): void {
        const newItem = {
            id: this.nextId++,
            title: `Item ${this.nextId}`,
            description: `Descripción del item ${this.nextId}`
        };
        this.items.update(items => [...items, newItem]);
    }
    
    animateRandomMetric(): void {
        const randomIndex = Math.floor(Math.random() * this.metrics().length);
        
        this.metrics.update(metrics => {
            const updated = [...metrics];
            updated[randomIndex] = { ...updated[randomIndex], pulse: true };
            return updated;
        });
        
        // Resetear después de la animación
        setTimeout(() => {
            this.metrics.update(metrics => {
                const updated = [...metrics];
                updated[randomIndex] = { ...updated[randomIndex], pulse: false };
                return updated;
            });
        }, 600);
    }
}
```

---

## ✅ CHECKLIST DE VALIDACIÓN

### **Configuración**
- [ ] `provideAnimations()` en app.config.ts
- [ ] Biblioteca de animaciones creada
- [ ] Animaciones CSS importadas en styles.scss

### **Implementación**
- [ ] Animaciones de entrada/salida en listas
- [ ] Transiciones suaves entre estados
- [ ] Animaciones en interciones (hover, click)
- [ ] Feedback visual en formularios (shake en error)

### **Performance**
- [ ] Animaciones fluidas (60 FPS)
- [ ] No hay jank o stuttering
- [ ] Duración apropiada (200-600ms)
- [ ] Timing functions correctos (ease-in-out)

### **Experiencia**
- [ ] Animaciones mejoran UX, no distraen
- [ ] Loading states animados
- [ ] Transiciones entre rutas suaves
- [ ] Accesibilidad (respeta prefers-reduced-motion)

---

## 🎯 OBJETIVO FINAL

Crear una experiencia de usuario:
1. **Fluida:** Transiciones suaves y naturales
2. **Profesional:** Animaciones sutiles y apropiadas
3. **Performante:** 60 FPS en todas las animaciones
4. **Accesible:** Respeta preferencias de usuario
5. **Deliciosa:** Sorprende y deleita al usuario

Con animaciones que mejoren la percepción de velocidad y calidad. ✨
