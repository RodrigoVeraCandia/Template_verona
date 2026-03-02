# 🔐 Configuración de Autenticación con Supabase

## ✅ Cambios Realizados

Se ha integrado completamente el sistema de autenticación de Supabase en el proyecto.

---

## 📋 Archivos Modificados/Creados

### 1. Servicio de Supabase
- **Archivo:** `src/app/services/supabase.service.ts`
- **Nuevos métodos:**
  - `signUp()` - Registro de usuarios
  - `signIn()` - Inicio de sesión
  - `signOut()` - Cerrar sesión
  - `getSession()` - Obtener sesión actual
  - `getCurrentUser()` - Obtener usuario actual
  - `onAuthStateChange()` - Escuchar cambios de autenticación
  - `resetPassword()` - Recuperación de contraseña
  - `updatePassword()` - Actualizar contraseña
  - `updateProfile()` - Actualizar perfil

### 2. Servicio de Autenticación
- **Archivo:** `src/app/pages/service/auth.service.ts`
- **Cambios:**
  - ✅ Reemplazado sistema mock por Supabase Auth
  - ✅ Métodos asíncronos (async/await)
  - ✅ Manejo de sesiones con Supabase
  - ✅ Escucha de cambios de autenticación en tiempo real
  - ✅ Mensajes de error traducidos al español

### 3. Componente de Login
- **Archivo:** `src/app/pages/auth/login.ts`
- **Cambios:**
  - ✅ Actualizado a async/await
  - ✅ Manejo mejorado de errores
  - ✅ Mensajes de éxito y error
  - ✅ Link a página de registro

### 4. Componente de Registro (NUEVO)
- **Archivo:** `src/app/pages/auth/register.ts`
- **Características:**
  - ✅ Registro de nuevos usuarios
  - ✅ Validación de campos
  - ✅ Confirmación de contraseña
  - ✅ Mensaje de confirmación por email
  - ✅ Link de retorno al login

### 5. Rutas
- **Archivo:** `src/app/app.routes.ts`
- **Nueva ruta:** `/auth/register`

---

## 🔧 Configuración en Supabase Dashboard

### Paso 1: Habilitar Email Auth

1. Ve a tu proyecto: https://supabase.com/dashboard/project/cspylwvpsowrfujnphzy
2. En el menú lateral → **Authentication** → **Providers**
3. Asegúrate de que **Email** esté habilitado
4. Configura las opciones:
   - ✅ **Enable email confirmations** (Recomendado)
   - ✅ **Secure email change** (Recomendado)
   - ✅ **Enable signup** (Permitir registros)

### Paso 2: Configurar Email Templates (Importante)

1. Ve a **Authentication** → **Email Templates**
2. Personaliza las plantillas:
   - **Confirm signup** - Email de confirmación
   - **Magic Link** - Link de acceso sin contraseña
   - **Change Email** - Confirmación de cambio de email
   - **Reset Password** - Recuperación de contraseña

### Paso 3: Configurar Redirect URLs

1. Ve a **Authentication** → **URL Configuration**
2. Agrega tus URLs permitidas:
   ```
   http://localhost:4202
   http://localhost:4202/auth/login
   http://localhost:4202/auth/register
   ```
3. Para producción, agrega tu dominio:
   ```
   https://tudominio.com
   https://tudominio.com/auth/*
   ```

### Paso 4: Configurar Políticas de Seguridad

Por defecto, Supabase Auth no requiere RLS para la tabla de usuarios. Pero si quieres agregar metadatos personalizados en una tabla separada:

```sql
-- Crear tabla de perfiles de usuario (opcional)
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios pueden ver su propio perfil
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Política: Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Política: Permitir inserción al registrarse
CREATE POLICY "Users can insert their own profile"
  ON user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);
```

---

## 🧪 Probar la Autenticación

### 1. Crear un usuario de prueba

**Opción A: Desde la interfaz**
1. Inicia el servidor: `npm start -- --port 4202`
2. Ve a: http://localhost:4202/auth/register
3. Completa el formulario:
   - Nombre: Usuario de Prueba
   - Email: test@example.com
   - Contraseña: test123456
4. Haz clic en "Registrarse"
5. **Revisa tu email** para confirmar la cuenta

**Opción B: Desde Supabase Dashboard**
1. Ve a **Authentication** → **Users**
2. Haz clic en **Add user** → **Create new user**
3. Ingresa email y contraseña
4. Marca "Auto Confirm User" para saltar confirmación por email

### 2. Iniciar sesión

1. Ve a: http://localhost:4202/auth/login
2. Ingresa el email y contraseña del usuario creado
3. Haz clic en "Sign In"
4. Deberías ser redirigido a la página principal

### 3. Verificar sesión

Abre las DevTools (F12) → Console y escribe:
```javascript
localStorage.getItem('currentUser')
```

Deberías ver la información del usuario autenticado.

---

## 🔐 Funcionalidades Disponibles

### Registro de Usuarios
- Ruta: `/auth/register`
- Validación de campos
- Confirmación por email (si está habilitada)
- Redirección automática al login

### Inicio de Sesión
- Ruta: `/auth/login`
- Validación de credenciales
- Manejo de sesión persistente
- Redirección a página protegida

