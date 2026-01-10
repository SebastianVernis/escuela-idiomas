#!/bin/bash

# Script para iniciar el frontend de Idiomas Avanza
# Elimina procesos anteriores y inicia el nuevo frontend

echo "🔄 Stopping previous frontend servers..."
pkill -f "python.*production-server" || true
pkill -f "python.*server.py" || true
pkill -f "vite" || true

echo "🧹 Cleaning up previous processes..."
sleep 2

echo "🚀 Starting new frontend server..."
cd /home/admin/escuela-idiomas

# Build the latest version
echo "📦 Building production assets..."
npm run build

# Start production server
echo "🌐 Starting production server on port 3000..."
nohup python3 production-server.py 3000 > frontend.log 2>&1 &

echo "✅ Frontend deployed successfully!"
echo "🔗 Access: http://localhost:3000"
echo "📝 Logs: tail -f frontend.log"

# Wait a moment and check if server is running
sleep 3
if pgrep -f "python.*production-server" > /dev/null; then
    echo "✅ Server is running"
else
    echo "❌ Server failed to start. Check frontend.log for details"
    cat frontend.log
fi