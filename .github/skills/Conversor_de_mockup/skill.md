# SKILL: CONVERSOR DE MOCKUP A COMPONENTES VERONA

## 🎯 OBJETIVO
Analizar imágenes de diseños UI/UX y transformarlas en componentes Angular funcionales utilizando exclusivamente componentes de PrimeNG y siguiendo la arquitectura y estilos del template Verona.

---

## 📋 PROTOCOLO DE ANÁLISIS DE IMAGEN

Cuando recibas una imagen, el agente DEBE seguir estos pasos en orden:

### **FASE 1: ANÁLISIS VISUAL** 🔍

1. **Identificar la estructura general:**
   - ¿Es una página completa, un módulo, o un componente aislado?
   - ¿Cuántas secciones principales tiene?
   - ¿Qué tipo de layout usa? (columnas, grids, flex)

2. **Catalogar elementos UI visibles:**
   - Botones (primarios, secundarios, iconos)
   - Inputs y formularios
   - Tablas y listas
   - Cards y paneles
   - Gráficos y visualizaciones
   - Navegación (breadcrumbs, tabs, menús)
   - Modales y diálogos
   - Badges, tags, chips
   - Imágenes y avatares

3. **Detectar patrones de diseño:**
   - Sistema de colores (primario, secundario, success, danger, etc.)
   - Espaciado y padding
   - Tipografía (headings, body text)
   - Sombras y bordes
   - Iconografía

4. **Identificar interacciones:**
   - ¿Hay filtros o búsqueda?
   - ¿Hay paginación?
   - ¿Hay acciones CRUD?
   - ¿Hay navegación entre vistas?

---

### **FASE 2: MAPEO A COMPONENTES PRIMENG** 🗺️

Después del análisis, **mapea cada elemento visual** a su componente PrimeNG correcto:

#### **Catálogo de Mapeo**

**📚 Referencias en PrimeNG Showcase:**
- Documentación completa: `primeng-master/apps/showcase/doc/[componente]/`
- Ejemplos en vivo: `primeng-master/apps/showcase/doc/[componente]/examples/`

**🎨 Referencias en Verona:**
- Componentes UI Kit: `verona-ng-19.0.0/src/app/pages/uikit/`
- Apps completas: `verona-ng-19.0.0/src/app/apps/`

##### 🔘 **Botones y Acciones**
| Elemento Visual | Componente PrimeNG | Props Clave |
|----------------|-------------------|-------------|
| Botón sólido primario | `<p-button>` | `severity="primary"` |
| Botón outline | `<p-button>` | `[outlined]="true"` |
| Botón texto | `<p-button>` | `[text]="true"` |
| Botón icono redondo | `<p-button>` | `[rounded]="true" icon="pi pi-*"` |
| Botón con menú | `<p-splitButton>` | `[model]="items"` |
| Grupo de botones | `<p-buttonGroup>` | - |

##### 📝 **Formularios**
| Elemento Visual | Componente PrimeNG | Props Clave |
|----------------|-------------------|-------------|
| Input texto | `<input pInputText>` | `placeholder`, `formControlName` |
| Input número | `<p-inputnumber>` | `mode="decimal"` o `mode="currency"` |
| Select simple | `<p-dropdown>` | `[options]`, `optionLabel`, `optionValue` |
| Select múltiple | `<p-multiselect>` | `[options]`, `optionLabel` |
| Calendario/Fecha | `<p-calendar>` | `dateFormat="dd/mm/yy"` `[showIcon]="true"` |
| Checkbox | `<p-checkbox>` | `binary="true"` |
| Radio buttons | `<p-radiobutton>` | `value`, `formControlName` |
| Switch/Toggle | `<p-inputswitch>` | `formControlName` |
| Textarea | `<textarea pInputTextarea>` | `rows="3"` |
| Autocomplete | `<p-autocomplete>` | `[suggestions]`, `(completeMethod)` |
| Editor de texto | `<p-editor>` | `[style]="{'height':'320px'}"` |

