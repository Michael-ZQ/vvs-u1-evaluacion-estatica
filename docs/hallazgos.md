# Registro de hallazgos — Inspección de `src/descuentos.js`

Material inspeccionado: `src/descuentos.js` en el commit `51c782b` (código base sin modificar) y `docs/requisitos.md`.
Fuentes: **ESLint** = detectado por la herramienta (`evidencias/lint-inicial.txt`) · **Humano** = detectado solo en la lectura con el checklist · **Ambos** = la herramienta lo marca, pero la revisión humana explica el impacto real.

Severidad: **Crítica** (pérdida económica o resultado inválido) · **Mayor** (resultado incorrecto en algunos casos) · **Menor** (mantenibilidad / estilo con riesgo).

## Tabla de hallazgos

| ID | Fuente | Descripción | Ubicación | Severidad | Evidencia | Acción propuesta | Estado |
|---|---|---|---|---|---|---|---|
| H-01 | ESLint | Variables declaradas con `var` (alcance de función, *hoisting*). | L2, L5 | Menor | `no-var` en lint-inicial (2:3, 5:3) | Usar `const`. | Corregido |
| H-02 | Ambos | `esVip == true` usa igualdad con coerción: `1` y `"1"` reciben descuento VIP; `"true"` no. | L3 | Mayor | `eqeqeq` (3:13) + checklist #6 | Comparación estricta `esVip === true`. | Corregido |
| H-03 | Humano | Si `porcentaje > 100` solo imprime en consola y **continúa calculando**; tampoco se controla `porcentaje < 0`. ESLint solo marca el `console.log`, no la lógica. | L4 | Crítica | Checklist #2, #4 · `no-console` (4:25) solo como síntoma | Lanzar `RangeError` si `porcentaje` ∉ [0, 100] (RF-03). | Corregido |
| H-04 | Ambos | `+10` es un número mágico sin unidad: no se sabe si es 10 % o $10, ni si se acumula. | L3 | Mayor | `no-magic-numbers` (3:46) + checklist #3, #9 · requisito R-02 | Extraer a constante con nombre; el **valor** queda pendiente de negocio (S-02). | Corregido parcial (constante con nombre; valor pendiente S-02) |
| H-05 | Humano | El total puede ser **negativo**: `precio = 5`, `porcentaje = 0`, VIP → `5 − 10 = −5`. Lo mismo con `porcentaje > 100`. | L5 | Crítica | Checklist #5 · requisito R-03 | Acotar el total a mínimo 0 (RF-03). | Corregido |
| H-06 | ESLint | `if` de una línea sin llaves. | L3, L4 | Menor | `curly` (3:22, 4:25) | Bloques con `{}`. | Corregido |
| H-07 | Humano | Los requisitos R-01..R-04 no tienen criterio de aceptación medible; no se puede decidir si el código es «correcto». | `docs/requisitos.md` | Mayor | Checklist #1 · matriz de trazabilidad | Reemplazar por RF-01..RF-04 verificables y confirmar supuestos S-01..S-04. | Pendiente de negocio (S-01..S-04) |
| H-08 | Humano | No se validan tipos ni valores: `"100"` concatena o convierte, `NaN`/`Infinity` producen resultados sin sentido, `precio` negativo se acepta. | L1-L5 | Mayor | Checklist #2, #11 · requisito RF-04 | `TypeError` para no números/no finitos; `RangeError` para precio negativo (RF-04). | Corregido |
| H-09 | Humano | El resultado monetario no tiene precisión definida: aritmética de coma flotante puede devolver valores como `17.991`. | L2, L5 | Menor | Checklist #10 · supuesto S-04 | Redondear a 2 decimales **cuando finanzas confirme** la política. | Pendiente de negocio (S-04) |

## Seguimiento

Correcciones aplicadas en la rama `fix/correcciones-inspeccion` y verificadas con `evidencias/lint-final.txt` (0 errores, 0 advertencias).
Hallazgos corregidos: 6 completos + 1 parcial. Pendientes de negocio: 2 (H-07, H-09).

## Resumen

| Fuente | Cantidad | IDs |
|---|---|---|
| Solo ESLint | 2 | H-01, H-06 |
| ESLint + revisión humana | 2 | H-02, H-04 |
| Solo revisión humana | 5 | H-03, H-05, H-07, H-08, H-09 |
| **Total** | **9** | 2 críticos · 4 mayores · 3 menores |

Los dos hallazgos **críticos** (H-03, H-05) no los detecta ESLint como defectos de lógica: aparecen al contrastar el código con los requisitos.
