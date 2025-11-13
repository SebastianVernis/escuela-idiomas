#!/bin/bash

echo "🔄 Updating React frontend on Apache..."

# Stop any local development servers
echo "🛑 Stopping local development servers..."
pkill -f "python.*production-server" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

# Build latest React app
echo "📦 Building latest React app..."
cd /home/admin/escuela-idiomas
npm run build

# Deploy to Apache
echo "🚀 Deploying to Apache..."
sudo cp -r dist/* /var/www/html/

# Ensure proper permissions
echo "🔐 Setting permissions..."
sudo chown -R www-data:www-data /var/www/html/index.html /var/www/html/assets/
sudo chmod -R 755 /var/www/html/index.html /var/www/html/assets/

echo "✅ Frontend updated successfully!"
echo "🌐 Live at: http://ec2-18-191-121-123.us-east-2.compute.amazonaws.com"

# Test if Apache is serving the content
if [ -f "/var/www/html/index.html" ]; then
    echo "✅ React files deployed successfully"
    echo "📝 HTML title: $(grep '<title>' /var/www/html/index.html | sed 's/.*<title>\(.*\)<\/title>.*/\1/')"
else
    echo "❌ Deployment failed - index.html not found"
fi