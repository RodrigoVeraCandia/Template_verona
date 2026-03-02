# SKILL: GENERADOR DE TESTS UNITARIOS

## 🎯 PROPÓSITO
Generar tests unitarios completos y profesionales para componentes Angular 19+ con PrimeNG, usando Jasmine y Karma. Cubre componentes standalone, signals, servicios HTTP, y componentes PrimeNG.

---

## 🔍 CUÁNDO USAR ESTE SKILL

**Activar cuando el usuario:**
- Pide "genera tests para este componente"
- Dice "necesito tests unitarios"
- Pregunta "¿cómo testear [funcionalidad]?"
- Solicita "crear spec para..."
- Menciona "coverage" o "pruebas"
- Pide "ayuda con testing"

**Ejemplos de disparadores:**
```
✅ "Genera tests para este componente CRUD"
✅ "Necesito tests unitarios para el formulario"
✅ "¿Cómo testeo un signal?"
✅ "Crea el spec para este servicio"
✅ "Ayúdame con los tests de la tabla"
✅ "Quiero aumentar el coverage"
```

---

## 📋 PROTOCOLO DE GENERACIÓN DE TESTS

### **FASE 1: ANÁLISIS DEL CÓDIGO** 🔍

Antes de generar tests, analiza:

#### **1.1 Tipo de Componente**
```typescript
// Identificar estructura
- ¿Es Standalone Component?
- ¿Usa Signals o propiedades normales?
- ¿Tiene servicios inyectados?
- ¿Usa inject() o constructor?
- ¿Tiene inputs/outputs?
- ¿Usa componentes PrimeNG?
```

#### **1.2 Funcionalidades a Testear**
```typescript
// Listar todas las funcionalidades
- Métodos públicos
- Signals y su mutación
- Llamadas a servicios (HTTP)
- Manejo de eventos
- Validaciones de formularios
- Interacciones con UI
- Manejo de errores
```

#### **1.3 Dependencias**
```typescript
// Identificar dependencias
- Servicios inyectados
- MessageService (toast)
- ConfirmationService
- Router/ActivatedRoute
- FormBuilder
- Componentes PrimeNG usados
```

---

### **FASE 2: ESTRUCTURA BASE DEL TEST** 🏗️

**Template para Componente Standalone:**

```typescript
// filepath: [ruta-componente].spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';

// Componente a testear
import { [ComponentName] } from './[component-name].component';

// Servicios mockeados
import { [ServiceName] } from './[service-name].service';

// PrimeNG si es necesario
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

describe('[ComponentName]', () => {
    let component: [ComponentName];
    let fixture: ComponentFixture<[ComponentName]>;
    
    // Mocks de servicios
    let mockService: jasmine.SpyObj<[ServiceName]>;
    let mockMessageService: jasmine.SpyObj<MessageService>;
    
    beforeEach(async () => {
        // Crear spies para servicios
        mockService = jasmine.createSpyObj('[ServiceName]', [
            'getAll',
            'getById',
            'create',
            'update',
            'delete'
        ]);
        
        mockMessageService = jasmine.createSpyObj('MessageService', ['add']);
        
        await TestBed.configureTestingModule({
            imports: [
                [ComponentName], // Componente standalone
                // Módulos PrimeNG necesarios
            ],
            providers: [
                { provide: [ServiceName], useValue: mockService },
                { provide: MessageService, useValue: mockMessageService }
            ]
        }).compileComponents();
        
        fixture = TestBed.createComponent([ComponentName]);
        component = fixture.componentInstance;
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    // Tests específicos aquí...
});
```

---

### **FASE 3: TESTS POR TIPO DE FUNCIONALIDAD** 🧪

#### **3.1 Tests para Signals**

```typescript
describe('Signals', () => {
    it('should initialize signals with default values', () => {
        expect(component.data()).toEqual([]);
        expect(component.loading()).toBe(false);
        expect(component.selectedItem()).toBeNull();
    });
    
    it('should update signal value', () => {
        const newData = [{ id: 1, name: 'Test' }];
        component.data.set(newData);
        
        expect(component.data()).toEqual(newData);
        expect(component.data().length).toBe(1);
    });
    
    it('should mutate signal using update', () => {
        component.data.set([{ id: 1, name: 'Item 1' }]);
        
        component.data.update(items => [...items, { id: 2, name: 'Item 2' }]);
        
        expect(component.data().length).toBe(2);
        expect(component.data()[1].name).toBe('Item 2');
    });
});
```

