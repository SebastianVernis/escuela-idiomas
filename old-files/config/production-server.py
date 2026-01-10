#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys
from pathlib import Path

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(Path(__file__).parent / "dist"), **kwargs)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        # Handle SPA routing - serve index.html for routes
        if not os.path.exists(self.translate_path(self.path)):
            if not self.path.startswith('/assets/') and not '.' in os.path.basename(self.path):
                self.path = '/index.html'
        return super().do_GET()

def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    
    with socketserver.TCPServer(("", port), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Idiomas Avanza frontend is running at http://localhost:{port}")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped")

if __name__ == "__main__":
    main()