### Cerrar Sesión
- Se puede llamar desde cualquier componente:
  ```typescript
  constructor(private authService: AuthService) {}
  
  async logout() {
    await this.authService.logout();
  }
  ```

### Verificar Autenticación
- El `authGuard` protege rutas automáticamente
- Usa signals de Angular para reactividad:
  ```typescript
  constructor(private authService: AuthService) {}
  
  isLoggedIn = this.authService.isAuthenticated;
  currentUser = this.authService.currentUser;
  ```

---

## 🛡️ Seguridad

### Buenas Prácticas Implementadas

✅ **Contraseñas Seguras**
- Mínimo 6 caracteres (recomendado: 8+)
- Supabase hashea automáticamente con bcrypt

✅ **Tokens JWT**
- Tokens firmados y encriptados
- Expiración automática
- Renovación automática

✅ **Sesiones Persistentes**
- Almacenamiento seguro en localStorage
- Verificación automática al cargar la app

✅ **Protección de Rutas**
- `authGuard` protege rutas automáticamente
- Redirección a login si no está autenticado

### Recomendaciones Adicionales

1. **Email Verification**
   - Habilita confirmación por email en Supabase Dashboard
   - Evita cuentas spam y valida emails reales

2. **Rate Limiting**
   - Supabase incluye rate limiting por defecto
   - Protege contra ataques de fuerza bruta

3. **2FA (Opcional)**
   - Supabase soporta autenticación de dos factores
   - Se puede habilitar para mayor seguridad

---

## 🔄 Flujo de Autenticación

```
┌─────────────────┐
│  Usuario llega  │
│   a la app      │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐      ┌──────────────────┐
│ AuthService verifica│─────>│ ¿Hay sesión en   │
│ sesión al iniciar   │      │ localStorage?    │
└─────────────────────┘      └────────┬─────────┘
                                      │
                     ┌────────────────┴────────────────┐
                     │ SÍ                              │ NO
                     ▼                                 ▼
            ┌──────────────────┐            ┌───────────────────┐
            │ Restaurar sesión │            │ Mostrar login     │
            │ desde Supabase   │            │ (/auth/login)     │
            └────────┬─────────┘            └─────────┬─────────┘
                     │                                │
                     ▼                                ▼
            ┌──────────────────┐            ┌───────────────────┐
            │ Permitir acceso  │            │ Usuario ingresa   │
            │ a rutas          │            │ credenciales      │
            │ protegidas       │            └─────────┬─────────┘
            └──────────────────┘                      │
                                                      ▼
                                            ┌───────────────────┐
                                            │ Validar con       │
                                            │ Supabase Auth     │
                                            └─────────┬─────────┘
                                                      │
                                        ┌─────────────┴─────────────┐
                                        │ Válido                    │ Inválido
                                        ▼                           ▼
                                ┌──────────────┐          ┌──────────────────┐
                                │ Crear sesión │          │ Mostrar error    │
                                │ Guardar en   │          │ "Credenciales    │
                                │ localStorage │          │  inválidas"      │
                                └───────┬──────┘          └──────────────────┘
                                        │
                                        ▼
                                ┌──────────────┐
                                │ Redirigir a  │
                                │ página       │
                                │ principal    │
                                └──────────────┘
```

---

## 🐛 Solución de Problemas

### Error: "Invalid login credentials"
**Causa:** Email o contraseña incorrectos
**Solución:**
- Verifica las credenciales
- Asegúrate de que el usuario esté confirmado (si tienes email confirmation habilitado)
- Revisa la tabla `auth.users` en Supabase

### Error: "Email not confirmed"
**Causa:** El usuario no ha confirmado su email
**Solución:**
- Revisa el inbox del usuario
- O confirma manualmente en Authentication → Users → Confirmar usuario

### No llega el email de confirmación
**Causa:** Configuración de email en Supabase
**Solución:**
1. Ve a Project Settings → Auth
2. Verifica la configuración SMTP
3. Para desarrollo, desactiva email confirmation temporalmente

### Sesión se pierde al recargar
**Causa:** Problema con localStorage o sesión expirada
**Solución:**
- Verifica que localStorage esté habilitado
- Revisa que el token no haya expirado
- Limpia localStorage y vuelve a iniciar sesión

---

## 📚 Próximos Pasos

### Funcionalidades Adicionales

1. **Recuperación de contraseña**
   - Componente para solicitar reset
   - Componente para cambiar contraseña

2. **OAuth Providers**
   - Login con Google
   - Login con GitHub
   - Login con Facebook

3. **Roles y Permisos**
   - Crear roles personalizados
   - Proteger rutas por rol
   - Limitar acceso a funcionalidades

4. **Perfil de Usuario**
   - Página de perfil
   - Editar información personal
   - Cambiar contraseña
   - Avatar de usuario

---

## ✅ Checklist de Configuración

- [ ] Email Auth habilitado en Supabase
- [ ] URLs de redirección configuradas
- [ ] Email templates personalizadas (opcional)
- [ ] Usuario de prueba creado
- [ ] Login funcional probado
- [ ] Registro funcional probado
- [ ] Sesión persiste al recargar
- [ ] Cerrar sesión funciona
- [ ] AuthGuard protege rutas correctamente

---

¡La autenticación con Supabase está completamente configurada! 🎉