---

#### **3.2 Tests para Servicios HTTP**

```typescript
describe('HTTP Operations', () => {
    it('should load data successfully', () => {
        const mockData = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' }
        ];
        
        mockService.getAll.and.returnValue(of(mockData));
        
        component.loadData();
        
        expect(component.loading()).toBe(false);
        expect(component.data()).toEqual(mockData);
        expect(mockService.getAll).toHaveBeenCalledTimes(1);
    });
    
    it('should handle error when loading data', () => {
        const error = new Error('Network error');
        mockService.getAll.and.returnValue(throwError(() => error));
        
        component.loadData();
        
        expect(component.loading()).toBe(false);
        expect(component.data()).toEqual([]);
        expect(mockMessageService.add).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Error',
            detail: jasmine.any(String)
        });
    });
    
    it('should set loading to true while fetching data', () => {
        mockService.getAll.and.returnValue(of([]));
        
        component.loadData();
        
        // En un componente real, loading debería ser true antes de completar
        // pero el test síncrono lo captura después
        expect(mockService.getAll).toHaveBeenCalled();
    });
});
```

---

#### **3.3 Tests para Operaciones CRUD**

```typescript
describe('CRUD Operations', () => {
    beforeEach(() => {
        component.data.set([
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' }
        ]);
    });
    
    it('should create new item', () => {
        const newItem = { id: 3, name: 'New Item' };
        mockService.create.and.returnValue(of(newItem));
        
        component.saveItem(newItem);
        
        expect(mockService.create).toHaveBeenCalledWith(newItem);
        expect(mockMessageService.add).toHaveBeenCalledWith({
            severity: 'success',
            summary: 'Éxito',
            detail: jasmine.any(String)
        });
    });
    
    it('should update existing item', () => {
        const updatedItem = { id: 1, name: 'Updated Item' };
        mockService.update.and.returnValue(of(updatedItem));
        
        component.saveItem(updatedItem);
        
        expect(mockService.update).toHaveBeenCalledWith(updatedItem.id, updatedItem);
        expect(mockMessageService.add).toHaveBeenCalledWith({
            severity: 'success',
            summary: 'Éxito',
            detail: jasmine.any(String)
        });
    });
    
    it('should delete item', () => {
        const itemToDelete = component.data()[0];
        mockService.delete.and.returnValue(of(void 0));
        
        component.deleteItem(itemToDelete);
        
        expect(mockService.delete).toHaveBeenCalledWith(itemToDelete.id);
        expect(component.data().length).toBe(1);
        expect(component.data()[0].id).toBe(2);
    });
});
```

---

#### **3.4 Tests para Formularios Reactivos**

```typescript
describe('Reactive Forms', () => {
    beforeEach(() => {
        component.ngOnInit();
    });
    
    it('should create form with default values', () => {
        expect(component.form()).toBeDefined();
        expect(component.form().get('name')?.value).toBe('');
        expect(component.form().get('email')?.value).toBe('');
    });
    
    it('should validate required fields', () => {
        const form = component.form();
        
        form.get('name')?.setValue('');
        form.get('email')?.setValue('');
        
        expect(form.valid).toBe(false);
        expect(form.get('name')?.hasError('required')).toBe(true);
        expect(form.get('email')?.hasError('required')).toBe(true);
    });
    
    it('should validate email format', () => {
        const emailControl = component.form().get('email');
        
        emailControl?.setValue('invalid-email');
        expect(emailControl?.hasError('email')).toBe(true);
        
        emailControl?.setValue('valid@email.com');
        expect(emailControl?.hasError('email')).toBe(false);
    });
    
    it('should validate minimum length', () => {
        const nameControl = component.form().get('name');
        
        nameControl?.setValue('ab'); // menos de 3
        expect(nameControl?.hasError('minlength')).toBe(true);
        
        nameControl?.setValue('abc'); // exactamente 3
        expect(nameControl?.hasError('minlength')).toBe(false);
    });
    
    it('should populate form with item data', () => {
        const item = { id: 1, name: 'Test', email: 'test@test.com' };
        
        component.editItem(item);
        
        expect(component.form().get('name')?.value).toBe('Test');
        expect(component.form().get('email')?.value).toBe('test@test.com');
    });
    
    it('should not submit invalid form', () => {
        component.form().get('name')?.setValue('');
        
        component.submitForm();
        
        expect(mockService.create).not.toHaveBeenCalled();
    });
});
```

