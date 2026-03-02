# SKILL: MIGRADOR DE COMPONENTES LEGACY

## 🎯 PROPÓSITO
Convertir componentes Angular legacy (módulos, observables, constructor injection) a código moderno Angular 19+ utilizando standalone components, signals, inject(), y las mejores prácticas actuales.

---

## 🔍 CUÁNDO USAR ESTE SKILL

**Activar cuando el usuario:**
- Pide "migra este componente a standalone"
- Solicita "convierte esto a signals"
- Dice "actualiza este código a Angular 19"
- Pregunta "¿cómo modernizar este componente?"
- Menciona "legacy", "módulos", "NgModule"
- Pide "refactoriza a mejores prácticas"

**Ejemplos de disparadores:**
```
✅ "Convierte este componente a standalone"
✅ "Migra de observables a signals"
✅ "Actualiza este código legacy"
✅ "Moderniza este componente con inject()"
✅ "Refactoriza a Angular 19"
✅ "Convierte @Input a input()"
```

---

## 📋 PROTOCOLO DE MIGRACIÓN

### **FASE 1: ANÁLISIS DEL CÓDIGO LEGACY** 🔍

Identificar todos los patrones legacy presentes:

#### **1.1 Checklist de Detección**

```typescript
// Patterns a detectar:

✓ [  ] ¿Usa @NgModule?
✓ [  ] ¿Tiene constructor con inyección de dependencias?
✓ [  ] ¿Usa propiedades normales en lugar de signals?
✓ [  ] ¿Implementa OnInit, OnDestroy, etc.?
✓ [  ] ¿Usa @Input(), @Output() decoradores?
✓ [  ] ¿Usa subscribe() directamente en template?
✓ [  ] ¿Tiene unsubscribe manual en ngOnDestroy?
✓ [  ] ¿Usa ViewChild/ContentChild con decorador?
✓ [  ] ¿Usa ChangeDetectorRef manualmente?
✓ [  ] ¿Importa módulos completos (FormsModule en imports)?
```

#### **1.2 Clasificación de Complejidad**

**Baja Complejidad:**
- Component simple con @NgModule
- Sin formularios complejos
- Pocas dependencias
- Sin subscripciones complejas

**Media Complejidad:**
- Formularios reactivos
- Múltiples servicios inyectados
- Varias subscripciones
- ViewChild/ContentChild

**Alta Complejidad:**
- Componentes con RxJS complejo
- Múltiples subjects/behaviorSubjects
- ChangeDetectionStrategy customizada
- Intercomunicación compleja con hijos

---

### **FASE 2: MAPA DE TRANSFORMACIONES** 🗺️

#### **2.1 NgModule → Standalone Component**

**ANTES (Legacy):**
```typescript
// my-component.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponent { }
```

```typescript
// my-component.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyComponent } from './my-component.component';

@NgModule({
  declarations: [MyComponent],
  imports: [CommonModule],
  exports: [MyComponent]
})
export class MyComponentModule { }
```

**DESPUÉS (Moderno):**
```typescript
// my-component.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponent { }

// ✅ Eliminar my-component.module.ts completamente
```

---

#### **2.2 Constructor Injection → inject()**

**ANTES (Legacy):**
```typescript
import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
}
```

**DESPUÉS (Moderno):**
```typescript
import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
}
```

---

#### **2.3 Propiedades → Signals**

**ANTES (Legacy):**
```typescript
export class ProductsComponent {
  products: Product[] = [];
  loading: boolean = false;
  selectedProduct: Product | null = null;
  errorMessage: string = '';
  
  totalCount: number = 0;
  
  get filteredProducts(): Product[] {
    return this.products.filter(p => p.active);
  }
}
```

**DESPUÉS (Moderno):**
```typescript
import { signal, computed } from '@angular/core';

export class ProductsComponent {
  products = signal<Product[]>([]);
  loading = signal(false);
  selectedProduct = signal<Product | null>(null);
  errorMessage = signal('');
  
  totalCount = computed(() => this.products().length);
  
  filteredProducts = computed(() => 
    this.products().filter(p => p.active)
  );
}
```

