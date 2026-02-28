// resources/js/Pages/Admin/AdminDashboard.jsx
import { useRef } from "react";
import { motion } from "framer-motion";
import { Head } from "@inertiajs/react";
import AdminHeader from "@/Components/admin/AdminHeader.jsx";
import CategoriesSection from "@/Components/admin/Categorias/CategoriesSection.jsx";
import OrdersSection from "@/Components/admin/Orders/OrdersSection.jsx";
import ReportsSection from "@/Components/admin/Reportes/ReportsSection";
import { Link } from "@inertiajs/react";
export default function AdminDashboard({ categories = [] }) {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const handleLogout = () => {
    window.location.href = "/logout";
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 flex flex-col">

      <AdminHeader onLogout={handleLogout} />
      <Head title="Admin Dashboard" />

      <section className="min-h-screen flex flex-col justify-center items-center text-center space-y-10 px-4">
        <motion.h1
          className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-gray-800 drop-shadow-lg leading-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Bienvenido <span className="text-pink-500">Admin</span> 🚀
        </motion.h1>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full max-w-4xl">

          <Link
            href="/admin/Ventas" 
            className="px-6 py-4 bg-white rounded-2xl shadow-lg text-base sm:text-lg font-semibold text-black  transition w-full"
          >
            Ventas
          </Link>
          <button
            onClick={() => scrollToSection(section1Ref)}
            className="px-6 py-4 bg-white rounded-2xl shadow-lg text-base sm:text-lg font-semibold text-gray-800 hover:bg-pink-100 transition w-full"
          >
            Categorías
          </button>

          <button
            onClick={() => scrollToSection(section2Ref)}
            className="px-6 py-4 bg-white rounded-2xl shadow-lg text-base sm:text-lg font-semibold text-gray-800 hover:bg-yellow-100 transition w-full"
          >
            Órdenes
          </button>

          <button
            onClick={() => scrollToSection(section3Ref)}
            className="px-6 py-4 bg-white rounded-2xl shadow-lg text-base sm:text-lg font-semibold text-gray-800 hover:bg-blue-100 transition w-full"
          >
            Reportes
          </button>
        </div>
      </section>


      <section ref={section1Ref} className="min-h-screen flex justify-center items-center px-4">
        <CategoriesSection categories={categories} />
      </section>

      <section ref={section2Ref} className="min-h-screen flex justify-center items-center px-4">
        <OrdersSection />
      </section>

      <section ref={section3Ref} className="min-h-screen flex justify-center items-center px-4">
        <ReportsSection />
      </section>

    </div>
  );
}
