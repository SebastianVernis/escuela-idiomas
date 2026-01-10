// Webhook server (Node, sin dependencias externas) para integrar pagos con Prisma
// Rutas:
//  - POST /webhooks/stripe
//  - POST /webhooks/clip

const http = require('http');
const { URL } = require('url');

const { procesarPagoExitoso } = require('../prisma/postPago');
const { marcarPagoExitosoPorExternalId } = require('../prisma/pagos');

const PORT = process.env.PORT || 8787;

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => {
      try {
        const json = data ? JSON.parse(data) : {};
        resolve(json);
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

async function handleStripe(body) {
  // Nota: Para producción valida la firma del webhook (Stripe-Signature)
  // Payload esperado (mínimo):
  // {
  //   "type": "payment_intent.succeeded",
  //   "data": { "object": { "id": "pi_123", "metadata": { "usuarioId":"1", "cursoId":"1", "paqueteId":"1" } } }
  // }
  if (body.type !== 'payment_intent.succeeded') return { ok: true };
  const obj = body?.data?.object || {};
  const externalId = obj.id;
  const meta = obj.metadata || {};
  const usuarioId = Number(meta.usuarioId);
  const cursoId = Number(meta.cursoId);
  const paqueteId = Number(meta.paqueteId);
  if (!usuarioId || !cursoId || !paqueteId) return { ok: false, error: 'metadata incompleta' };
  await marcarPagoExitosoPorExternalId(externalId).catch(() => {});
  const result = await procesarPagoExitoso({ usuarioId, cursoId, paqueteId, pagoExternalId: externalId, cerrarPrevias: false });
  return { ok: true, result };
}

async function handleClip(body) {
  // Ejemplo mínimo esperado:
  // { "event":"payment.updated", "data": { "id":"clip_abc", "status":"COMPLETED", "metadata": { "usuarioId":"1","cursoId":"1","paqueteId":"1" } } }
  const data = body?.data || {};
  if (!(data.status === 'COMPLETED' || data.status === 'SUCCEEDED')) return { ok: true };
  const externalId = data.id;
  const meta = data.metadata || {};
  const usuarioId = Number(meta.usuarioId);
  const cursoId = Number(meta.cursoId);
  const paqueteId = Number(meta.paqueteId);
  if (!usuarioId || !cursoId || !paqueteId) return { ok: false, error: 'metadata incompleta' };
  await marcarPagoExitosoPorExternalId(externalId).catch(() => {});
  const result = await procesarPagoExitoso({ usuarioId, cursoId, paqueteId, pagoExternalId: externalId, cerrarPrevias: false });
  return { ok: true, result };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const method = req.method || 'GET';

  if (method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  try {
    const body = await readJsonBody(req);
    let result;
    if (path === '/webhooks/stripe') {
      result = await handleStripe(body);
    } else if (path === '/webhooks/clip') {
      result = await handleClip(body);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Not Found' }));
    }
    const status = result?.ok ? 200 : 400;
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, error: e.message }));
  }
});

server.listen(PORT, () => {
  console.log(`Webhook server listening on http://localhost:${PORT}`);
});

