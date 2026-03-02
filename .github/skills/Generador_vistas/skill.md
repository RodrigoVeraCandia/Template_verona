# SKILL: GENERADOR DE VISTAS CRUD VERONA

## 🎯 OBJETIVO
Generar vistas completas de administración CRUD siguiendo el patrón arquitectónico de Verona con PrimeNG, incluyendo tabla con filtros avanzados, lazy loading, diálogos de edición/creación y manejo completo de estados.

---

## 📋 PRE-REQUISITOS

Antes de ejecutar este skill, el agente DEBE:

1. **Analizar el servicio especificado** (ej: `customer.service.ts`)
   - Identificar métodos HTTP (GET, POST, PUT, DELETE)
   - Extraer la estructura del modelo de datos
   - Verificar el esquema de paginación

2. **Revisar componentes de referencia en Verona:**
   - `verona-ng-19.0.0/src/app/pages/uikit/table/tabledemo.component.ts`
   - `verona-ng-19.0.0/src/app/pages/crud/cruddemo.component.ts`
   - `verona-ng-19.0.0/src/app/pages/service/customer.service.ts`
   - `verona-ng-19.0.0/src/app/types/customer.ts`

3. **Verificar configuración del tema:**
   - Theme activo en `verona-ng-19.0.0/assets/layout/theme/`
   - Variables de color en `verona-ng-19.0.0/assets/layout/_config.scss`
   - Variables SASS en `verona-ng-19.0.0/assets/layout/_sass_variables.scss`

---

## 🏗️ ESTRUCTURA DE ARCHIVOS A GENERAR

```
verona-ng-19.0.0/src/app/pages/[nombre-entidad]/
│
├── [entidad].component.ts              # Componente principal con tabla
├── [entidad]-form.component.ts         # Componente de formulario (diálogo)
├── [entidad].service.ts                # Servicio HTTP (si no existe)
├── models/
│   ├── [entidad].model.ts             # Interfaces TypeScript
│   └── [entidad]-filters.model.ts     # Modelo de filtros
└── README.md                           # Documentación del feature
```

**📌 Nota:** Los archivos se ubican en `src/app/pages/` (NO en `src/app/features/`). Esta es la estructura estándar de Verona.

**🔍 Ejemplos de Referencia en Verona:**
- CRUD completo: `src/app/pages/crud/cruddemo.component.ts`
- Tabla avanzada: `src/app/pages/uikit/table/tabledemo.component.ts`
- Formularios: `src/app/pages/uikit/forms/formsdemo.component.ts`
- Servicios: `src/app/pages/service/customer.service.ts`
- Modelos: `src/app/types/customer.ts`

---

## 🎨 COMPONENTES PRIMENG OBLIGATORIOS

### **Tabla Principal:**
- ✅ `<p-table>` con lazy loading
- ✅ `<p-toolbar>` para acciones principales
- ✅ `<p-columnFilter>` para filtros por columna
- ✅ `<p-paginator>` integrado
- ✅ `<p-sortIcon>` en encabezados

### **Diálogo de Formulario:**
- ✅ `<p-dialog>` modal responsive
- ✅ `<p-inputtext>`, `<p-inputnumber>`, `<p-calendar>`, `<p-dropdown>`
- ✅ `<p-button>` con estados de loading
- ✅ Validaciones con `Validators` de Angular

### **Servicios Globales:**
- ✅ `MessageService` - Notificaciones toast
- ✅ `ConfirmationService` - Diálogos de confirmación
- ✅ `<p-toast>` en el template principal
- ✅ `<p-confirmDialog>` en el template principal

---

## 📝 PLANTILLA DE IMPLEMENTACIÓN

### **1. MODELO DE DATOS**

````typescript
// filepath: verona-ng-19.0.0/src/app/pages/[entidad]/models/[entidad].model.ts

export interface [Entidad] {
    id?: number;
    // Campos extraídos del servicio
    name: string;
    email: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface [Entidad]Filters {
    global?: string;
    name?: string;
    email?: string;
    status?: string;
}

export interface [Entidad]Response {
    data: [Entidad][];
    totalRecords: number;
}
````

---

### **2. SERVICIO HTTP**

````typescript
// filepath: verona-ng-19.0.0/src/app/pages/[entidad]/[entidad].service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class [Entidad]Service {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/[entidades]`;