##### 📊 **Tablas y Datos**
| Elemento Visual | Componente PrimeNG | Props Clave |
|----------------|-------------------|-------------|
| Tabla simple | `<p-table>` | `[value]`, `[columns]` |
| Tabla paginada | `<p-table>` | `[paginator]="true" [rows]="10"` |
| Tabla con filtros | `<p-table>` | `[globalFilterFields]` |
| Tabla editable | `<p-table>` | `pEditableColumn` |
| Lista de datos | `<p-dataview>` | `[value]`, `[layout]="grid"` |
| Árbol de datos | `<p-tree>` | `[value]`, TreeNode[] |
| Timeline | `<p-timeline>` | `[value]`, `align="alternate"` |

##### 🎴 **Contenedores y Layout**
| Elemento Visual | Componente PrimeNG | Props Clave |
|----------------|-------------------|-------------|
| Card con header | `<p-card>` | `header`, `subheader` |
| Tarjeta simple | `<div class="card">` | Clase de Verona |
| Panel colapsable | `<p-panel>` | `[toggleable]="true"` |
| Accordion | `<p-accordion>` | `<p-accordionTab>` |
| Tabs | `<p-tabview>` | `<p-tabPanel>` |
| Toolbar | `<p-toolbar>` | `pTemplate="left/right"` |
| Splitter | `<p-splitter>` | `[panelSizes]="[50,50]"` |

##### 💬 **Notificaciones y Feedback**
| Elemento Visual | Componente PrimeNG | Props Clave |
|----------------|-------------------|-------------|
| Toast/Snackbar | `<p-toast>` | MessageService |
| Alert/Message | `<p-message>` | `severity`, `text` |
| Mensajes inline | `<p-messages>` | `[value]="msgs"` |
| Diálogo/Modal | `<p-dialog>` | `[(visible)]`, `[modal]="true"` |
| Confirmación | `<p-confirmDialog>` | ConfirmationService |
| Sidebar | `<p-sidebar>` | `[(visible)]`, `position` |
| Overlay Panel | `<p-overlaypanel>` | - |

##### 🎨 **Visualización**
| Elemento Visual | Componente PrimeNG | Props Clave |
|----------------|-------------------|-------------|
| Badge/contador | `<p-badge>` | `[value]`, `severity` |
| Tag/Chip | `<p-tag>` | `[value]`, `severity` |
| Chip removible | `<p-chip>` | `[removable]="true"` |
| Avatar | `<p-avatar>` | `image`, `icon`, `label` |
| Skeleton loader | `<p-skeleton>` | `shape="circle"` `width` `height` |
| ProgressBar | `<p-progressbar>` | `[value]`, `[showValue]` |
| ProgressSpinner | `<p-progressspinner>` | - |

##### 📈 **Gráficos**
| Elemento Visual | Componente PrimeNG | Props Clave |
|----------------|-------------------|-------------|
| Gráfico de barras | `<p-chart>` | `type="bar"` |
| Gráfico de líneas | `<p-chart>` | `type="line"` |
| Gráfico circular | `<p-chart>` | `type="pie"` ou `type="doughnut"` |

##### 🧭 **Navegación**
| Elemento Visual | Componente PrimeNG | Props Clave |
|----------------|-------------------|-------------|
| Breadcrumb | `<p-breadcrumb>` | `[model]`, `[home]` |
| Menu horizontal | `<p-menubar>` | `[model]` |
| Menu contextual | `<p-contextmenu>` | `[model]` |
| Steps/Wizard | `<p-steps>` | `[model]`, `[activeIndex]` |
| Pagination | `<p-paginator>` | `[rows]`, `[totalRecords]` |

---

### **FASE 3: ANÁLISIS DE LAYOUT** 📐

Determina la estructura de grid basándote en:

1. **Sistema de Grid de Verona (PrimeFlex):**
   ```html
   <!-- 12 columnas responsive -->
   <div class="grid">
       <div class="col-12 md:col-6 lg:col-4">
           <!-- contenido -->
       </div>
   </div>
   ```

2. **Breakpoints:**
   - `col-12` - Móvil (ocupa todo el ancho)
   - `md:col-6` - Tablet (mitad del ancho)
   - `lg:col-4` - Desktop (tercio del ancho)
   - `xl:col-3` - Desktop grande (cuarto del ancho)

