export default function FeatureHighlights({ precioAnterior, precioActual }) {
  const formatPrice = (price) => {
    if (!price && price !== 0) return null;
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formattedAnterior = formatPrice(precioAnterior);
  const formattedActual = formatPrice(precioActual);
  const hasDiscount = formattedAnterior && formattedActual;

  if (!formattedAnterior && !formattedActual) return null;

  return (
    <div
      className="rounded-2xl p-5 space-y-2"
      style={{ background: 'linear-gradient(135deg, #f0f6ff 0%, #e8f0fe 100%)', border: '1px solid #c7d8f0' }}
    >
      <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#02478f' }}>
        Precio
      </p>

      {hasDiscount && (
        <p className="text-lg font-semibold text-gray-400 line-through">
          {formattedAnterior}
        </p>
      )}

      {formattedActual && (
        <p className="text-3xl sm:text-4xl font-black" style={{ color: '#02478f' }}>
          {formattedActual}
        </p>
      )}

      {!formattedActual && formattedAnterior && (
        <p className="text-3xl sm:text-4xl font-black" style={{ color: '#02478f' }}>
          {formattedAnterior}
        </p>
      )}

      {hasDiscount && (() => {
        const pct = Math.round(((precioAnterior - precioActual) / precioAnterior) * 100);
        return pct > 0 ? (
          <span className="inline-block px-3 py-1 rounded-full text-white text-xs font-bold" style={{ backgroundColor: '#e53e3e' }}>
            -{pct}% descuento
          </span>
        ) : null;
      })()}
    </div>
  );
}
