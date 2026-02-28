import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ParteArriba from './Header/partearriba';
import NavLink from './Header/Navlink';

export default function Header() {
  const { navCategories = [], auth } = usePage().props;
  const user = auth?.user;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ParteArriba />
      <header
        className={`w-full animate-blurred-fade-in bg-brandBlue shadow-md transition-all duration-300 sticky top-0 z-50 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6">

        
          <Link href="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dnbklbswg/image/upload/v1772254126/WhatsApp_Image_2026-02-26_at_16.11.57_futjnf_vukjzp.jpg"
              alt="Pragati | Nibol Logo"
              className={`transition-all duration-300 object-contain ${
                isScrolled ? 'h-12 w-32 md:h-14 md:w-40' : 'h-16 w-40 md:h-20 md:w-56'
              }`}
            />
          </Link>

          {/* Desktop Nav: categorías como navlinks + botón login */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-white">
            {navCategories.map((cat) => (
              <NavLink key={cat.id} href={`/products/${cat.slug}`}>
                {cat.name}
              </NavLink>
            ))}

            {user ? (
              <span className="text-sm font-semibold text-white">{user.name}</span>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-white text-brandBlue px-5 py-2 rounded-lg text-sm font-semibold hover:bg-brandLight transition-colors duration-300"
              >
                Iniciar sesión
              </Link>
            )}
          </nav>

     
          <button
            className="lg:hidden text-white hover:text-brandLight transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>


        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-screen border-t border-brandLight/30' : 'max-h-0'
          }`}
        >
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-3">
            {navCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products/${cat.slug}`}
                className="text-white hover:text-brandLight font-semibold transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}

            {!user && (
              <Link
                href="/login"
                className="mt-2 flex items-center justify-center bg-white text-brandBlue px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-brandLight transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
