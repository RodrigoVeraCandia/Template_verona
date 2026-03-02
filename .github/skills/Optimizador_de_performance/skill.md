# SKILL: OPTIMIZADOR DE PERFORMANCE

## 🎯 PROPÓSITO
Analizar y optimizar el rendimiento de aplicaciones Angular 19+ con Verona, implementando lazy loading, virtual scrolling, memoización, OnPush change detection, y otras técnicas avanzadas para mejorar velocidad de carga y fluidez.

---

## 🔍 CUÁNDO USAR ESTE SKILL

**Activar cuando el usuario:**
- Pide "optimizar el rendimiento"
- Solicita "la app está lenta"
- Dice "implementar lazy loading"
- Pregunta "¿cómo mejorar la velocidad?"
- Menciona "performance", "optimización", "lentitud"
- Pide "virtual scroll para tablas grandes"

**Ejemplos de disparadores:**
```
✅ "Optimiza el rendimiento de esta vista"
✅ "Implementa lazy loading en las rutas"
✅ "La tabla con 10,000 registros es lenta"
✅ "Reduce el tiempo de carga inicial"
✅ "Mejora la performance del dashboard"
✅ "Virtual scroll para la lista de productos"
```

---

## 📋 PROTOCOLO DE IMPLEMENTACIÓN

### **FASE 1: AUDITORÍA DE PERFORMANCE** 🔍

**Herramientas de diagnóstico:**

```typescript
// filepath: src/app/core/utils/performance-monitor.ts

export class PerformanceMonitor {
    /**
     * Medir tiempo de ejecución de una función
     */
    static measure(label: string, fn: () => any): void {
        const start = performance.now();
        fn();
        const end = performance.now();
        console.log(`⏱️ ${label}: ${(end - start).toFixed(2)}ms`);
    }
    
    /**
     * Medir tiempo de carga de componente
     */
    static componentLoadTime(componentName: string): void {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                console.log(`📦 ${componentName} loaded in: ${entry.duration.toFixed(2)}ms`);
            });
        });
        observer.observe({ entryTypes: ['measure'] });
        performance.mark(`${componentName}-start`);
    }
    
    /**
     * Obtener métricas de navegación
     */
    static getNavigationMetrics(): void {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        console.table({
            'DNS Lookup': `${perfData.domainLookupEnd - perfData.domainLookupStart}ms`,
            'TCP Connection': `${perfData.connectEnd - perfData.connectStart}ms`,
            'Request Time': `${perfData.responseStart - perfData.requestStart}ms`,
            'Response Time': `${perfData.responseEnd - perfData.responseStart}ms`,
            'DOM Processing': `${perfData.domComplete - perfData.domInteractive}ms`,
            'Total Load Time': `${perfData.loadEventEnd - perfData.fetchStart}ms`
        });
    }
}

// Uso en componente:
// PerformanceMonitor.measure('Load Products', () => this.loadProducts());
```

---

### **FASE 2: LAZY LOADING** 🚀

#### **Lazy Loading de Rutas**

**❌ ANTES (Todo cargado al inicio):**
```typescript
// app.routes.ts
import { ProductsComponent } from './pages/products/products.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { OrdersComponent } from './pages/orders/orders.component';

export const routes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'orders', component: OrdersComponent }
];
```

**✅ DESPUÉS (Lazy Loading):**
```typescript
// filepath: src/app/app.routes.ts

import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/app.layout.component')
            .then(m => m.AppLayoutComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard.component')
                    .then(m => m.DashboardComponent)
            },
            {
                path: 'products',
                loadChildren: () => import('./pages/products/products.routes')
                    .then(m => m.productsRoutes)
            },
            {
                path: 'customers',
                loadChildren: () => import('./pages/customers/customers.routes')
                    .then(m => m.customersRoutes)
            },
            {
                path: 'orders',
                loadChildren: () => import('./pages/orders/orders.routes')
                    .then(m => m.ordersRoutes)
            }
        ]
    }
];
```

