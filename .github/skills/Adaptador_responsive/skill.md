# SKILL: ADAPTADOR RESPONSIVE

## 🎯 PROPÓSITO
Analizar componentes y vistas Desktop-first para transformarlos en Mobile-first, asegurando una experiencia perfecta en todos los dispositivos mediante PrimeFlex, media queries adaptativas y componentes responsive de PrimeNG.

---

## 🔍 CUÁNDO USAR ESTE SKILL

**Activar cuando el usuario:**
- Pide "hacer responsive este componente"
- Solicita "adaptar para móvil"
- Dice "necesito mobile-first"
- Pregunta "¿funciona en tablets?"
- Menciona "responsive", "breakpoints", "mobile", "tablet"
- Pide "ajustar para diferentes pantallas"

**Ejemplos de disparadores:**
```
✅ "Adapta esta tabla para móvil"
✅ "Haz responsive el dashboard"
✅ "Necesito que funcione en tablets"
✅ "Convierte a mobile-first"
✅ "La vista se ve mal en pantallas pequeñas"
✅ "Optimiza para todas las resoluciones"
```

---

## 📋 PROTOCOLO DE IMPLEMENTACIÓN

### **FASE 1: ANÁLISIS** 🔍

Identificar elementos no responsive:

```
🔴 PROBLEMAS COMUNES:
1. Grids fijos sin breakpoints
2. Tablas sin scroll horizontal
3. Menús no colapsables
4. Formularios anchos fijos
5. Cards sin ajuste de columnas
6. Imágenes sin max-width
7. Diálogos que exceden viewport
8. Navegación sin hamburger menu
```

---

### **FASE 2: BREAKPOINTS DE PRIMEFLEX** 📱

PrimeFlex usa estos breakpoints (mismo sistema que PrimeNG):

```scss
// Breakpoints estándar
sm: 576px   // Smartphones
md: 768px   // Tablets
lg: 992px   // Laptops
xl: 1200px  // Desktops
xxl: 1400px // Large desktops
```

**Sistema de Grid Responsive:**

```html
<!-- Mobile-first approach -->
<div class="grid">
    <!-- Por defecto 12 cols (mobile), 6 en tablet, 4 en desktop -->
    <div class="col-12 md:col-6 lg:col-4">
        <p-card>Contenido</p-card>
    </div>
    <div class="col-12 md:col-6 lg:col-4">
        <p-card>Contenido</p-card>
    </div>
    <div class="col-12 md:col-6 lg:col-4">
        <p-card>Contenido</p-card>
    </div>
</div>
```

---

### **FASE 3: TRANSFORMACIONES COMUNES** 🔄

#### **1. Tablas Responsive**

**❌ ANTES (Desktop-only):**
```html
<p-table [value]="products">
    <ng-template pTemplate="header">
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product>
        <tr>
            <td>{{product.id}}</td>
            <td>{{product.name}}</td>
            <td>{{product.category}}</td>
            <td>{{product.price | currency}}</td>
            <td>{{product.stock}}</td>
            <td><p-tag [value]="product.status" /></td>
            <td>
                <p-button icon="pi pi-pencil" class="mr-2" />
                <p-button icon="pi pi-trash" severity="danger" />
            </td>
        </tr>
    </ng-template>
</p-table>
```

