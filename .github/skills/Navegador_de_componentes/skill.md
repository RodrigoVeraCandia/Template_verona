# SKILL: NAVEGADOR DE COMPONENTES PRIMENG

## 🎯 PROPÓSITO
Ayudar al usuario a encontrar el componente PrimeNG ideal para su necesidad específica mediante búsqueda inteligente por funcionalidad, categoría o palabra clave. Proporciona código de ejemplo, documentación y referencias a implementaciones en Verona.

---

## 🔍 CUÁNDO USAR ESTE SKILL

**Activar cuando el usuario:**
- Pregunta "¿Qué componente uso para...?"
- Describe una funcionalidad sin mencionar componente específico
- Pide "mostrar componentes de [categoría]"
- Compara componentes: "¿Diferencia entre X y Y?"
- Busca por palabra clave: "componentes para gráficos"
- Pregunta "¿Cómo hacer un...?" (selector, tabla, formulario, etc.)

**Ejemplos de disparadores:**
```
✅ "¿Qué componente uso para seleccionar fechas?"
✅ "Muéstrame todos los componentes de formularios"
✅ "Necesito un componente para gráficos"
✅ "¿Diferencia entre dropdown y autocomplete?"
✅ "¿Cómo hago un selector múltiple?"
✅ "Componentes para mostrar tablas de datos"
```

---

## 📚 CATÁLOGO COMPLETO DE COMPONENTES PRIMENG 17+

### **CATEGORÍA 1: FORMULARIOS (Form Components)** 📝

#### **Inputs de Texto**
| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-inputtext` | Input simple texto | Nombre, email, dirección, textos cortos |
| `p-textarea` | Área de texto multilinea | Descripción, comentarios, notas |
| `p-password` | Input password con indicador | Contraseñas, campos sensibles |
| `p-inputmask` | Input con máscara | Teléfono, RFC, códigos postales |
| `p-inputgroup` | Agrupar inputs con addons | Inputs con iconos, prefijos, sufijos |

**Ejemplo - Input Texto:**
```html
<!-- Input simple -->
<label for="nombre" class="block mb-2">Nombre</label>
<input pInputText id="nombre" [(ngModel)]="nombre" 
       placeholder="Ingrese nombre" class="w-full" />

<!-- Textarea -->
<label for="descripcion" class="block mb-2">Descripción</label>
<textarea pInputTextarea id="descripcion" [(ngModel)]="descripcion" 
          rows="5" class="w-full"></textarea>

<!-- Password -->
<label for="password" class="block mb-2">Contraseña</label>
<p-password [(ngModel)]="password" [toggleMask]="true" 
            [feedback]="true" class="w-full" />

<!-- Input con máscara -->
<label for="telefono" class="block mb-2">Teléfono</label>
<p-inputmask mask="(999) 999-9999" [(ngModel)]="telefono" 
             placeholder="(555) 123-4567" class="w-full" />

<!-- Input Group -->
<div class="p-inputgroup">
    <span class="p-inputgroup-addon"><i class="pi pi-user"></i></span>
    <input type="text" pInputText placeholder="Username" />
</div>
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/input/inputdemo.component.ts`
- 📁 `src/app/pages/uikit/forms/formslayoutdemo.component.ts`

---

#### **Inputs Numéricos**
| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-inputnumber` | Números con formato | Precio, cantidad, porcentaje, moneda |
| `p-slider` | Selector visual de rango | Volumen, rango de precios, calificación |
| `p-knob` | Selector circular | Porcentaje, valores circulares |

**Ejemplo - Input Numérico:**
```html
<!-- Input número con moneda -->
<label for="precio" class="block mb-2">Precio</label>
<p-inputnumber [(ngModel)]="precio" mode="currency" 
               currency="USD" locale="en-US" class="w-full" />

<!-- Input número con porcentaje -->
<p-inputnumber [(ngModel)]="porcentaje" suffix="%" 
               [min]="0" [max]="100" class="w-full" />

<!-- Slider -->
<label class="block mb-2">Rango de Precio</label>
<p-slider [(ngModel)]="rangeValues" [range]="true" 
          [min]="0" [max]="1000" class="w-full" />

<!-- Knob -->
<p-knob [(ngModel)]="value" valueTemplate="{value}%" />
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/input/inputdemo.component.ts`

---

#### **Selectores (Dropdowns)**
| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-dropdown` | Selector simple | Categoría, país, estado (1 opción) |
| `p-multiselect` | Selector múltiple | Tags, permisos, categorías (múltiples) |
| `p-autocomplete` | Búsqueda con autocompletado | Búsqueda de productos, ciudades |
| `p-cascadeselect` | Selector jerárquico | País > Estado > Ciudad |
| `p-listbox` | Lista seleccionable | Opciones visibles sin dropdown |
| `p-treeselect` | Selector en árbol | Categorías anidadas, directorios |

**Ejemplo - Selectores:**
```html
<!-- Dropdown simple -->
<label for="categoria" class="block mb-2">Categoría</label>
<p-dropdown [options]="categorias" [(ngModel)]="selectedCategoria"
            optionLabel="name" optionValue="id"
            placeholder="Seleccione categoría" class="w-full" />

