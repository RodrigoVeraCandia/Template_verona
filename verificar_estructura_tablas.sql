-- ========================================
-- VERIFICAR ESTRUCTURA DE TABLAS
-- ========================================
-- Este script muestra la estructura de las tablas
-- para verificar que los nombres de columnas coincidan
-- con los que espera la aplicación Angular
--
-- INSTRUCCIONES:
-- 1. Abre SQL Editor en Supabase
-- 2. Pega este código
-- 3. Click en "Run"
-- ========================================

-- Ver estructura de la tabla products
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'products'
ORDER BY ordinal_position;

-- Ver estructura de la tabla suppliers
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'suppliers'
ORDER BY ordinal_position;

-- Ver estructura de la tabla locations
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'locations'
ORDER BY ordinal_position;
