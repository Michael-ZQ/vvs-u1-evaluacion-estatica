// [SUPUESTO S-02] Adicional VIP en unidades monetarias. Valor heredado del
// código base; pendiente de confirmar con negocio si es monto fijo o porcentaje (H-04).
const DESCUENTO_VIP = 10;
const PORCENTAJE_MINIMO = 0;
const PORCENTAJE_MAXIMO = 100;
const TOTAL_MINIMO = 0;

function esNumeroFinito(valor) {
  return typeof valor === "number" && Number.isFinite(valor);
}

/**
 * Calcula el total a pagar aplicando un descuento porcentual y, si corresponde, el adicional VIP.
 * @param {number} precio Precio original, número finito >= 0 (RF-04).
 * @param {number} porcentaje Porcentaje de descuento en [0, 100] (RF-03).
 * @param {boolean} esVip Solo `true` aplica el adicional VIP (RF-02).
 * @returns {number} Total a pagar, nunca negativo (RF-03).
 * @throws {TypeError} Si precio o porcentaje no son números finitos (H-08).
 * @throws {RangeError} Si precio es negativo o porcentaje está fuera de rango (H-03, H-08).
 */
function calcularDescuento(precio, porcentaje, esVip) {
  if (!esNumeroFinito(precio) || !esNumeroFinito(porcentaje)) {
    throw new TypeError("precio y porcentaje deben ser números finitos");
  }
  if (precio < 0) {
    throw new RangeError("precio no puede ser negativo");
  }
  if (porcentaje < PORCENTAJE_MINIMO || porcentaje > PORCENTAJE_MAXIMO) {
    throw new RangeError(
      `porcentaje debe estar entre ${PORCENTAJE_MINIMO} y ${PORCENTAJE_MAXIMO}`,
    );
  }

  let descuento = (precio * porcentaje) / 100;
  if (esVip === true) {
    descuento += DESCUENTO_VIP;
  }

  const total = precio - descuento;
  return Math.max(TOTAL_MINIMO, total);
}

module.exports = { calcularDescuento };
