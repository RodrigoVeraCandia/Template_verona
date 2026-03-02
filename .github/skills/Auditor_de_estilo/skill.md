"# SKILL: AUDITOR DE ESTILO VERONA & PRIMENG

## 🎯 OBJETIVO
Analizar componentes Angular para verificar el cumplimiento de las guías de estilo de Verona y PrimeNG, identificar CSS personalizado innecesario, detectar anti-patrones y proporcionar correcciones automáticas para mejorar la calidad del código.

---

## 📋 PROTOCOLO DE AUDITORÍA

Cuando recibas código para auditar, ejecuta las siguientes fases en orden:

### **FASE 1: ANÁLISIS ESTRUCTURAL** 🔍

1. **Verificar Arquitectura del Componente**
   - [ ] ¿Es un Standalone Component?
   - [ ] ¿Está en la ruta correcta?
     - ✅ `verona-ng-19.0.0/src/app/pages/[feature]/` (páginas)
     - ✅ `verona-ng-19.0.0/src/app/apps/[app]/` (aplicaciones completas)
     - ❌ NO `src/app/features/` (ruta incorrecta)
   - [ ] ¿Los imports son correctos y mínimos?
   - [ ] ¿El selector sigue la convención `app-[nombre]`?

2. **Analizar Imports**
   - [ ] ¿Importa solo módulos que realmente usa?
   - [ ] ¿Los imports de PrimeNG son específicos? (ej: `ButtonModule` no `PrimeNGModule`)
   - [ ] ¿Importa `CommonModule` si usa directivas como `*ngIf`, `*ngFor`?
   - [ ] ¿Importa `FormsModule` o `ReactiveFormsModule` si usa formularios?

3. **Revisar Estado y Datos**
   - [ ] ¿Usa Signals en lugar de propiedades tradicionales?
   - [ ] ¿Los métodos inject() se usan en lugar de constructor DI?
   - [ ] ¿Los observables se manejan correctamente?

---

### **FASE 2: AUDITORÍA DE UI (PRIMENG)** 🎨

Revisa cada elemento HTML y verifica:

#### **❌ Anti-patrones HTML Nativos**

| HTML Nativo Prohibido | Debe ser PrimeNG |
|---------------------|-----------------|
| `<button>` | `<p-button>` |
| `<input type="text">` | `<input pInputText>` o `<p-inputtext>` |
| `<input type="number">` | `<p-inputnumber>` |
| `<input type="checkbox">` | `<p-checkbox>` |
| `<input type="radio">` | `<p-radiobutton>` |
| `<select>` | `<p-dropdown>` |
| `<textarea>` | `<textarea pInputTextarea>` |
| `<table>` | `<p-table>` |
| `<dialog>` o modal custom | `<p-dialog>` |
| `<nav>` con links | `<p-menubar>` o `<p-breadcrumb>` |

#### **✅ Validaciones de Componentes PrimeNG**

1. **Botones:**
   ```typescript
   // ❌ MAL
   <button class="btn btn-primary">Click</button>
   
   // ✅ BIEN
   <p-button label="Click" severity="primary" />
   ```

2. **Inputs:**
   ```typescript
   // ❌ MAL
   <input type="text" class="form-control" placeholder="Nombre">
   
   // ✅ BIEN
   <input pInputText placeholder="Nombre" />
   ```

3. **Tablas:**
   ```typescript
   // ❌ MAL
   <table class="table">
     <thead><tr><th>Nombre</th></tr></thead>
   </table>
   
   // ✅ BIEN
   <p-table [value]="items()">
     <ng-template pTemplate="header">
       <tr><th>Nombre</th></tr>
     </ng-template>
   </p-table>
   ```

4. **Diálogos:**
   ```typescript
   // ❌ MAL
   <div class="modal" *ngIf="visible">
     <div class="modal-content">...</div>
   </div>
   
   // ✅ BIEN
   <p-dialog [(visible)]="visible" header="Título">
     ...
   </p-dialog>
   ```

