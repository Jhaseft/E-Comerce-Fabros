import { useState } from "react";
import { Head, router,Link } from "@inertiajs/react";
import ProductFormModal from "@/Components/admin/Categorias/ProductFormModal";
import ProductVariantsModal from "@/Components/admin/Categorias/ProductVariantsModal";

export default function CategoryProducts({ category, products }) {
  console.log(products);
  console.log(category);
  const [productList, setProductList] = useState(products.data);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [fullscreenMessage, setFullscreenMessage] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [ordersWarning, setOrdersWarning] = useState(null); // { productId, orders }

  const handleOpenVariantsModal = (product) => {
  setCurrentProduct(product);
  setVariantModalOpen(true);
};
  // Guardar producto
  const handleSaveProduct = (savedProduct, isEdit) => {
    if (isEdit) {
      setProductList(prev => prev.map(p => p.id === savedProduct.id ? savedProduct : p));
      setFullscreenMessage("Producto actualizado correctamente.");
    } else {
      setProductList(prev => [savedProduct, ...prev]);
      setFullscreenMessage("Producto agregado correctamente.");
    }
    setModalOpen(false);
    setTimeout(() => setFullscreenMessage(null), 2000);
  };

  const csrfToken = () => document.querySelector('meta[name="csrf-token"]').content;

  // Eliminar producto con spinner
  const handleDeleteProduct = async (productId) => {
    if (!confirm("¿Eliminar producto?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/admin/products/${productId}`, {
        method: 'DELETE',
        headers: { 'X-CSRF-TOKEN': csrfToken() }
      });
      const json = await res.json();
      if (json.status === "success") {
        setProductList(prev => prev.filter(p => p.id !== productId));
        setFullscreenMessage("Producto eliminado correctamente.");
        setTimeout(() => setFullscreenMessage(null), 2000);
      } else if (json.status === "has_orders") {
        setOrdersWarning({ productId, orders: json.orders });
      } else {
        alert("Error al eliminar producto");
      }
    } catch (err) {
      console.error(err);
      alert("Error en la solicitud");
    } finally {
      setDeleting(false);
    }
  };

  // Eliminar producto junto con sus órdenes
  const handleDeleteWithOrders = async () => {
    const { productId } = ordersWarning;
    setOrdersWarning(null);
    setDeleting(true);
    try {
      const res = await fetch(`/admin/products/${productId}/with-orders`, {
        method: 'DELETE',
        headers: { 'X-CSRF-TOKEN': csrfToken() }
      });
      const json = await res.json();
      if (json.status === "success") {
        setProductList(prev => prev.filter(p => p.id !== productId));
        setFullscreenMessage("Producto y órdenes eliminados correctamente.");
        setTimeout(() => setFullscreenMessage(null), 2000);
      } else {
        alert("Error al eliminar");
      }
    } catch (err) {
      console.error(err);
      alert("Error en la solicitud");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 relative">
      <Head title={`Productos de ${category.name}`} />

      
      {deleting && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-t-pink-600 border-gray-300 rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-bold text-gray-800">Eliminando producto...</p>
        </div>
      )}

      {fullscreenMessage && !deleting && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex justify-center items-center z-50 animate-fade">
          <p className="text-2xl font-bold text-green-600">{fullscreenMessage}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-900"
          onClick={() => router.visit('/admin/dashboard')}
        >
          ← Volver
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
          onClick={() => { setEditingProduct(null); setModalOpen(true); }}
        >
          + Agregar producto
        </button>
      </div>

      <h2 className="text-3xl sm:text-4xl font-semibold text-center mr-52 mb-4 text-brandBlack dark:text-white">
        Productos de <span className="text-pink-600">{category.name}</span>
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
        {category.description}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productList.length === 0 && (
          <p className="text-gray-500 dark:text-gray-300 text-center col-span-full">
            No hay productos en esta categoría.
          </p>
        )}

        {productList.map(product => (
          <div
            key={product.id}
            className="bg-white dark:bg-zinc-800 rounded-2xl shadow hover:scale-105 transition-transform duration-300 overflow-hidden"
          >
            <div className="w-full h-64 sm:h-72 lg:h-80 overflow-hidden">
              <img
                src={product.multimedia?.[0]?.url || "https://via.placeholder.com/600x400"}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-brandBlack dark:text-white">
                {product.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-300 mt-1 text-sm sm:text-base">
                {product.description || "Sin descripción"}
              </p>

          

              <div className="flex gap-2 mt-4">
                <button
                  className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                  onClick={() => { setEditingProduct(product); setModalOpen(true); }}
                >
                  Editar
                </button>
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  onClick={() => handleOpenVariantsModal(product)}
                >
                  Asignar variantes
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Eliminar
                </button>

                <Link href={`/admin/productos/${product.id}/caracteristicas`} >
                <button
                  className="px-2 py-1 bg-green-900 text-white rounded hover:bg-red-600 text-sm"
                >
                  Caracteristicas
                </button>
                </Link>

                <Link href={`/admin/productos/${product.id}/multimedia`} >
                <button
                  className="px-2 py-1 bg-violet-800 text-white rounded hover:bg-red-600 text-sm"
                >
                  Multimedia
                </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2 justify-center">
        {products.links.map((link, index) => (
          <button
            key={index}
            disabled={!link.url}
            onClick={() => {
              if (!link.url) return;
              const url = new URL(link.url);
              const page = url.searchParams.get('page');
              router.visit(route('admin.categories.products', { category: category.id, page }));
            }}
            className={`px-3 py-1 rounded-lg font-semibold transition 
        ${link.active
                ? "bg-pink-600 text-white shadow-lg"
                : "bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
              }`}
          >
            {link.label.replace("&raquo;", "»").replace("&laquo;", "«")}
          </button>
        ))}
      </div>

      {modalOpen && (
        <ProductFormModal
          categoryId={category.id}
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveProduct}
        />
      )}

      {variantModalOpen && currentProduct && (
        <ProductVariantsModal
          product={currentProduct}
          onClose={() => setVariantModalOpen(false)}
        />
      )}

      {ordersWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-red-600 mb-2">⚠ Producto con órdenes asociadas</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Este producto tiene <strong>{ordersWarning.orders.length}</strong> orden(es) asociada(s) y no puede eliminarse directamente.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 mb-5 space-y-1 max-h-32 overflow-y-auto border rounded p-2">
              {ordersWarning.orders.map(o => (
                <li key={o.id}>• Orden #{o.id} — Estado: {o.status ?? o.estado ?? '—'}</li>
              ))}
            </ul>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setOrdersWarning(null); window.location.href = '/admin/dashboard'; }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold"
              >
                Ver órdenes asociadas
              </button>
              <button
                onClick={handleDeleteWithOrders}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold"
              >
                Eliminar producto y órdenes asociadas
              </button>
              <button
                onClick={() => setOrdersWarning(null)}
                className="w-full px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-300 font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
