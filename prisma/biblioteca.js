// Utilidades para asignar libros a usuarios según paquete o curso

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/** Asigna libros de un paquete a un usuario (omite duplicados). */
async function asignarLibrosDePaquete(usuarioId, paqueteId) {
  if (!usuarioId || !paqueteId) throw new Error('usuarioId y paqueteId son requeridos');
  const paquete = await prisma.paquete.findUnique({
    where: { id: paqueteId },
    include: { libros: { select: { id: true } } },
  });
  if (!paquete) throw new Error('Paquete no encontrado');
  if (!paquete.libros.length) return { count: 0 };

  const rows = paquete.libros.map(l => ({ usuarioId, libroId: l.id, assignedAt: new Date() }));
  const result = await prisma.usuarioLibro.createMany({ data: rows, skipDuplicates: true });
  return result; // { count }
}

/** Asigna libros según todos los paquetes que cubren un curso dado. */
async function asignarLibrosDeCurso(usuarioId, cursoId) {
  if (!usuarioId || !cursoId) throw new Error('usuarioId y cursoId son requeridos');
  const curso = await prisma.curso.findUnique({
    where: { id: cursoId },
    include: { paquetes: { include: { libros: { select: { id: true } } } } },
  });
  if (!curso) throw new Error('Curso no encontrado');
  const libroIds = new Set();
  for (const p of curso.paquetes) for (const l of p.libros) libroIds.add(l.id);
  if (!libroIds.size) return { count: 0 };
  const rows = [...libroIds].map(id => ({ usuarioId, libroId: id, assignedAt: new Date() }));
  const result = await prisma.usuarioLibro.createMany({ data: rows, skipDuplicates: true });
  return result;
}

/** Asignación directa por array de libroIds. */
async function asignarLibros(usuarioId, libroIds = []) {
  if (!usuarioId) throw new Error('usuarioId requerido');
  if (!Array.isArray(libroIds) || libroIds.length === 0) return { count: 0 };
  const rows = libroIds.map(id => ({ usuarioId, libroId: id, assignedAt: new Date() }));
  const result = await prisma.usuarioLibro.createMany({ data: rows, skipDuplicates: true });
  return result;
}

module.exports = {
  asignarLibrosDePaquete,
  asignarLibrosDeCurso,
  asignarLibros,
};