---

#### **3.5 Tests para Diálogos (PrimeNG)**

```typescript
describe('Dialog Management', () => {
    it('should open dialog for new item', () => {
        component.openNew();
        
        expect(component.dialogVisible()).toBe(true);
        expect(component.dialogTitle()).toBe('Nuevo Item');
        expect(component.form().value).toEqual({ name: '', email: '' });
    });
    
    it('should open dialog for edit item', () => {
        const item = { id: 1, name: 'Test', email: 'test@test.com' };
        
        component.openEdit(item);
        
        expect(component.dialogVisible()).toBe(true);
        expect(component.dialogTitle()).toBe('Editar Item');
        expect(component.selectedItem()).toEqual(item);
    });
    
    it('should close dialog', () => {
        component.dialogVisible.set(true);
        
        component.closeDialog();
        
        expect(component.dialogVisible()).toBe(false);
        expect(component.selectedItem()).toBeNull();
    });
    
    it('should reset form when closing dialog', () => {
        component.form().get('name')?.setValue('Test');
        component.dialogVisible.set(true);
        
        component.closeDialog();
        
        expect(component.form().get('name')?.value).toBe('');
    });
});
```

---

#### **3.6 Tests para Confirmaciones**

```typescript
describe('Confirmations', () => {
    let mockConfirmationService: jasmine.SpyObj<ConfirmationService>;
    
    beforeEach(() => {
        mockConfirmationService = jasmine.createSpyObj('ConfirmationService', ['confirm']);
        // Agregar al TestBed
    });
    
    it('should show confirmation dialog before delete', () => {
        const item = { id: 1, name: 'Test' };
        
        component.confirmDelete(item);
        
        expect(mockConfirmationService.confirm).toHaveBeenCalledWith({
            message: jasmine.any(String),
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            accept: jasmine.any(Function),
            reject: jasmine.any(Function)
        });
    });
    
    it('should delete item when confirmed', () => {
        const item = { id: 1, name: 'Test' };
        mockService.delete.and.returnValue(of(void 0));
        
        // Simular confirmación
        mockConfirmationService.confirm.and.callFake((config: any) => {
            config.accept();
        });
        
        component.confirmDelete(item);
        
        expect(mockService.delete).toHaveBeenCalledWith(item.id);
    });
    
    it('should not delete item when rejected', () => {
        const item = { id: 1, name: 'Test' };
        
        mockConfirmationService.confirm.and.callFake((config: any) => {
            config.reject();
        });
        
        component.confirmDelete(item);
        
        expect(mockService.delete).not.toHaveBeenCalled();
    });
});
```

---

#### **3.7 Tests para Toast Notifications**

```typescript
describe('Toast Notifications', () => {
    it('should show success message after create', () => {
        const newItem = { id: 1, name: 'New Item' };
        mockService.create.and.returnValue(of(newItem));
        
        component.saveItem(newItem);
        
        expect(mockMessageService.add).toHaveBeenCalledWith({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Registro creado correctamente'
        });
    });
    
    it('should show error message on save failure', () => {
        const item = { id: 1, name: 'Item' };
        const error = new Error('Save failed');
        mockService.create.and.returnValue(throwError(() => error));
        
        component.saveItem(item);
        
        expect(mockMessageService.add).toHaveBeenCalledWith({
            severity: 'error',
            summary: 'Error',
            detail: jasmine.any(String)
        });
    });
});
```

---

#### **3.8 Tests para Filtros y Búsqueda**