3. **Clases de espaciado PrimeFlex:**
   - Padding: `p-0` a `p-8` (vertical/horizontal), `px-*`, `py-*`, `pt-*`, etc.
   - Margin: `m-0` a `m-8`, `mx-*`, `my-*`, `mt-*`, etc.
   - Gap: `gap-2`, `gap-3`, `gap-4`

4. **Clases de alineación:**
   - `flex`, `inline-flex`
   - `justify-content-start|center|end|between|around`
   - `align-items-start|center|end|stretch`
   - `flex-direction-row|column`

---

### **FASE 4: EXTRACCIÓN DE COLORES Y ESTILOS** 🎨

1. **Colores de Verona (verificar en la imagen):**
   - **Primario:** Azul (variables en Verona)
   - **Secundario:** Gris
   - **Success:** Verde
   - **Warning:** Amarillo/Naranja
   - **Danger:** Rojo
   - **Info:** Azul claro

2. **Severities de PrimeNG:**
   ```typescript
   severity: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "help" | "contrast"
   ```

3. **Clases de texto:**
   - `text-primary`, `text-secondary`, `text-success`, etc.
   - `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`
   - `font-medium`, `font-semibold`, `font-bold`

4. **Clases de background:**
   - `bg-primary`, `bg-white`, `surface-ground`, `surface-card`

---

## 📝 PLANTILLA DE COMPONENTE GENERADO

### **Estructura Base del Componente**

````typescript
// filepath: verona-ng-19.0.0/src/app/pages/[nombre-componente]/[nombre-componente].component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importar SOLO los módulos PrimeNG que se usen en el diseño
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
// ... más imports según el diseño

@Component({
    selector: 'app-[nombre-componente]',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        // Módulos PrimeNG identificados
        ButtonModule,
        CardModule,
        InputTextModule
    ],
    template: `
        <div class="grid">
            <!-- Estructura basada en el análisis visual -->
        </div>
    `,
    styles: [`
        /* SOLO estilos muy específicos que no se puedan lograr con PrimeFlex */
        /* Preferir clases de utilidad de PrimeFlex */
    `]
})
export class [NombreComponente]Component {
    // Signals para estado reactivo
    data = signal<any[]>([]);
    loading = signal(false);
    
    // Métodos de negocio
}
````

---

## ✅ CHECKLIST DE VALIDACIÓN

Antes de entregar el código, verificar:

### Componentes
- [ ] ¿Todos los elementos usan componentes de PrimeNG?
- [ ] ¿No hay HTML nativo? (`<button>`, `<input>`, `<select>`, etc.)
- [ ] ¿Las importaciones son correctas y mínimas?
- [ ] ¿Es un componente Standalone?

### Layout
- [ ] ¿Usa el sistema de grid de PrimeFlex?
- [ ] ¿Es responsive con breakpoints?
- [ ] ¿Los contenedores principales tienen clase `.card`?
- [ ] ¿El espaciado usa clases de PrimeFlex?

### Estilos
- [ ] ¿Los colores usan severities de PrimeNG?
- [ ] ¿Los estilos inline son mínimos?
- [ ] ¿Los colores coinciden con el diseño?
- [ ] ¿Usa clases de tipografía de PrimeFlex?

### Funcionalidad
- [ ] ¿Los estados usan Signals?
- [ ] ¿Hay manejo de eventos si es necesario?
- [ ] ¿Los formularios usan FormControl si hay validación?

---

## 🎯 EJEMPLOS DE TRANSFORMACIÓN

### **Ejemplo 1: Card con Métricas**

**Descripción Visual:** Card blanca con icono azul, título, valor numérico grande y porcentaje de cambio.

```typescript
@Component({
    selector: 'app-metric-card',
    standalone: true,
    imports: [CommonModule, CardModule],
    template: `
        <div class="col-12 md:col-6 lg:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Ventas</span>
                        <div class="text-900 font-medium text-xl">2,100</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" 
                         style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">+24%</span>
                <span class="text-500">desde el mes pasado</span>
            </div>
        </div>
    `
})
```

---

### **Ejemplo 2: Formulario de Búsqueda**

**Descripción Visual:** Barra horizontal con input de búsqueda y botón.