**✅ DESPUÉS (Mobile-first):**
```html
<!-- En desktop: tabla normal. En mobile: cards -->
<div class="hidden lg:block">
    <p-table [value]="products()" [paginator]="true" [rows]="10">
        <ng-template pTemplate="header">
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr>
                <td>{{product.id}}</td>
                <td>{{product.name}}</td>
                <td>{{product.category}}</td>
                <td>{{product.price | currency}}</td>
                <td>{{product.stock}}</td>
                <td><p-tag [value]="product.status" /></td>
                <td>
                    <p-button icon="pi pi-pencil" class="mr-2" />
                    <p-button icon="pi pi-trash" severity="danger" />
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>

<!-- Vista móvil con cards -->
<div class="lg:hidden">
    <div class="grid">
        @for (product of products(); track product.id) {
            <div class="col-12">
                <p-card>
                    <div class="flex justify-content-between align-items-center mb-3">
                        <span class="text-xl font-bold">{{product.name}}</span>
                        <p-tag [value]="product.status" />
                    </div>
                    
                    <div class="grid">
                        <div class="col-6">
                            <div class="text-500 mb-1">ID</div>
                            <div class="font-medium">{{product.id}}</div>
                        </div>
                        <div class="col-6">
                            <div class="text-500 mb-1">Categoría</div>
                            <div class="font-medium">{{product.category}}</div>
                        </div>
                        <div class="col-6">
                            <div class="text-500 mb-1">Precio</div>
                            <div class="font-medium">{{product.price | currency}}</div>
                        </div>
                        <div class="col-6">
                            <div class="text-500 mb-1">Stock</div>
                            <div class="font-medium">{{product.stock}}</div>
                        </div>
                    </div>
                    
                    <div class="flex gap-2 mt-3">
                        <p-button label="Editar" icon="pi pi-pencil" class="flex-1" />
                        <p-button label="Eliminar" icon="pi pi-trash" 
                                  severity="danger" class="flex-1" />
                    </div>
                </p-card>
            </div>
        }
    </div>
</div>
```

---

#### **2. Dashboard Adaptativo**

**❌ ANTES:**
```html
<div class="grid">
    <div class="col-3">
        <app-metric-card [title]="'Ventas'" [value]="1250" />
    </div>
    <div class="col-3">
        <app-metric-card [title]="'Usuarios'" [value]="420" />
    </div>
    <div class="col-3">
        <app-metric-card [title]="'Pedidos'" [value]="180" />
    </div>
    <div class="col-3">
        <app-metric-card [title]="'Ingresos'" [value]="45000" />
    </div>
</div>
```

**✅ DESPUÉS:**
```html
<div class="grid">
    <!-- 1 col móvil, 2 tablet, 4 desktop -->
    <div class="col-12 sm:col-6 lg:col-3">
        <app-metric-card [title]="'Ventas'" [value]="1250" 
                         [icon]="'pi-shopping-cart'" />
    </div>
    <div class="col-12 sm:col-6 lg:col-3">
        <app-metric-card [title]="'Usuarios'" [value]="420" 
                         [icon]="'pi-users'" />
    </div>
    <div class="col-12 sm:col-6 lg:col-3">
        <app-metric-card [title]="'Pedidos'" [value]="180" 
                         [icon]="'pi-box'" />
    </div>
    <div class="col-12 sm:col-6 lg:col-3">
        <app-metric-card [title]="'Ingresos'" [value]="45000" 
                         [icon]="'pi-dollar'" />
    </div>
</div>
```

---

#### **3. Formularios Adaptativos**

**❌ ANTES:**
```html
<div class="grid formgrid p-fluid">
    <div class="col-4">
        <label>Nombre</label>
        <input pInputText formControlName="name" />
    </div>
    <div class="col-4">
        <label>Email</label>
        <input pInputText formControlName="email" />
    </div>
    <div class="col-4">
        <label>Teléfono</label>
        <input pInputText formControlName="phone" />
    </div>
</div>
```

**✅ DESPUÉS:**
```html
<div class="grid formgrid p-fluid">
    <!-- Adaptación progresiva: móvil 1 col, tablet 2 cols, desktop 3 cols -->
    <div class="col-12 md:col-6 lg:col-4">
        <label for="name" class="block mb-2">Nombre</label>
        <input pInputText id="name" formControlName="name" />
    </div>
    <div class="col-12 md:col-6 lg:col-4">
        <label for="email" class="block mb-2">Email</label>
        <input pInputText id="email" type="email" formControlName="email" />
    </div>
    <div class="col-12 md:col-6 lg:col-4">
        <label for="phone" class="block mb-2">Teléfono</label>
        <input pInputText id="phone" formControlName="phone" />
    </div>
</div>
```

---

#### **4. Diálogos Responsive**

**❌ ANTES:**
```typescript
showDialog() {
    this.visible.set(true);
}
```

```html
<p-dialog header="Editar Producto" [(visible)]="visible" [modal]="true">
    <!-- Contenido -->
</p-dialog>
```

**✅ DESPUÉS:**
```typescript
isMobile = signal(false);

constructor() {
    // Detectar mobile
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
}

private checkMobile(): void {
    this.isMobile.set(window.innerWidth < 768);
}
```

