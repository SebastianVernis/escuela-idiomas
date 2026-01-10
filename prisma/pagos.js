// Utilidades para pagos con Prisma (Stripe/Clip)
// Proporciona helpers para crear pagos y actualizar su estado/externalId

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Crea un pago en estado PENDING.
 * @param {Object} params
 * @param {number} params.usuarioId
 * @param {number} params.amountCents - Monto en centavos (MXN)
 * @param {('STRIPE'|'CLIP')} params.proveedor
 * @param {string} [params.currency='MXN']
 * @param {string} [params.externalId]
 */
async function crearPago({ usuarioId, amountCents, proveedor, currency = 'MXN', externalId }) {
  if (!usuarioId || !amountCents || !proveedor) {
    throw new Error('usuarioId, amountCents y proveedor son requeridos');
  }
  const pago = await prisma.pago.create({
    data: { usuarioId, amountCents, currency, proveedor, estado: 'PENDING', externalId }
  });
  return pago;
}

/**
 * Actualiza el estado y/o externalId de un pago.
 * Permite localizar por id o externalId.
 */
async function actualizarEstadoPago({ id, externalId }, { estado, nuevoExternalId }) {
  const where = id ? { id } : { externalId };
  if (!where || (!where.id && !where.externalId)) {
    throw new Error('Se requiere id o externalId para localizar el pago');
  }
  const data = {};
  if (estado) data.estado = estado;
  if (nuevoExternalId) data.externalId = nuevoExternalId;
  const pago = await prisma.pago.update({ where, data });
  return pago;
}

/** Marca como PAID por externalId (típico en webhook) */
async function marcarPagoExitosoPorExternalId(externalId) {
  if (!externalId) throw new Error('externalId requerido');
  return actualizarEstadoPago({ externalId }, { estado: 'PAID' });
}

module.exports = {
  crearPago,
  actualizarEstadoPago,
  marcarPagoExitosoPorExternalId,
};

