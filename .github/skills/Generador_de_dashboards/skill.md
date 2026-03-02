# SKILL: GENERADOR DE DASHBOARDS

## 🎯 PROPÓSITO
Generar dashboards profesionales y completos con métricas, gráficos, tablas y widgets siguiendo los patrones de Verona y PrimeNG. Incluye templates predefinidos y componentes reutilizables.

---

## 🔍 CUÁNDO USAR ESTE SKILL

**Activar cuando el usuario:**
- Pide "crea un dashboard de..."
- Solicita "necesito un panel de métricas"
- Dice "quiero visualizar estadísticas de..."
- Pregunta "¿cómo crear un dashboard para...?"
- Menciona "analytics", "reportes", "métricas", "KPIs"
- Pide "panel de administración"

**Ejemplos de disparadores:**
```
✅ "Crea un dashboard de ventas"
✅ "Necesito un dashboard de analytics"
✅ "Dashboard para administrador con métricas"
✅ "Panel de control para e-commerce"
✅ "Dashboard con gráficos de rendimiento"
✅ "Quiero visualizar estadísticas de usuarios"
```

---

## 📋 PROTOCOLO DE GENERACIÓN DE DASHBOARDS

### **FASE 1: IDENTIFICAR TIPO DE DASHBOARD** 🎯

Antes de generar, determinar el tipo:

#### **Tipo A: Analytics Dashboard** 📊
**Indicadores:**
- Métricas de tráfico web
- Estadísticas de uso
- Comportamiento de usuarios
- Conversiones

**Componentes principales:**
- Cards de métricas (visitantes, sesiones, bounce rate)
- Gráfico de líneas (tráfico en el tiempo)
- Gráfico de dona (fuentes de tráfico)
- Tabla de páginas top
- Mapa de calor (opcional)

---

#### **Tipo B: Sales Dashboard** 💰
**Indicadores:**
- Ventas totales
- Ingresos
- Productos vendidos
- Tendencias de ventas

**Componentes principales:**
- Cards de KPIs (ventas, ingresos, productos, clientes)
- Gráfico de líneas (tendencia mensual)
- Gráfico de barras (productos top)
- Tabla de últimas órdenes
- Timeline de actividad

---

#### **Tipo C: Admin Dashboard** 👥
**Indicadores:**
- Usuarios activos
- Nuevos registros
- Actividad del sistema
- Tareas pendientes

**Componentes principales:**
- Cards de estadísticas (usuarios, registros, tareas)
- Timeline de actividad reciente
- Tabla de usuarios recientes
- Gráfico de barras (registros por mes)
- Lista de tareas/notificaciones

---

#### **Tipo D: E-commerce Dashboard** 🛒
**Indicadores:**
- Productos
- Órdenes
- Ingresos
- Inventario

**Componentes principales:**
- Cards de métricas (productos, órdenes, ingresos, clientes)
- Gráfico de líneas (ventas diarias)
- Gráfico de barras (productos más vendidos)
- Tabla de órdenes recientes
- Gráfico de dona (categorías)

---

#### **Tipo E: Custom Dashboard** 🎨
**Indicadores:**
- Métricas personalizadas según necesidad del usuario

**Proceso:**
1. Preguntar al usuario qué métricas necesita
2. Identificar fuentes de datos
3. Seleccionar visualizaciones apropiadas
4. Generar componentes customizados

---

## 📚 BIBLIOTECA DE COMPONENTES PARA DASHBOARDS

### **1. CARDS DE MÉTRICAS** 📊

#### **Card Simple con Icono**

