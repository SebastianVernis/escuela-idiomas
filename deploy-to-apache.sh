#!/bin/bash

echo "🚀 Deploying React frontend to Apache..."

# Build the latest React app
echo "📦 Building React app..."
cd /home/admin/escuela-idiomas
npm run build

echo "📁 Creating backup of current web content..."
timestamp=$(date +%Y%m%d_%H%M%S)
sudo mkdir -p "/tmp/apache-backup-$timestamp"

# Backup current index.php and related files but keep backend
echo "💾 Backing up PHP files..."
sudo cp /var/www/html/index.php "/tmp/apache-backup-$timestamp/" 2>/dev/null || true
sudo cp /var/www/html/*.php "/tmp/apache-backup-$timestamp/" 2>/dev/null || true

echo "🔄 Deploying React build to Apache document root..."
sudo cp -r dist/* /var/www/html/

# Create .htaccess for SPA routing
echo "⚙️  Creating .htaccess for React Router..."
sudo tee /var/www/html/.htaccess > /dev/null << 'EOF'
# React Router SPA Configuration
RewriteEngine On

# Handle API requests to backend
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^api/(.*)$ /backend/api/$1 [L,QSA]

# Handle assets and files that exist
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule . - [L]

# Handle directories that exist
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule . - [L]

# Handle React Router - all other requests go to index.html
RewriteRule . /index.html [L]

# Disable directory browsing
Options -Indexes

# Enable gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers for static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
EOF

# Set proper permissions
echo "🔐 Setting proper permissions..."
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/

# Restart Apache to ensure all changes take effect
echo "🔄 Restarting Apache..."
sudo systemctl restart apache2

echo "✅ React frontend deployed successfully!"
echo "🌐 Access: http://ec2-18-191-121-123.us-east-2.compute.amazonaws.com"
echo "📂 Backup stored in: /tmp/apache-backup-$timestamp"
echo "🔧 Backend API still available at: /backend/api/"

# Verify Apache is running
if systemctl is-active --quiet apache2; then
    echo "✅ Apache is running"
else
    echo "❌ Apache failed to start"
    sudo systemctl status apache2
fi