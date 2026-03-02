-- ========================================
-- SCRIPT PARA CONFIGURAR RLS EN SUPABASE
-- ========================================
-- Este script configura las políticas de Row Level Security (RLS)
-- para permitir operaciones CRUD en todas las tablas.
--
-- IMPORTANTE: Ejecuta este script en el SQL Editor de Supabase
-- Dashboard > SQL Editor > New Query > Pega este código > Run
-- ========================================

-- ============================================
-- OPCIÓN 1: DESACTIVAR RLS (Solo para desarrollo)
-- ============================================
-- Descomenta las siguientes líneas si quieres desactivar RLS completamente
-- ADVERTENCIA: Solo usar en desarrollo, NO en producción

-- ALTER TABLE products DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE suppliers DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE locations DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE bins DISABLE ROW LEVEL SECURITY;

-- ============================================
-- OPCIÓN 2: CONFIGURAR POLÍTICAS RLS (Recomendado)
-- ============================================
-- Esta opción mantiene RLS activo pero permite todas las operaciones
-- a usuarios autenticados

-- Primero, eliminar políticas existentes si las hay
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

-- Habilitar RLS en todas las tablas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS PARA TABLA: products
-- ============================================

-- Permitir SELECT a todos los usuarios autenticados
CREATE POLICY "Permitir SELECT a usuarios autenticados"
ON products FOR SELECT
TO authenticated
USING (true);

-- Permitir INSERT a todos los usuarios autenticados
CREATE POLICY "Permitir INSERT a usuarios autenticados"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

-- Permitir UPDATE a todos los usuarios autenticados
CREATE POLICY "Permitir UPDATE a usuarios autenticados"
ON products FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Permitir DELETE a todos los usuarios autenticados
CREATE POLICY "Permitir DELETE a usuarios autenticados"
ON products FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- POLÍTICAS PARA TABLA: suppliers
-- ============================================

CREATE POLICY "Permitir SELECT a usuarios autenticados"
ON suppliers FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Permitir INSERT a usuarios autenticados"
ON suppliers FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Permitir UPDATE a usuarios autenticados"
ON suppliers FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir DELETE a usuarios autenticados"
ON suppliers FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- POLÍTICAS PARA TABLA: locations
-- ============================================

CREATE POLICY "Permitir SELECT a usuarios autenticados"
ON locations FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Permitir INSERT a usuarios autenticados"
ON locations FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Permitir UPDATE a usuarios autenticados"
ON locations FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir DELETE a usuarios autenticados"
ON locations FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- VERIFICACIÓN (Opcional)
-- ============================================
-- Ejecuta estas consultas para verificar que las políticas se crearon correctamente

-- Ver todas las políticas creadas
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies
-- WHERE tablename IN ('products', 'suppliers', 'locations')
-- ORDER BY tablename, policyname;

-- Verificar el estado de RLS en las tablas
-- SELECT schemaname, tablename, rowsecurity 
-- FROM pg_tables 
-- WHERE tablename IN ('products', 'suppliers', 'locations');