<!-- MultiSelect -->
<label for="tags" class="block mb-2">Tags</label>
<p-multiselect [options]="tags" [(ngModel)]="selectedTags"
               optionLabel="name" placeholder="Seleccione tags"
               [showToggleAll]="true" class="w-full" />

<!-- AutoComplete -->
<label for="producto" class="block mb-2">Buscar Producto</label>
<p-autocomplete [(ngModel)]="selectedProducto" 
                [suggestions]="filteredProductos"
                (completeMethod)="searchProducto($event)"
                field="name" placeholder="Buscar..."
                class="w-full" />

<!-- CascadeSelect -->
<p-cascadeselect [(ngModel)]="selectedCity" 
                 [options]="countries"
                 optionLabel="cname" optionGroupLabel="name"
                 [optionGroupChildren]="['states', 'cities']"
                 placeholder="País > Estado > Ciudad"
                 class="w-full" />
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/input/inputdemo.component.ts`
- 📁 `src/app/pages/service/country.service.ts` (datos para cascadeselect)

---

#### **Fechas y Calendario**
| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-calendar` | Selector de fecha/hora | Fecha nacimiento, fecha entrega, rangos |

**Ejemplo - Calendar:**
```html
<!-- Fecha simple -->
<label for="fecha" class="block mb-2">Fecha</label>
<p-calendar [(ngModel)]="fecha" dateFormat="dd/mm/yy" 
            [showIcon]="true" class="w-full" />

<!-- Rango de fechas -->
<p-calendar [(ngModel)]="rangeDates" selectionMode="range"
            [readonlyInput]="true" placeholder="Desde - Hasta"
            class="w-full" />

<!-- Con hora -->
<p-calendar [(ngModel)]="dateTime" [showTime]="true" 
            [showSeconds]="true" hourFormat="24"
            class="w-full" />

<!-- Solo mes/año -->
<p-calendar [(ngModel)]="date" view="month" 
            dateFormat="mm/yy" class="w-full" />
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/input/inputdemo.component.ts`

---

#### **Selectores Booleanos**
| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-checkbox` | Marcar opciones | Aceptar términos, múltiples opciones |
| `p-radiobutton` | Seleccionar 1 de N | Género, tipo de pago |
| `p-inputswitch` | Toggle ON/OFF | Activar/desactivar feature |
| `p-togglebutton` | Botón toggle | Modo día/noche, favorito |

**Ejemplo - Selectores Booleanos:**
```html
<!-- Checkbox simple -->
<p-checkbox [(ngModel)]="aceptado" [binary]="true" 
            label="Acepto términos y condiciones" />

<!-- Checkbox múltiple -->
<p-checkbox [(ngModel)]="selectedCategorias" 
            value="Tecnología" label="Tecnología" />
<p-checkbox [(ngModel)]="selectedCategorias" 
            value="Deportes" label="Deportes" />

<!-- Radio Button -->
<p-radiobutton [(ngModel)]="genero" value="M" 
               label="Masculino" />
<p-radiobutton [(ngModel)]="genero" value="F" 
               label="Femenino" />

<!-- InputSwitch -->
<label class="block mb-2">Activo</label>
<p-inputswitch [(ngModel)]="activo" />

<!-- ToggleButton -->
<p-togglebutton [(ngModel)]="checked" 
                onLabel="Activado" offLabel="Desactivado" 
                onIcon="pi pi-check" offIcon="pi pi-times" />
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/input/inputdemo.component.ts`

---

#### **Selectores Avanzados**
| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-rating` | Calificación por estrellas | Reseñas, rating de productos |
| `p-colorpicker` | Selector de color | Temas, personalización UI |
| `p-chips` | Input de múltiples valores | Tags dinámicos, emails múltiples |
| `p-selectbutton` | Botones seleccionables | Filtros visuales, vista grid/list |

**Ejemplo - Selectores Avanzados:**
```html
<!-- Rating -->
<label class="block mb-2">Calificación</label>
<p-rating [(ngModel)]="rating" [cancel]="false" />

<!-- ColorPicker -->
<label class="block mb-2">Color</label>
<p-colorpicker [(ngModel)]="color" />

<!-- Chips -->
<label class="block mb-2">Emails</label>
<p-chips [(ngModel)]="emails" separator="," 
         placeholder="Ingrese emails separados por coma" />

<!-- SelectButton -->
<p-selectbutton [options]="viewOptions" [(ngModel)]="selectedView"
                optionLabel="label" optionValue="value" />
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/input/inputdemo.component.ts`

---

### **CATEGORÍA 2: BOTONES (Button Components)** 🔘

| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-button` | Botón estándar | Guardar, cancelar, eliminar, acciones |
| `p-splitbutton` | Botón con menú | Acciones principales + secundarias |
| `p-speedDial` | Menú flotante | Acciones rápidas FAB (mobile) |

**Ejemplo - Botones:**
```html
<!-- Botón primario -->
<p-button label="Guardar" icon="pi pi-check" severity="primary" />

<!-- Botón secundario -->
<p-button label="Cancelar" severity="secondary" [outlined]="true" />

