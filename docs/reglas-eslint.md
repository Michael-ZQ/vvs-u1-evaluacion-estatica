# Reglas de ESLint y su justificación

Configuración: [`eslint.config.js`](../eslint.config.js) · ESLint 10 (flat config) · base `@eslint/js` recommended · entorno Node.js, CommonJS.

Se eligió configurar el archivo a mano en lugar del asistente interactivo `npx eslint --init`
para que la configuración sea **reproducible y revisable** en el repositorio (el enunciado acepta «configuración equivalente»).

| Regla | Nivel | Qué detecta | Por qué se activa en este módulo |
|---|---|---|---|
| `no-var` | error | Declaraciones con `var` | `var` tiene alcance de función y *hoisting*: una variable puede usarse antes de asignarse o filtrarse fuera de un bloque. `let`/`const` limitan el alcance al bloque y hacen el flujo de datos predecible. |
| `eqeqeq` | error | `==` / `!=` | `==` aplica coerción de tipos: `esVip == true` es verdadero para `1` y `"1"`, pero falso para `"true"`. En una regla que regala dinero, el criterio debe ser exacto (`=== true`). |
| `no-unused-vars` | error | Variables o parámetros declarados y no usados | Una variable sin uso suele indicar lógica incompleta (un cálculo que se olvidó aplicar). En el código base no aparece, pero se mantiene como control preventivo para las correcciones. |
| `curly` | error | `if` sin llaves | Sin llaves, añadir una segunda línea al `if` la deja fuera de la condición sin que se note (error clásico tipo *goto fail*). Obliga a bloques explícitos. |
| `prefer-const` | error | `let` que nunca se reasigna | Señala qué valores son inmutables; reduce la superficie de errores al modificar el código. |
| `no-console` | warn | `console.log` | En una librería, `console.log` no es manejo de errores: el llamador no se entera y el cálculo continúa. Se deja como *warning* porque no siempre es un defecto. |
| `no-magic-numbers` | warn | Literales numéricos sin nombre (excepto 0 y 100) | El `10` del descuento VIP no tiene unidad ni nombre; ponerle nombre obliga a documentar la decisión de negocio. *Warning* porque requiere criterio humano. |

## Qué **no** puede detectar ESLint aquí

ESLint analiza la forma del código, no su significado respecto a los requisitos. No detecta que:

- el total puede ser negativo (RF-03);
- un porcentaje > 100 solo imprime un mensaje y **sigue calculando** (sí marca el `console.log`, pero no la lógica);
- `+10` puede ser 10 % o $10 (ambigüedad de negocio, RF-02);
- no se validan tipos de entrada (`"100"`, `NaN`, `Infinity`).

Estos hallazgos solo aparecen en la **revisión humana** (ver `docs/hallazgos.md`).