```typescript
describe('Filtering and Search', () => {
    beforeEach(() => {
        component.data.set([
            { id: 1, name: 'Apple', category: 'Fruit' },
            { id: 2, name: 'Banana', category: 'Fruit' },
            { id: 3, name: 'Carrot', category: 'Vegetable' }
        ]);
    });
    
    it('should filter by search term', () => {
        component.searchTerm.set('app');
        
        const filtered = component.filteredData();
        
        expect(filtered.length).toBe(1);
        expect(filtered[0].name).toBe('Apple');
    });
    
    it('should filter by category', () => {
        component.selectedCategory.set('Fruit');
        
        const filtered = component.filteredData();
        
        expect(filtered.length).toBe(2);
        expect(filtered.every(item => item.category === 'Fruit')).toBe(true);
    });
    
    it('should return all items when no filter', () => {
        component.searchTerm.set('');
        component.selectedCategory.set(null);
        
        const filtered = component.filteredData();
        
        expect(filtered.length).toBe(3);
    });
});
```

---

#### **3.9 Tests para Paginación**

```typescript
describe('Pagination', () => {
    beforeEach(() => {
        const mockData = Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `Item ${i + 1}`
        }));
        component.data.set(mockData);
    });
    
    it('should paginate data correctly', () => {
        component.currentPage.set(1);
        component.pageSize.set(10);
        
        const paginatedData = component.paginatedData();
        
        expect(paginatedData.length).toBe(10);
        expect(paginatedData[0].id).toBe(1);
        expect(paginatedData[9].id).toBe(10);
    });
    
    it('should navigate to next page', () => {
        component.currentPage.set(1);
        component.pageSize.set(10);
        
        component.nextPage();
        
        expect(component.currentPage()).toBe(2);
        expect(component.paginatedData()[0].id).toBe(11);
    });
    
    it('should calculate total pages correctly', () => {
        component.pageSize.set(10);
        
        expect(component.totalPages()).toBe(5); // 50 items / 10 per page
    });
});
```

---

#### **3.10 Tests para Inputs y Outputs**

```typescript
describe('Component Inputs and Outputs', () => {
    it('should receive input value', () => {
        const inputData = [{ id: 1, name: 'Test' }];
        
        fixture.componentRef.setInput('items', inputData);
        fixture.detectChanges();
        
        expect(component.items()).toEqual(inputData);
    });
    
    it('should emit output event', () => {
        let emittedValue: any;
        component.itemSelected.subscribe((value: any) => {
            emittedValue = value;
        });
        
        const item = { id: 1, name: 'Test' };
        component.selectItem(item);
        
        expect(emittedValue).toEqual(item);
    });
});
```

---

### **FASE 4: TESTS PARA COMPONENTES PRIMENG** 🎨

#### **4.1 Test para p-table**

```typescript
describe('PrimeNG Table', () => {
    it('should render table with data', () => {
        component.data.set([
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' }
        ]);
        fixture.detectChanges();
        
        const compiled = fixture.nativeElement;
        const rows = compiled.querySelectorAll('p-table tbody tr');
        
        expect(rows.length).toBe(2);
    });
    
    it('should show loading spinner when loading', () => {
        component.loading.set(true);
        fixture.detectChanges();
        
        const spinner = fixture.nativeElement.querySelector('.p-datatable-loading-icon');
        expect(spinner).toBeTruthy();
    });
    
    it('should handle row selection', () => {
        const item = { id: 1, name: 'Test' };
        
        component.onRowSelect({ data: item });
        
        expect(component.selectedItem()).toEqual(item);
    });
});
```

---

#### **4.2 Test para p-dialog**

```typescript
describe('PrimeNG Dialog', () => {
    it('should show dialog when visible is true', () => {
        component.dialogVisible.set(true);
        fixture.detectChanges();
        
        const dialog = fixture.nativeElement.querySelector('p-dialog');
        expect(dialog).toBeTruthy();
    });
    
    it('should hide dialog when visible is false', () => {
        component.dialogVisible.set(false);
        fixture.detectChanges();
        
        const dialog = fixture.nativeElement.querySelector('.p-dialog-visible');
        expect(dialog).toBeFalsy();
    });
});
```