```typescript
// filepath: src/app/pages/[dashboard]/components/metric-card.component.ts

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MetricCard {
    title: string;
    value: string | number;
    icon: string;
    color: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

@Component({
    selector: 'app-metric-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="card mb-0">
            <div class="flex justify-content-between mb-3">
                <div>
                    <span class="block text-500 font-medium mb-3">
                        {{ data().title }}
                    </span>
                    <div class="text-900 font-medium text-xl">
                        {{ data().value }}
                    </div>
                </div>
                <div class="flex align-items-center justify-content-center border-round"
                     [ngClass]="'bg-' + data().color + '-100'"
                     [style.width]="'2.5rem'"
                     [style.height]="'2.5rem'">
                    <i [class]="'pi ' + data().icon + ' text-' + data().color + '-500 text-xl'"></i>
                </div>
            </div>
            <span *ngIf="data().trend" 
                  [class]="data().trend!.isPositive ? 'text-green-500' : 'text-red-500'"
                  class="font-medium">
                {{ data().trend!.isPositive ? '+' : '' }}{{ data().trend!.value }}%
            </span>
            <span *ngIf="data().trend" class="text-500">
                desde el mes pasado
            </span>
        </div>
    `
})
export class MetricCardComponent {
    data = input.required<MetricCard>();
}
```

**Uso:**
```html
<div class="grid">
    <div class="col-12 md:col-6 lg:col-3">
        <app-metric-card [data]="{
            title: 'Ventas',
            value: '$2,100',
            icon: 'pi-shopping-cart',
            color: 'blue',
            trend: { value: 24, isPositive: true }
        }" />
    </div>
    <div class="col-12 md:col-6 lg:col-3">
        <app-metric-card [data]="{
            title: 'Clientes',
            value: '1,245',
            icon: 'pi-users',
            color: 'green',
            trend: { value: 12, isPositive: true }
        }" />
    </div>
    <div class="col-12 md:col-6 lg:col-3">
        <app-metric-card [data]="{
            title: 'Productos',
            value: '456',
            icon: 'pi-box',
            color: 'orange',
            trend: { value: 5, isPositive: false }
        }" />
    </div>
    <div class="col-12 md:col-6 lg:col-3">
        <app-metric-card [data]="{
            title: 'Ingresos',
            value: '$45,678',
            icon: 'pi-dollar',
            color: 'cyan',
            trend: { value: 18, isPositive: true }
        }" />
    </div>
</div>
```

---

### **2. GRÁFICOS (CHART.JS + PRIMENG)** 📈

#### **Gráfico de Líneas - Tendencia**

```typescript
// En el componente del dashboard
import { ChartModule } from 'primeng/chart';

chartData = signal({
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
            label: 'Ventas 2024',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.4
        },
        {
            label: 'Ventas 2023',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#FFA726',
            tension: 0.4
        }
    ]
});

chartOptions = signal({
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
});
```

```html
<div class="card">
    <h5>Tendencia de Ventas</h5>
    <p-chart type="line" [data]="chartData()" [options]="chartOptions()" 
             [style]="{ height: '400px' }" />
</div>
```

---

#### **Gráfico de Barras - Comparación**

```typescript
barChartData = signal({
    labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D', 'Producto E'],
    datasets: [
        {
            label: 'Unidades Vendidas',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [65, 59, 80, 81, 56]
        }
    ]
});

barChartOptions = signal({
    indexAxis: 'y', // Barras horizontales
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
});
```

```html
<div class="card">
    <h5>Top 5 Productos</h5>
    <p-chart type="bar" [data]="barChartData()" [options]="barChartOptions()" 
             [style]="{ height: '400px' }" />
</div>
```

---

#### **Gráfico de Dona - Distribución**

```typescript
doughnutData = signal({
    labels: ['Orgánico', 'Directo', 'Referral', 'Social'],
    datasets: [
        {
            data: [300, 50, 100, 80],
            backgroundColor: [
                '#42A5F5',
                '#66BB6A',
                '#FFA726',
                '#26C6DA'
            ],
            hoverBackgroundColor: [
                '#64B5F6',
                '#81C784',
                '#FFB74D',
                '#4DD0E1'
            ]
        }
    ]
});

doughnutOptions = signal({
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    }
});
```

```html
<div class="card">
    <h5>Fuentes de Tráfico</h5>
    <p-chart type="doughnut" [data]="doughnutData()" [options]="doughnutOptions()" 
             [style]="{ height: '300px' }" />
</div>
```

---

### **3. TABLAS DE RESUMEN** 📋

```typescript
recentOrders = signal<Order[]>([
    { id: '1001', customer: 'Juan Pérez', date: '2024-01-15', amount: 250.00, status: 'Completado' },
    { id: '1002', customer: 'María García', date: '2024-01-14', amount: 180.50, status: 'Pendiente' },
    { id: '1003', customer: 'Carlos López', date: '2024-01-13', amount: 420.00, status: 'Completado' }
]);
```

```html
<div class="card">
    <h5>Últimas Órdenes</h5>
    <p-table [value]="recentOrders()" [paginator]="false" responsiveLayout="scroll">
        <ng-template pTemplate="header">
            <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Estado</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-order>
            <tr>
                <td>{{ order.id }}</td>
                <td>{{ order.customer }}</td>
                <td>{{ order.date | date:'dd/MM/yyyy' }}</td>
                <td>{{ order.amount | currency }}</td>
                <td>
                    <p-tag [value]="order.status" 
                           [severity]="order.status === 'Completado' ? 'success' : 'warning'" />
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>
```

---

### **4. TIMELINE DE ACTIVIDAD** ⏰

```typescript
import { TimelineModule } from 'primeng/timeline';