**Rutas hijas con lazy loading:**
```typescript
// filepath: src/app/pages/products/products.routes.ts

import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./products.component')
            .then(m => m.ProductsComponent)
    },
    {
        path: 'new',
        loadComponent: () => import('./product-form/product-form.component')
            .then(m => m.ProductFormComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./product-detail/product-detail.component')
            .then(m => m.ProductDetailComponent)
    }
];
```

---

#### **Preloading Strategy**

```typescript
// filepath: src/app/core/strategies/custom-preload.strategy.ts

import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CustomPreloadStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        // Precargar solo rutas marcadas
        if (route.data && route.data['preload']) {
            const delay = route.data['delay'] || 0;
            console.log(`Preloading: ${route.path} with delay ${delay}ms`);
            return timer(delay).pipe(mergeMap(() => load()));
        }
        return of(null);
    }
}

// Configuración en app.config.ts:
// provideRouter(routes, withPreloading(CustomPreloadStrategy))

// Uso en rutas:
// { path: 'dashboard', loadComponent: ..., data: { preload: true, delay: 2000 } }
```

---

### **FASE 3: CHANGE DETECTION OPTIMIZATION** ⚡

#### **OnPush Change Detection**

**❌ ANTES (Default Change Detection):**
```typescript
@Component({
    selector: 'app-products',
    // Change detection ejecutándose constantemente
})
export class ProductsComponent {
    products: Product[] = [];
}
```

**✅ DESPUÉS (OnPush):**
```typescript
// filepath: src/app/pages/products/products.component.ts

import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
    selector: 'app-products',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush, // 🚀 Performance boost
    // ...
})
export class ProductsComponent {
    // Usar Signals (mejor performance automática)
    products = signal<Product[]>([]);
    selectedProduct = signal<Product | null>(null);
    loading = signal(false);
    
    // Computed signals (memoizados automáticamente)
    activeProducts = computed(() => 
        this.products().filter(p => p.status === 'active')
    );
    
    totalValue = computed(() =>
        this.products().reduce((sum, p) => sum + p.price * p.stock, 0)
    );
}
```

---

#### **Detectar Cambios Manualmente**

```typescript
import { ChangeDetectorRef, inject } from '@angular/core';

export class MyComponent {
    private cdr = inject(ChangeDetectorRef);
    
    heavyOperation(): void {
        // Detener detección de cambios
        this.cdr.detach();
        
        // Operación pesada
        this.processData();
        
        // Reactivar y actualizar una vez
        this.cdr.detectChanges();
        this.cdr.reattach();
    }
}
```

---

### **FASE 4: VIRTUAL SCROLLING** 📜

**Para listas grandes (1000+ elementos):**

```typescript
// filepath: src/app/pages/products-virtual/products-virtual.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

interface Product {
    id: number;
    name: string;
    price: number;
    status: string;
}

@Component({
    selector: 'app-products-virtual',
    standalone: true,
    imports: [CommonModule, ScrollingModule, CardModule, TagModule],
    template: `
        <div class="card">
            <h2>Productos ({{products().length}} total)</h2>
            
            <!-- Virtual Scroll Container -->
            <cdk-virtual-scroll-viewport 
                [itemSize]="120" 
                class="virtual-scroll-container">
                
                <div *cdkVirtualFor="let product of products(); trackBy: trackByFn"
                     class="virtual-item">
                    <p-card>
                        <div class="flex justify-content-between align-items-center">
                            <div>
                                <h4 class="mb-2">{{product.name}}</h4>
                                <p class="text-600">ID: {{product.id}}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-2xl font-bold mb-2">
                                    {{product.price | currency}}
                                </p>
                                <p-tag [value]="product.status" />
                            </div>
                        </div>
                    </p-card>
                </div>
                
            </cdk-virtual-scroll-viewport>
        </div>
    `,
    styles: [`
        .virtual-scroll-container {
            height: 600px;
            border: 1px solid var(--surface-border);
            border-radius: 6px;
        }
        
        .virtual-item {
            padding: 0.5rem;
        }
    `]
})
export class ProductsVirtualComponent {
    products = signal<Product[]>([]);
    
    constructor() {
        // Generar 10,000 productos de prueba
        const mockProducts: Product[] = [];
        for (let i = 1; i <= 10000; i++) {
            mockProducts.push({
                id: i,
                name: `Producto ${i}`,
                price: Math.random() * 1000,
                status: i % 3 === 0 ? 'Inactivo' : 'Activo'
            });
        }
        this.products.set(mockProducts);
    }
    
    trackByFn(index: number, item: Product): number {
        return item.id; // Importante para performance
    }
}
```