---

#### **4.3 Test para Formularios en Diálogo**

```typescript
describe('Form in Dialog', () => {
    it('should render form fields in dialog', () => {
        component.dialogVisible.set(true);
        fixture.detectChanges();
        
        const nameInput = fixture.nativeElement.querySelector('#name');
        const emailInput = fixture.nativeElement.querySelector('#email');
        
        expect(nameInput).toBeTruthy();
        expect(emailInput).toBeTruthy();
    });
    
    it('should bind form values to inputs', () => {
        component.dialogVisible.set(true);
        component.form().get('name')?.setValue('Test Name');
        fixture.detectChanges();
        
        const nameInput = fixture.nativeElement.querySelector('#name');
        expect(nameInput.value).toBe('Test Name');
    });
});
```

---

### **FASE 5: TESTS PARA SERVICIOS** 🔧

**Template para Service:**

```typescript
// filepath: [service-name].service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { [ServiceName] } from './[service-name].service';

describe('[ServiceName]', () => {
    let service: [ServiceName];
    let httpMock: HttpTestingController;
    
    const API_URL = 'http://localhost:3000/api/[resource]';
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [[ServiceName]]
        });
        
        service = TestBed.inject([ServiceName]);
        httpMock = TestBed.inject(HttpTestingController);
    });
    
    afterEach(() => {
        httpMock.verify(); // Verificar que no hay requests pendientes
    });
    
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    
    describe('GET Operations', () => {
        it('should get all items', () => {
            const mockData = [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' }
            ];
            
            service.getAll().subscribe(data => {
                expect(data).toEqual(mockData);
                expect(data.length).toBe(2);
            });
            
            const req = httpMock.expectOne(API_URL);
            expect(req.request.method).toBe('GET');
            req.flush(mockData);
        });
        
        it('should get item by id', () => {
            const mockItem = { id: 1, name: 'Item 1' };
            
            service.getById(1).subscribe(data => {
                expect(data).toEqual(mockItem);
            });
            
            const req = httpMock.expectOne(`${API_URL}/1`);
            expect(req.request.method).toBe('GET');
            req.flush(mockItem);
        });
        
        it('should handle error on getAll', () => {
            service.getAll().subscribe(
                () => fail('should have failed'),
                (error) => {
                    expect(error.status).toBe(500);
                }
            );
            
            const req = httpMock.expectOne(API_URL);
            req.flush('Error', { status: 500, statusText: 'Server Error' });
        });
    });
    
    describe('POST Operations', () => {
        it('should create new item', () => {
            const newItem = { name: 'New Item' };
            const createdItem = { id: 1, ...newItem };
            
            service.create(newItem).subscribe(data => {
                expect(data).toEqual(createdItem);
            });
            
            const req = httpMock.expectOne(API_URL);
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(newItem);
            req.flush(createdItem);
        });
    });
    
    describe('PUT Operations', () => {
        it('should update item', () => {
            const updatedItem = { id: 1, name: 'Updated' };
            
            service.update(1, updatedItem).subscribe(data => {
                expect(data).toEqual(updatedItem);
            });
            
            const req = httpMock.expectOne(`${API_URL}/1`);
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(updatedItem);
            req.flush(updatedItem);
        });
    });
    
    describe('DELETE Operations', () => {
        it('should delete item', () => {
            service.delete(1).subscribe(data => {
                expect(data).toBeTruthy();
            });
            
            const req = httpMock.expectOne(`${API_URL}/1`);
            expect(req.request.method).toBe('DELETE');
            req.flush({});
        });
    });
});
```

---

## 📊 COBERTURA MÍNIMA REQUERIDA

### **Checklist de Cobertura**

Para cada componente, asegurar:

- [ ] **Creación:** Test de `should create`
- [ ] **Signals:** Inicialización y mutación
- [ ] **Servicios:** Todas las llamadas HTTP
- [ ] **Errores:** Manejo de errores HTTP
- [ ] **CRUD:** Create, Read, Update, Delete
- [ ] **Formularios:** Validaciones y envío
- [ ] **Diálogos:** Abrir, cerrar, guardar
- [ ] **Confirmaciones:** Aceptar, rechazar
- [ ] **Toast:** Success, error, info
- [ ] **Filtros:** Búsqueda y filtrado
- [ ] **Paginación:** (si aplica)
- [ ] **Inputs/Outputs:** (si aplica)

