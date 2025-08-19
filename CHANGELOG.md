# Changelog

Todas las novedades importantes en este proyecto se documentan en este archivo.

## Checkpoint 2025-08-19

- Secciones y navegación:
  - Nuevas páginas independientes: `cursos.html`, `certificaciones.html`, `biblioteca.html`.
  - Landing: “Tienda” renombrada a “Biblioteca”; enlaces de header/hero/cards actualizados a páginas nuevas.
  - CTAs de Cursos/Certificaciones con `cursoId` en query hacia `payment.html`.
- Pagos e integración:
  - `payment.js`: envío de `metadata` (usuarioId, cursoId, paqueteId) en Stripe/Clip; flujo de Clip con redirección.
  - Backend PHP `payments.php`: propaga metadata en Stripe y Clip.
  - Webhooks (Node): servidor simple para Stripe/Clip conectado a Prisma y helpers.
  - Script PHP: `backend/scripts/create_stripe_intent.php` para crear PaymentIntent con metadata.
- Base de datos con Prisma:
  - `schema.prisma` inicial con modelos, enums, índices y constraints.
  - Relaciones M:N: Paquete–Curso, Paquete–Libro; categorías normalizadas (`Categoria`–`Libro`).
  - Constraint de unicidad para inscripciones activas por usuario/curso.
  - Seed con usuarios, paquetes, cursos, clases, libros y relaciones.
  - Helpers: inscripciones, pagos, biblioteca y post‑pago.
- Documentación:
  - README con checklists técnico y administrativo; guía de Prisma, webhooks y helpers.

