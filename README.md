# VVS · Unidad 1 — Evaluación estática

Auditoría estática del módulo de descuentos `src/descuentos.js` de una tienda digital:
revisión de requisitos, inspección por pares y análisis estático con ESLint, **sin ejecutar pruebas funcionales**.

> Asignatura: Verificación y Validación de Software · Universidad Politécnica Salesiana
> Estudiante: Michael Zaquinaula · Actividad individual

## Estructura

```
src/descuentos.js          Módulo auditado (versión corregida)
docs/requisitos.md         Fase A: análisis R-01..R-04, RF-01..RF-04, matriz y supuestos
docs/checklist.md          Fase A: checklist de inspección (12 preguntas)
docs/reglas-eslint.md      Fase B: justificación de reglas y límites de ESLint
docs/hallazgos.md          Fase C: 9 hallazgos (ESLint vs. revisión humana)
docs/acta-inspeccion.md    Fase C: roles, fases de Fagan y decisiones
evidencias/lint-inicial.txt  ESLint sobre el código base: 5 errores, 2 advertencias
evidencias/lint-final.txt    ESLint después de corregir: 0 errores, 0 advertencias
eslint.config.js           Configuración de ESLint (flat config)
```

## Cómo reproducir

Requisitos: Node.js ≥ 20 y npm.

```bash
git clone https://github.com/Michael-ZQ/vvs-u1-evaluacion-estatica.git
cd vvs-u1-evaluacion-estatica
npm ci
npm run lint
```

Para ver el análisis **inicial**, revise el commit del código base y ejecute el lint ahí:

```bash
git checkout 51c782b
npm run lint      # 7 problemas: 5 errores, 2 advertencias
git checkout main
```

## Proceso (historial de commits)

| Fase | Commit | Contenido |
|---|---|---|
| — | `chore: versionar código base…` | Código entregado, sin modificar |
| A | `docs: revisar requisitos…` | Requisitos, matriz, checklist |
| B | `chore: configurar ESLint…` | ESLint, script `lint`, `lint-inicial.txt` |
| C | `docs: registrar inspección…` | Hallazgos y acta (estado «Abierto») |
| C | `fix: corregir hallazgos confirmados…` | Retrabajo en rama `fix/correcciones-inspeccion`, `lint-final.txt` |
| D | Pull request | Revisión con comentarios técnicos y merge a `main` |

## Resultados

- **9 hallazgos**: 2 críticos, 4 mayores, 3 menores. ESLint detectó 4; la revisión humana detectó 7, incluidos los 2 críticos.
- **7 corregidos** (uno parcial). **2 pendientes** de confirmación de negocio (VIP, promociones, redondeo).
- Lint: de **7 problemas** a **0**.

## Supuestos pendientes

Ver `docs/requisitos.md` §5. El código no inventa reglas de negocio: el adicional VIP conserva el valor original (10) como constante con nombre hasta que se confirme.