---

### **FASE 3: AUDITORÍA DE ESTILOS (PRIMEFLEX)** 📐

#### **Catálogo de Reemplazos CSS → PrimeFlex**

##### **1. Layout y Display**

| CSS Personalizado | PrimeFlex Equivalente |
|------------------|----------------------|
| `display: flex;` | `flex` |
| `display: inline-flex;` | `inline-flex` |
| `display: grid;` | `grid` |
| `display: none;` | `hidden` |
| `display: block;` | `block` |
| `display: inline-block;` | `inline-block` |

##### **2. Flexbox**

| CSS Personalizado | PrimeFlex Equivalente |
|------------------|----------------------|
| `flex-direction: row;` | `flex-row` |
| `flex-direction: column;` | `flex-column` |
| `flex-wrap: wrap;` | `flex-wrap` |
| `flex-wrap: nowrap;` | `flex-nowrap` |
| `justify-content: center;` | `justify-content-center` |
| `justify-content: space-between;` | `justify-content-between` |
| `justify-content: space-around;` | `justify-content-around` |
| `justify-content: flex-start;` | `justify-content-start` |
| `justify-content: flex-end;` | `justify-content-end` |
| `align-items: center;` | `align-items-center` |
| `align-items: flex-start;` | `align-items-start` |
| `align-items: flex-end;` | `align-items-end` |
| `align-items: stretch;` | `align-items-stretch` |
| `flex: 1;` | `flex-1` |
| `flex-grow: 1;` | `flex-grow-1` |
| `flex-shrink: 0;` | `flex-shrink-0` |

##### **3. Spacing (Margin y Padding)**

| CSS Personalizado | PrimeFlex Equivalente |
|------------------|----------------------|
| `margin: 0;` | `m-0` |
| `margin: 0.5rem;` | `m-1` |
| `margin: 1rem;` | `m-2` |
| `margin: 1.5rem;` | `m-3` |
| `margin: 2rem;` | `m-4` |
| `margin: 3rem;` | `m-5` |
| `margin: 4rem;` | `m-6` |
| `margin-top: 1rem;` | `mt-2` |
| `margin-bottom: 1rem;` | `mb-2` |
| `margin-left: 1rem;` | `ml-2` |
| `margin-right: 1rem;` | `mr-2` |
| `margin: 0 1rem;` | `mx-2` |
| `margin: 1rem 0;` | `my-2` |
| `padding: 0;` | `p-0` |
| `padding: 1rem;` | `p-2` |
| `padding-top: 1rem;` | `pt-2` |
| `gap: 0.5rem;` | `gap-1` |
| `gap: 1rem;` | `gap-2` |
| `gap: 1.5rem;` | `gap-3` |

##### **4. Sizing**

| CSS Personalizado | PrimeFlex Equivalente |
|------------------|----------------------|
| `width: 100%;` | `w-full` |
| `width: 50%;` | `w-6` (6/12 columns) |
| `width: auto;` | `w-auto` |
| `height: 100%;` | `h-full` |
| `height: 100vh;` | `h-screen` |
| `min-width: 100%;` | `min-w-full` |
| `max-width: 100%;` | `max-w-full` |

##### **5. Colores de Texto**

| CSS Personalizado | PrimeFlex Equivalente |
|------------------|----------------------|
| `color: #000;` (negro) | `text-900` |
| `color: #666;` (gris) | `text-600` |
| `color: #999;` (gris claro) | `text-500` |
| `color: var(--primary-color);` | `text-primary` |
| `color: green;` | `text-green-500` |
| `color: red;` | `text-red-500` |

##### **6. Colores de Fondo**

| CSS Personalizado | PrimeFlex Equivalente |
|------------------|----------------------|
| `background: white;` | `bg-white` o `surface-card` |
| `background: #f8f9fa;` | `surface-ground` |
| `background: var(--primary-color);` | `bg-primary` |

