# Checklist de inspección — `src/descuentos.js`

Lista de verificación usada en la inspección por pares (Fase C). Se aplica **leyendo** el código y los requisitos,
sin ejecutar pruebas funcionales. Cada respuesta «No» genera un hallazgo en `docs/hallazgos.md`.

Leyenda: **Sí** cumple · **No** no cumple · **N/A** no aplica · **Fuente**: R = requisitos, C = código.

| # | Pregunta | Fuente | Respuesta | Hallazgo |
|---|---|---|---|---|
| 1 | ¿Cada requisito tiene un criterio de aceptación medible? | R | No | H-07 |
| 2 | ¿Están definidos los rangos válidos de cada entrada (`precio`, `porcentaje`, `esVip`)? | R / C | No | H-03 |
| 3 | ¿Está definida la unidad de cada valor (porcentaje vs. monto fijo)? | R / C | No | H-04 |
| 4 | ¿Las entradas inválidas se rechazan con un error explícito y no solo con un mensaje en consola? | C | No | H-03 |
| 5 | ¿El resultado está acotado (no puede ser negativo)? | R / C | No | H-05 |
| 6 | ¿Las comparaciones usan igualdad estricta (`===`)? | C | No | H-02 |
| 7 | ¿Las variables se declaran con `const` / `let` en lugar de `var`? | C | No | H-01 |
| 8 | ¿Todos los `if` usan llaves `{}`? | C | No | H-06 |
| 9 | ¿Hay números «mágicos» sin nombre ni justificación? | C | Sí (hay: `10`) | H-04 |
| 10 | ¿Está definida la precisión decimal del resultado monetario? | R / C | No | H-07 |
| 11 | ¿Se valida el tipo de las entradas (números finitos, booleano)? | C | No | H-08 |
| 12 | ¿Hay variables o parámetros declarados y no usados? | C | No (todos se usan) | — |

**Resumen:** 12 preguntas · 11 con observación (la #9 responde «Sí» porque hay un número mágico) · 1 sin observación (#12).