<!-- Botón peligro -->
<p-button label="Eliminar" icon="pi pi-trash" severity="danger" />

<!-- Botón icono redondo -->
<p-button icon="pi pi-pencil" [rounded]="true" [text]="true" 
          severity="success" />

<!-- SplitButton -->
<p-splitButton label="Guardar" [model]="items" 
               icon="pi pi-check" severity="primary" />

<!-- SpeedDial -->
<p-speedDial [model]="items" direction="up" 
             [style]="{'position':'fixed','right':'2rem','bottom':'2rem'}" />
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/button/buttondemo.component.ts`

---

### **CATEGORÍA 3: TABLAS Y DATOS (Data Components)** 📊

| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-table` | Tabla completa | Listados CRUD, reportes, grids |
| `p-treetable` | Tabla jerárquica | Categorías anidadas, org charts |
| `p-dataview` | Vista de datos custom | Cards de productos, galería |
| `p-picklist` | Lista de selección dual | Asignar permisos, mover items |
| `p-orderlist` | Lista reordenable | Prioridades, orden de elementos |
| `p-organizationchart` | Organigrama | Estructura jerárquica |
| `p-timeline` | Línea de tiempo | Historial, cronología, tracking |
| `p-virtualscroller` | Scroll virtual | Miles de registros, performance |
| `p-scroller` | Scroll lazy | Carga bajo demanda |

**Ejemplo - Table:**
```html
<p-table [value]="products()" [paginator]="true" [rows]="10"
         [loading]="loading()" responsiveLayout="scroll"
         [globalFilterFields]="['name','category','price']">
    
    <ng-template pTemplate="header">
        <tr>
            <th pSortableColumn="name">
                Nombre <p-sortIcon field="name" />
            </th>
            <th pSortableColumn="price">
                Precio <p-sortIcon field="price" />
            </th>
            <th>Acciones</th>
        </tr>
    </ng-template>
    
    <ng-template pTemplate="body" let-product>
        <tr>
            <td>{{ product.name }}</td>
            <td>{{ product.price | currency }}</td>
            <td>
                <p-button icon="pi pi-pencil" [rounded]="true" 
                          [text]="true" (onClick)="edit(product)" />
                <p-button icon="pi pi-trash" severity="danger" 
                          [rounded]="true" [text]="true" 
                          (onClick)="delete(product)" />
            </td>
        </tr>
    </ng-template>
</p-table>
```

**Ejemplo - DataView:**
```html
<p-dataview [value]="products()" [paginator]="true" [rows]="9">
    <ng-template let-product pTemplate="listItem">
        <div class="col-12">
            <div class="flex flex-column md:flex-row p-3 gap-3">
                <img [src]="'demo/images/product/' + product.image" 
                     [alt]="product.name" class="w-9rem" />
                <div class="flex-1">
                    <div class="text-xl font-bold">{{ product.name }}</div>
                    <p class="text-600">{{ product.description }}</p>
                    <span class="text-2xl font-bold">
                        {{ product.price | currency }}
                    </span>
                </div>
            </div>
        </div>
    </ng-template>
</p-dataview>
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/table/tabledemo.component.ts`
- 📁 `src/app/pages/crud/cruddemo.component.ts`
- 📁 `src/app/pages/uikit/list/listdemo.component.ts`

---

### **CATEGORÍA 4: PANELES (Panel Components)** 🎴

| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-card` | Tarjeta con header/footer | Cards de producto, info destacada |
| `p-panel` | Panel colapsable | Secciones expandibles, FAQ |
| `p-fieldset` | Agrupador de campos | Agrupar campos de formulario |
| `p-accordion` | Acordeón | FAQs, secciones colapsables |
| `p-tabview` | Pestañas | Información organizada en tabs |
| `p-toolbar` | Barra de herramientas | Acciones principales de página |
| `p-divider` | Separador visual | Dividir secciones |
| `p-splitter` | Divisor redimensionable | Layouts con paneles ajustables |
| `p-scrollpanel` | Panel con scroll custom | Áreas con scroll personalizado |

**Ejemplo - Paneles:**
```html
<!-- Card -->
<p-card header="Título" subheader="Subtítulo">
    <ng-template pTemplate="header">
        <img alt="Card" src="assets/image.jpg" />
    </ng-template>
    <p>Contenido del card</p>
    <ng-template pTemplate="footer">
        <p-button label="Ver más" />
    </ng-template>
</p-card>

<!-- Accordion -->
<p-accordion>
    <p-accordionTab header="Header 1">
        Contenido 1
    </p-accordionTab>
    <p-accordionTab header="Header 2">
        Contenido 2
    </p-accordionTab>
</p-accordion>

<!-- TabView -->
<p-tabView>
    <p-tabPanel header="Tab 1">
        Contenido Tab 1
    </p-tabPanel>
    <p-tabPanel header="Tab 2">
        Contenido Tab 2
    </p-tabPanel>
</p-tabView>

<!-- Toolbar -->
<p-toolbar styleClass="mb-4">
    <ng-template pTemplate="left">
        <h5 class="m-0">Productos</h5>
    </ng-template>
    <ng-template pTemplate="right">
        <p-button label="Nuevo" icon="pi pi-plus" />
    </ng-template>