##### **7. Tipografía**

| CSS Personalizado | PrimeFlex Equivalente |
|------------------|----------------------|
| `font-size: 0.875rem;` | `text-sm` |
| `font-size: 1rem;` | `text-base` |
| `font-size: 1.125rem;` | `text-lg` |
| `font-size: 1.25rem;` | `text-xl` |
| `font-size: 1.5rem;` | `text-2xl` |
| `font-weight: 500;` | `font-medium` |
| `font-weight: 600;` | `font-semibold` |
| `font-weight: 700;` | `font-bold` |
| `text-align: center;` | `text-center` |
| `text-align: left;` | `text-left` |
| `text-align: right;` | `text-right` |

##### **8. Bordes**

| CSS Personalizado | PrimeFlex Equivalente |
|------------------|----------------------|
| `border: 1px solid #dee2e6;` | `border-1 surface-border` |
| `border-radius: 0.25rem;` | `border-round` |
| `border-radius: 50%;` | `border-circle` |
| `border-top: 1px solid;` | `border-top-1` |
| `border-bottom: 1px solid;` | `border-bottom-1` |

##### **9. Sombras**

| CSS Personalizado | PrimeFlex Equivalente |
|------------------|----------------------|
| `box-shadow: 0 2px 4px rgba(0,0,0,0.1);` | `shadow-1` |
| `box-shadow: 0 4px 8px rgba(0,0,0,0.15);` | `shadow-2` |
| `box-shadow: 0 8px 16px rgba(0,0,0,0.2);` | `shadow-3` |

##### **10. Posicionamiento**

| CSS Personalizado | PrimeFlex Equivalente |
|------------------|----------------------|
| `position: relative;` | `relative` |
| `position: absolute;` | `absolute` |
| `position: fixed;` | `fixed` |
| `position: sticky;` | `sticky` |

##### **11. Overflow**

| CSS Personalizado | PrimeFlex Equivalente |
|------------------|----------------------|
| `overflow: hidden;` | `overflow-hidden` |
| `overflow: auto;` | `overflow-auto` |
| `overflow-x: auto;` | `overflow-x-auto` |
| `overflow-y: auto;` | `overflow-y-auto` |

---

### **FASE 4: AUDITORÍA DE RESPONSIVE** 📱

Verifica que el código sea responsive:

#### **Sistema de Breakpoints de PrimeFlex**

```html
<!-- ❌ MAL: Sin responsive -->
<div class="col-4">Content</div>

<!-- ✅ BIEN: Responsive -->
<div class="col-12 md:col-6 lg:col-4">Content</div>
```

| Breakpoint | Prefijo | Tamaño |
|-----------|---------|--------|
| Extra Small | (sin prefijo) | < 576px |
| Small | `sm:` | ≥ 576px |
| Medium | `md:` | ≥ 768px |
| Large | `lg:` | ≥ 992px |
| Extra Large | `xl:` | ≥ 1200px |

#### **Validaciones Responsive**

- [ ] ¿Todos los grids tienen breakpoints?
- [ ] ¿Los elementos se adaptan a móvil, tablet y desktop?
- [ ] ¿Se usan clases responsive para ocultar/mostrar? (`hidden md:block`)
- [ ] ¿Los `p-dialog` tienen breakpoints configurados?

---

### **FASE 5: AUDITORÍA DE ESTRUCTURA VERONA** 🏗️

#### **Validación de Ruta de Archivos**

```
✅ RUTAS CORRECTAS:
- src/app/pages/[feature]/[feature].component.ts
- src/app/apps/[app]/[app].component.ts
- src/app/layout/components/[component]/

❌ RUTAS INCORRECTAS:
- src/app/features/[feature]/  (NO USAR)
- src/components/[component]/  (NO USAR)
- src/modules/[module]/        (NO USAR)
```

#### **Contenedores Card**