    getAll(params?: any): Observable<[Entidad]Response> {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    httpParams = httpParams.set(key, params[key]);
                }
            });
        }
        return this.http.get<[Entidad]Response>(this.apiUrl, { params: httpParams });
    }

    getById(id: number): Observable<[Entidad]> {
        return this.http.get<[Entidad]>(`${this.apiUrl}/${id}`);
    }

    create(data: [Entidad]): Observable<[Entidad]> {
        return this.http.post<[Entidad]>(this.apiUrl, data);
    }

    update(id: number, data: [Entidad]): Observable<[Entidad]> {
        return this.http.put<[Entidad]>(`${this.apiUrl}/${id}`, data);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
````

---

### **3. COMPONENTE PRINCIPAL (TABLA)**

````typescript
// filepath: verona-ng-19.0.0/src/app/pages/[entidad]/[entidad].component.ts

import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService, ConfirmationService } from 'primeng/api';

import { [Entidad]Service } from './[entidad].service';
import { [Entidad], [Entidad]Filters } from './models/[entidad].model';
import { [Entidad]FormComponent } from './[entidad]-form.component';

@Component({
    selector: 'app-[entidad]',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ToolbarModule,
        ButtonModule,
        DialogModule,
        ToastModule,
        ConfirmDialogModule,
        InputTextModule,
        TagModule,
        TooltipModule,
        [Entidad]FormComponent
    ],
    providers: [MessageService, ConfirmationService],
    template: `
        <div class="card">
            <!-- TOOLBAR -->
            <p-toolbar styleClass="mb-4 gap-2">
                <ng-template pTemplate="left">
                    <h5 class="m-0">Gestión de [Entidades]</h5>
                </ng-template>
                <ng-template pTemplate="right">
                    <p-button 
                        label="Nuevo" 
                        icon="pi pi-plus" 
                        severity="success" 
                        (onClick)="openNew()" />
                    <p-button 
                        label="Exportar" 
                        icon="pi pi-upload" 
                        severity="help"
                        (onClick)="exportData()" />
                </ng-template>
            </p-toolbar>

            <!-- TABLA -->
            <p-table 
                [value]="items()" 
                [lazy]="true" 
                (onLazyLoad)="loadData($event)"
                [paginator]="true" 
                [rows]="rows()"
                [totalRecords]="totalRecords()"
                [loading]="loading()"
                [rowsPerPageOptions]="[10, 25, 50]"
                [globalFilterFields]="['name', 'email', 'status']"
                responsiveLayout="scroll"
                [rowHover]="true"
                dataKey="id"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
                [showCurrentPageReport]="true">

                <!-- CAPTION CON BÚSQUEDA GLOBAL -->
                <ng-template pTemplate="caption">
                    <div class="flex align-items-center justify-content-between">
                        <span class="p-input-icon-left w-full md:w-auto">
                            <i class="pi pi-search"></i>
                            <input 
                                pInputText 
                                type="text" 
                                [(ngModel)]="globalFilter"
                                (input)="onGlobalFilter($event)" 
                                placeholder="Buscar..." 
                                class="w-full md:w-auto" />
                        </span>
                    </div>
                </ng-template>

                <!-- HEADER -->
                <ng-template pTemplate="header">
                    <tr>
                        <th pSortableColumn="id" style="min-width: 5rem">
                            ID <p-sortIcon field="id" />
                        </th>
                        <th pSortableColumn="name" style="min-width: 12rem">
                            Nombre <p-sortIcon field="name" />
                        </th>
                        <th pSortableColumn="email" style="min-width: 15rem">
                            Email <p-sortIcon field="email" />
                        </th>
                        <th pSortableColumn="status" style="min-width: 8rem">
                            Estado <p-sortIcon field="status" />
                        </th>
                        <th style="min-width: 10rem">Acciones</th>
                    </tr>
                </ng-template>

                <!-- BODY -->
                <ng-template pTemplate="body" let-item>
                    <tr>
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.email }}</td>
                        <td>
                            <p-tag 
                                [value]="item.status" 
                                [severity]="getStatusSeverity(item.status)" />
                        </td>
                        <td>
                            <p-button 
                                icon="pi pi-pencil" 
                                severity="success" 
                                [rounded]="true" 
                                [text]="true"
                                pTooltip="Editar"
                                tooltipPosition="top"
                                (onClick)="edit(item)" />
                            <p-button 
                                icon="pi pi-trash" 
                                severity="danger" 
                                [rounded]="true" 
                                [text]="true"
                                pTooltip="Eliminar"
                                tooltipPosition="top"
                                (onClick)="delete(item)" />
                        </td>
                    </tr>
                </ng-template>

                <!-- EMPTY STATE -->
                <ng-template pTemplate="emptymessage">
                    <tr>
                        <td colspan="5" class="text-center py-5">
                            <i class="pi pi-info-circle text-4xl text-400 mb-3 block"></i>
                            <p class="text-500 m-0">No se encontraron registros</p>
                        </td>
                    </tr>
                </ng-template>

                <!-- LOADING -->
                <ng-template pTemplate="loadingbody">
                    <tr>
                        <td colspan="5" class="text-center py-5">
                            <i class="pi pi-spin pi-spinner text-4xl text-primary mb-3 block"></i>
                            <p class="text-500 m-0">Cargando datos...</p>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>

        <!-- DIÁLOGO DE FORMULARIO -->
        <app-[entidad]-form
            [(visible)]="dialogVisible"
            [item]="selectedItem()"
            (onSave)="handleSave($event)"
            (onCancel)="hideDialog()" />

        <!-- TOAST -->
        <p-toast />

        <!-- CONFIRM DIALOG -->
        <p-confirmDialog />
    `
})
export class [Entidad]Component implements OnInit {
    private service = inject([Entidad]Service);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);

    // Signals
    items = signal<[Entidad][]>([]);
    selectedItem = signal<[Entidad] | null>(null);
    loading = signal(false);
    totalRecords = signal(0);
    rows = signal(10);
    dialogVisible = signal(false);
    globalFilter = '';

    // Lazy loading params
    private lastLazyLoadEvent?: TableLazyLoadEvent;

    ngOnInit() {
        // Los datos se cargan en el primer onLazyLoad
    }

    loadData(event: TableLazyLoadEvent) {
        this.lastLazyLoadEvent = event;
        this.loading.set(true);

        const params = {
            page: (event.first || 0) / (event.rows || 10) + 1,
            limit: event.rows || 10,
            sortField: event.sortField || 'id',
            sortOrder: event.sortOrder === 1 ? 'asc' : 'desc',
            filters: this.buildFilters(event.filters)
        };

        this.service.getAll(params).subscribe({
            next: (response) => {
                this.items.set(response.data);
                this.totalRecords.set(response.totalRecords);
                this.loading.set(false);
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al cargar los datos'
                });
                this.loading.set(false);
            }
        });
    }

    onGlobalFilter(event: any) {
        // Implementar filtrado global
        if (this.lastLazyLoadEvent) {
            this.loadData({
                ...this.lastLazyLoadEvent,
                globalFilter: event.target.value
            });
        }
    }

    openNew() {
        this.selectedItem.set(null);
        this.dialogVisible.set(true);
    }

    edit(item: [Entidad]) {
        this.selectedItem.set({ ...item });
        this.dialogVisible.set(true);
    }

    delete(item: [Entidad]) {
        this.confirmationService.confirm({
            message: `¿Está seguro de eliminar "${item.name}"?`,
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.service.delete(item.id!).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Éxito',
                            detail: 'Registro eliminado correctamente'
                        });
                        this.loadData(this.lastLazyLoadEvent!);
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No se pudo eliminar el registro'
                        });
                    }
                });
            }
        });
    }

    handleSave(item: [Entidad]) {
        const request = item.id 
            ? this.service.update(item.id, item)
            : this.service.create(item);

        request.subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: item.id ? 'Registro actualizado' : 'Registro creado'
                });
                this.hideDialog();
                this.loadData(this.lastLazyLoadEvent!);
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo guardar el registro'
                });
            }
        });
    }

    hideDialog() {
        this.dialogVisible.set(false);
        this.selectedItem.set(null);
    }

    exportData() {
        // Implementar exportación
        this.messageService.add({
            severity: 'info',
            summary: 'Exportar',
            detail: 'Función de exportación pendiente'
        });
    }

    getStatusSeverity(status: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'activo':
                return 'success';
            case 'inactive':
            case 'inactivo':
                return 'danger';
            case 'pending':
            case 'pendiente':
                return 'warning';
            default:
                return 'info';
        }
    }

    private buildFilters(filters: any): string {
        // Implementar construcción de filtros según backend
        return '';
    }
}
````