```html
<p-dialog header="Editar Producto" 
          [(visible)]="visible" 
          [modal]="true"
          [style]="isMobile() ? {width: '95vw'} : {width: '50vw'}"
          [breakpoints]="{'960px': '75vw', '640px': '95vw'}">
    <!-- Contenido -->
</p-dialog>
```

---

#### **5. Sidebar Responsive**

**Componente con sidebar adaptativo:**

```typescript
// filepath: src/app/pages/products/products.component.ts

import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, SidebarModule, ButtonModule, CardModule],
    template: `
        <div class="grid">
            <!-- Sidebar para filtros -->
            <!-- En desktop: siempre visible. En mobile: overlay -->
            <div class="col-12 lg:col-3">
                <!-- Desktop -->
                <div class="hidden lg:block">
                    <p-card header="Filtros">
                        <app-product-filters />
                    </p-card>
                </div>
                
                <!-- Mobile -->
                <div class="lg:hidden">
                    <p-button label="Filtros" 
                              icon="pi pi-filter" 
                              (onClick)="showFilters.set(true)"
                              class="mb-3 w-full" />
                    
                    <p-sidebar [(visible)]="showFilters" 
                               [position]="'left'"
                               [fullScreen]="isMobile()">
                        <ng-template pTemplate="header">
                            <span class="font-bold">Filtros</span>
                        </ng-template>
                        <app-product-filters />
                    </p-sidebar>
                </div>
            </div>
            
            <!-- Contenido principal -->
            <div class="col-12 lg:col-9">
                <div class="grid">
                    @for (product of products(); track product.id) {
                        <div class="col-12 sm:col-6 xl:col-4">
                            <p-card>
                                <img [src]="product.image" 
                                     alt="{{product.name}}"
                                     class="w-full border-round" />
                                <div class="mt-3">
                                    <h4>{{product.name}}</h4>
                                    <p class="text-xl font-bold">
                                        {{product.price | currency}}
                                    </p>
                                </div>
                            </p-card>
                        </div>
                    }
                </div>
            </div>
        </div>
    `
})
export class ProductsComponent {
    showFilters = signal(false);
    isMobile = signal(window.innerWidth < 768);
    products = signal<any[]>([]);
    
    constructor() {
        window.addEventListener('resize', () => {
            this.isMobile.set(window.innerWidth < 768);
        });
    }
}
```

---

### **FASE 4: UTILIDADES PRIMEFLEX** 🛠️

#### **Display Responsive**

```html
<!-- Mostrar/ocultar según breakpoint -->
<div class="hidden lg:block">Solo en desktop</div>
<div class="block lg:hidden">Solo en mobile/tablet</div>

<div class="hidden md:block">Desktop y tablet</div>
<div class="block md:hidden">Solo mobile</div>
```

#### **Spacing Responsive**

```html
<!-- Padding adaptativo -->
<div class="p-2 md:p-4 lg:p-6">
    Contenido con padding progresivo
</div>

<!-- Margin adaptativo -->
<div class="mb-2 md:mb-4 lg:mb-6">
    Contenido con margin progresivo
</div>

<!-- Gap en flex -->
<div class="flex gap-2 md:gap-4 lg:gap-6">
    <div>Item 1</div>
    <div>Item 2</div>
</div>
```

#### **Typography Responsive**

```html
<!-- Tamaños de texto adaptativos -->
<h1 class="text-2xl md:text-4xl lg:text-6xl">
    Título responsive
</h1>

<p class="text-sm md:text-base lg:text-lg">
    Texto responsive
</p>
```

#### **Flex Direction Responsive**

```html
<!-- En mobile: vertical, en desktop: horizontal -->
<div class="flex flex-column lg:flex-row gap-3">
    <div class="flex-1">Columna 1</div>
    <div class="flex-1">Columna 2</div>
    <div class="flex-1">Columna 3</div>
</div>
```

---

### **FASE 5: COMPONENTE DE EJEMPLO COMPLETO** 📦

