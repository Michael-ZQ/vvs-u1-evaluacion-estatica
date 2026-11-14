# Acta de inspección por pares — Módulo de descuentos

| Campo | Valor |
|---|---|
| Fecha | 2026-11-13 |
| Material | `src/descuentos.js` (commit `51c782b`), `docs/requisitos.md` |
| Técnica | Inspección formal basada en Fagan (1976), guiada por `docs/checklist.md` |
| Modalidad | **Individual.** La actividad es individual, por lo que el estudiante asumió los tres roles en sesiones separadas, cambiando de perspectiva en cada una. No participaron otras personas. |

## Roles

| Rol | Responsable | Responsabilidad |
|---|---|---|
| Autor | Michael Zaquinaula | Presenta el código y los requisitos; aclara la intención; ejecuta el retrabajo. |
| Revisor | Michael Zaquinaula | Lee el código contra el checklist y los requisitos; propone hallazgos; revisa el *pull request*. |
| Registrador | Michael Zaquinaula | Registra hallazgos con severidad, evidencia, acción y estado en `docs/hallazgos.md`. |

## Desarrollo (fases de Fagan)

1. **Planificación.** Se define el alcance (una función, 9 líneas), el checklist de 12 preguntas y los criterios de severidad.
2. **Visión general (autor).** El módulo calcula el total a pagar aplicando un porcentaje y un adicional VIP. Se aclara que los requisitos originales son ambiguos.
3. **Preparación (revisor).** Lectura individual del código y de `docs/requisitos.md` contrastando cada línea con el checklist. La salida de ESLint (`evidencias/lint-inicial.txt`) se usa como insumo, **no** como sustituto de la lectura.
4. **Reunión de inspección.** Se recorre el código línea a línea; cada respuesta «No» del checklist se registra como hallazgo. Se separan los hallazgos de ESLint de los de revisión humana.
5. **Retrabajo (autor).** Se corrigen **solo** los hallazgos confirmados por los requisitos, en la rama `fix/correcciones-inspeccion`.
6. **Seguimiento (revisor).** Se revisa el *pull request*, se dejan comentarios técnicos y se verifica el lint final.

## Resultados

- **9 hallazgos**: 2 críticos, 4 mayores, 3 menores (detalle en `docs/hallazgos.md`).
- **ESLint** detectó 4 (H-01, H-02, H-04, H-06); la **revisión humana** detectó 7, incluidos los 2 críticos.

## Decisiones

| # | Decisión | Motivo |
|---|---|---|
| D-1 | Corregir H-01, H-02, H-03, H-05, H-06 y H-08. | Confirmados por la regla de ESLint o por un requisito sin supuestos pendientes (RF-03, RF-04). |
| D-2 | En H-04 solo nombrar la constante, **sin cambiar el valor 10**. | El monto VIP es un supuesto de negocio pendiente (S-02); cambiarlo sería inventar un requisito. |
| D-3 | No implementar H-09 (redondeo) ni la excepción de promociones. | Supuestos S-03 y S-04 pendientes de confirmación. |
| D-4 | H-07 queda abierto hasta que negocio confirme S-01..S-04. | Los RF propuestos son una propuesta, no un acuerdo. |

## Acciones pendientes

| Acción | Responsable | Estado |
|---|---|---|
| Confirmar monto y unidad del descuento VIP (S-02) | Negocio | Pendiente |
| Definir «promoción» (S-03) y política de redondeo (S-04) | Negocio / Finanzas | Pendiente |
| Pruebas dinámicas de los RF corregidos | Equipo (Unidad 2) | Fuera de alcance |