---

### **4. COMPONENTE DE FORMULARIO**

````typescript
// filepath: verona-ng-19.0.0/src/app/pages/[entidad]/[entidad]-form.component.ts

import { Component, Input, Output, EventEmitter, effect, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// PrimeNG
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { [Entidad] } from './models/[entidad].model';

@Component({
    selector: 'app-[entidad]-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        DropdownModule,
        CalendarModule,
        InputTextareaModule
    ],
    template: `
        <p-dialog 
            [(visible)]="visible" 
            [header]="dialogTitle()"
            [modal]="true" 
            [style]="{ width: '50vw' }"
            [breakpoints]="{ '960px': '75vw', '640px': '95vw' }"
            [draggable]="false"
            [resizable]="false"
            (onHide)="onCancel.emit()">
            
            <form [formGroup]="form" (ngSubmit)="save()">
                <div class="grid formgrid p-fluid">
                    
                    <!-- NOMBRE -->
                    <div class="col-12 md:col-6">
                        <label htmlFor="name" class="block mb-2">
                            Nombre <span class="text-red-500">*</span>
                        </label>
                        <input 
                            pInputText 
                            id="name" 
                            formControlName="name"
                            placeholder="Ingrese el nombre"
                            [class.ng-invalid]="isFieldInvalid('name')"
                            [class.ng-dirty]="isFieldInvalid('name')" />
                        <small class="p-error block mt-1" *ngIf="isFieldInvalid('name')">
                            {{ getErrorMessage('name') }}
                        </small>
                    </div>

                    <!-- EMAIL -->
                    <div class="col-12 md:col-6">
                        <label htmlFor="email" class="block mb-2">
                            Email <span class="text-red-500">*</span>
                        </label>
                        <input 
                            pInputText 
                            id="email" 
                            type="email"
                            formControlName="email"
                            placeholder="correo@ejemplo.com"
                            [class.ng-invalid]="isFieldInvalid('email')"
                            [class.ng-dirty]="isFieldInvalid('email')" />
                        <small class="p-error block mt-1" *ngIf="isFieldInvalid('email')">
                            {{ getErrorMessage('email') }}
                        </small>
                    </div>

                    <!-- STATUS -->
                    <div class="col-12 md:col-6">
                        <label htmlFor="status" class="block mb-2">
                            Estado <span class="text-red-500">*</span>
                        </label>
                        <p-dropdown 
                            id="status"
                            formControlName="status"
                            [options]="statusOptions"
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Seleccione un estado"
                            [class.ng-invalid]="isFieldInvalid('status')"
                            [class.ng-dirty]="isFieldInvalid('status')" />
                        <small class="p-error block mt-1" *ngIf="isFieldInvalid('status')">
                            Campo requerido
                        </small>
                    </div>

                    <!-- Agregar más campos según el modelo -->

                </div>
            </form>

            <ng-template pTemplate="footer">
                <p-button 
                    label="Cancelar" 
                    icon="pi pi-times" 
                    severity="secondary"
                    [text]="true"
                    (onClick)="onCancel.emit()" />
                <p-button 
                    label="Guardar" 
                    icon="pi pi-check" 
                    (onClick)="save()"
                    [disabled]="form.invalid"
                    [loading]="saving()" />
            </ng-template>
        </p-dialog>
    `
})
export class [Entidad]FormComponent {
    private fb = inject(FormBuilder);