```typescript
@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
    template: `
        <div class="flex gap-2">
            <span class="p-input-icon-left flex-1">
                <i class="pi pi-search"></i>
                <input 
                    pInputText 
                    type="text" 
                    [(ngModel)]="searchTerm"
                    placeholder="Buscar..." 
                    class="w-full" />
            </span>
            <p-button 
                icon="pi pi-filter" 
                severity="secondary"
                [outlined]="true" />
        </div>
    `
})
export class SearchBarComponent {
    searchTerm = signal('');
}
```

---

### **Ejemplo 3: Lista de Items con Acciones**

**Descripción Visual:** Lista de tarjetas con imagen, título, descripción y botones de acción.

```typescript
@Component({
    selector: 'app-item-list',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, AvatarModule, TagModule],
    template: `
        <div class="grid">
            <div class="col-12" *ngFor="let item of items()">
                <div class="card">
                    <div class="flex flex-column md:flex-row gap-4">
                        <div class="flex-shrink-0">
                            <p-avatar 
                                [image]="item.image" 
                                size="xlarge" 
                                shape="circle" />
                        </div>
                        <div class="flex-1">
                            <h5 class="mt-0 mb-2">{{ item.title }}</h5>
                            <p class="text-600 mb-3">{{ item.description }}</p>
                            <p-tag 
                                [value]="item.status" 
                                [severity]="item.statusSeverity" />
                        </div>
                        <div class="flex align-items-center gap-2">
                            <p-button 
                                icon="pi pi-pencil" 
                                severity="success"
                                [text]="true" 
                                [rounded]="true" />
                            <p-button 
                                icon="pi pi-trash" 
                                severity="danger"
                                [text]="true" 
                                [rounded]="true" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class ItemListComponent {
    items = signal([
        { 
            title: 'Item 1', 
            description: 'Descripción del item', 
            image: 'path/to/image.jpg',
            status: 'Activo',
            statusSeverity: 'success'
        }
    ]);
}
```

---

### **Ejemplo 4: Dashboard con Grid Complejo**

**Descripción Visual:** Dashboard con métricas arriba, gráfico a la izquierda y lista a la derecha.

```typescript
@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, CardModule, ChartModule, ButtonModule],
    template: `
        <!-- Métricas superiores -->
        <div class="grid">
            <div class="col-12 md:col-6 lg:col-3" *ngFor="let metric of metrics()">
                <div class="card mb-0">
                    <!-- Contenido métrica -->
                </div>
            </div>
        </div>

        <!-- Gráfico y tabla -->
        <div class="grid mt-4">
            <!-- Gráfico -->
            <div class="col-12 lg:col-8">
                <div class="card">
                    <h5>Ventas Mensuales</h5>
                    <p-chart type="line" [data]="chartData" [options]="chartOptions" />
                </div>
            </div>

            <!-- Lista de actividad reciente -->
            <div class="col-12 lg:col-4">
                <div class="card">
                    <h5>Actividad Reciente</h5>
                    <ul class="list-none p-0 m-0">
                        <li class="flex align-items-center py-3 border-bottom-1 surface-border">
                            <!-- Item actividad -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `
})
```

---

## 📤 FORMATO DE RESPUESTA

Cuando transformes un mockup, usa este formato:

### **1. Análisis de la Imagen**
```
📋 ELEMENTOS IDENTIFICADOS:
- 4 cards de métricas con iconos
- 1 barra de búsqueda
- 1 tabla con paginación
- 3 botones de acción (Nuevo, Exportar, Filtrar)

🎨 COLORES DETECTADOS:
- Primario: Azul (verificar en assets/layout/_config.scss)
- Success: Verde (usar severity="success" de PrimeNG)
- Background: Blanco/surface-card (variables de Verona)

📐 LAYOUT:
- Grid de 4 columnas para métricas (responsive a 2 en tablet, 1 en móvil)
- Tabla a ancho completo
- Toolbar superior con botones alineados a la derecha