activities = signal([
    { status: 'Nueva orden #1234', date: 'Hace 15 minutos', icon: 'pi-shopping-cart', color: 'blue' },
    { status: 'Pago procesado #1233', date: 'Hace 1 hora', icon: 'pi-check', color: 'green' },
    { status: 'Producto enviado #1232', date: 'Hace 2 horas', icon: 'pi-send', color: 'cyan' },
    { status: 'Nuevo usuario registrado', date: 'Hace 3 horas', icon: 'pi-user-plus', color: 'orange' }
]);
```

```html
<div class="card">
    <h5>Actividad Reciente</h5>
    <p-timeline [value]="activities()" align="alternate" styleClass="customized-timeline">
        <ng-template pTemplate="marker" let-activity>
            <span class="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
                  [ngClass]="'bg-' + activity.color + '-500'">
                <i [class]="activity.icon"></i>
            </span>
        </ng-template>
        <ng-template pTemplate="content" let-activity>
            <div class="text-900 font-medium mb-2">{{ activity.status }}</div>
            <div class="text-600 text-sm">{{ activity.date }}</div>
        </ng-template>
    </p-timeline>
</div>
```

---

## 🎨 TEMPLATES PREDEFINIDOS

### **TEMPLATE 1: ANALYTICS DASHBOARD** 📊

```typescript
// filepath: src/app/pages/analytics-dashboard/analytics-dashboard.component.ts

import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

import { AnalyticsService } from './analytics.service';

@Component({
    selector: 'app-analytics-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        ChartModule,
        CardModule,
        TableModule
    ],
    template: `
        <div class="grid">
            <!-- KPIs Row -->
            <div class="col-12">
                <h4 class="mb-4">Analytics Overview</h4>
            </div>
            
            <!-- Metric Cards -->
            <div class="col-12 md:col-6 lg:col-3">
                <div class="card mb-0">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block text-500 font-medium mb-3">Visitantes</span>
                            <div class="text-900 font-medium text-xl">{{ visitorsCount() }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                             style="width:2.5rem;height:2.5rem">
                            <i class="pi pi-users text-blue-500 text-xl"></i>
                        </div>
                    </div>
                    <span class="text-green-500 font-medium">+{{ visitorsTrend() }}% </span>
                    <span class="text-500">vs mes anterior</span>
                </div>
            </div>
            
            <div class="col-12 md:col-6 lg:col-3">
                <div class="card mb-0">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block text-500 font-medium mb-3">Sesiones</span>
                            <div class="text-900 font-medium text-xl">{{ sessionsCount() }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                             style="width:2.5rem;height:2.5rem">
                            <i class="pi pi-chart-line text-orange-500 text-xl"></i>
                        </div>
                    </div>
                    <span class="text-green-500 font-medium">+{{ sessionsTrend() }}% </span>
                    <span class="text-500">vs mes anterior</span>
                </div>
            </div>
            
            <div class="col-12 md:col-6 lg:col-3">
                <div class="card mb-0">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block text-500 font-medium mb-3">Bounce Rate</span>
                            <div class="text-900 font-medium text-xl">{{ bounceRate() }}%</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-cyan-100 border-round"
                             style="width:2.5rem;height:2.5rem">
                            <i class="pi pi-arrow-circle-down text-cyan-500 text-xl"></i>
                        </div>
                    </div>
                    <span class="text-red-500 font-medium">-{{ bounceRateTrend() }}% </span>
                    <span class="text-500">vs mes anterior</span>
                </div>
            </div>
            
            <div class="col-12 md:col-6 lg:col-3">
                <div class="card mb-0">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block text-500 font-medium mb-3">Conversiones</span>
                            <div class="text-900 font-medium text-xl">{{ conversionsCount() }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-green-100 border-round"
                             style="width:2.5rem;height:2.5rem">
                            <i class="pi pi-check-circle text-green-500 text-xl"></i>
                        </div>
                    </div>
                    <span class="text-green-500 font-medium">+{{ conversionsTrend() }}% </span>
                    <span class="text-500">vs mes anterior</span>
                </div>
            </div>
            
            <!-- Charts Row -->
            <div class="col-12 lg:col-8">
                <div class="card">
                    <h5>Tráfico en el Tiempo</h5>
                    <p-chart type="line" [data]="trafficChartData()" [options]="chartOptions()" 
                             [style]="{ height: '400px' }" />
                </div>
            </div>
            
            <div class="col-12 lg:col-4">
                <div class="card">
                    <h5>Fuentes de Tráfico</h5>
                    <p-chart type="doughnut" [data]="sourceChartData()" [options]="doughnutOptions()" 
                             [style]="{ height: '400px' }" />
                </div>
            </div>
            
            <!-- Table Row -->
            <div class="col-12">
                <div class="card">
                    <h5>Páginas Más Visitadas</h5>
                    <p-table [value]="topPages()" [paginator]="true" [rows]="5" responsiveLayout="scroll">
                        <ng-template pTemplate="header">
                            <tr>
                                <th>Página</th>
                                <th>Visitas</th>
                                <th>Tiempo Promedio</th>
                                <th>Bounce Rate</th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-page>
                            <tr>
                                <td>{{ page.path }}</td>
                                <td>{{ page.visits }}</td>
                                <td>{{ page.avgTime }}</td>
                                <td>{{ page.bounceRate }}%</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </div>
        </div>
    `
})
export class AnalyticsDashboardComponent implements OnInit {
    private analyticsService = inject(AnalyticsService);
    