### **Objetivo de Coverage**

| Tipo | Coverage Mínimo |
|------|----------------|
| **Statements** | 80% |
| **Branches** | 75% |
| **Functions** | 80% |
| **Lines** | 80% |

---

## 🎯 EJEMPLO COMPLETO: CRUD COMPONENT

**Componente Original:**

```typescript
// filepath: src/app/pages/products/products.component.ts

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, DialogModule, ButtonModule]
})
export class ProductsComponent implements OnInit {
    private productService = inject(ProductService);
    private messageService = inject(MessageService);
    
    products = signal<Product[]>([]);
    loading = signal(false);
    dialogVisible = signal(false);
    selectedProduct = signal<Product | null>(null);
    
    ngOnInit() {
        this.loadProducts();
    }
    
    loadProducts() {
        this.loading.set(true);
        this.productService.getAll().subscribe({
            next: (data) => {
                this.products.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos' });
                this.loading.set(false);
            }
        });
    }
    
    openNew() {
        this.selectedProduct.set(null);
        this.dialogVisible.set(true);
    }
    
    edit(product: Product) {
        this.selectedProduct.set({ ...product });
        this.dialogVisible.set(true);
    }
    
    save(product: Product) {
        if (product.id) {
            this.productService.update(product.id, product).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto actualizado' });
                    this.loadProducts();
                    this.dialogVisible.set(false);
                }
            });
        } else {
            this.productService.create(product).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto creado' });
                    this.loadProducts();
                    this.dialogVisible.set(false);
                }
            });
        }
    }
    
    delete(product: Product) {
        this.productService.delete(product.id).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto eliminado' });
                this.loadProducts();
            }
        });
    }
}
```

**Test Completo Generado:**