```typescript
// ❌ MAL
<div class="container">
  <div class="card-custom">
    <h3>Título</h3>
  </div>
</div>

// ✅ BIEN (Clase .card definida en assets/layout/_main.scss)
<div class="card">
  <h5>Título</h5>
  <!-- contenido -->
</div>
```

#### **Sistema de Grid**

```typescript
// ❌ MAL
<div class="row">
  <div class="col-md-6">Content</div>
</div>

// ✅ BIEN
<div class="grid">
  <div class="col-12 md:col-6">Content</div>
</div>
```

#### **Toolbar de Acciones**

```typescript
// ❌ MAL
<div class="actions-bar">
  <button>Nuevo</button>
</div>

// ✅ BIEN
<p-toolbar styleClass="mb-4">
  <ng-template pTemplate="left">
    <p-button label="Nuevo" icon="pi pi-plus" />
  </ng-template>
</p-toolbar>
```

---

### **FASE 6: DETECCIÓN DE ANTI-PATRONES** 🚨

#### **Anti-patrón 1: CSS Inline Excesivo**

```typescript
// ❌ MAL
<div style="display: flex; justify-content: center; align-items: center; padding: 20px; background: white;">
  Content
</div>

// ✅ BIEN
<div class="flex justify-content-center align-items-center p-4 bg-white">
  Content
</div>
```

#### **Anti-patrón 2: Clases CSS Personalizadas Innecesarias**

```typescript
// ❌ MAL (en styles)
.my-custom-flex {
  display: flex;
  gap: 10px;
}

// ✅ BIEN (en template)
<div class="flex gap-2">
```

#### **Anti-patrón 3: No Usar Signals**

```typescript
// ❌ MAL
export class MyComponent {
  data: any[] = [];
  loading: boolean = false;
}

// ✅ BIEN
export class MyComponent {
  data = signal<any[]>([]);
  loading = signal(false);
}
```

#### **Anti-patrón 4: Constructor Injection**

```typescript
// ❌ MAL
constructor(private http: HttpClient) {}

// ✅ BIEN
private http = inject(HttpClient);
```

#### **Anti-patrón 5: No Usar Severity en PrimeNG**

```typescript
// ❌ MAL
<p-button class="red-button" />
<p-tag class="green-tag" />

// ✅ BIEN
<p-button severity="danger" />
<p-tag severity="success" />
```

#### **Anti-patrón 6: Formularios Sin Validación**

```typescript
// ❌ MAL
form = new FormGroup({
  name: new FormControl('')
});

// ✅ BIEN
form = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]]
});
```

---

## 📊 FORMATO DE REPORTE DE AUDITORÍA

Cuando audites un componente, genera un reporte con este formato:

### **1. RESUMEN EJECUTIVO**

```
🎯 PUNTUACIÓN GENERAL: 7.5/10

📊 RESULTADOS POR CATEGORÍA:
✅ Arquitectura: 9/10
⚠️  Componentes PrimeNG: 6/10
❌ Estilos PrimeFlex: 4/10
✅ Responsive: 8/10
⚠️  Buenas Prácticas: 7/10

🔴 SEVERIDAD:
- 3 errores críticos
- 5 advertencias
- 8 sugerencias
```

---

### **2. PROBLEMAS ENCONTRADOS**

```
🔴 CRÍTICO - Línea 12
Problema: Archivo en ruta incorrecta
Ubicación: src/app/features/users/users.component.ts
Impacto: No sigue la estructura estándar de Verona
Corrección:
  ❌ src/app/features/users/
  ✅ src/app/pages/users/
  Referencia: Ver src/app/pages/crud/ como ejemplo

🔴 CRÍTICO - Línea 45
Problema: Uso de <button> HTML nativo
Impacto: Inconsistencia visual y falta de features de PrimeNG
Corrección:
  ❌ <button class="btn">Guardar</button>
  ✅ <p-button label="Guardar" severity="primary" />
  Referencia: Ver src/app/pages/uikit/button/buttondemo.component.ts

🟡 ADVERTENCIA - Línea 78
Problema: CSS inline innecesario
Impacto: Difícil mantenimiento y código no responsive
Corrección:
  ❌ <div style="display: flex; gap: 10px;">
  ✅ <div class="flex gap-2">

💡 SUGERENCIA - Línea 102
Problema: Uso de propiedades en lugar de signals
Impacto: Menor reactividad y performance
Corrección:
  ❌ items: any[] = [];
  ✅ items = signal<any[]>([]);
```

