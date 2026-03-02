# Sistema de Gestión de Productos

Sistema minimalista de gestión de productos con autenticación, desarrollado en Angular 19.

## 🚀 Características

- ✅ **Autenticación**: Sistema de login con validación
- ✅ **Gestión de Productos**: CRUD completo de productos
- ✅ **Variantes**: Gestión de variantes (color, tamaño, SKU, stock, precio)
- ✅ **Búsqueda**: Filtrado en tiempo real de productos
- ✅ **Responsive**: Interfaz adaptable a diferentes tamaños de pantalla
- ✅ **Sin dependencias externas**: UI completamente personalizada sin librerías de componentes

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm (viene con Node.js)

## 🔧 Instalación

1. Instalar dependencias:
```bash
npm install
```

## ▶️ Ejecución

Para ejecutar el proyecto en modo desarrollo:

```bash
npm start
```

La aplicación estará disponible en: **http://localhost:4201**

## 🔐 Credenciales de Acceso

### Administrador
- **Email**: admin@productos.com
- **Password**: admin123

### Usuario
- **Email**: usuario@productos.com
- **Password**: user123

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── guards/
│   │   └── auth.guard.ts          # Protección de rutas
│   ├── layout/
│   │   └── main-layout.component.ts  # Layout principal con header
│   ├── pages/
│   │   ├── auth/
│   │   │   └── login.component.ts    # Componente de login
│   │   ├── products/
│   │   │   ├── product-list.component.ts   # Listado de productos
│   │   │   └── product-form.component.ts   # Formulario de producto
│   │   └── service/
│   │       ├── auth.service.ts       # Servicio de autenticación
│   │       └── product.service.ts    # Servicio de productos
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts              # Configuración de rutas
├── index.html
├── main.ts
└── styles.scss
```

## 🎨 Funcionalidades

### Login
- Formulario de autenticación con validación
- Persistencia de sesión en localStorage
- Redirección automática al dashboard

### Gestión de Productos
- **Listar**: Vista en grid con todos los productos
- **Buscar**: Filtro en tiempo real por nombre
- **Crear**: Formulario completo para nuevos productos
- **Editar**: Modificar productos existentes
- **Eliminar**: Eliminar productos con confirmación
- **Ver Variantes**: Modal para visualizar todas las variantes de un producto

### Gestión de Variantes
- Agregar múltiples variantes por producto
- Campos: Color, Tamaño, SKU, Stock, Precio
- Editar variantes existentes
- Eliminar variantes
- Validación de datos

### Otras Características
- **Tags**: Gestión de etiquetas para productos
- **Categorías**: Selección de categoría
- **Estado**: Activo/Inactivo
- **Destacado**: Marcar productos como destacados

## 🛠️ Tecnologías

- **Angular 19**: Framework principal
- **TypeScript**: Lenguaje de desarrollo
- **RxJS**: Programación reactiva
- **Angular Signals**: Gestión de estado
- **LocalStorage**: Persistencia de datos
- **SCSS**: Estilos personalizados

## 📝 Notas

- Los datos se almacenan en localStorage del navegador
- El proyecto usa componentes standalone de Angular 19
- No requiere backend, todo funciona en el cliente
- El layout incluye header con nombre de usuario y botón de logout
- Las rutas están protegidas con guards de autenticación

## 🔄 Comandos Útiles

```bash
# Ejecutar en modo desarrollo
npm start

# Compilar para producción
npm run build

# Compilar y observar cambios
npm run watch
```

## 📦 Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo en el puerto 4201
- `npm run build`: Compila el proyecto para producción
- `npm run watch`: Compila y observa cambios en modo desarrollo

## 🎯 Próximos Pasos

Este proyecto es una base minimalista que puede extenderse con:
- Backend real (API REST)
- Base de datos
- Carga de imágenes
- Exportación de datos
- Gráficos y estadísticas
- Roles y permisos más complejos

---

**Desarrollado con Angular 19**
