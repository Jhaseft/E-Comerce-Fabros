export default function WelcomeSection() {
  const marcas = [
    {
      name: 'DongFeng Motors',
      desc: 'Marca global líder en vehículos comerciales con tecnología de vanguardia y presencia en más de 60 países.',
      icon: (
        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zM3 4h1l2.5 8h9L18 6H7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4H1m2 0l1 3" />
        </svg>
      ),
    },
    {
      name: 'ZNA',
      desc: 'Camionetas y SUVs de alto rendimiento diseñados para los terrenos más exigentes de Bolivia.',
      icon: (
        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h11l4 4v4a2 2 0 01-2 2h-1" />
          <circle cx="7.5" cy="17.5" r="2.5" strokeWidth={1.5} />
          <circle cx="17.5" cy="17.5" r="2.5" strokeWidth={1.5} />
        </svg>
      ),
    },
    {
      name: 'Yutong Buses',
      desc: 'Autobuses de pasajeros eficientes y modernos, líderes mundiales en transporte masivo y seguro.',
      icon: (
        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 6v6m0 0H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v3a2 2 0 01-2 2H8zm0 0v2m4-2v2m4-2v2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18a1 1 0 100-2 1 1 0 000 2zm12 0a1 1 0 100-2 1 1 0 000 2z" />
          <rect x="2" y="5" width="20" height="11" rx="2" strokeWidth={1.5} />
        </svg>
      ),
    },
  ];

  const stats = [
    { number: '+15', label: 'Años de experiencia' },
    { number: '3', label: 'Marcas representadas' },
    { number: '100%', label: 'Presencia en Bolivia' },
  ];

  return (
    <>
      {/* ── Sección bienvenida ── */}
      <section className="py-20 animate-slide-in-top bg-white">
        <div className="container mx-auto px-6">

          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-block px-5 py-1.5 bg-brandBlue/10 text-brandBlue text-xs font-bold rounded-full tracking-widest uppercase">
              Representantes oficiales en Bolivia
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brandBlue tracking-tight leading-tight">
              ¡Bienvenido a{' '}
              <span className="relative inline-block">
                <span className="relative z-10">FABROS!</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-brandLight/40 -z-0 rounded"></span>
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Con más de{' '}
              <span className="font-bold text-brandBlue">15 años de experiencia</span>,{' '}
              contamos con un equipo de asesores listos para ayudarte a adquirir tu primer vehículo.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-brandBlue">{stat.number}</div>
                <div className="text-gray-500 text-sm md:text-base font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Divisor */}
          <div className="mt-16 flex justify-center items-center gap-4">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-brandLight to-transparent"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-brandBlue"></div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-brandLight to-transparent"></div>
          </div>
        </div>
      </section>

      {/* ── Sección marcas ── */}
      <section className="py-16 bg-brandBlue">
        <div className="container mx-auto px-6">

          <div className="text-center mb-12">
            <p className="text-brandLight text-xs font-bold tracking-widest uppercase mb-3">Nuestras marcas</p>
            <h3 className="text-3xl md:text-4xl font-black text-white">
              Representantes oficiales de DongFeng
            </h3>
            <p className="text-brandLight mt-3 text-base max-w-xl mx-auto">
              Distribuimos las tres líneas más importantes del grupo DongFeng para Bolivia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {marcas.map((marca) => (
              <div
                key={marca.name}
                className="group bg-white/10 border border-brandLight/20 rounded-2xl p-8 text-center hover:bg-white/20 hover:border-brandLight/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 mx-auto mb-5 bg-white/15 rounded-2xl flex items-center justify-center group-hover:bg-white/25 transition-colors duration-300">
                  {marca.icon}
                </div>
                <h4 className="text-xl font-black text-white mb-3">{marca.name}</h4>
                <p className="text-brandLight text-sm leading-relaxed">{marca.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