</p-toolbar>
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/panels/panelsdemo.component.ts`

---

### **CATEGORÍA 5: OVERLAYS (Diálogos y Popups)** 💬

| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-dialog` | Modal/Diálogo | Formularios modales, info adicional |
| `p-confirmdialog` | Confirmación | Confirmar eliminaciones, acciones |
| `p-dynamicdialog` | Diálogo dinámico | Diálogos programáticos |
| `p-sidebar` | Panel lateral | Menú lateral, configuración |
| `p-tooltip` | Tooltip | Hints, ayuda contextual |
| `p-overlaypanel` | Panel flotante | Información extra, opciones |

**Ejemplo - Overlays:**
```html
<!-- Dialog -->
<p-dialog [(visible)]="visible" header="Nuevo Producto" 
          [modal]="true" [style]="{ width: '50vw' }"
          [breakpoints]="{ '960px': '75vw', '640px': '95vw' }">
    
    <p>Formulario aquí</p>
    
    <ng-template pTemplate="footer">
        <p-button label="Cancelar" severity="secondary" 
                  (onClick)="visible.set(false)" />
        <p-button label="Guardar" (onClick)="save()" />
    </ng-template>
</p-dialog>

<!-- ConfirmDialog (en template) -->
<p-confirmDialog />

<!-- ConfirmDialog (en TypeScript) -->
import { ConfirmationService } from 'primeng/api';

confirmDelete(item: Product) {
    this.confirmationService.confirm({
        message: '¿Está seguro de eliminar este producto?',
        header: 'Confirmar Eliminación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sí, eliminar',
        rejectLabel: 'Cancelar',
        accept: () => {
            // Eliminar
        }
    });
}

<!-- Tooltip -->
<p-button pTooltip="Editar producto" tooltipPosition="top" 
          icon="pi pi-pencil" />

<!-- Sidebar -->
<p-sidebar [(visible)]="sidebarVisible" position="right">
    <h3>Filtros</h3>
    <!-- Controles de filtro -->
</p-sidebar>
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/overlays/overlaysdemo.component.ts`

---

### **CATEGORÍA 6: ARCHIVOS** 📁

| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-fileupload` | Subir archivos | Upload de documentos, imágenes |

**Ejemplo - FileUpload:**
```html
<!-- Upload automático -->
<p-fileupload name="demo[]" 
              url="https://www.primefaces.org/cdn/api/upload.php"
              (onUpload)="onUpload($event)" 
              [multiple]="true" 
              accept="image/*" 
              maxFileSize="1000000">
    <ng-template pTemplate="content">
        <ul *ngIf="uploadedFiles.length">
            <li *ngFor="let file of uploadedFiles">
                {{ file.name }} - {{ file.size }} bytes
            </li>
        </ul>
    </ng-template>
</p-fileupload>

<!-- Upload manual -->
<p-fileupload [customUpload]="true" 
              (uploadHandler)="customUpload($event)"
              [multiple]="true" 
              accept="application/pdf" />
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/file/filedemo.component.ts`

---

### **CATEGORÍA 7: MENÚS** 🍔

| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-menu` | Menú vertical | Menú contextual, opciones |
| `p-menubar` | Barra de menú horizontal | Navegación principal |
| `p-tieredmenu` | Menú multinivel | Submenús anidados |
| `p-megamenu` | Mega menú | Menú grande con categorías |
| `p-panelmenu` | Panel de navegación | Sidebar con menús colapsables |
| `p-contextmenu` | Menú contextual | Clic derecho, acciones rápidas |
| `p-breadcrumb` | Migas de pan | Navegación jerárquica |
| `p-steps` | Pasos/Wizard | Proceso de varios pasos |
| `p-tabmenu` | Menú de pestañas | Navegación por tabs |

**Ejemplo - Menús:**
```html
<!-- Menu simple -->
<p-menu [model]="items" />

<!-- Menubar -->
<p-menubar [model]="items">
    <ng-template pTemplate="start">
        <img src="logo.png" height="40" />
    </ng-template>
</p-menubar>

<!-- Breadcrumb -->
<p-breadcrumb [model]="items" [home]="home" />

<!-- Steps -->
<p-steps [model]="items" [(activeIndex)]="activeIndex" />

<!-- ContextMenu (asociado a elemento) -->
<p-contextMenu #cm [model]="items" />
<div [contextMenu]="cm">
    Clic derecho aquí
</div>
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/menu/menudemo.component.ts`
- 📁 `src/app/layout/app.menu.component.ts`

---

### **CATEGORÍA 8: GRÁFICOS** 📈

| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-chart` | Gráficos (Chart.js) | Estadísticas, analytics, reportes |

**Tipos de Gráficos:**
- Line Chart (líneas)
- Bar Chart (barras)
- Pie Chart (pastel)
- Doughnut Chart (dona)
- Radar Chart (radar)
- Polar Area Chart
- Bubble Chart (burbujas)
- Scatter Chart (dispersión)

**Ejemplo - Chart:**
```typescript
// En el componente
chartData = signal({
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
        {
            label: 'Ventas',
            data: [65, 59, 80, 81, 56],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
        }
    ]
});

