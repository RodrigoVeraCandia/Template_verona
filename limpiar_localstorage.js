// ========================================
// SCRIPT PARA LIMPIAR LOCALSTORAGE
// ========================================
// Este script limpia TODOS los datos de localStorage
// y fuerza una recarga completa de la aplicación
//
// INSTRUCCIONES:
// 1. Abre tu aplicación en el navegador (http://localhost:4202)
// 2. Presiona F12 para abrir DevTools
// 3. Ve a la pestaña "Console"
// 4. Copia y pega TODO este código
// 5. Presiona Enter
// ========================================

console.log('🧹 Limpiando localStorage...');

// Ver qué hay en localStorage ANTES de limpiar
console.log('📦 Datos ANTES de limpiar:');
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`  - ${key}:`, value?.substring(0, 100) + '...');
}

// Limpiar TODO el localStorage
localStorage.clear();

// Verificar que esté vacío
console.log('✅ localStorage limpiado!');
console.log('📦 Items restantes:', localStorage.length);

// Limpiar también sessionStorage por si acaso
sessionStorage.clear();
console.log('✅ sessionStorage limpiado!');

// Limpiar cookies de la sesión
console.log('🍪 Limpiando cookies...');
document.cookie.split(";").forEach(function(c) { 
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
});

console.log('');
console.log('🎉 LIMPIEZA COMPLETA!');
console.log('🔄 Recargando la aplicación en 2 segundos...');

// Recargar la página después de 2 segundos
setTimeout(() => {
    location.reload();
}, 2000);
