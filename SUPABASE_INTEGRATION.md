# 🚀 Integración de Supabase en Proyecto Angular

## ✅ Instalación Completada

Supabase ha sido integrado exitosamente en tu proyecto Angular.

---

## 📁 Archivos Creados

```
src/
├── environments/
│   └── environment.ts                      # Configuración de Supabase
├── app/
│   ├── services/
│   │   └── supabase.service.ts            # Servicio principal de Supabase
│   └── pages/
│       └── supabase-test/
│           └── supabase-test.component.ts # Componente de prueba
```

---

## 🔑 Credenciales Configuradas

**URL:** https://cspylwvpsowrfujnphzy.supabase.co  
**Anon Key:** Configurada en `environment.ts`

---

## 🛠️ Cómo Usar el Servicio de Supabase

### 1. Importar el servicio en tu componente

```typescript
import { SupabaseService } from '../services/supabase.service';

export class MiComponente {
  constructor(private supabaseService: SupabaseService) {}
}
```

### 2. Usar los métodos disponibles

#### **Productos**

```typescript
// Obtener todos los productos
async loadProducts() {
  try {
    const products = await this.supabaseService.getProducts();
    console.log(products);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Crear un producto
async createProduct() {
  const newProduct = {
    name: 'Laptop HP',
    description: 'Laptop para desarrollo',
    price: 999.99,
    stock:15,
    active: true
  };
  
  const result = await this.supabaseService.createProduct(newProduct);
}

// Actualizar un producto
await this.supabaseService.updateProduct('id-del-producto', {
  price: 899.99,
  stock: 20
});

// Eliminar un producto
await this.supabaseService.deleteProduct('id-del-producto');
```

#### **Proveedores**

```typescript
// Obtener proveedores
const suppliers = await this.supabaseService.getSuppliers();

// Crear proveedor
await this.supabaseService.createSupplier({
  name: 'Proveedor ABC',
  email: 'contacto@abc.com',
  phone: '123456789',
  active: true
});
```

#### **Ubicaciones**

```typescript
// Obtener ubicaciones
const locations = await this.supabaseService.getLocations();

// Crear ubicación
await this.supabaseService.createLocation({
  zone: 'A',
  category: 'RACK',
  type: 'PALLET',
  area: 'A1',
  row: 1,
  bay: 1,
  level: 1,
  storage_name: 'A1-01-01-01',
  active: true
});

// Generar ubicaciones en masa
await this.supabaseService.generateLocations({
  zone: 'A',
  category: 'RACK',
  type: 'PALLET',
  area: 'A1',
  rowMin: 1,
  rowMax: 5,
  bayMin: 1,
  bayMax: 10,
  levelMin: 1,
  levelMax: 4
});
```

#### **Bins**

```typescript
// Obtener bins de una ubicación
const bins = await this.supabaseService.getBinsByLocation('location-id');

// Crear bin
await this.supabaseService.createBin({
  location_id: 'location-id',
  bin_name: 'BIN-001',
  capacity: 100,
  active: true
});
```

---

## 🧪 Probar la Conexión

### Opción 1: Usar el componente de prueba

1. **Inicia el servidor** (si no está corriendo):
   ```bash
   npm start -- --port 4202
   ```

2. **Navega a la ruta de prueba**:
   ```
   http://localhost:4202/supabase-test
   ```

3. **Prueba los botones**:
   - Cargar Productos
   - Cargar Proveedores
   - Cargar Ubicaciones
   - Crear Producto de Prueba

### Opción 2: Desde la consola del navegador

1. Abre DevTools (F12)
2. Ve a la pestaña Console
3. Los errores o éxitos se mostrarán aquí

---

## 📊 Crear Tablas en Supabase (Si no existen)

Ve a tu proyecto en Supabase Dashboard y ejecuta estos SQL:

### Tabla: products

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  stock INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla: suppliers

```sql
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla: locations

```sql
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone TEXT,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  area TEXT NOT NULL,
  row INTEGER NOT NULL,
  bay INTEGER NOT NULL,
  level INTEGER NOT NULL,
  storage_name TEXT UNIQUE NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla: bins

```sql
CREATE TABLE bins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  bin_name TEXT NOT NULL,
  capacity INTEGER,
  current_stock INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔒 Configurar Row Level Security (RLS)

Para seguridad básica, ejecuta en Supabase:

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bins ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública (ajusta según tus necesidades)
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON suppliers FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON locations FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON bins FOR SELECT USING (true);

-- Permitir inserciones (ajusta según tus necesidades)
CREATE POLICY "Allow public insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON suppliers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON locations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON bins FOR INSERT WITH CHECK (true);
```

---

## 🎯 Integrar en Componentes Existentes

### Ejemplo: Reemplazar ProductService con SupabaseService

```typescript
// Antes
constructor(private productService: ProductService) {}

ngOnInit() {
  this.productService.getProducts().subscribe(products => {
    this.products = products;
  });
}

// Después
constructor(private supabaseService: SupabaseService) {}

async ngOnInit() {
  try {
    this.products = await this.supabaseService.getProducts();
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 📝 Métodos Disponibles en SupabaseService

### Productos
- `getProducts()` - Lista todos
- `getProductById(id)` - Obtiene uno
- `createProduct(product)` - Crea nuevo
- `updateProduct(id, updates)` - Actualiza
- `deleteProduct(id)` - Elimina

### Proveedores
- `getSuppliers()`
- `createSupplier(supplier)`
- `updateSupplier(id, updates)`
- `deleteSupplier(id)`

### Ubicaciones
- `getLocations()`
- `createLocation(location)`
- `updateLocation(id, updates)`
- `deleteLocation(id)`
- `generateLocations(params)` - Generación masiva

### Bins
- `getBinsByLocation(locationId)`
- `createBin(bin)`
- `updateBin(id, updates)`
- `deleteBin(id)`

### Utilidades
- `getClient()` - Obtiene cliente de Supabase para operaciones avanzadas
- `executeRpc(functionName, params)` - Ejecuta funciones RPC
- `searchTable(table, column, searchTerm)` - Búsqueda con ILIKE

---

## 🐛 Troubleshooting

### Error: "relation does not exist"
- Las tablas no existen en Supabase
- Crea las tablas con los SQL proporcionados arriba

### Error: "Invalid API key"
- Verifica que la clave en `environment.ts` sea correcta
- Ve a Supabase Dashboard → Settings → API

### Error: "Could not authenticate"
- Configura las políticas de RLS
- O desactiva RLS temporalmente para pruebas

### No se muestran datos
- Verifica que haya datos en las tablas de Supabase
- Revisa la consola del navegador para ver errores

---

## 🚀 Siguiente Paso

**Prueba la conexión navegando a:**
```
http://localhost:4202/supabase-test
```

O integra el servicio en tus componentes existentes reemplazando los servicios mock.

---

## 📚 Documentación

- [Supabase Docs](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Angular + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/angular)