---

#### **Virtual Scroll en PrimeNG Table**

```typescript
// filepath: src/app/pages/customers-virtual/customers-virtual.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-customers-virtual',
    standalone: true,
    imports: [CommonModule, TableModule, TagModule],
    template: `
        <p-table 
            [value]="customers()" 
            [scrollable]="true" 
            scrollHeight="600px"
            [virtualScroll]="true"
            [virtualScrollItemSize]="50"
            [rows]="100"
            [lazy]="false">
            
            <ng-template pTemplate="header">
                <tr>
                    <th style="width: 80px">ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Ciudad</th>
                    <th>Estado</th>
                </tr>
            </ng-template>
            
            <ng-template pTemplate="body" let-customer>
                <tr>
                    <td>{{customer.id}}</td>
                    <td>{{customer.name}}</td>
                    <td>{{customer.email}}</td>
                    <td>{{customer.city}}</td>
                    <td>
                        <p-tag [value]="customer.status" 
                               [severity]="customer.status === 'Activo' ? 'success' : 'warning'" />
                    </td>
                </tr>
            </ng-template>
        </p-table>
    `
})
export class CustomersVirtualComponent {
    customers = signal<any[]>([]);
    
    constructor() {
        // Generar 50,000 clientes
        const mockCustomers = [];
        for (let i = 1; i <= 50000; i++) {
            mockCustomers.push({
                id: i,
                name: `Cliente ${i}`,
                email: `cliente${i}@example.com`,
                city: `Ciudad ${i % 100}`,
                status: i % 4 === 0 ? 'Inactivo' : 'Activo'
            });
        }
        this.customers.set(mockCustomers);
    }
}
```

---

### **FASE 5: MEMOIZACIÓN Y PIPES PUROS** 🧠

#### **Memoizar Funciones Costosas**

```typescript
// filepath: src/app/core/utils/memoize.ts

export function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map<string, ReturnType<T>>();
    
    return ((...args: Parameters<T>): ReturnType<T> => {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('📦 Cache hit');
            return cache.get(key)!;
        }
        
        console.log('🔄 Computing...');
        const result = fn(...args);
        cache.set(key, result);
        return result;
    }) as T;
}

// Uso:
const expensiveCalculation = memoize((a: number, b: number) => {
    // Operación costosa
    return a * b * Math.random();
});

console.log(expensiveCalculation(5, 10)); // Computing...
console.log(expensiveCalculation(5, 10)); // Cache hit (mismo resultado)
```

---

#### **Pipe Puro para Filtrado**

```typescript
// filepath: src/app/core/pipes/filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    standalone: true,
    pure: true // Solo se ejecuta cuando cambian los inputs
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string, field: string): any[] {
        if (!items || !searchText) {
            return items;
        }
        
        searchText = searchText.toLowerCase();
        return items.filter(item => 
            item[field]?.toLowerCase().includes(searchText)
        );
    }
}

// Uso en template:
// <div *ngFor="let product of products | filter:searchTerm:'name'">
```

---

### **FASE 6: IMAGE OPTIMIZATION** 🖼️

#### **Lazy Loading de Imágenes**

```html
<!-- Imagen nativa con lazy loading -->
<img [src]="product.image" 
     [alt]="product.name" 
     loading="lazy"
     class="w-full" />

<!-- Directiva personalizada -->
<img appLazyLoad 
     [src]="product.image" 
     [alt]="product.name" />
```

