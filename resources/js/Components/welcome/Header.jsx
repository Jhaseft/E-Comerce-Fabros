import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import ParteArriba from './Header/partearriba';
import NavLink from './Header/Navlink';

function UserAvatar({ name, size = 'md' }) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  const sizeClasses = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';
  return (
    <div className={`${sizeClasses} rounded-full bg-white text-brandBlue font-bold flex items-center justify-center flex-shrink-0`}>
      {initials}
    </div>
  );
}

function UserDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    router.post(route('logout'));
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 bg-white/10 hover:bg-white/20 transition-colors duration-200 border border-white/20"
      >
        <UserAvatar name={user.name} size="sm" />
        <span className="text-sm font-semibold text-white hidden xl:block max-w-[120px] truncate">
          {user.name}
        </span>
        <svg
          className={`w-4 h-4 text-white/70 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 animate-fade-in">
     
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
            <UserAvatar name={user.name} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>

          <div className="py-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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

  const handleLogout = () => {
    router.post(route('logout'));
  };

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
              alt="FABROS | Nibol Logo"
              className={`transition-all duration-300 object-contain ${
                isScrolled ? 'h-12 w-32 md:h-14 md:w-40' : 'h-16 w-40 md:h-20 md:w-56'
              }`}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 font-semibold text-white">
            {navCategories.map((cat) => (
              <NavLink key={cat.id} href={`/products/${cat.slug}`}>
                {cat.name}
              </NavLink>
            ))}

            {user ? (
              <UserDropdown user={user} />
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

            {user ? (
              <div className="border-t border-white/20 pt-3 mt-1">
                <div className="flex items-center gap-3 mb-3">
                  <UserAvatar name={user.name} size="sm" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-white/60 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-white text-brandBlue px-5 py-2 rounded-lg text-sm font-semibold hover:bg-brandLight transition-colors duration-300"
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
