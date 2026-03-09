import { useState } from "react";
import { useCart } from "@/Contexts/CartContext";
import EnhancedGallery from "./EnhancedGallery";
import FeatureHighlights from "./FeatureHighlights";
import TechnicalSpecificationsTable from "./TechnicalSpecificationsTable";
import { ShoppingCart } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';
export default function VehicleShowcase({ product }) {

  const { addToCart } = useCart();
const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const multimedia = product.multimedia || [];
  const mainImage =
    multimedia.find((m) => m.type !== "video")?.url ||
    "https://via.placeholder.com/600x400";


  const currentUrl = window.location.href;
  const user = usePage().props.auth.user;

  // Características adicionales de la tabla 'caracteristicas'
  const caracteristicas = product.caracteristicas || [];

  const handleAddToCart = async () => {
    if (!user) {
      alert("Debes iniciar sesión para agregar al carrito.");
      router.visit("/login");
      return;
    }
    setAdding(true);
    await addToCart({
      id: product.id,
      nombre: product.name,
      precio: product.precio_actual,
      cantidad: 1,
      image: mainImage,
      stock: product.stock ?? 99,
    });
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };



  return (
    <>
      <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">

        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">


            <div className="lg:sticky lg:top-8 h-fit">
              <EnhancedGallery
                multimedia={multimedia}
                productName={product.name}
              />
            </div>

            <div
              className="space-y-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm"
              style={{ border: '1px solid #e5e7eb', borderTop: '4px solid #02478f' }}
            >

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight" style={{ color: '#1a1a2e' }}>
                  {product.name}
                </h1>
                <div
                  className="w-16 h-1 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #02478f 0%, #9ab7ca 100%)' }}
                />
              </div>

              <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {product.longDescription ? (
                  <div dangerouslySetInnerHTML={{ __html: product.longDescription }} />
                ) : (
                  <p>{product.description}</p>
                )}
              </div>


              <TechnicalSpecificationsTable caracteristicas={caracteristicas} />

              <FeatureHighlights
                precioAnterior={product.precio_anterior}
                precioActual={product.precio_actual}
              />

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: added ? '#16a34a' : '#1e40af', color: 'white' }}
              >
                <ShoppingCart />
                {adding ? "Agregando..." : added ? "¡Agregado!" : "Agregar al carrito"}
              </button>



              <a
                href={`https://wa.me/59174161243?text=Hola!%20Estoy%20interesado%20en%20comprar:%0A${encodeURIComponent(
                  product.name
                )}%0A${encodeURIComponent(currentUrl)}`}
                target="_blank"
                className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl text-white font-bold text-base sm:text-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Comprar por WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>

    </>

  );
}