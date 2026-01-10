// Helper de post-pago: marca pago como PAID, inscribe al usuario y asigna libros del paquete

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { marcarPagoExitosoPorExternalId, actualizarEstadoPago } = require('./pagos');
const { crearInscripcionSegura } = require('./inscripciones');
const { asignarLibrosDePaquete } = require('./biblioteca');

/**
 * Procesa un pago exitoso: marca PAID, crea inscripción y asigna libros.
 * Requiere identificar el usuario/curso/paquete, ya que el modelo de Pago no los referencia.
 *
 * @param {Object} params
 * @param {number} params.usuarioId
 * @param {number} params.cursoId
 * @param {number} params.paqueteId
 * @param {string} [params.pagoExternalId]
 * @param {number} [params.pagoId]
 * @param {boolean} [params.cerrarPrevias=false]
 */
async function procesarPagoExitoso({ usuarioId, cursoId, paqueteId, pagoExternalId, pagoId, cerrarPrevias = false }) {
  if (!usuarioId || !cursoId || !paqueteId) {
    throw new Error('usuarioId, cursoId y paqueteId son requeridos');
  }

  // 1) Marcar pago como PAID (si se proporcionó alguna referencia)
  if (pagoExternalId) {
    await marcarPagoExitosoPorExternalId(pagoExternalId).catch(() => {});
  } else if (pagoId) {
    await actualizarEstadoPago({ id: pagoId }, { estado: 'PAID' }).catch(() => {});
  }

  // 2) Crear inscripción segura (evita duplicados activos)
  const inscripcion = await crearInscripcionSegura({
    usuarioId,
    cursoId,
    paqueteId,
    estado: 'ACTIVA',
    cerrarPrevias
  });

  // 3) Asignar libros del paquete al usuario
  const asignacion = await asignarLibrosDePaquete(usuarioId, paqueteId);

  // 4) Resultado consolidado
  return { inscripcion, librosAsignados: asignacion?.count ?? 0 };
}

module.exports = { procesarPagoExitoso };