    @Input() visible = false;
    @Input() item: [Entidad] | null = null;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<[Entidad]>();
    @Output() onCancel = new EventEmitter<void>();

    dialogTitle = signal('Nuevo Registro');
    saving = signal(false);

    statusOptions = [
        { label: 'Activo', value: 'active' },
        { label: 'Inactivo', value: 'inactive' },
        { label: 'Pendiente', value: 'pending' }
    ];

    form: FormGroup = this.fb.group({
        id: [null],
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        status: ['active', Validators.required]
        // Agregar más campos según el modelo
    });

    constructor() {
        effect(() => {
            if (this.item) {
                this.dialogTitle.set('Editar Registro');
                this.form.patchValue(this.item);
            } else {
                this.dialogTitle.set('Nuevo Registro');
                this.form.reset({ status: 'active' });
            }
        });
    }

    save() {
        if (this.form.valid) {
            this.saving.set(true);
            this.onSave.emit(this.form.value);
            
            // Simular delay de guardado
            setTimeout(() => {
                this.saving.set(false);
                this.visibleChange.emit(false);
            }, 500);
        } else {
            this.form.markAllAsTouched();
        }
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.form.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getErrorMessage(fieldName: string): string {
        const control = this.form.get(fieldName);
        if (control?.errors) {
            if (control.errors['required']) return 'Campo requerido';
            if (control.errors['email']) return 'Email inválido';
            if (control.errors['minlength']) {
                return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
            }
        }
        return '';
    }
}
````

---

### **5. README.md**

````markdown
// filepath: verona-ng-19.0.0/src/app/pages/[entidad]/README.md

# Feature: [Entidad]

## Descripción
Módulo completo de administración de [entidades] con operaciones CRUD, filtros avanzados y lazy loading.

## Componentes

### [Entidad]Component
- **Ruta**: `/[entidades]`
- **Descripción**: Tabla principal con lazy loading y filtros
- **Características**:
  - ✅ Paginación del lado del servidor
  - ✅ Ordenamiento por columnas
  - ✅ Filtro global de búsqueda
  - ✅ Acciones de editar/eliminar
  - ✅ Exportación de datos

### [Entidad]FormComponent
- **Descripción**: Formulario reactivo para crear/editar registros
- **Validaciones**:
  - Nombre: requerido, mínimo 3 caracteres
  - Email: requerido, formato válido
  - Estado: requerido

## Servicios

### [Entidad]Service
- **Métodos**:
  - `getAll(params)`: Lista paginada con filtros
  - `getById(id)`: Obtener por ID
  - `create(data)`: Crear nuevo registro
  - `update(id, data)`: Actualizar registro
  - `delete(id)`: Eliminar registro

## Integración

### 1. Agregar Ruta
```typescript
// app.routes.ts
{
    path: '[entidades]',
    loadComponent: () => import('./pages/[entidad]/[entidad].component')
        .then(m => m.[Entidad]Component)
}
```

### 2. Agregar al Menú
```typescript
// app.layout.component.ts -> menuItems
{
    label: '[Entidades]',
    icon: 'pi pi-fw pi-users',
    routerLink: ['/[entidades]']
}
```

## Dependencias
- PrimeNG Table
- PrimeNG Dialog
- PrimeNG Toast
- PrimeNG ConfirmDialog
- Angular Reactive Forms

## API Endpoints

```
GET    /api/[entidades]?page=1&limit=10&sort=id&order=asc
GET    /api/[entidades]/:id
POST   /api/[entidades]
PUT    /api/[entidades]/:id
DELETE /api/[entidades]/:id
```

## Personalización

### Agregar Campos al Formulario
Edita `[entidad]-form.component.ts`:
1. Agrega el campo al FormGroup
2. Agrega el HTML del campo en el template
3. Agrega la validación si es necesario

### Modificar Columnas de la Tabla
Edita `[entidad].component.ts`:
1. Agrega/modifica `<th>` en el header
2. Agrega/modifica `<td>` en el body
3. Actualiza `globalFilterFields` si es necesario
````

---

## ✅ CHECKLIST DE VALIDACIÓN

El agente debe verificar que el código generado cumpla:

### Estructura
- [ ] Componente standalone con signals
- [ ] Servicio inyectable con `providedIn: 'root'`
- [ ] Modelos TypeScript bien tipados
- [ ] README.md completo
- [ ] Archivos en la ruta correcta: `verona-ng-19.0.0/src/app/pages/[entidad]/`

### UI/UX
- [ ] Usa solo componentes PrimeNG
- [ ] Clase `.card` en contenedor principal
- [ ] Layout responsive con PrimeFlex
- [ ] Tooltips en botones de acción
- [ ] Empty state en tabla
- [ ] Loading state en tabla

### Funcionalidad
- [ ] Lazy loading implementado
- [ ] Manejo de estados de carga
- [ ] Toast para notificaciones
- [ ] ConfirmDialog para eliminaciones
- [ ] Validaciones en formulario
- [ ] Manejo de errores HTTP
- [ ] Two-way binding en el diálogo

### Accesibilidad
- [ ] Labels en inputs
- [ ] Placeholders descriptivos
- [ ] Mensajes de error claros
- [ ] Tooltips informativos
- [ ] ARIA attributes cuando sea necesario

---

## 🎯 EJEMPLO DE USO DEL SKILL

**Input del Usuario:**
```
"Crea una vista CRUD completa para gestionar clientes"
```

**Output Esperado del Agente:**

```
📋 ANÁLISIS PREVIO
✓ Revisando componentes de referencia en Verona...
✓ Analizando: verona-ng-19.0.0/src/app/pages/crud/cruddemo.component.ts
✓ Servicio analizado: verona-ng-19.0.0/src/app/pages/service/customer.service.ts
✓ Modelo de referencia: verona-ng-19.0.0/src/app/types/customer.ts
✓ Tema activo detectado: Lara Light Blue
✓ Modelo detectado: Cliente
✓ Campos principales: nombre, email, teléfono, empresa, estado

🏗️ ESTRUCTURA A GENERAR
verona-ng-19.0.0/src/app/pages/clientes/
├── clientes.component.ts
├── clientes-form.component.ts
├── clientes.service.ts
├── models/
│   ├── cliente.model.ts
│   └── cliente-filters.model.ts
└── README.md

📦 COMPONENTES PRIMENG
- p-table (lazy loading, sorting, filtering)
- p-toolbar (acciones principales)
- p-dialog (formulario modal)
- p-toast (notificaciones)
- p-confirmDialog (confirmación de eliminaciones)
- p-dropdown (select de estado)
- p-inputtext (campos de texto)
- p-tag (badges de estado)

[AQUÍ VA EL CÓDIGO COMPLETO GENERADO CON 4 BACKTICKS]

📝 INSTRUCCIONES DE INTEGRACIÓN
1. Agrega la ruta en app.routes.ts
2. Agrega el menú en el layout
3. Configura la URL del API en environment.ts

✅ VALIDACIÓN COMPLETADA
✓ Standalone Component con signals
✓ Solo componentes PrimeNG
✓ Layout responsive con PrimeFlex
✓ Manejo de errores y loading states
✓ Formulario con validaciones
✓ README.md incluido
```

---

## 🚀 MEJORAS OPCIONALES

El agente puede ofrecer implementar funcionalidades adicionales:

### 1. **Filtros Avanzados**
```typescript
// Agregar panel de filtros colapsable
<p-panel header="Filtros Avanzados" [toggleable]="true" [collapsed]="true">
    <!-- Filtros específicos por campo -->
</p-panel>
```

### 2. **Exportación de Datos**
```typescript
// Implementar exportación a CSV/Excel
exportData() {
    this.service.export().subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '[entidades].csv';
        a.click();
    });
}
```

### 3. **Acciones en Lote**
```typescript
// Selección múltiple y acciones masivas
<p-table [selection]="selectedItems" selectionMode="multiple">
    <ng-template pTemplate="header">
        <th style="width: 3rem">
            <p-tableHeaderCheckbox />
        </th>
    </ng-template>
</p-table>
```

### 4. **Vista de Detalle**
```typescript
// Sidebar con información completa del registro
<p-sidebar [(visible)]="detailVisible" position="right" [style]="{width:'30em'}">
    <!-- Detalles del registro -->
</p-sidebar>
```

### 5. **Búsqueda Avanzada**
```typescript
// Panel de búsqueda con múltiples criterios
<p-accordion>
    <p-accordionTab header="Búsqueda Avanzada">
        <!-- Campos de búsqueda combinados -->
    </p-accordionTab>
</p-accordion>
```

---

## 📊 VARIANTES DEL SKILL

### Variante 1: CRUD Simple (Sin Lazy Loading)
Para datasets pequeños (<1000 registros)
- Carga todos los datos al inicio
- Filtrado en el cliente
- Paginación en el cliente

### Variante 2: CRUD con Tabs
Para entidades con diferentes estados
- Tabs para filtrar por estado
- Contadores en cada tab
- Lazy loading por tab

### Variante 3: CRUD con Vista de Detalle
Para entidades con mucha información
- Lista principal simplificada
- Vista detalle en sidebar/página separada
- Navegación entre registros

### Variante 4: CRUD con Relaciones
Para entidades con relaciones (ej: Cliente -> Pedidos)
- Tabla principal
- Sub-tablas o tabs con datos relacionados
- Formularios anidados

---

**NOTA FINAL:** Este skill debe generar código **production-ready** que pueda integrarse directamente en Verona sin necesidad de ajustes manuales. El código debe seguir las mejores prácticas de Angular 17+ y PrimeNG 17+.
