// Símbolo de moneda configurable desde .env (VITE_CURRENCY_SYMBOL)
// Para cambiarlo, editar el .env: VITE_CURRENCY_SYMBOL=$ o VITE_CURRENCY_SYMBOL=Bs
export const CURRENCY_SYMBOL = import.meta.env.VITE_CURRENCY_SYMBOL ?? 'Bs';

/**
 * Formatea un número como precio con el símbolo de moneda configurado.
 * Ejemplo: formatPrice(1500) => "Bs 1500"
 */
export function formatPrice(amount, decimals = 0) {
    return `${CURRENCY_SYMBOL} ${Number(amount).toFixed(decimals)}`;
}