chartOptions = signal({
    responsive: true,
    maintainAspectRatio: false
});
```

```html
<!-- Gráfico de líneas -->
<p-chart type="line" [data]="chartData()" 
         [options]="chartOptions()" 
         [style]="{ height: '400px' }" />

<!-- Gráfico de barras -->
<p-chart type="bar" [data]="chartData()" 
         [options]="chartOptions()" />

<!-- Gráfico de pastel -->
<p-chart type="pie" [data]="chartData()" />
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/charts/chartsdemo.component.ts`
- 📁 `src/app/pages/dashboard/dashboarddemo.component.ts`

---

### **CATEGORÍA 9: MENSAJES** 📣

| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-toast` | Notificaciones toast | Éxito, error, info, advertencia |
| `p-messages` | Mensajes inline | Mensajes persistentes en página |
| `p-message` | Mensaje individual | Mensaje simple en formulario |

**Ejemplo - Mensajes:**
```html
<!-- Toast (en template) -->
<p-toast />

<!-- Messages -->
<p-messages [(value)]="messages" [enableService]="false" />

<!-- Message simple -->
<p-message severity="success" text="Operación exitosa" />
<p-message severity="error" text="Error al guardar" />
```

```typescript
// Toast (en TypeScript)
import { MessageService } from 'primeng/api';

private messageService = inject(MessageService);

showSuccess() {
    this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Registro guardado correctamente',
        life: 3000
    });
}

showError() {
    this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo completar la operación'
    });
}
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/messages/messagesdemo.component.ts`

---

### **CATEGORÍA 10: MULTIMEDIA** 🎬

| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-image` | Imagen con preview | Galería, zoom de imágenes |
| `p-galleria` | Galería de imágenes | Carrusel, lightbox, thumbnails |
| `p-carousel` | Carrusel | Productos destacados, banners |

**Ejemplo - Multimedia:**
```html
<!-- Image con preview -->
<p-image src="producto.jpg" alt="Producto" 
         [preview]="true" width="250" />

<!-- Galleria -->
<p-galleria [value]="images" [responsiveOptions]="responsiveOptions"
            [containerStyle]="{ 'max-width': '640px' }"
            [numVisible]="5" [circular]="true">
    <ng-template pTemplate="item" let-item>
        <img [src]="item.itemImageSrc" style="width: 100%;" />
    </ng-template>
    <ng-template pTemplate="thumbnail" let-item>
        <img [src]="item.thumbnailImageSrc" />
    </ng-template>
</p-galleria>

<!-- Carousel -->
<p-carousel [value]="products" [numVisible]="3" [numScroll]="1">
    <ng-template let-product pTemplate="item">
        <div class="border-1 surface-border p-3">
            <img [src]="product.image" class="w-full" />
            <h4>{{ product.name }}</h4>
            <h6 class="text-2xl">{{ product.price | currency }}</h6>
        </div>
    </ng-template>
</p-carousel>
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/media/mediademo.component.ts`

---

### **CATEGORÍA 11: VARIOS** 🎛️

| Componente | Uso Principal | Cuándo Usar |
|------------|---------------|-------------|
| `p-progressbar` | Barra de progreso | Carga, completitud |
| `p-progressspinner` | Spinner de carga | Loading, procesando |
| `p-skeleton` | Placeholder loading | Loading states elegantes |
| `p-avatar` | Avatar/Inicial | Foto de perfil, usuario |
| `p-avatargroup` | Grupo de avatares | Múltiples usuarios |
| `p-badge` | Insignia/Contador | Notificaciones, contador |
| `p-chip` | Chip/Tag | Tags, categorías, filtros |
| `p-tag` | Etiqueta | Estado, categoría |
| `p-inplace` | Edición inline | Editar texto in-place |
| `p-metergroup` | Grupo de medidores | Múltiples métricas |
| `p-scrolltop` | Botón scroll to top | Volver arriba |
| `p-terminal` | Terminal | Consola, comandos |
| `p-blockui` | Bloquear UI | Bloquear interacción |

**Ejemplo - Varios:**
```html
<!-- ProgressBar -->
<p-progressbar [value]="value" />

<!-- ProgressSpinner -->
<p-progressSpinner *ngIf="loading()" />

<!-- Skeleton -->
<p-skeleton width="10rem" height="4rem" />

<!-- Avatar -->
<p-avatar label="P" size="large" shape="circle" />
<p-avatar image="user.jpg" size="xlarge" />

<!-- Badge -->
<p-button label="Messages" 
          badge="8" badgeClass="p-badge-danger" />

<!-- Chip -->
<p-chip label="Apple" icon="pi pi-apple" />
<p-chip label="Removable" [removable]="true" />

<!-- Tag -->
<p-tag value="New" severity="success" />
<p-tag value="Deprecated" severity="danger" />

