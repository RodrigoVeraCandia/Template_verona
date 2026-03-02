-- ========================================
-- DESACTIVAR RLS - SOLO PARA PRUEBAS
-- ========================================
-- Este script desactiva completamente Row Level Security
-- para permitir todas las operaciones sin restricciones.
--
-- ⚠️ ADVERTENCIA: Solo usar en DESARROLLO
-- NO usar en producción ya que permite acceso sin autenticación
--
-- INSTRUCCIONES:
-- 1. Ve a tu Dashboard de Supabase
-- 2. Abre SQL Editor (icono de base de datos en el menú lateral)
-- 3. Click en "New query"
-- 4. Pega este código
-- 5. Click en "Run" (o presiona Ctrl+Enter)
-- ========================================

-- Desactivar RLS en todas las tablas existentes
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers DISABLE ROW LEVEL SECURITY;
ALTER TABLE locations DISABLE ROW LEVEL SECURITY;

-- Eliminar todas las políticas existentes
DROP POLICY IF EXISTS "Permitir SELECT a usuarios autenticados" ON products;
DROP POLICY IF EXISTS "Permitir INSERT a usuarios autenticados" ON products;
DROP POLICY IF EXISTS "Permitir UPDATE a usuarios autenticados" ON products;
DROP POLICY IF EXISTS "Permitir DELETE a usuarios autenticados" ON products;

DROP POLICY IF EXISTS "Permitir SELECT a usuarios autenticados" ON suppliers;
DROP POLICY IF EXISTS "Permitir INSERT a usuarios autenticados" ON suppliers;
DROP POLICY IF EXISTS "Permitir UPDATE a usuarios autenticados" ON suppliers;
DROP POLICY IF EXISTS "Permitir DELETE a usuarios autenticados" ON suppliers;

DROP POLICY IF EXISTS "Permitir SELECT a usuarios autenticados" ON locations;
DROP POLICY IF EXISTS "Permitir INSERT a usuarios autenticados" ON locations;
DROP POLICY IF EXISTS "Permitir UPDATE a usuarios autenticados" ON locations;
DROP POLICY IF EXISTS "Permitir DELETE a usuarios autenticados" ON locations;

-- Mensaje de confirmación
SELECT 'RLS desactivado en todas las tablas. Ahora puedes realizar operaciones CRUD sin restricciones.' as mensaje;