---

#### **2.4 @Input/@Output → input()/output()**

**ANTES (Legacy):**
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  template: `...`
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showActions: boolean = true;
  @Output() productSelected = new EventEmitter<Product>();
  @Output() productDeleted = new EventEmitter<number>();
  
  selectProduct() {
    this.productSelected.emit(this.product);
  }
  
  deleteProduct() {
    this.productDeleted.emit(this.product.id);
  }
}
```

**DESPUÉS (Moderno):**
```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `...`
})
export class ProductCardComponent {
  product = input.required<Product>();
  showActions = input(true);
  
  productSelected = output<Product>();
  productDeleted = output<number>();
  
  selectProduct() {
    this.productSelected.emit(this.product());
  }
  
  deleteProduct() {
    this.productDeleted.emit(this.product().id);
  }
}
```

---

#### **2.5 Subscribe Manual → toSignal()**

**ANTES (Legacy):**
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private subscription: Subscription = new Subscription();
  
  constructor(private productService: ProductService) {}
  
  ngOnInit() {
    this.subscription.add(
      this.productService.getProducts().subscribe(
        products => this.products = products
      )
    );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

**DESPUÉS (Moderno - Opción 1: toSignal):**
```typescript
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

export class ProductsComponent {
  private productService = inject(ProductService);
  
  products = toSignal(this.productService.getProducts(), {
    initialValue: [] as Product[]
  });
  
  // ✅ No necesita ngOnDestroy, auto-cleanup
}
```

**DESPUÉS (Moderno - Opción 2: Signals + subscribe):**
```typescript
import { Component, signal, inject, OnInit } from '@angular/core';

export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  
  products = signal<Product[]>([]);
  
  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products.set(products);
    });
  }
  
  // ✅ Si el componente se destruye, el subscribe se cancela automáticamente
}
```

---

#### **2.6 ViewChild → viewChild()**

**ANTES (Legacy):**
```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Table } from 'primeng/table';

export class ProductsComponent implements AfterViewInit {
  @ViewChild('dt') table!: Table;
  
  ngAfterViewInit() {
    console.log(this.table);
  }
  
  clearFilters() {
    this.table.clear();
  }
}
```

**DESPUÉS (Moderno):**
```typescript
import { Component, viewChild, AfterViewInit } from '@angular/core';
import { Table } from 'primeng/table';

export class ProductsComponent implements AfterViewInit {
  table = viewChild.required<Table>('dt');
  
  ngAfterViewInit() {
    console.log(this.table());
  }
  
  clearFilters() {
    this.table()?.clear();
  }
}
```

---

#### **2.7 BehaviorSubject → Signal**

**ANTES (Legacy):**
```typescript
import { BehaviorSubject } from 'rxjs';

export class ProductsComponent {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();
  
  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.productsSubject.next(products);
    });
  }
  
  addProduct(product: Product) {
    const current = this.productsSubject.value;
    this.productsSubject.next([...current, product]);
  }
}
```

**DESPUÉS (Moderno):**
```typescript
import { signal } from '@angular/core';

export class ProductsComponent {
  products = signal<Product[]>([]);
  
  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products.set(products);
    });
  }
  
  addProduct(product: Product) {
    this.products.update(products => [...products, product]);
  }
}
```

---

#### **2.8 AsyncPipe → Signal directo**

**ANTES (Legacy):**
```html
<!-- Template -->
<div *ngIf="products$ | async as products">
  <div *ngFor="let product of products">
    {{ product.name }}
  </div>
</div>

<div *ngIf="loading$ | async">Cargando...</div>
```

```typescript
// Component
export class ProductsComponent {
  products$: Observable<Product[]>;
  loading$ = new BehaviorSubject<boolean>(false);
  