<!-- ScrollTop -->
<p-scrollTop />
```

**Ubicación en Verona:**
- 📁 `src/app/pages/uikit/misc/miscdemo.component.ts`
- 📁 `src/app/pages/uikit/invalidstate/invalidstatedemo.component.ts`

---

## 🔎 ALGORITMO DE BÚSQUEDA

### **PASO 1: Identificar Tipo de Búsqueda**

```typescript
interface SearchQuery {
    type: 'funcionalidad' | 'categoria' | 'keyword' | 'comparacion';
    query: string;
    context?: string;
}
```

**Ejemplos de clasificación:**
```
"¿Qué componente uso para fechas?" → funcionalidad
"Muestra componentes de formularios" → categoria
"componentes para gráficos" → keyword
"¿Diferencia entre dropdown y autocomplete?" → comparacion
```

---

### **PASO 2: Mapeo de Funcionalidad → Componente**

**Diccionario de Funcionalidades:**
```typescript
const FUNCTION_MAP = {
    // Texto
    'texto': ['p-inputtext', 'p-textarea'],
    'nombre': ['p-inputtext'],
    'email': ['p-inputtext'],
    'contraseña': ['p-password'],
    'password': ['p-password'],
    'teléfono': ['p-inputmask'],
    'descripción': ['p-textarea'],
    
    // Números
    'número': ['p-inputnumber'],
    'precio': ['p-inputnumber'],
    'cantidad': ['p-inputnumber'],
    'porcentaje': ['p-inputnumber', 'p-slider', 'p-knob'],
    'rango': ['p-slider'],
    
    // Selectores
    'seleccionar': ['p-dropdown', 'p-multiselect', 'p-autocomplete'],
    'selector': ['p-dropdown', 'p-multiselect'],
    'categoría': ['p-dropdown', 'p-cascadeselect'],
    'múltiple': ['p-multiselect', 'p-checkbox'],
    'búsqueda': ['p-autocomplete'],
    'autocompletar': ['p-autocomplete'],
    
    // Fechas
    'fecha': ['p-calendar'],
    'calendario': ['p-calendar'],
    'hora': ['p-calendar'],
    'rango de fechas': ['p-calendar'],
    
    // Booleanos
    'checkbox': ['p-checkbox'],
    'radio': ['p-radiobutton'],
    'toggle': ['p-inputswitch', 'p-togglebutton'],
    'activar': ['p-inputswitch'],
    
    // Tablas
    'tabla': ['p-table'],
    'listado': ['p-table', 'p-dataview'],
    'grid': ['p-table', 'p-dataview'],
    'datos': ['p-table', 'p-dataview'],
    
    // Botones
    'botón': ['p-button'],
    'acción': ['p-button', 'p-splitbutton'],
    
    // Diálogos
    'modal': ['p-dialog'],
    'diálogo': ['p-dialog'],
    'confirmación': ['p-confirmdialog'],
    'popup': ['p-overlaypanel', 'p-dialog'],
    
    // Gráficos
    'gráfico': ['p-chart'],
    'estadística': ['p-chart'],
    'chart': ['p-chart'],
    
    // Archivos
    'archivo': ['p-fileupload'],
    'upload': ['p-fileupload'],
    'subir': ['p-fileupload'],
    
    // Mensajes
    'notificación': ['p-toast'],
    'mensaje': ['p-messages', 'p-message', 'p-toast'],
    'error': ['p-toast', 'p-message'],
    
    // Multimedia
    'imagen': ['p-image', 'p-galleria'],
    'galería': ['p-galleria'],
    'carrusel': ['p-carousel'],
    
    // Otros
    'loading': ['p-progressbar', 'p-progressspinner', 'p-skeleton'],
    'cargando': ['p-progressbar', 'p-progressspinner'],
    'avatar': ['p-avatar'],
    'rating': ['p-rating'],
    'color': ['p-colorpicker'],
    'menú': ['p-menu', 'p-menubar'],
    'navegación': ['p-menubar', 'p-breadcrumb', 'p-steps']
};
```

---

### **PASO 3: Generar Respuesta Estructurada**

**Formato de salida estándar:**

```markdown
## 📦 COMPONENTE SUGERIDO: [nombre-componente]

### ✅ USO RECOMENDADO
[Descripción clara de cuándo usar]

### 📚 MÓDULO A IMPORTAR
```typescript
import { [ModuleName] } from 'primeng/[module]';
```

### 💻 EJEMPLO DE CÓDIGO
```html
[Código HTML completo]
```

```typescript
[Código TypeScript si es necesario]
```

### 📁 EJEMPLO EN VERONA
- 📂 `src/app/pages/[ruta]/[archivo].component.ts`
- 🔗 Línea [X] - [Y]

### 🔗 DOCUMENTACIÓN OFICIAL
- PrimeNG: https://primeng.org/[componente]
- Showcase: primeng-master/apps/showcase/doc/[componente]/

### 🎯 ALTERNATIVAS
[Si hay componentes similares o relacionados]

| Componente | Cuándo Usarlo | Diferencia Principal |
|------------|---------------|---------------------|
| p-[alt1] | [escenario] | [diferencia] |
| p-[alt2] | [escenario] | [diferencia] |
```

---

## 🎯 EJEMPLOS DE USO DEL SKILL

### **Ejemplo 1: Búsqueda por Funcionalidad**

**Input Usuario:**
```
"¿Qué componente uso para seleccionar un rango de fechas?"
```

**Respuesta:**
```markdown
## 📦 COMPONENTE SUGERIDO: p-calendar