```typescript
// filepath: src/app/pages/dashboard-responsive/dashboard-responsive.component.ts

import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent, debounceTime } from 'rxjs';

import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';

interface MetricCard {
    title: string;
    value: number;
    icon: string;
    trend: number;
    color: string;
}

@Component({
    selector: 'app-dashboard-responsive',
    standalone: true,
    imports: [
        CommonModule,
        CardModule,
        ChartModule,
        TableModule,
        ButtonModule,
        TagModule,
        MenuModule,
        SidebarModule
    ],
    template: `
        <div class="grid">
            <!-- Header con título y acciones -->
            <div class="col-12">
                <div class="flex flex-column md:flex-row justify-content-between align-items-start md:align-items-center gap-3 mb-3">
                    <div>
                        <h1 class="text-3xl font-bold m-0">Dashboard</h1>
                        <p class="text-500 mt-2">Vista general del sistema</p>
                    </div>
                    
                    <!-- Menú de acciones -->
                    <div class="flex gap-2 w-full md:w-auto">
                        <p-button label="Exportar" 
                                  [label]="isMobile() ? '' : 'Exportar'"
                                  icon="pi pi-download" 
                                  outlined
                                  class="flex-1 md:flex-none" />
                        <p-button label="Configurar" 
                                  [label]="isMobile() ? '' : 'Configurar'"
                                  icon="pi pi-cog" 
                                  outlined
                                  class="flex-1 md:flex-none" />
                    </div>
                </div>
            </div>
            
            <!-- Métricas principales -->
            <div class="col-12">
                <div class="grid">
                    @for (metric of metrics(); track metric.title) {
                        <div class="col-12 sm:col-6 lg:col-3">
                            <p-card styleClass="h-full">
                                <div class="flex justify-content-between align-items-start">
                                    <div>
                                        <div class="text-500 mb-2">{{metric.title}}</div>
                                        <div class="text-3xl font-bold mb-2">
                                            {{metric.value | number}}
                                        </div>
                                        <div class="flex align-items-center gap-2">
                                            <i [class]="'pi pi-arrow-' + (metric.trend > 0 ? 'up' : 'down')"
                                               [class.text-green-500]="metric.trend > 0"
                                               [class.text-red-500]="metric.trend < 0"></i>
                                            <span [class.text-green-500]="metric.trend > 0"
                                                  [class.text-red-500]="metric.trend < 0">
                                                {{metric.trend > 0 ? '+' : ''}}{{metric.trend}}%
                                            </span>
                                        </div>
                                    </div>
                                    <div class="border-circle w-3rem h-3rem flex align-items-center justify-content-center"
                                         [style.backgroundColor]="metric.color + '20'">
                                        <i [class]="'pi ' + metric.icon + ' text-2xl'"
                                           [style.color]="metric.color"></i>
                                    </div>
                                </div>
                            </p-card>
                        </div>
                    }
                </div>
            </div>
            
            <!-- Gráficos -->
            <div class="col-12 lg:col-8">
                <p-card header="Ventas Mensuales">
                    <p-chart type="line" 
                             [data]="chartData()" 
                             [options]="chartOptions()"
                             [responsive]="true" />
                </p-card>
            </div>
            
            <div class="col-12 lg:col-4">
                <p-card header="Distribución">
                    <p-chart type="doughnut" 
                             [data]="doughnutData()" 
                             [options]="doughnutOptions()"
                             [responsive]="true" />
                </p-card>
            </div>
            
            <!-- Tabla / Lista responsive -->
            <div class="col-12">
                <p-card>
                    <ng-template pTemplate="header">
                        <div class="flex justify-content-between align-items-center p-3">
                            <span class="font-bold text-xl">Últimas Transacciones</span>
                            <p-button icon="pi pi-refresh" 
                                      [text]="true" 
                                      (onClick)="loadTransactions()" />
                        </div>
                    </ng-template>
                    
                    <!-- Vista Desktop -->
                    <div class="hidden md:block">
                        <p-table [value]="transactions()" 
                                 [paginator]="true" 
                                 [rows]="5"
                                 [responsive]="true">
                            <ng-template pTemplate="header">
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Monto</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </ng-template>
                            <ng-template pTemplate="body" let-transaction>
                                <tr>
                                    <td>{{transaction.id}}</td>
                                    <td>{{transaction.customer}}</td>
                                    <td>{{transaction.amount | currency}}</td>
                                    <td>
                                        <p-tag [value]="transaction.status" 
                                               [severity]="getStatusSeverity(transaction.status)" />
                                    </td>
                                    <td>{{transaction.date | date:'short'}}</td>
                                    <td>
                                        <p-button icon="pi pi-eye" [text]="true" />
                                    </td>
                                </tr>
                            </ng-template>
                        </p-table>
                    </div>
                    
                    <!-- Vista Mobile -->
                    <div class="md:hidden">
                        @for (transaction of paginatedTransactions(); track transaction.id) {
                            <div class="border-bottom-1 surface-border p-3">
                                <div class="flex justify-content-between align-items-center mb-2">
                                    <span class="font-bold">{{transaction.customer}}</span>
                                    <p-tag [value]="transaction.status" 
                                           [severity]="getStatusSeverity(transaction.status)" />
                                </div>
                                <div class="grid">
                                    <div class="col-6">
                                        <div class="text-500 text-sm">Monto</div>
                                        <div class="font-bold">{{transaction.amount | currency}}</div>
                                    </div>
                                    <div class="col-6">
                                        <div class="text-500 text-sm">Fecha</div>
                                        <div>{{transaction.date | date:'short'}}</div>
                                    </div>
                                </div>
                                <p-button label="Ver Detalles" 
                                          icon="pi pi-eye" 
                                          [text]="true"
                                          class="mt-2 w-full" />
                            </div>
                        }
                    </div>
                </p-card>
            </div>
        </div>
    `,
    styles: [`
        /* Asegurar que las charts sean responsive */
        :host ::ng-deep .p-chart {
            position: relative;
            height: 300px;
        }
        
        @media (max-width: 768px) {
            :host ::ng-deep .p-chart {
                height: 250px;
            }
        }
    `]
})
export class DashboardResponsiveComponent implements OnInit, OnDestroy {
    // Detección de dispositivo
    isMobile = signal(false);
    isTablet = signal(false);
    isDesktop = signal(false);
    
    // Datos
    metrics = signal<MetricCard[]>([
        { title: 'Ventas Totales', value: 12500, icon: 'pi-shopping-cart', trend: 12.5, color: '#3B82F6' },
        { title: 'Nuevos Usuarios', value: 420, icon: 'pi-users', trend: 8.3, color: '#10B981' },
        { title: 'Pedidos', value: 180, icon: 'pi-box', trend: -2.1, color: '#F59E0B' },
        { title: 'Ingresos', value: 45000, icon: 'pi-dollar', trend: 15.2, color: '#8B5CF6' }
    ]);
    
    transactions = signal<any[]>([]);
    paginatedTransactions = computed(() => this.transactions().slice(0, 5));
    
    chartData = signal<any>({});
    chartOptions = signal<any>({});
    doughnutData = signal<any>({});
    doughnutOptions = signal<any>({});
    
    private resizeSubscription: any;
    
    ngOnInit(): void {
        this.checkDevice();
        this.setupResizeListener();
        this.loadTransactions();
        this.setupCharts();
    }
    
    ngOnDestroy(): void {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    }
    
    /**
     * Detectar tipo de dispositivo
     */
    private checkDevice(): void {
        const width = window.innerWidth;
        this.isMobile.set(width < 768);
        this.isTablet.set(width >= 768 && width < 992);
        this.isDesktop.set(width >= 992);
    }
    
    /**
     * Escuchar cambios de tamaño
     */
    private setupResizeListener(): void {
        this.resizeSubscription = fromEvent(window, 'resize')
            .pipe(debounceTime(200))
            .subscribe(() => {
                this.checkDevice();
                this.setupCharts(); // Reconfigurar charts para nueva resolución
            });
    }
    
    /**
     * Configurar charts según dispositivo
     */
    private setupCharts(): void {
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
        
        // Chart de líneas
        this.chartData.set({
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Ventas 2024',
                    data: [12, 19, 3, 5, 2, 3],
                    fill: false,
                    borderColor: '#3B82F6',
                    tension: 0.4
                }
            ]
        });
        
        this.chartOptions.set({
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    display: !this.isMobile(), // Ocultar leyenda en móvil
                    labels: {
                        color: textColor,
                        font: {
                            size: this.isMobile() ? 10 : 12
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor,
                        font: {
                            size: this.isMobile() ? 9 : 11
                        }
                    },
                    grid: {
                        display: !this.isMobile()
                    }
                },
                y: {
                    ticks: {
                        color: textColor,
                        font: {
                            size: this.isMobile() ? 9 : 11
                        }
                    }
                }
            }
        });
        
        // Doughnut chart
        this.doughnutData.set({
            labels: ['Producto A', 'Producto B', 'Producto C'],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B']
            }]
        });
        
        this.doughnutOptions.set({
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    position: this.isMobile() ? 'bottom' : 'right',
                    labels: {
                        color: textColor,
                        font: {
                            size: this.isMobile() ? 10 : 12
                        }
                    }
                }
            }
        });
    }
    
    loadTransactions(): void {
        // Mock de transacciones
        this.transactions.set([
            { id: 'T001', customer: 'Juan Pérez', amount: 1250, status: 'Completado', date: new Date() },
            { id: 'T002', customer: 'María García', amount: 850, status: 'Pendiente', date: new Date() },
            { id: 'T003', customer: 'Carlos López', amount: 2100, status: 'Completado', date: new Date() },
            { id: 'T004', customer: 'Ana Martínez', amount: 670, status: 'Cancelado', date: new Date() },
            { id: 'T005', customer: 'Pedro Sánchez', amount: 1500, status: 'Completado', date: new Date() }
        ]);
    }
    
    getStatusSeverity(status: string): string {
        switch (status) {
            case 'Completado': return 'success';
            case 'Pendiente': return 'warning';
            case 'Cancelado': return 'danger';
            default: return 'info';
        }
    }
}
```

