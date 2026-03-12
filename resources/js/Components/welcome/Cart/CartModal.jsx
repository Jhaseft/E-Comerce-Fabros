import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/Contexts/CartContext';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CURRENCY_SYMBOL } from '@/utils/currency';

export default function CartModal({ isOpen, onClose }) {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setShow(true), 20);
    } else {
      setShow(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000000] flex justify-end transition-colors duration-300
        ${show ? 'bg-black/60' : 'bg-black/0'}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`
          bg-gray-900
          w-full sm:w-96
          h-full
          flex flex-col
          shadow-2xl
          rounded-l-3xl
          transform transition-transform duration-300
          ${show ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
   
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingCart size={22} className="text-blue-400" />
            <h2 className="text-xl font-bold text-white">Mi Carrito</h2>
            {cart.length > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-400 transition"
              >
                <Trash2 size={15} />
                Vaciar
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
            >
              <X size={22} />
            </button>
          </div>
        </div>


        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-500 py-16">
              <ShoppingCart size={48} className="opacity-30" />
              <p className="text-center">El carrito está vacío</p>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.rowId}
                className="flex gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl"
              >
             
                <img
                  src={item.options?.image || '/images/placeholder.png'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl shrink-0"
                />

                
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="min-w-0">
                    <p className="font-semibold text-white text-sm leading-tight line-clamp-2 break-words">
                      {item.name}
                    </p>

                    {item.options?.variant && (
                      <p className="text-xs text-blue-300 mt-0.5 truncate">
                        {item.options.variant}
                      </p>
                    )}

                    {item.options?.sku && (
                      <p className="text-xs text-gray-500 truncate">
                        SKU: {item.options.sku}
                      </p>
                    )}
                  </div>

               
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <div className="flex items-center rounded-lg overflow-hidden border border-white/10">
                      <button
                        onClick={() => updateQuantity(item.rowId, item.qty - 1)}
                        disabled={item.qty <= 1}
                        className="px-2 py-1 bg-white/5 hover:bg-blue-600 transition disabled:opacity-30"
                      >
                        <Minus size={13} className="text-white" />
                      </button>
                      <span className="px-3 text-sm font-semibold text-white bg-white/5">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.rowId, item.qty + 1)}
                        className="px-2 py-1 bg-white/5 hover:bg-blue-600 transition"
                      >
                        <Plus size={13} className="text-white" />
                      </button>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-bold text-blue-400 text-sm">
                        {CURRENCY_SYMBOL} {(item.price * item.qty).toLocaleString('es-AR')}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.rowId)}
                        className="text-xs text-gray-500 hover:text-red-400 transition mt-0.5"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer — total y botón */}
        {cart.length > 0 && (
          <div className="shrink-0 px-6 py-5 border-t border-white/10 bg-gray-900/80 backdrop-blur-sm rounded-bl-3xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 font-medium">Total</span>
              <span className="text-2xl font-bold text-white">
                {CURRENCY_SYMBOL} {total.toLocaleString('es-AR')}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={onClose}
              className="
                block w-full py-3 text-center
                bg-blue-600 hover:bg-blue-700
                text-white font-bold text-sm
                rounded-xl transition
              "
            >
              Confirmar pedido
            </Link>

            <button
              onClick={onClose}
              className="mt-2 block w-full py-2 text-center text-sm text-gray-400 hover:text-white transition"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