  constructor(private productService: ProductService) {
    this.products$ = this.productService.getProducts();
  }
}
```

**DESPUÉS (Moderno):**
```html
<!-- Template -->
<div *ngIf="products().length > 0">
  <div *ngFor="let product of products()">
    {{ product.name }}
  </div>
</div>

<div *ngIf="loading()">Cargando...</div>
```

```typescript
// Component
import { signal, inject, OnInit } from '@angular/core';

export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  
  products = signal<Product[]>([]);
  loading = signal(false);
  
  ngOnInit() {
    this.loading.set(true);
    this.productService.getProducts().subscribe({
      next: products => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
```

---

#### **2.9 FormBuilder → Constructor Moderno**

**ANTES (Legacy):**
```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ProductFormComponent {
  productForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      category: [null, Validators.required]
    });
  }
}
```

**DESPUÉS (Moderno):**
```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inject, signal } from '@angular/core';

export class ProductFormComponent {
  private fb = inject(FormBuilder);
  
  productForm = signal(this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    category: [null, Validators.required]
  }));
  
  // Acceso al form
  get form() {
    return this.productForm();
  }
}
```

---

### **FASE 3: EJEMPLO COMPLETO DE MIGRACIÓN** 🔄

#### **COMPONENTE LEGACY COMPLETO**

```typescript
// products.component.ts (LEGACY)
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from './models/product.model';
import { ProductService } from './product.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  loading: boolean = false;
  dialogVisible: boolean = false;
  selectedProduct: Product | null = null;
  
  private subscriptions = new Subscription();
  
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }
  
  ngOnInit(): void {
    this.loadProducts();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  loadProducts(): void {
    this.loading = true;
    this.subscriptions.add(
      this.productService.getAll().subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los productos'
          });
          this.loading = false;
        }
      })
    );
  }
  
  openNew(): void {
    this.selectedProduct = null;
    this.dialogVisible = true;
  }
  
  edit(product: Product): void {
    this.selectedProduct = { ...product };
    this.dialogVisible = true;
  }
  
  save(product: Product): void {
    if (product.id) {
      this.subscriptions.add(
        this.productService.update(product.id, product).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto actualizado'
            });
            this.loadProducts();
            this.dialogVisible = false;
          }
        })
      );
    } else {
      this.subscriptions.add(
        this.productService.create(product).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto creado'
            });
            this.loadProducts();
            this.dialogVisible = false;
          }
        })
      );
    }
  }
  
  confirmDelete(product: Product): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar este producto?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(product);
      }
    });
  }
  
  delete(product: Product): void {
    this.subscriptions.add(
      this.productService.delete(product.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto eliminado'
          });
          this.loadProducts();
        }
      })
    );
  }
}
```

```typescript
// products.module.ts (LEGACY - SE ELIMINARÁ)
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextModule
  ]
})
export class ProductsModule { }
```

---

#### **COMPONENTE MIGRADO (MODERNO)**

```typescript
// products.component.ts (MODERNO)
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

// Local
import { Product } from './models/product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  // ✅ Dependency Injection con inject()
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  
  // ✅ Estado con Signals
  products = signal<Product[]>([]);
  loading = signal(false);
  dialogVisible = signal(false);
  selectedProduct = signal<Product | null>(null);
  
  ngOnInit(): void {
    this.loadProducts();
  }
  
  // ✅ No necesita ngOnDestroy, auto-cleanup
  
  loadProducts(): void {
    this.loading.set(true);
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los productos'
        });
        this.loading.set(false);
      }
    });
  }
  
  openNew(): void {
    this.selectedProduct.set(null);
    this.dialogVisible.set(true);
  }
  
  edit(product: Product): void {
    this.selectedProduct.set({ ...product });
    this.dialogVisible.set(true);
  }
  
  save(product: Product): void {
    if (product.id) {
      this.productService.update(product.id, product).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto actualizado'
          });
          this.loadProducts();
          this.dialogVisible.set(false);
        }
      });
    } else {
      this.productService.create(product).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto creado'
          });
          this.loadProducts();
          this.dialogVisible.set(false);
        }
      });
    }
  }
  
  confirmDelete(product: Product): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar este producto?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(product);
      }
    });
  }
  
  delete(product: Product): void {
    this.productService.delete(product.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Producto eliminado'
        });
        this.loadProducts();
      }
    });
  }
}