    // Signals para métricas
    visitorsCount = signal(0);
    visitorsTrend = signal(0);
    sessionsCount = signal(0);
    sessionsTrend = signal(0);
    bounceRate = signal(0);
    bounceRateTrend = signal(0);
    conversionsCount = signal(0);
    conversionsTrend = signal(0);
    
    // Signals para gráficos
    trafficChartData = signal<any>({});
    sourceChartData = signal<any>({});
    topPages = signal<any[]>([]);
    
    chartOptions = signal({
        plugins: {
            legend: { labels: { color: '#495057' } }
        },
        scales: {
            x: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } },
            y: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } }
        }
    });
    
    doughnutOptions = signal({
        plugins: {
            legend: { labels: { color: '#495057' } }
        }
    });
    
    ngOnInit() {
        this.loadMetrics();
        this.loadCharts();
    }
    
    loadMetrics() {
        this.analyticsService.getMetrics().subscribe(data => {
            this.visitorsCount.set(data.visitors.count);
            this.visitorsTrend.set(data.visitors.trend);
            this.sessionsCount.set(data.sessions.count);
            this.sessionsTrend.set(data.sessions.trend);
            this.bounceRate.set(data.bounceRate.value);
            this.bounceRateTrend.set(data.bounceRate.trend);
            this.conversionsCount.set(data.conversions.count);
            this.conversionsTrend.set(data.conversions.trend);
        });
    }
    
    loadCharts() {
        this.analyticsService.getTrafficData().subscribe(data => {
            this.trafficChartData.set(data);
        });
        
        this.analyticsService.getSourceData().subscribe(data => {
            this.sourceChartData.set(data);
        });
        
        this.analyticsService.getTopPages().subscribe(data => {
            this.topPages.set(data);
        });
    }
}
```

---

### **TEMPLATE 2: SALES DASHBOARD** 💰

```typescript
// filepath: src/app/pages/sales-dashboard/sales-dashboard.component.ts

import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';

import { SalesService } from './sales.service';

