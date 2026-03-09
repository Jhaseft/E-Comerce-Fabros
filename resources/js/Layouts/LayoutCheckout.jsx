import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/welcome/Footer';
import { CartProvider } from '@/Contexts/CartContext';
import { ShieldCheck, Lock, ChevronRight } from 'lucide-react';

function CheckoutHeader() {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

     
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
            FABROS
          </span>

        </Link>

     
        <nav className="hidden md:flex items-center gap-1 text-sm text-gray-400 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Carrito</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-gray-700">Checkout</span>
        </nav>


        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Lock size={14} className="text-green-500" />
          <span className="hidden sm:inline font-medium text-gray-600">Pago seguro</span>
          <ShieldCheck size={18} className="text-green-500" />
        </div>

      </div>


      <div className="h-0.5 bg-brandBlue" />
    </header>
  );
}

export default function Layout({ title, children }) {
  return (
    <CartProvider>
      <Head title={title || "Carrito de Compras"} />

      <div className="min-h-screen flex flex-col bg-gray-50 text-black relative">

        <CheckoutHeader />

        <main className="flex-1 container mx-auto px-6 py-12">
          {children}
        </main>

        <Footer className="bg-black text-white" />

      </div>
    </CartProvider>
  );
}