---

### **FASE 6: MEDIA QUERIES PERSONALIZADAS** 🎨

Para casos especiales que PrimeFlex no cubre:

```scss
// filepath: src/app/pages/custom/custom.component.scss

// Variables de breakpoints (mismas que PrimeFlex)
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;

.custom-layout {
    // Mobile first
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    // Tablet
    @media (min-width: $breakpoint-md) {
        flex-direction: row;
        gap: 1.5rem;
    }
    
    // Desktop
    @media (min-width: $breakpoint-lg) {
        gap: 2rem;
    }
}

.sidebar {
    width: 100%;
    
    @media (min-width: $breakpoint-lg) {
        width: 300px;
        position: sticky;
        top: 20px;
    }
}

.main-content {
    flex: 1;
}

// Touch targets más grandes en móvil
.action-button {
    min-height: 44px; // Recomendación iOS
    min-width: 44px;
    
    @media (min-width: $breakpoint-md) {
        min-height: 36px;
        min-width: auto;
    }
}

// Tipografía fluida
.responsive-title {
    font-size: clamp(1.5rem, 4vw, 3rem);
}

.responsive-text {
    font-size: clamp(0.875rem, 2vw, 1rem);
}
```

---

## ✅ CHECKLIST DE VALIDACIÓN

### **Mobile (< 768px)**
- [ ] Todo el contenido visible sin scroll horizontal
- [ ] Botones con tamaño táctil adecuado (min 44x44px)
- [ ] Forms en columna única
- [ ] Tablas convertidas a cards
- [ ] Menú hamburguesa funcional
- [ ] Imágenes responsive (max-width: 100%)

### **Tablet (768px - 992px)**
- [ ] Layout de 2 columnas donde sea apropiado
- [ ] Navegación adaptada
- [ ] Forms en 2 columnas
- [ ] Diálogos con ancho apropiado

### **Desktop (> 992px)**
- [ ] Layout completo visible
- [ ] Sidebars fijos (no overlay)
- [ ] Tablas completas
- [ ] Hover states funcionales

### **General**
- [ ] Sin contenido cortado en ninguna resolución
- [ ] Imágenes con aspect-ratio correcto
- [ ] Charts responsive
- [ ] Spacing consistente en todos los tamaños
- [ ] Performance (no re-renders innecesarios)

---

## 🎯 OBJETIVO FINAL

Lograr que **toda la aplicación se vea perfecta** en:
1. **📱 Móviles:** 320px - 767px
2. **📱 Tablets:** 768px - 991px  
3. **💻 Desktops:** 992px+

Con **experiencia fluida**, sin sacrificar funcionalidad, usando PrimeFlex como base y componentes adaptativos de PrimeNG.
