# Revisión de requisitos — Módulo de descuentos

Fase A de la auditoría estática. Se revisan los requisitos originales **antes de ejecutar el software**
para detectar ambigüedades, contradicciones y requisitos no verificables.

## 1. Requisitos originales

| ID | Texto original |
|---|---|
| R-01 | «El descuento debe calcularse rápidamente» |
| R-02 | «Los clientes importantes obtendrán un descuento especial» |
| R-03 | «El descuento no puede superar el precio, excepto en promociones» |
| R-04 | «Se debe mostrar el resultado correcto» |

## 2. Problemas detectados

| ID | Problema | Tipo de defecto |
|---|---|---|
| R-01 | «Rápidamente» no tiene métrica, umbral ni entorno de medición. Además es un atributo de calidad (eficiencia de desempeño, ISO/IEC 25010), no una función. | Ambigüedad · No verificable |
| R-02 | No define quién es «cliente importante» ni cuánto vale el «descuento especial» (¿porcentaje o monto fijo?, ¿se acumula con el descuento normal?). El código asume `+10` sin unidad. | Ambigüedad · Incompleto |
| R-03 | Permite que el descuento supere el precio «en promociones», pero no define qué es una promoción ni qué ocurre con un total negativo. Contradice la intención de la propia regla. | Contradicción · Incompleto |
| R-04 | «Correcto» no tiene criterio: no define fórmula, redondeo, moneda ni cómo «mostrar» (el módulo solo devuelve un valor, no muestra nada). No define qué hacer con entradas inválidas. | Ambigüedad · No verificable |

## 3. Requisitos propuestos (verificables)

Cada requisito tiene un criterio de aceptación que se puede comprobar con una prueba o una medición.
Los valores marcados como **[SUPUESTO]** son decisiones de negocio que **quedan pendientes de confirmación** con el dueño del producto; no se implementan como definitivos.

### RF-01 · Tiempo de cálculo (origen R-01)

> `calcularDescuento` debe devolver el resultado en un tiempo promedio **≤ 1 ms por invocación**, medido sobre **10 000 invocaciones** consecutivas en el entorno de referencia (Node.js LTS, equipo del laboratorio).

- Criterio de aceptación: promedio medido ≤ 1 ms.
- **[SUPUESTO]** umbral de 1 ms y entorno de referencia. Pendiente de confirmar.
- Nota: por naturaleza es un requisito no funcional (RNF); se conserva el código RF-01 por la numeración pedida.

### RF-02 · Descuento para clientes VIP (origen R-02)

> Si `esVip` es exactamente `true`, se aplica un descuento adicional al calculado por porcentaje. Un cliente es VIP cuando el sistema de clientes lo marca con `esVip = true`.

- Criterio de aceptación: con `esVip = true` el total es menor que con `esVip = false`, en la cantidad definida.
- **[SUPUESTO]** el adicional es de **10 unidades monetarias** (lo que hoy hace el código). Pendiente confirmar si es 10 % o $10 y si se acumula con el porcentaje.
- **[SUPUESTO]** el criterio de negocio para marcar a un cliente como VIP lo define otro módulo.

### RF-03 · Límites del descuento (origen R-03)

> El `porcentaje` debe estar en el rango **[0, 100]**. Si está fuera de rango, la función lanza `RangeError` y no calcula. El descuento total (porcentaje + adicional VIP) **nunca supera el precio**: el total mínimo es **0**.

- Criterio de aceptación: `porcentaje = 101` → `RangeError`; `porcentaje = -1` → `RangeError`; `precio = 5, porcentaje = 0, esVip = true` → total `0`, no `-5`.
- **[SUPUESTO]** la excepción «en promociones» **no se implementa** hasta que negocio defina qué es una promoción y cómo se representa. Pendiente de confirmación.

### RF-04 · Resultado correcto y entradas válidas (origen R-04)

> La función devuelve `total = precio − descuento`, como número redondeado a **2 decimales**. `precio` debe ser un número finito **≥ 0** y `porcentaje` un número finito; si no, lanza `TypeError` (tipo incorrecto) o `RangeError` (precio negativo).

- Criterio de aceptación: `calcularDescuento(100, 15, false)` → `85`; `calcularDescuento(19.99, 10, false)` → `17.99`; `calcularDescuento("100", 10, false)` → `TypeError`.
- **[SUPUESTO]** redondeo a 2 decimales (moneda USD). Pendiente confirmar política de redondeo.
- «Mostrar» el resultado es responsabilidad de la interfaz, fuera del alcance de este módulo.

## 4. Matriz de trazabilidad

| ID | Problema | Impacto | Propuesta | Artefacto | Estado |
|---|---|---|---|---|---|
| R-01 → RF-01 | «Rápidamente» no es medible | Medio: no se puede aceptar ni rechazar el producto por desempeño | Umbral ≤ 1 ms promedio sobre 10 000 llamadas | `docs/requisitos.md` §RF-01 | Propuesto · umbral pendiente |
| R-02 → RF-02 | «Cliente importante» y «descuento especial» indefinidos; código suma `+10` sin unidad | Alto: impacto económico directo en cada venta VIP | Definir VIP por `esVip === true`; adicional explícito | `src/descuentos.js` L3, `docs/requisitos.md` §RF-02 | Propuesto · monto pendiente |
| R-03 → RF-03 | Excepción «promociones» indefinida; permite total negativo | Crítico: la tienda podría pagar al cliente | Rango [0, 100] con `RangeError`; total mínimo 0 | `src/descuentos.js` L4-L5, `docs/requisitos.md` §RF-03 | Propuesto · promociones pendiente |
| R-04 → RF-04 | «Correcto» sin fórmula, redondeo ni validación | Alto: resultados con decimales flotantes o `NaN` | Fórmula, 2 decimales, `TypeError`/`RangeError` | `src/descuentos.js` L2-L6, `docs/requisitos.md` §RF-04 | Propuesto · redondeo pendiente |

## 5. Supuestos pendientes de confirmación

| ID | Supuesto | Responsable de confirmar | Mientras tanto |
|---|---|---|---|
| S-01 | Umbral de 1 ms y entorno de referencia (RF-01) | Dueño del producto | Se documenta, no se mide en esta unidad |
| S-02 | Adicional VIP de 10 unidades monetarias (RF-02) | Negocio / comercial | Se mantiene el comportamiento actual, nombrado como constante |
| S-03 | Definición de «promoción» (RF-03) | Negocio / marketing | Sin excepción: el total nunca es negativo |
| S-04 | Redondeo a 2 decimales (RF-04) | Finanzas | Se documenta, no se implementa hasta confirmar |