// ✅ ELIMINADO: products.module.ts (ya no es necesario)
```

**Cambios en template:**
```html
<!-- ANTES (Legacy) -->
<p-table [value]="products" [loading]="loading">

<!-- DESPUÉS (Moderno) -->
<p-table [value]="products()" [loading]="loading()">

<!-- ANTES (Legacy) -->
<p-dialog [(visible)]="dialogVisible">

<!-- DESPUÉS (Moderno) -->
<p-dialog [(visible)]="dialogVisible">
<!-- Nota: ngModel con signals requiere two-way binding especial -->
<!-- O usar [visible]="dialogVisible()" (onHide)="dialogVisible.set(false)" -->
```

---

## 📊 MATRIZ DE TRANSFORMACIONES

| Legacy Pattern | Modern Pattern | Beneficio |
|----------------|----------------|-----------|
| `@NgModule` | `standalone: true` | Menos boilerplate, mejor tree-shaking |
| `constructor()` injection | `inject()` | Más flexible, menos verboso |
| `property: Type` | `signal<Type>()` | Reactividad granular, mejor performance |
| `@Input()` | `input()` | Type-safe, menos decoradores |
| `@Output()` | `output()` | Type-safe, API consistente |
| `@ViewChild()` | `viewChild()` | Type-safe desde el inicio |
| `subscribe() + unsubscribe()` | `toSignal()` | Auto-cleanup, menos código |
| `BehaviorSubject` | `signal()` | Más simple, mejor DX |
| `async pipe` | `signal()` directo | Menos pipes, más legible |
| `OnInit` + `ngOnInit` | `constructor` o `effect()` | Menos lifecycle hooks |
| `ChangeDetectorRef` | Signals auto-update | No necesario |

---

## 🎯 CASOS ESPECIALES

### **Caso 1: RxJS Complejo (combineLatest, switchMap)**

**ANTES (Legacy):**
```typescript
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  category$: Observable<string>;
  
  ngOnInit() {
    this.products$ = combineLatest([
      this.categoryService.selectedCategory$,
      this.searchService.searchTerm$
    ]).pipe(
      switchMap(([category, search]) => 
        this.productService.getProducts(category, search)
      )
    );
  }
}
```

**DESPUÉS (Moderno - Opción 1: Mantener RxJS):**
```typescript
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export class ProductsComponent {
  private categoryService = inject(CategoryService);
  private searchService = inject(SearchService);
  private productService = inject(ProductService);
  
  products = toSignal(
    combineLatest([
      this.categoryService.selectedCategory$,
      this.searchService.searchTerm$
    ]).pipe(
      switchMap(([category, search]) => 
        this.productService.getProducts(category, search)
      )
    ),
    { initialValue: [] as Product[] }
  );
}
```

**DESPUÉS (Moderno - Opción 2: Signals puros):**
```typescript
import { computed, effect } from '@angular/core';

export class ProductsComponent {
  private categoryService = inject(CategoryService);
  private searchService = inject(SearchService);
  private productService = inject(ProductService);
  
  // Convertir observables a signals
  selectedCategory = toSignal(this.categoryService.selectedCategory$, { initialValue: '' });
  searchTerm = toSignal(this.searchService.searchTerm$, { initialValue: '' });
  
  products = signal<Product[]>([]);
  