@Component({
    selector: 'app-sales-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        ChartModule,
        TableModule,
        TagModule,
        TimelineModule
    ],
    template: `
        <div class="grid">
            <!-- Title -->
            <div class="col-12">
                <h4 class="mb-4">Sales Dashboard</h4>
            </div>
            
            <!-- KPIs -->
            <div class="col-12 md:col-6 lg:col-3">
                <div class="card mb-0">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block text-500 font-medium mb-3">Ventas Totales</span>
                            <div class="text-900 font-medium text-xl">{{ totalSales() | currency }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                             style="width:2.5rem;height:2.5rem">
                            <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                        </div>
                    </div>
                    <span class="text-green-500 font-medium">+{{ salesTrend() }}% </span>
                    <span class="text-500">desde el mes pasado</span>
                </div>
            </div>
            
            <div class="col-12 md:col-6 lg:col-3">
                <div class="card mb-0">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block text-500 font-medium mb-3">Ingresos</span>
                            <div class="text-900 font-medium text-xl">{{ revenue() | currency }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-green-100 border-round"
                             style="width:2.5rem;height:2.5rem">
                            <i class="pi pi-dollar text-green-500 text-xl"></i>
                        </div>
                    </div>
                    <span class="text-green-500 font-medium">+{{ revenueTrend() }}% </span>
                    <span class="text-500">desde el mes pasado</span>
                </div>
            </div>
            
            <div class="col-12 md:col-6 lg:col-3">
                <div class="card mb-0">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block text-500 font-medium mb-3">Productos</span>
                            <div class="text-900 font-medium text-xl">{{ productsCount() }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                             style="width:2.5rem;height:2.5rem">
                            <i class="pi pi-box text-orange-500 text-xl"></i>
                        </div>
                    </div>
                    <span class="text-green-500 font-medium">+{{ productsTrend() }}% </span>
                    <span class="text-500">vendidos</span>
                </div>
            </div>
            
            <div class="col-12 md:col-6 lg:col-3">
                <div class="card mb-0">
                    <div class="flex justify-content-between mb-3">
                        <div>
                            <span class="block text-500 font-medium mb-3">Clientes</span>
                            <div class="text-900 font-medium text-xl">{{ customersCount() }}</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-cyan-100 border-round"
                             style="width:2.5rem;height:2.5rem">
                            <i class="pi pi-users text-cyan-500 text-xl"></i>
                        </div>
                    </div>
                    <span class="text-green-500 font-medium">+{{ customersTrend() }}% </span>
                    <span class="text-500">nuevos clientes</span>
                </div>
            </div>
            
            <!-- Charts -->
            <div class="col-12 lg:col-7">
                <div class="card">
                    <h5>Tendencia de Ventas Mensual</h5>
                    <p-chart type="line" [data]="salesTrendChart()" [options]="chartOptions()" 
                             [style]="{ height: '400px' }" />
                </div>
            </div>
            
            <div class="col-12 lg:col-5">
                <div class="card">
                    <h5>Top 5 Productos</h5>
                    <p-chart type="bar" [data]="topProductsChart()" [options]="barChartOptions()" 
                             [style]="{ height: '400px' }" />
                </div>
            </div>
            
            <!-- Tables & Timeline -->
            <div class="col-12 lg:col-8">
                <div class="card">
                    <h5>Últimas Órdenes</h5>
                    <p-table [value]="recentOrders()" [paginator]="true" [rows]="5" responsiveLayout="scroll">
                        <ng-template pTemplate="header">
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Productos</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-order>
                            <tr>
                                <td>{{ order.id }}</td>
                                <td>{{ order.customer }}</td>
                                <td>{{ order.date | date:'dd/MM/yyyy' }}</td>
                                <td>{{ order.products }}</td>
                                <td>{{ order.total | currency }}</td>
                                <td>
                                    <p-tag [value]="order.status" 
                                           [severity]="getStatusSeverity(order.status)" />
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </div>
            
            <div class="col-12 lg:col-4">
                <div class="card">
                    <h5>Actividad Reciente</h5>
                    <p-timeline [value]="activities()" styleClass="customized-timeline">
                        <ng-template pTemplate="marker" let-activity>
                            <span class="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
                                  [ngClass]="'bg-' + activity.color + '-500'">
                                <i [class]="activity.icon"></i>
                            </span>
                        </ng-template>
                        <ng-template pTemplate="content" let-activity>
                            <div class="text-900 font-medium text-sm mb-1">{{ activity.event }}</div>
                            <div class="text-600 text-sm">{{ activity.time }}</div>
                        </ng-template>
                    </p-timeline>
                </div>
            </div>
        </div>
    `
})
export class SalesDashboardComponent implements OnInit {
    private salesService = inject(SalesService);
    
    // Métricas
    totalSales = signal(0);
    salesTrend = signal(0);
    revenue = signal(0);
    revenueTrend = signal(0);
    productsCount = signal(0);
    productsTrend = signal(0);
    customersCount = signal(0);
    customersTrend = signal(0);
    
    // Datos de gráficos
    salesTrendChart = signal<any>({});
    topProductsChart = signal<any>({});
    recentOrders = signal<any[]>([]);
    activities = signal<any[]>([]);
    