### ✅ USO RECOMENDADO
Selector de fechas con soporte para:
- Fecha simple
- Rango de fechas (desde - hasta)
- Selector de mes/año
- Selector con hora
- Formato personalizable

### 📚 MÓDULO A IMPORTAR
```typescript
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'app-my-component',
    standalone: true,
    imports: [CommonModule, FormsModule, CalendarModule]
})
```

### 💻 EJEMPLO DE CÓDIGO - RANGO DE FECHAS
```html
<label for="rangeDates" class="block mb-2">Rango de Fechas</label>
<p-calendar [(ngModel)]="rangeDates" 
            selectionMode="range"
            [readonlyInput]="true" 
            dateFormat="dd/mm/yy"
            [showIcon]="true"
            placeholder="Seleccionar rango"
            class="w-full" />
```

```typescript
export class MyComponent {
    rangeDates = signal<Date[]>([]);
}
```

### 📁 EJEMPLO EN VERONA
- 📂 `src/app/pages/uikit/input/inputdemo.component.ts`
- 🔗 Línea 85-92 (ejemplo de rango)

### 🔗 DOCUMENTACIÓN OFICIAL
- PrimeNG: https://primeng.org/calendar
- Showcase: primeng-master/apps/showcase/doc/calendar/

### 🎯 VARIANTES COMUNES

**Fecha Simple:**
```html
<p-calendar [(ngModel)]="date" dateFormat="dd/mm/yy" 
            [showIcon]="true" />
```

**Con Hora:**
```html
<p-calendar [(ngModel)]="dateTime" [showTime]="true" 
            hourFormat="24" />
```

**Solo Mes y Año:**
```html
<p-calendar [(ngModel)]="date" view="month" dateFormat="mm/yy" />
```
```

---

### **Ejemplo 2: Búsqueda por Categoría**

**Input Usuario:**
```
"Muéstrame todos los componentes de formularios"
```

**Respuesta:**
```markdown
## 📝 COMPONENTES DE FORMULARIOS

### **INPUTS DE TEXTO**
| Componente | Uso | Ejemplo |
|------------|-----|---------|
| `p-inputtext` | Texto simple | Nombre, email, dirección |
| `p-textarea` | Texto largo | Descripción, comentarios |
| `p-password` | Contraseña | Login, registro |
| `p-inputmask` | Texto con máscara | Teléfono, RFC |

### **INPUTS NUMÉRICOS**
| Componente | Uso | Ejemplo |
|------------|-----|---------|
| `p-inputnumber` | Números | Precio, cantidad |
| `p-slider` | Rango visual | Filtro de precio |
| `p-knob` | Selector circular | Porcentaje |

### **SELECTORES**
| Componente | Uso | Ejemplo |
|------------|-----|---------|
| `p-dropdown` | Selección simple | Categoría |
| `p-multiselect` | Selección múltiple | Tags |
| `p-autocomplete` | Búsqueda | Productos |
| `p-cascadeselect` | Jerárquico | País>Estado>Ciudad |

### **FECHAS**
| Componente | Uso | Ejemplo |
|------------|-----|---------|
| `p-calendar` | Fechas/rangos | Fecha nacimiento |

### **BOOLEANOS**
| Componente | Uso | Ejemplo |
|------------|-----|---------|
| `p-checkbox` | Múltiples opciones | Aceptar términos |
| `p-radiobutton` | Una opción | Género |
| `p-inputswitch` | Toggle ON/OFF | Activar feature |

### **AVANZADOS**
| Componente | Uso | Ejemplo |
|------------|-----|---------|
| `p-rating` | Calificación | Review producto |
| `p-colorpicker` | Color | Tema UI |
| `p-chips` | Tags dinámicos | Emails múltiples |

### 📁 EJEMPLOS EN VERONA
- 📂 `src/app/pages/uikit/input/inputdemo.component.ts` (todos los inputs)
- 📂 `src/app/pages/uikit/forms/formslayoutdemo.component.ts` (formularios completos)
```

---

### **Ejemplo 3: Comparación de Componentes**

**Input Usuario:**
```
"¿Diferencia entre p-dropdown y p-autocomplete?"
```

**Respuesta:**
```markdown
## 🔄 COMPARACIÓN: p-dropdown vs p-autocomplete

### **p-dropdown** (Selector Simple)

**✅ Usar cuando:**
- Tienes pocas opciones (menos de 50)
- El usuario conoce las opciones disponibles
- Quieres un selector estándar
- No necesitas búsqueda

**Ejemplo:**
```html
<p-dropdown [options]="categorias" 
            [(ngModel)]="selectedCategoria"
            optionLabel="name" 
            placeholder="Seleccione categoría" />
```

**Casos de uso:**
- Selector de categoría
- Selector de país/estado
- Selector de tipo/estado

---

### **p-autocomplete** (Búsqueda con Autocompletado)

**✅ Usar cuando:**
- Tienes muchas opciones (50+)
- Necesitas búsqueda/filtrado
- El usuario debe escribir para encontrar
- Quieres sugerencias dinámicas

