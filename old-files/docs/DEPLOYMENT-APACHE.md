# Despliegue del Frontend React en Apache

## 🚀 Estado Actual del Despliegue

✅ **Frontend React desplegado exitosamente en Apache**
- **URL Producción**: http://ec2-18-191-121-123.us-east-2.compute.amazonaws.com
- **Servidor Web**: Apache2
- **Tecnología**: React 18 + Vite
- **Ubicación**: `/var/www/html/`

## 📁 Estructura de Archivos

```
/var/www/html/
├── index.html              # HTML principal de React
├── assets/
│   ├── index-[hash].js    # JavaScript bundle minificado
│   └── index-[hash].css   # CSS styles
├── .htaccess              # Configuración SPA routing
├── backend/               # API PHP (preservada)
├── favicon.ico           # Favicon
└── old-php-backup/       # Backup del frontend PHP anterior
```

## ⚙️ Configuración de Apache

### .htaccess Features
- **SPA Routing**: Todas las rutas van a `index.html`
- **API Proxy**: `/api/*` → `/backend/api/*`
- **Compresión Gzip**: Habilitada para assets
- **Cache Headers**: Optimización de rendimiento
- **Seguridad**: Directory browsing deshabilitado

### VirtualHost Configurado
- **HTTP (80)**: `idiomasavanza.conf`
- **HTTPS (443)**: `idiomasavanza-ssl.conf`
- **SSL**: Certificados en `/etc/ssl/`

## 🛠️ Scripts de Despliegue

### Despliegue Inicial (EJECUTADO)
```bash
./deploy-to-apache.sh
```
- ✅ Build de React ejecutado
- ✅ Archivos copiados a `/var/www/html/`
- ✅ .htaccess configurado para SPA
- ✅ Permisos establecidos (www-data:www-data)
- ✅ Apache reiniciado

### Actualizaciones Futuras
```bash
./update-frontend.sh       # Actualización rápida
npm run build && sudo cp -r dist/* /var/www/html/  # Manual
```

## 🔄 Rutas Configuradas

### Frontend (React Router)
- `/` → Home
- `/cursos` → Catálogo de cursos
- `/biblioteca` → Biblioteca digital
- `/certificaciones` → Certificaciones
- `/portal` → Login/Registro
- `/admin` → Panel administrativo

### Backend (API)
- `/api/*` → `/backend/api/*` (preservado)
- `/backend/` → Acceso directo al backend PHP

## 📊 Estado de Servicios

### ✅ Servicios Activos
- **Apache2**: ✅ Running (múltiples workers)
- **React Frontend**: ✅ Deployed en Apache
- **Backend PHP**: ✅ Disponible en `/backend/`

### ❌ Servicios Deshabilitados
- **Servidor Python (puerto 3000)**: ❌ Detenido (ya no necesario)
- **Frontend PHP anterior**: ❌ Movido a backup

## 🔍 Verificación del Despliegue

### Comandos de Verificación
```bash
# Verificar archivos desplegados
ls -la /var/www/html/index.html
ls -la /var/www/html/assets/

# Verificar Apache
ps aux | grep apache2

# Verificar .htaccess
cat /var/www/html/.htaccess

# Ver logs de Apache
sudo tail -f /var/log/apache2/idiomasavanza_access.log
sudo tail -f /var/log/apache2/idiomasavanza_error.log
```

### Testing de URLs
- ✅ **Homepage**: http://ec2-18-191-121-123.us-east-2.compute.amazonaws.com
- ✅ **Rutas SPA**: http://ec2-18-191-121-123.us-east-2.compute.amazonaws.com/cursos
- ✅ **API Backend**: http://ec2-18-191-121-123.us-east-2.compute.amazonaws.com/backend/api/

## 📝 Historial de Cambios

### 2024-10-27 18:32 UTC
- ✅ Frontend PHP anterior eliminado
- ✅ Frontend React compilado y desplegado
- ✅ Configuración Apache actualizada
- ✅ .htaccess configurado para SPA routing
- ✅ Permisos y ownership establecidos
- ✅ Apache reiniciado exitosamente

## 🔧 Troubleshooting

### Si React no carga:
1. Verificar que `index.html` existe en `/var/www/html/`
2. Verificar permisos: `sudo chown -R www-data:www-data /var/www/html/`
3. Verificar .htaccess tiene reglas de SPA
4. Reiniciar Apache: `sudo systemctl restart apache2`

### Si las rutas SPA no funcionan:
1. Verificar que mod_rewrite está habilitado
2. Verificar .htaccess tiene `RewriteEngine On`
3. Verificar que AllowOverride está en All en la configuración del VirtualHost

### Si la API no responde:
1. Verificar que `/backend/` existe
2. Verificar reglas de proxy en .htaccess
3. Verificar logs de error de Apache

## 📞 Soporte

Para problemas o actualizaciones, ejecutar:
```bash
cd /home/admin/escuela-idiomas
./update-frontend.sh
```