---

### **3. REEMPLAZOS AUTOMATIZABLES**

Lista los cambios que se pueden aplicar automáticamente:

```typescript
// ARCHIVO: component.ts - Línea 23
- <div style="display: flex; justify-content: space-between;">
+ <div class="flex justify-content-between">

// ARCHIVO: component.ts - Línea 45
- <button class="btn btn-primary">Click</button>
+ <p-button label="Click" severity="primary" />

// ARCHIVO: component.ts - Línea 67
- <input type="text" class="form-control">
+ <input pInputText />
```

---

### **4. REFACTORIZACIONES SUGERIDAS**

```
📦 IMPORTS FALTANTES:
+ import { ButtonModule } from 'primeng/button';
+ import { InputTextModule } from 'primeng/inputtext';

🗑️ IMPORTS NO USADOS:
- import { SomeUnusedModule } from 'primeng/someunused';

♻️ REFACTORIZACIÓN DE ESTADO:
Convertir propiedades a signals para mejor reactividad:
- loading: boolean = false;
+ loading = signal(false);

🎨 CLASE .CARD FALTANTE:
En línea 34, agregar contenedor card de Verona:
+ <div class="card">
    <!-- contenido existente -->
+ </div>
```

---

### **5. CHECKLIST DE CORRECCIONES**

```
ALTA PRIORIDAD:
[ ] Reemplazar <button> por <p-button> (3 instancias)
[ ] Reemplazar <input> por componentes PrimeNG (5 instancias)
[ ] Eliminar CSS inline (8 instancias)

MEDIA PRIORIDAD:
[ ] Agregar breakpoints responsive (12 elementos)
[ ] Usar signals en lugar de propiedades (4 propiedades)
[ ] Agregar clase .card en contenedores (2 contenedores)

BAJA PRIORIDAD:
[ ] Mejorar nombres de variables (3 variables)
[ ] Agregar comentarios JSDoc (1 método complejo)
```

---

## 🛠️ SISTEMA DE PUNTUACIÓN

### **Categorías de Evaluación (Peso)**

1. **Arquitectura (20%)**
   - Standalone component: 5 puntos
   - Imports correctos: 5 puntos
   - Estructura de archivos: 5 puntos
   - Buenas prácticas Angular: 5 puntos

2. **Componentes PrimeNG (30%)**
   - Sin HTML nativo: 10 puntos
   - Uso correcto de severities: 10 puntos
   - Props correctamente configuradas: 10 puntos

3. **Estilos PrimeFlex (25%)**
   - Sin CSS inline innecesario: 10 puntos
   - Uso de clases PrimeFlex: 10 puntos
   - Sistema de grid correcto: 5 puntos

4. **Responsive (15%)**
   - Breakpoints en grids: 7 puntos
   - Adaptación móvil/tablet/desktop: 8 puntos

5. **Buenas Prácticas (10%)**
   - Uso de Signals: 3 puntos
   - Inject() vs constructor: 2 puntos
   - Validaciones en formularios: 3 puntos
   - Código limpio: 2 puntos

### **Escala de Calificación**

| Puntuación | Calificación |
|------------|--------------|
| 9.0 - 10.0 | Excelente ⭐⭐⭐⭐⭐ |
| 7.5 - 8.9 | Muy Bueno ⭐⭐⭐⭐ |
| 6.0 - 7.4 | Bueno ⭐⭐⭐ |
| 4.0 - 5.9 | Regular ⭐⭐ |
| < 4.0 | Necesita Mejoras ⭐ |

