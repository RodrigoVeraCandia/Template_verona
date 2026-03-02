-- ========================================
-- LIMPIAR TODAS LAS TABLAS - ELIMINAR DATOS
-- ========================================
-- Este script elimina TODOS los datos de las tablas
-- pero mantiene la estructura de las tablas intacta.
--
-- ⚠️ ADVERTENCIA: Esto borrará TODOS los datos existentes
-- Úsalo solo si quieres empezar desde cero
--
-- INSTRUCCIONES:
-- 1. Ve a tu Dashboard de Supabase
-- 2. Abre SQL Editor
-- 3. Click en "New query"
-- 4. Pega este código
-- 5. Click en "Run" (o presiona Ctrl+Enter)
-- ========================================

-- Eliminar todos los datos de las tablas
DELETE FROM locations;
DELETE FROM suppliers;
DELETE FROM products;

-- Reiniciar los contadores de IDs (opcional)
-- Esto hace que los nuevos registros empiecen desde ID 1
-- Comenta estas líneas si usas UUIDs en lugar de números autoincrementales
-- ALTER SEQUENCE products_id_seq RESTART WITH 1;
-- ALTER SEQUENCE suppliers_id_seq RESTART WITH 1;
-- ALTER SEQUENCE locations_id_seq RESTART WITH 1;

-- Mensaje de confirmación
SELECT 
    (SELECT COUNT(*) FROM products) as productos_restantes,
    (SELECT COUNT(*) FROM suppliers) as proveedores_restantes,
    (SELECT COUNT(*) FROM locations) as ubicaciones_restantes;
