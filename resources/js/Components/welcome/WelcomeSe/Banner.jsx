import { useState, useEffect, useCallback } from 'react';

const FALLBACK = 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1920&q=80';

export default function Banner({ images = [], img }) {
  // Soporta tanto `images={[...]}` como el antiguo `img="..."`
  const slides = images.length > 0 ? images : [img || FALLBACK];

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index) => {
    if (animating || index === current) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 600);
  }, [animating, current]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [goTo, current, slides.length]);

  // Autoplay cada 4 segundos
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next, slides.length]);

  return (
    <section className="animate-slide-in-bottom relative w-full overflow-hidden bg-gray-900" style={{ aspectRatio: '1080/650' }}>

      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img
            src={src}
            alt={`Fabros slide ${i + 1}`}
            className="w-full h-full object-cover object-center"
            onError={(e) => { e.target.src = FALLBACK; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
      ))}

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" style={{ zIndex: 2 }} />

   
      {slides.length > 1 && (
        <>
          {/* <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button> */}

       
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 10 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir al slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-2.5 bg-white'
                    : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
