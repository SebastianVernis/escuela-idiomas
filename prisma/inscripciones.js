// Utilidades para gestionar inscripciones con unicidad de activas por usuario/curso
// Uso: const { crearInscripcionSegura, cerrarInscripcionesActivas } = require('./prisma/inscripciones');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Crea una inscripción asegurando que no existan duplicadas activas para el mismo usuario/curso.
 * Si cerrarPrevias=true, cerrará (activa=false, estado='FINALIZADA') todas las previas antes de crear.
 *
 * @param {Object} params
 * @param {number} params.usuarioId
 * @param {number} params.cursoId
 * @param {number} [params.paqueteId]
 * @param {('ACTIVA'|'FINALIZADA'|'CANCELADA')} [params.estado='ACTIVA']
 * @param {boolean} [params.cerrarPrevias=false]
 */
async function crearInscripcionSegura({ usuarioId, cursoId, paqueteId = null, estado = 'ACTIVA', cerrarPrevias = false }) {
  if (!usuarioId || !cursoId) {
    throw new Error('usuarioId y cursoId son requeridos');
  }

  return await prisma.$transaction(async (tx) => {
    if (cerrarPrevias) {
      await tx.inscripcion.updateMany({
        where: { usuarioId, cursoId, activa: true },
        data: { activa: false, estado: 'FINALIZADA' }
      });
    } else {
      const existeActiva = await tx.inscripcion.findFirst({
        where: { usuarioId, cursoId, activa: true },
        select: { id: true }
      });
      if (existeActiva) {
        throw new Error('Ya existe una inscripción activa para este usuario y curso');
      }
    }

    const nueva = await tx.inscripcion.create({
      data: { usuarioId, cursoId, paqueteId, estado, activa: true }
    });
    return nueva;
  });
}

/**
 * Cierra todas las inscripciones activas de un usuario en un curso (activa=false, estado='FINALIZADA').
 */
async function cerrarInscripcionesActivas(usuarioId, cursoId) {
  if (!usuarioId || !cursoId) throw new Error('usuarioId y cursoId son requeridos');
  const result = await prisma.inscripcion.updateMany({
    where: { usuarioId, cursoId, activa: true },
    data: { activa: false, estado: 'FINALIZADA' }
  });
  return result;
}

module.exports = {
  crearInscripcionSegura,
  cerrarInscripcionesActivas,
};