---

## 🎯 EJEMPLOS DE AUDITORÍA

### **Ejemplo 1: Componente con Problemas**

```typescript
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
        <h3>Usuarios</h3>
        <button class="btn-primary">Nuevo Usuario</button>
      </div>
      
      <table class="table">
        <thead>
          <tr><th>Nombre</th><th>Email</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class UsersComponent {
  users: User[] = [];
}
```

**REPORTE DE AUDITORÍA:**

```
🎯 PUNTUACIÓN: 3.5/10 ⭐ (Necesita Mejoras)

🔴 PROBLEMAS CRÍTICOS:
1. HTML nativo (<button>, <table>)
2. CSS inline excesivo
3. Falta de imports de PrimeNG
4. No usa Signals

🛠️ CORRECCIONES NECESARIAS: 15

📋 PRIORIDADES:
🔴 Alta: 8 correcciones
🟡 Media: 5 correcciones
💡 Baja: 2 correcciones
```

---

### **Ejemplo 2: Componente Corregido**

```typescript
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule, 
    ButtonModule, 
    ToolbarModule
  ],
  template: `
    <div class="card">
      <p-toolbar styleClass="mb-4">
        <ng-template pTemplate="left">
          <h5 class="m-0">Usuarios</h5>
        </ng-template>
        <ng-template pTemplate="right">
          <p-button 
            label="Nuevo Usuario" 
            icon="pi pi-plus"
            severity="success" />
        </ng-template>
      </p-toolbar>
      
      <p-table [value]="users()" responsiveLayout="scroll">
        <ng-template pTemplate="header">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-user>
          <tr>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `
})
export class UsersComponent {
  users = signal<User[]>([]);
}
```

**REPORTE DE AUDITORÍA:**

```
🎯 PUNTUACIÓN: 9.5/10 ⭐⭐⭐⭐⭐ (Excelente)

✅ CUMPLIMIENTOS:
- Componentes PrimeNG correctos
- Sin CSS inline
- Uso de Signals
- Clase .card presente
- Imports mínimos y correctos

💡 SUGERENCIAS MENORES:
- Agregar lazy loading si hay muchos registros
- Agregar paginación
```

---

## 🚀 CORRECCIONES AUTOMÁTICAS

El agente puede aplicar correcciones automáticamente usando el siguiente protocolo:

### **Nivel 1: Reemplazos Seguros**
- CSS inline → Clases PrimeFlex
- HTML nativo → Componentes PrimeNG
- Propiedades → Signals (con precaución)

### **Nivel 2: Refactorizaciones**
- Agregar imports faltantes
- Restructurar grids
- Agregar breakpoints responsive

### **Nivel 3: Mejoras**
- Agregar validaciones
- Mejorar nombres de variables
- Agregar comentarios

---

## 📝 GUÍA DE PRIORIZACIÓN

### **🔴 CRÍTICO (Arreglar Inmediatamente)**
1. HTML nativo que debe ser PrimeNG
2. Componente no Standalone
3. CSS inline que afecta responsive
4. Imports incorrectos que causan errores

### **🟡 IMPORTANTE (Arreglar Pronto)**
1. CSS inline que puede ser PrimeFlex
2. Falta de breakpoints responsive
3. No usar Signals
4. Falta de clase .card

### **💡 SUGERENCIA (Mejora Opcional)**
1. Optimizaciones de performance
2. Mejoras de nombres
3. Comentarios adicionales
4. Refactorizaciones menores

---

**NOTA FINAL:** El objetivo de este auditor es mantener la consistencia absoluta con Verona y PrimeNG, eliminando CSS personalizado innecesario y asegurando que todo el código sea production-ready, mantenible y responsive."