```typescript
// filepath: src/app/pages/products/products.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ProductsComponent } from './products.component';
import { ProductService } from './product.service';
import { MessageService } from 'primeng/api';

describe('ProductsComponent', () => {
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;
    let mockProductService: jasmine.SpyObj<ProductService>;
    let mockMessageService: jasmine.SpyObj<MessageService>;
    
    const mockProducts = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 }
    ];
    
    beforeEach(async () => {
        mockProductService = jasmine.createSpyObj('ProductService', [
            'getAll', 'getById', 'create', 'update', 'delete'
        ]);
        mockMessageService = jasmine.createSpyObj('MessageService', ['add']);
        
        await TestBed.configureTestingModule({
            imports: [ProductsComponent],
            providers: [
                { provide: ProductService, useValue: mockProductService },
                { provide: MessageService, useValue: mockMessageService }
            ]
        }).compileComponents();
        
        fixture = TestBed.createComponent(ProductsComponent);
        component = fixture.componentInstance;
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    describe('Initialization', () => {
        it('should initialize signals with default values', () => {
            expect(component.products()).toEqual([]);
            expect(component.loading()).toBe(false);
            expect(component.dialogVisible()).toBe(false);
            expect(component.selectedProduct()).toBeNull();
        });
        
        it('should load products on init', () => {
            mockProductService.getAll.and.returnValue(of(mockProducts));
            
            component.ngOnInit();
            
            expect(component.products()).toEqual(mockProducts);
            expect(mockProductService.getAll).toHaveBeenCalledTimes(1);
        });
    });
    
    describe('Load Products', () => {
        it('should load products successfully', () => {
            mockProductService.getAll.and.returnValue(of(mockProducts));
            
            component.loadProducts();
            
            expect(component.loading()).toBe(false);
            expect(component.products()).toEqual(mockProducts);
            expect(component.products().length).toBe(2);
        });
        
        it('should handle error when loading products', () => {
            const error = new Error('Network error');
            mockProductService.getAll.and.returnValue(throwError(() => error));
            
            component.loadProducts();
            
            expect(component.loading()).toBe(false);
            expect(component.products()).toEqual([]);
            expect(mockMessageService.add).toHaveBeenCalledWith({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudieron cargar los productos'
            });
        });
    });
    
    describe('Dialog Operations', () => {
        it('should open dialog for new product', () => {
            component.openNew();
            
            expect(component.dialogVisible()).toBe(true);
            expect(component.selectedProduct()).toBeNull();
        });
        
        it('should open dialog for editing product', () => {
            const product = mockProducts[0];
            
            component.edit(product);
            
            expect(component.dialogVisible()).toBe(true);
            expect(component.selectedProduct()).toEqual(product);
        });
    });
    
    describe('Save Operations', () => {
        it('should create new product', () => {
            const newProduct = { name: 'New Product', price: 150 };
            mockProductService.create.and.returnValue(of({ id: 3, ...newProduct }));
            mockProductService.getAll.and.returnValue(of([...mockProducts, { id: 3, ...newProduct }]));
            
            component.save(newProduct as any);
            
            expect(mockProductService.create).toHaveBeenCalledWith(newProduct);
            expect(mockMessageService.add).toHaveBeenCalledWith({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Producto creado'
            });
            expect(component.dialogVisible()).toBe(false);
        });
        
        it('should update existing product', () => {
            const updatedProduct = { id: 1, name: 'Updated Product', price: 150 };
            mockProductService.update.and.returnValue(of(updatedProduct));
            mockProductService.getAll.and.returnValue(of([updatedProduct, mockProducts[1]]));
            
            component.save(updatedProduct);
            
            expect(mockProductService.update).toHaveBeenCalledWith(1, updatedProduct);
            expect(mockMessageService.add).toHaveBeenCalledWith({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Producto actualizado'
            });
            expect(component.dialogVisible()).toBe(false);
        });
    });
    
    describe('Delete Operations', () => {
        it('should delete product', () => {
            const productToDelete = mockProducts[0];
            mockProductService.delete.and.returnValue(of(void 0));
            mockProductService.getAll.and.returnValue(of([mockProducts[1]]));
            
            component.delete(productToDelete);
            
            expect(mockProductService.delete).toHaveBeenCalledWith(1);
            expect(mockMessageService.add).toHaveBeenCalledWith({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Producto eliminado'
            });
        });
    });
});
```

---

## ✅ CHECKLIST DE VALIDACIÓN

Antes de entregar el test, verificar:

### **Estructura**
- [ ] Imports completos (TestBed, ComponentFixture, etc.)
- [ ] Describe block principal con nombre del componente
- [ ] beforeEach configurado correctamente
- [ ] afterEach si es necesario (HttpTestingController)
- [ ] Mocks de servicios creados

### **Coverage**
- [ ] Test de creación (`should create`)
- [ ] Tests para todos los métodos públicos
- [ ] Tests para escenarios de éxito
- [ ] Tests para escenarios de error
- [ ] Tests para validaciones de formularios
- [ ] Tests para signals

### **Calidad**
- [ ] Nombres descriptivos de tests
- [ ] Arrange-Act-Assert clara
- [ ] No hay código duplicado
- [ ] Uso correcto de spies y mocks
- [ ] Assertions específicas (no solo toBeTruthy)

### **Cobertura PrimeNG**
- [ ] Tests para componentes PrimeNG usados
- [ ] Tests para diálogos
- [ ] Tests para confirmaciones
- [ ] Tests para toast

---

## 🚀 COMANDOS PARA EJECUTAR TESTS

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en watch mode
npm run test:watch

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar un archivo específico
npm run test -- --include='**/products.component.spec.ts'

# Ver reporte de coverage
npm run test:coverage
# Luego abrir: coverage/index.html
```

---

## 🎯 OBJETIVO FINAL

Cada test generado debe ser:
1. **Completo:** Cubre todas las funcionalidades
2. **Mantenible:** Fácil de entender y modificar
3. **Robusto:** No falla con cambios menores
4. **Rápido:** Se ejecuta en < 1 segundo
5. **Independiente:** No depende de otros tests

Los tests deben pasar en el primer run sin modificaciones.
