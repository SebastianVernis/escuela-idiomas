// Seed inicial para Idiomas Avanza (Prisma + MySQL)
// Ejecuta: npm run prisma:seed

const { PrismaClient, Idioma, Nivel, TipoClase, ProveedorPago, TipoPaquete } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Usuarios demo (sin contraseñas reales)
  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@idiomasavanza.mx' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@idiomasavanza.mx',
      nombre: 'Administrador',
      role: 'ADMIN'
    }
  });

  const demo = await prisma.usuario.upsert({
    where: { email: 'demo@idiomasavanza.mx' },
    update: {},
    create: {
      username: 'demo',
      email: 'demo@idiomasavanza.mx',
      nombre: 'Demo User',
      role: 'ALUMNO'
    }
  });

  // Paquetes
  const basico = await prisma.paquete.upsert({
    where: { tipo: TipoPaquete.BASICO },
    update: {},
    create: {
      tipo: TipoPaquete.BASICO,
      nombre: 'Básico',
      descripcion: 'Acceso a grupos conversacionales y biblioteca estándar.',
      precioMx: 120000,
      incluyeBiblioteca: true
    }
  });

  const premium = await prisma.paquete.upsert({
    where: { tipo: TipoPaquete.PREMIUM },
    update: {},
    create: {
      tipo: TipoPaquete.PREMIUM,
      nombre: 'Premium',
      descripcion: 'Más horas, materiales avanzados y soporte prioritario.',
      precioMx: 250000,
      incluyeBiblioteca: true
    }
  });

  const certificacion = await prisma.paquete.upsert({
    where: { tipo: TipoPaquete.CERTIFICACION },
    update: {},
    create: {
      tipo: TipoPaquete.CERTIFICACION,
      nombre: 'Certificación',
      descripcion: 'Preparación intensiva para certificaciones internacionales.',
      precioMx: 300000,
      incluyeBiblioteca: true
    }
  });

  // Cursos base
  const cursos = await prisma.$transaction([
    prisma.curso.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'Grupos Conversacionales (Inglés)',
        idioma: Idioma.INGLES,
        nivelInicio: Nivel.A2,
        nivelFin: Nivel.C1,
        descripcion: 'Enfoque 80% conversación con materiales guiados.',
        precioMx: 120000
      }
    }),
    prisma.curso.upsert({
      where: { id: 2 },
      update: {},
      create: {
        nombre: 'Clases Individuales (Inglés)',
        idioma: Idioma.INGLES,
        nivelInicio: Nivel.A1,
        nivelFin: Nivel.C1,
        descripcion: 'Ruta personalizada enfocada a objetivos.',
        precioMx: 180000
      }
    }),
    prisma.curso.upsert({
      where: { id: 3 },
      update: {},
      create: {
        nombre: 'Preparación TOEFL',
        idioma: Idioma.INGLES,
        nivelInicio: Nivel.B1,
        nivelFin: Nivel.C1,
        descripcion: 'Simulacros cronometrados y rúbricas oficiales.',
        precioMx: 250000
      }
    })
  ]);

  // Vincular cursos a paquetes
  await prisma.paquete.update({
    where: { id: basico.id },
    data: {
      cursos: { connect: [{ id: cursos[0].id }] }
    }
  });
  await prisma.paquete.update({
    where: { id: premium.id },
    data: {
      cursos: { connect: [{ id: cursos[0].id }, { id: cursos[1].id }] }
    }
  });
  await prisma.paquete.update({
    where: { id: certificacion.id },
    data: {
      cursos: { connect: [{ id: cursos[2].id }] }
    }
  });

  // Clases de ejemplo
  await prisma.clase.createMany({
    data: [
      { cursoId: cursos[0].id, tipo: TipoClase.CONVERSACIONAL, empiezaEn: new Date(Date.now() + 86400000), duracionMin: 60 },
      { cursoId: cursos[1].id, tipo: TipoClase.INDIVIDUAL, empiezaEn: new Date(Date.now() + 172800000), duracionMin: 60 }
    ]
  });

  // Categorías y Libros de ejemplo (con relaciones)
  const catGramatica = await prisma.categoria.upsert({
    where: { nombre: 'Gramática' },
    update: {},
    create: { nombre: 'Gramática' }
  });
  const catListening = await prisma.categoria.upsert({
    where: { nombre: 'Listening' },
    update: {},
    create: { nombre: 'Listening' }
  });

  const libroGramatica = await prisma.libro.upsert({
    where: { titulo: 'Gramática Esencial A1-A2' },
    update: {},
    create: {
      titulo: 'Gramática Esencial A1-A2',
      autor: 'Equipo Avanza',
      formato: 'PDF',
      nivel: Nivel.A1,
      url: 'https://example.com/gramatica-a1a2.pdf',
      categorias: { connect: [{ id: catGramatica.id }] }
    }
  });
  const libroListening = await prisma.libro.upsert({
    where: { titulo: 'Listening Pack B1' },
    update: {},
    create: {
      titulo: 'Listening Pack B1',
      autor: 'Equipo Avanza',
      formato: 'AUDIO',
      nivel: Nivel.B1,
      url: 'https://example.com/listening-b1.mp3',
      categorias: { connect: [{ id: catListening.id }] }
    }
  });

  // Asociar libros a paquetes (catálogo por plan)
  if (libroGramatica) {
    await prisma.paquete.update({
      where: { id: basico.id },
      data: { libros: { connect: [{ id: libroGramatica.id }] } }
    });
  }
  if (libroGramatica && libroListening) {
    await prisma.paquete.update({
      where: { id: premium.id },
      data: { libros: { connect: [{ id: libroGramatica.id }, { id: libroListening.id }] } }
    });
  }
  if (libroListening) {
    await prisma.paquete.update({
      where: { id: certificacion.id },
      data: { libros: { connect: [{ id: libroListening.id }] } }
    });
  }

  // Pago demo
  await prisma.pago.create({
    data: {
      usuarioId: demo.id,
      amountCents: 120000,
      currency: 'MXN',
      proveedor: ProveedorPago.STRIPE,
      estado: 'PAID',
      externalId: 'demo_payment_001'
    }
  });

  // Inscripción demo (usuario demo a curso 1 con paquete Básico)
  await prisma.inscripcion.create({
    data: {
      usuarioId: demo.id,
      cursoId: cursos[0].id,
      paqueteId: basico.id,
      estado: 'ACTIVA'
    }
  });

  console.log('✅ Seed completado:', { admin: admin.email, demo: demo.email, cursos: cursos.length, paquetes: ['BASICO','PREMIUM','CERTIFICACION'] });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