    chartOptions = signal({
        plugins: { legend: { labels: { color: '#495057' } } },
        scales: {
            x: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } },
            y: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } }
        }
    });
    
    barChartOptions = signal({
        indexAxis: 'y',
        plugins: { legend: { labels: { color: '#495057' } } },
        scales: {
            x: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } },
            y: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } }
        }
    });
    
    ngOnInit() {
        this.loadDashboard();
    }
    
    loadDashboard() {
        // Cargar métricas, gráficos, órdenes y actividad
        this.salesService.getDashboardData().subscribe(data => {
            this.totalSales.set(data.metrics.sales.total);
            this.salesTrend.set(data.metrics.sales.trend);
            this.revenue.set(data.metrics.revenue.total);
            this.revenueTrend.set(data.metrics.revenue.trend);
            this.productsCount.set(data.metrics.products.count);
            this.productsTrend.set(data.metrics.products.trend);
            this.customersCount.set(data.metrics.customers.count);
            this.customersTrend.set(data.metrics.customers.trend);
            
            this.salesTrendChart.set(data.charts.salesTrend);
            this.topProductsChart.set(data.charts.topProducts);
            this.recentOrders.set(data.recentOrders);
            this.activities.set(data.activities);
        });
    }
    
    getStatusSeverity(status: string): string {
        switch (status) {
            case 'Completado':
                return 'success';
            case 'Pendiente':
                return 'warning';
            case 'Cancelado':
                return 'danger';
            default:
                return 'info';
        }
    }
}
```

---

## 📊 SERVICIOS PARA DASHBOARDS

### **Service Template**

```typescript
// filepath: src/app/pages/[dashboard]/[dashboard].service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/dashboard';
    
    getDashboardData(): Observable<any> {
        return this.http.get(`${this.apiUrl}/data`);
    }
    
    getMetrics(): Observable<any> {
        return this.http.get(`${this.apiUrl}/metrics`);
    }
    
    getChartData(chartType: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/charts/${chartType}`);
    }
    
    // Mock data para desarrollo
    getMockData(): any {
        return {
            metrics: {
                sales: { total: 2100, trend: 24 },
                revenue: { total: 45678, trend: 18 },
                products: { count: 456, trend: 5 },
                customers: { count: 1245, trend: 12 }
            },
            charts: {
                salesTrend: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Ventas',
                        data: [65, 59, 80, 81, 56, 55],
                        borderColor: '#42A5F5',
                        tension: 0.4
                    }]
                },
                topProducts: {
                    labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D', 'Producto E'],
                    datasets: [{
                        label: 'Ventas',
                        backgroundColor: '#42A5F5',
                        data: [65, 59, 80, 81, 56]
                    }]
                }
            },
            recentOrders: [
                { id: '1001', customer: 'Juan Pérez', date: '2024-01-15', products: 3, total: 250.00, status: 'Completado' },
                { id: '1002', customer: 'María García', date: '2024-01-14', products: 1, total: 180.50, status: 'Pendiente' }
            ],
            activities: [
                { event: 'Nueva orden #1234', time: 'Hace 15 min', icon: 'pi-shopping-cart', color: 'blue' },
                { event: 'Pago procesado #1233', time: 'Hace 1 hora', icon: 'pi-check', color: 'green' }
            ]
        };
    }
}
```

---

## ✅ CHECKLIST DE ENTREGA

### **Estructura Completa**
- [ ] Componente principal del dashboard
- [ ] Servicio para cargar datos
- [ ] Modelos/Interfaces TypeScript
- [ ] Cards de métricas (mínimo 4)
- [ ] Al menos 2 gráficos (líneas, barras, dona)
- [ ] Tabla de datos recientes
- [ ] Grid responsive con PrimeFlex
- [ ] README.md con documentación

### **Componentes PrimeNG**
- [ ] `p-chart` para gráficos
- [ ] `p-table` para tablas
- [ ] `p-card` o `div.card` para containers
- [ ] `p-tag` para estados
- [ ] `p-timeline` para actividad (opcional)

### **Responsive**
- [ ] Grid con breakpoints (col-12, md:col-6, lg:col-3)
- [ ] Gráficos con height fijo
- [ ] Tablas con responsiveLayout="scroll"

### **Performance**
- [ ] Uso de Signals
- [ ] Lazy loading de datos
- [ ] Skeleton loaders (opcional)

---

## 🎯 OBJETIVO FINAL

Cada dashboard debe ser:
1. **Funcional:** Muestra datos relevantes y actualizados
2. **Visual:** Atractivo y fácil de leer
3. **Responsive:** Se adapta a todos los dispositivos
4. **Performance:** Carga rápida y eficiente
5. **Mantenible:** Código limpio y bien estructurado

El dashboard debe estar listo para integrarse con backend real con mínimas modificaciones.