**Ejemplo:**
```html
<p-autocomplete [(ngModel)]="selectedProduct" 
                [suggestions]="filteredProducts"
                (completeMethod)="searchProduct($event)"
                field="name" 
                placeholder="Buscar producto..." />
```

```typescript
searchProduct(event: any) {
    this.filteredProducts.set(
        this.products().filter(p => 
            p.name.toLowerCase().includes(event.query.toLowerCase())
        )
    );
}
```

**Casos de uso:**
- Búsqueda de productos
- Búsqueda de ciudades
- Búsqueda de clientes

---

### **TABLA COMPARATIVA**

| Característica | p-dropdown | p-autocomplete |
|----------------|------------|----------------|
| **Búsqueda** | ❌ No | ✅ Sí |
| **Cantidad de opciones** | Pocas (< 50) | Muchas (50+) |
| **UX** | Click → selección | Escribir → sugerencias |
| **Performance** | Buena | Mejor con datos dinámicos |
| **Complejidad** | Baja | Media |
| **Multi-selección** | ❌ (usar p-multiselect) | ✅ Soportado |

### 📁 EJEMPLOS EN VERONA
- **p-dropdown:** `src/app/pages/uikit/input/inputdemo.component.ts` línea 45
- **p-autocomplete:** `src/app/pages/uikit/input/inputdemo.component.ts` línea 120

### 🎯 RECOMENDACIÓN
- **< 20 opciones:** usa `p-dropdown`
- **20-50 opciones:** usa `p-dropdown` con filtro
- **> 50 opciones:** usa `p-autocomplete`
```

---

## ✅ CHECKLIST DE VALIDACIÓN

Antes de entregar la respuesta, verifica:

### **Información Completa**
- [ ] Nombre exacto del componente
- [ ] Módulo a importar (import statement completo)
- [ ] Código HTML de ejemplo funcional
- [ ] Código TypeScript si es necesario
- [ ] Ubicación en Verona (archivo y línea)

### **Calidad del Código**
- [ ] Código usa Signals (no variables normales)
- [ ] Usa PrimeFlex para layout (col-12, w-full, etc.)
- [ ] Incluye labels y placeholders
- [ ] Es responsive (breakpoints si aplica)

### **Documentación**
- [ ] Link a documentación oficial de PrimeNG
- [ ] Referencia a showcase de PrimeNG
- [ ] Ejemplos en Verona mencionados

### **Contexto Adicional**
- [ ] Menciona alternativas si existen
- [ ] Explica cuándo NO usar el componente
- [ ] Incluye casos de uso reales

---

## 🎓 CASOS ESPECIALES

### **Cuando NO hay componente exacto**

Si el usuario pide algo que no existe como componente individual:

```markdown
## ❌ NO HAY COMPONENTE ESPECÍFICO

Para "[funcionalidad solicitada]" no existe un componente PrimeNG dedicado.

### ✅ SOLUCIONES RECOMENDADAS:

**Opción 1: Combinar componentes**
```html
<!-- Ejemplo de combinación -->
```

**Opción 2: Usar componente base + customización**
```html
<!-- Ejemplo con customización -->
```

**Opción 3: Implementación custom con PrimeFlex**
```html
<!-- Ejemplo custom -->
```
```

---

### **Cuando hay múltiples opciones igualmente válidas**

```markdown
## 🎯 MÚLTIPLES OPCIONES DISPONIBLES

Para "[funcionalidad]" tienes estas opciones:

### **OPCIÓN 1: [Componente A]** ⭐ Recomendado
**Usar cuando:** [escenario ideal]
[Código ejemplo]

### **OPCIÓN 2: [Componente B]**
**Usar cuando:** [escenario alternativo]
[Código ejemplo]

### **TABLA COMPARATIVA**
[Tabla de comparación]

### 💡 RECOMENDACIÓN FINAL
[Sugerencia basada en caso de uso común en Verona]
```

---

## 📖 GLOSARIO DE TÉRMINOS

**Términos que el usuario podría usar y su mapeo:**

| Usuario dice... | Componente correcto |
|----------------|---------------------|
| "input" | p-inputtext |
| "select" | p-dropdown |
| "combobox" | p-dropdown o p-autocomplete |
| "date picker" | p-calendar |
| "grid" | p-table o p-dataview |
| "modal" | p-dialog |
| "popup" | p-dialog o p-overlaypanel |
| "notification" | p-toast |
| "alert" | p-message o p-toast |
| "card" | div.card (Verona) o p-card |
| "chart" | p-chart |
| "upload" | p-fileupload |
| "wizard" | p-steps |
| "tooltip" | p-tooltip |
| "sidebar" | p-sidebar |
| "accordion" | p-accordion |
| "carousel" | p-carousel |
| "gallery" | p-galleria |

---

## 🎯 OBJETIVO FINAL

Cada respuesta debe ser:
1. **Precisa:** Componente correcto para la necesidad
2. **Completa:** Código funcional ready-to-use
3. **Contextual:** Referencias a Verona
4. **Educativa:** Explica cuándo usar y cuándo no
5. **Práctica:** Ejemplos del mundo real

El usuario debe poder **copiar el código y usarlo inmediatamente** sin modificaciones.