  constructor() {
    // Effect para reaccionar a cambios
    effect(() => {
      const category = this.selectedCategory();
      const search = this.searchTerm();
      
      this.productService.getProducts(category, search).subscribe(
        products => this.products.set(products)
      );
    });
  }
}
```

---

### **Caso 2: Formularios Reactivos Complejos**

**ANTES (Legacy):**
```typescript
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: this.fb.group({
        id: [null, Validators.required],
        name: ['']
      }),
      tags: this.fb.array([])
    });
    
    this.productForm.get('category.id')?.valueChanges.subscribe(id => {
      // Lógica cuando cambia categoría
    });
  }
}
```

**DESPUÉS (Moderno):**
```typescript
import { effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

export class ProductFormComponent {
  private fb = inject(FormBuilder);
  
  productForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    category: this.fb.group({
      id: [null, Validators.required],
      name: ['']
    }),
    tags: this.fb.array([])
  });
  
  // Convertir valueChanges a signal
  categoryId = toSignal(
    this.productForm.get('category.id')!.valueChanges,
    { initialValue: null }
  );
  
  constructor() {
    // Effect para reaccionar a cambios
    effect(() => {
      const id = this.categoryId();
      if (id) {
        // Lógica cuando cambia categoría
      }
    });
  }
}
```

---

## ✅ CHECKLIST DE VALIDACIÓN POST-MIGRACIÓN

### **Estructura**
- [ ] Componente es `standalone: true`
- [ ] Imports de módulos en decorador @Component
- [ ] Archivo `.module.ts` eliminado
- [ ] Rutas actualizadas a `loadComponent`

### **Dependency Injection**
- [ ] Todos los servicios usan `inject()`
- [ ] No hay `constructor()` con parámetros
- [ ] Inyecciones son privadas (cuando es apropiado)

### **Estado Reactivo**
- [ ] Propiedades convertidas a `signal()`
- [ ] Getters convertidos a `computed()`
- [ ] @Input convertidos a `input()`
- [ ] @Output convertidos a `output()`

### **Lifecycle**
- [ ] Eliminados `OnDestroy` y `ngOnDestroy` si solo hacían unsubscribe
- [ ] `OnInit` solo si es realmente necesario
- [ ] Subscripciones manuales minimizadas

### **Template**
- [ ] Actualizado para usar signals: `products()` en vez de `products`
- [ ] Pipes `async` removidos donde sea posible
- [ ] Two-way binding actualizado si es necesario

### **Performance**
- [ ] No hay `ChangeDetectorRef` innecesario
- [ ] Subscripciones se limpian automáticamente
- [ ] Signals minimizan re-renders

---

## 🚀 COMANDOS ÚTILES

```bash
# Verificar que no hay módulos legacy
grep -r "@NgModule" src/app/pages/

# Buscar constructors con inyección
grep -r "constructor(" src/app/pages/

# Buscar @Input/@Output legacy
grep -r "@Input()" src/app/pages/
grep -r "@Output()" src/app/pages/

# Buscar subscriptions manuales
grep -r "\.subscribe(" src/app/pages/

# Verificar uso de signals
grep -r "signal<" src/app/pages/
```

---

## 📚 RECURSOS DE REFERENCIA

### **Documentación Oficial**
- Angular Signals: https://angular.io/guide/signals
- Standalone Components: https://angular.io/guide/standalone-components
- inject(): https://angular.io/api/core/inject
- toSignal(): https://angular.io/api/core/rxjs-interop/toSignal

### **Guías de Migración**
- Standalone Migration: https://angular.io/guide/standalone-migration
- Signals Best Practices: https://angular.io/guide/signals-best-practices

---

## 🎯 OBJETIVO FINAL

El código migrado debe ser:
1. **Moderno:** Usa las últimas features de Angular 19+
2. **Limpio:** Menos boilerplate, más legible
3. **Type-safe:** Aprovecha TypeScript al máximo
4. **Performante:** Mejor detección de cambios con signals
5. **Mantenible:** Más fácil de entender y modificar

El componente debe funcionar exactamente igual que antes, pero con código más moderno y eficiente.