🔍 REFERENCIAS ENCONTRADAS EN VERONA:
- Métricas similares: src/app/pages/dashboard/dashboardanalytics.component.ts
- Tabla similar: src/app/pages/crud/cruddemo.component.ts
- Toolbar: src/app/pages/uikit/table/tabledemo.component.ts
```

### **2. Mapeo de Componentes**
```
🗺️ COMPONENTES PRIMENG NECESARIOS:
✓ CardModule - Para las 4 métricas
✓ ButtonModule - Para botones de acción
✓ InputTextModule - Para búsqueda
✓ TableModule - Para tabla de datos
✓ TagModule - Para badges de estado
```

### **3. Código Generado**
````typescript
// filepath: verona-ng-19.0.0/src/app/pages/[nombre]/[nombre].component.ts
[CÓDIGO COMPLETO AQUÍ]
````

### **4. Instrucciones de Integración**
```
📝 PASOS PARA INTEGRAR:
1. Copiar el archivo en la ruta indicada
2. Agregar ruta en app.routes.ts
3. Si usa datos dinámicos, crear el servicio correspondiente

🔧 AJUSTES OPCIONALES:
- Modificar colores en las variables de severidad
- Ajustar breakpoints según necesidad
- Personalizar iconos (librería PrimeIcons)
```

---

## 🚨 REGLAS ESTRICTAS

### ❌ **PROHIBIDO**
1. Usar HTML nativo para components que existan en PrimeNG
2. Usar `<div>` para botones (siempre `<p-button>`)
3. Crear estilos CSS personalizados para cosas que PrimeFlex ya tiene
4. Usar librerías de UI que no sean PrimeNG
5. Ignorar el sistema de grid responsive
6. Usar colores hardcodeados (usar severities y variables)

### ✅ **OBLIGATORIO**
1. Componentes Standalone
2. Signals para estado reactivo
3. PrimeFlex para layout y espaciado
4. Breakpoints responsive en todos los grids
5. Clase `.card` para contenedores principales
6. Comentarios explicativos en código complejo
7. Import mínimo (solo los módulos que se usan)

---

## 🎓 GUÍA RÁPIDA DE DECISIONES

### **¿Qué componente usar cuando...?**

| Si veo en el diseño... | Usar... |
|------------------------|---------|
| Un botón | `<p-button>` |
| Un campo de texto | `<input pInputText>` o `<p-inputtext>` según el context |
| Un selector desplegable | `<p-dropdown>` |
| Una fecha | `<p-calendar>` |
| Una tabla | `<p-table>` |
| Una tarjeta/contenedor | `<div class="card">` o `<p-card>` |
| Un modal/popup | `<p-dialog>` |
| Un mensaje de éxito/error | `<p-toast>` + MessageService |
| Una confirmación | `<p-confirmDialog>` + ConfirmationService |
| Tabs/pestañas | `<p-tabview>` |
| Un gráfico | `<p-chart>` |
| Un badge/chip | `<p-tag>` o `<p-badge>` |
| Un avatar/foto perfil | `<p-avatar>` |
| Una lista de navegación | `<p-breadcrumb>` o `<p-menubar>` |

---

## 💡 TIPS DE CONVERSIÓN

### **1. Espaciado Consistente**
```html
<!-- Usar gap en lugar de margins individuales -->
<div class="flex gap-3">
    <p-button label="Acción 1" />
    <p-button label="Acción 2" />
</div>
```

### **2. Responsive First**
```html
<!-- Siempre definir mobile, tablet y desktop -->
<div class="col-12 md:col-6 lg:col-4">
```

### **3. Iconos Consistentes**
```html
<!-- Usar PrimeIcons (https://primeng.org/icons) -->
<i class="pi pi-search"></i>
<i class="pi pi-user"></i>
<i class="pi pi-cog"></i>
```

### **4. Estados Visuales**
```html
<!-- Usar severity para consistencia -->
<p-button severity="success" />  <!-- Verde -->
<p-button severity="danger" />   <!-- Rojo -->
<p-button severity="warning" />  <!-- Amarillo -->
```

### **5. Accesibilidad**
```html
<!-- Siempre agregar labels y placeholders -->
<label for="email">Email</label>
<input pInputText id="email" placeholder="correo@ejemplo.com" />
```

---

**NOTA FINAL:** El objetivo es generar código que sea visualmente idéntico al mockup pero usando 100% los componentes y estilos de PrimeNG y Verona. El código debe ser production-ready, responsive y accesible.