```typescript
// filepath: src/app/core/directives/lazy-load.directive.ts

import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appLazyLoad]',
    standalone: true
})
export class LazyLoadDirective implements OnInit {
    @Input() src!: string;
    
    constructor(private el: ElementRef) {}
    
    ngOnInit(): void {
        const img = this.el.nativeElement as HTMLImageElement;
        
        // Placeholder mientras carga
        img.src = 'assets/images/placeholder.png';
        
        // Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    img.src = this.src;
                    observer.unobserve(img);
                }
            });
        });
        
        observer.observe(img);
    }
}
```

---

### **FASE 7: BUNDLE SIZE OPTIMIZATION** 📦

#### **Análisis de Bundle**

```bash
# Analizar tamaño de bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

#### **Tree Shaking Correcto**

**❌ MAL (Importa toda la librería):**
```typescript
import * as _ from 'lodash';
_.debounce(...);
```

**✅ BIEN (Importa solo lo necesario):**
```typescript
import { debounce } from 'lodash-es';
debounce(...);
```

---

#### **Remover Imports No Usados**

```typescript
// filepath: .eslintrc.json

{
  "rules": {
    "no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }]
  }
}
```

---

### **FASE 8: HTTP OPTIMIZATION** 🌐

#### **Caché de Peticiones HTTP**

```typescript
// filepath: src/app/core/interceptors/cache.interceptor.ts

import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

const cache = new Map<string, HttpResponse<any>>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
    // Solo cachear GET requests
    if (req.method !== 'GET') {
        return next(req);
    }
    
    // Verificar si está en caché
    const cachedResponse = cache.get(req.url);
    if (cachedResponse) {
        console.log(`📦 Cache hit: ${req.url}`);
        return of(cachedResponse.clone());
    }
    
    // Si no está en caché, hacer request y guardar
    return next(req).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                cache.set(req.url, event.clone());
                
                // Limpiar caché después de CACHE_DURATION
                setTimeout(() => cache.delete(req.url), CACHE_DURATION);
            }
        })
    );
};
```

---

#### **Cancelar Peticiones Antiguas**

```typescript
// filepath: src/app/pages/search/search.component.ts

import { Component, signal, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-search',
    // ...
})
export class SearchComponent {
    private productService = inject(ProductService);
    private searchSubject = new Subject<string>();
    
    results = signal<any[]>([]);
    
    constructor() {
        // Cancelar búsquedas antiguas automáticamente
        this.searchSubject.pipe(
            debounceTime(300), // Esperar 300ms después de escribir
            distinctUntilChanged(), // Solo si cambió el valor
            switchMap(term => this.productService.search(term)) // Cancelar request anterior
        ).subscribe(results => {
            this.results.set(results);
        });
    }
    
    onSearch(term: string): void {
        this.searchSubject.next(term);
    }
}
```

---

### **FASE 9: RENDER OPTIMIZATION** 🎨

#### **TrackBy en ngFor**

**❌ SIN trackBy (re-renderiza todo):**
```html
<div *ngFor="let product of products()">
    {{product.name}}
</div>
```

**✅ CON trackBy (solo renderiza cambios):**
```html
<div *ngFor="let product of products(); trackBy: trackById">
    {{product.name}}
</div>
```

```typescript
trackById(index: number, item: any): number {
    return item.id;
}
```

---

#### **Evitar Funciones en Templates**

**❌ MAL (se ejecuta en cada change detection):**
```html
<div>Total: {{calculateTotal()}}</div>
```

**✅ BIEN (computed signal, memoizado):**
```typescript
total = computed(() => 
    this.products().reduce((sum, p) => sum + p.price, 0)
);
```

```html
<div>Total: {{total()}}</div>
```

---

### **FASE 10: COMPONENTE OPTIMIZADO COMPLETO** 🏆

```typescript
// filepath: src/app/pages/optimized-dashboard/optimized-dashboard.component.ts

import { Component, ChangeDetectionStrategy, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';

import { DashboardService } from '../../services/dashboard.service';
import { PerformanceMonitor } from '../../core/utils/performance-monitor';

@Component({
    selector: 'app-optimized-dashboard',
    standalone: true,
    imports: [CommonModule, CardModule, TableModule, ChartModule],
    changeDetection: ChangeDetectionStrategy.OnPush, // 🚀 OnPush
    template: `
        <div class="grid">
            <!-- Métricas -->
            @for (metric of metrics(); track metric.id) {
                <div class="col-12 sm:col-6 lg:col-3">
                    <p-card>
                        <h4>{{metric.title}}</h4>
                        <p class="text-3xl font-bold">{{metric.value}}</p>
                    </p-card>
                </div>
            }
            
            <!-- Chart -->
            <div class="col-12 lg:col-8">
                <p-card header="Ventas">
                    <p-chart type="line" 
                             [data]="chartData()" 
                             [options]="chartOptions" />
                </p-card>
            </div>
            
            <!-- Tabla con virtual scroll -->
            <div class="col-12">
                <p-card header="Transacciones ({{totalTransactions()}} total)">
                    <p-table 
                        [value]="transactions()" 
                        [scrollable]="true"
                        scrollHeight="400px"
                        [virtualScroll]="true"
                        [virtualScrollItemSize]="50"
                        [rows]="50"
                        [lazy]="false">
                        
                        <ng-template pTemplate="header">
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                            </tr>
                        </ng-template>
                        
                        <ng-template pTemplate="body" let-transaction>
                            <tr>
                                <td>{{transaction.id}}</td>
                                <td>{{transaction.customer}}</td>
                                <td>{{transaction.amount | currency}}</td>
                                <td>{{transaction.date | date}}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </p-card>
            </div>
        </div>
    `
})
export class OptimizedDashboardComponent implements OnInit {
    private dashboardService = inject(DashboardService);
    
    // Signals (cambios reactivos optimizados)
    metrics = signal<any[]>([]);
    transactions = signal<any[]>([]);
    
    // Computed signals (memoizados automáticamente)
    totalTransactions = computed(() => this.transactions().length);
    chartData = computed(() => this.buildChartData());
    
    chartOptions = {
        maintainAspectRatio: false,
        responsive: true
    };
    
    ngOnInit(): void {
        PerformanceMonitor.measure('Load Dashboard', () => {
            this.loadData();
        });
    }
    
    private loadData(): void {
        // Cargar métricas
        this.dashboardService.getMetrics().subscribe(data => {
            this.metrics.set(data);
        });
        
        // Cargar transacciones (muchas)
        this.dashboardService.getTransactions().subscribe(data => {
            this.transactions.set(data);
        });
    }
    
    private buildChartData(): any {
        return {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Ventas',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: '#3B82F6'
            }]
        };
    }
}
```

---

## ✅ CHECKLIST DE VALIDACIÓN

### **Lazy Loading**
- [ ] Rutas con lazy loading (`loadComponent`, `loadChildren`)
- [ ] Preloading strategy configurado
- [ ] Módulos pesados cargados bajo demanda

### **Change Detection**
- [ ] OnPush en componentes donde sea posible
- [ ] Signals en lugar de propiedades mutables
- [ ] Computed signals para valores derivados

### **Listas Grandes**
- [ ] Virtual scroll en tablas > 100 registros
- [ ] TrackBy en todos los `*ngFor`
- [ ] Paginación para datasets enormes

### **HTTP**
- [ ] Caché de requests GET
- [ ] Cancelación de requests con switchMap
- [ ] Debounce en búsquedas (300ms)

### **Bundle**
- [ ] Tree shaking correcto
- [ ] Sin imports duplicados
- [ ] Análisis de bundle realizado
- [ ] Bundle principal < 500KB

### **General**
- [ ] Imágenes con lazy loading
- [ ] Sin funciones en templates
- [ ] Pipes puros donde sea posible
- [ ] Performance monitoring activo

---

## 🎯 OBJETIVO FINAL

Lograr una aplicación:
1. **Rápida:** Carga inicial < 3s
2. **Fluida:** 60 FPS en interacciones
3. **Escalable:** Soporta miles de registros
4. **Eficiente:** Bundle optimizado
5. **Monitoreable:** Métricas de performance

Con mejoras de **30-70% en velocidad** aplicando estas técnicas. ⚡
