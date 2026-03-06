import { useState } from "react";
export default function BuyNowModal({
    isOpen,
    onClose,
    product
}) {
    const [step, setStep] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [paymentFile, setPaymentFile] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const mainImage =
        product.multimedia?.find((m) => m.type === "image")?.url ||
        "https://via.placeholder.com/400x300";

    const total = Number(product.precio_actual) * quantity;

    const handleSubmitToBackend = async () => {
        try {
        
            setLoading(true);

            const formData = new FormData();
            formData.append("product_id", product.id);
            formData.append("quantity", quantity);
            formData.append("payment_proof", paymentFile);

            const token = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            const response = await fetch("/orders/store", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": token,
                },
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                alert(" Su pedido se realizó correctamente (Nos comunicaremos con el numero o correo registrado).");

                onClose();
                setQuantity(1);
                setPaymentFile(null);
            } else {
                alert(" Ocurrió un error al procesar el pedido.");
            }

        } catch (error) {
            console.error(error);
            alert(" Error inesperado al enviar el pedido.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">


                <button
                    onClick={() => {
                        onClose();
                        setStep(1);
                    }}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
                >
                    ✕
                </button>

                {step === 1 && (
                    <>
                        <h2 className="text-xl font-bold mb-4">
                            Confirmar compra
                        </h2>


                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-48 object-contain mb-4 rounded-lg bg-gray-50"
                        />


                        <p className="font-bold text-lg">{product.name}</p>


                        <p className="text-sm text-gray-600 mb-3">
                            {product.description}
                        </p>


                        <p className="text-gray-800 font-semibold mb-4">
                            Precio unitario: ${product.precio_actual}
                        </p>


                        <div className="flex items-center gap-3 mb-4">
                            <span>Cantidad:</span>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(Math.max(1, Number(e.target.value)))
                                }
                                className="border rounded-lg px-3 py-2 w-20"
                            />
                        </div>

                        <p className="font-bold text-lg mb-6">
                            Total: ${total}
                        </p>

                        <button
                            onClick={() => setStep(2)}
                            className="w-full py-3 rounded-xl text-white font-bold"
                            style={{ backgroundColor: "#02478f" }}
                        >
                            Continuar al pago
                        </button>
                    </>
                )}


                {step === 2 && (
                    <>
                        <h2 className="text-xl font-bold mb-4">
                            Pago por transferencia
                        </h2>

                        <p className="text-sm text-gray-600 mb-4">
                            Escanea el QR para realizar el pago y luego sube tu comprobante.
                        </p>


                        <img
                            src="https://res.cloudinary.com/dnbklbswg/image/upload/v1772251355/WhatsApp_Image_2026-02-26_at_16.11.57_1_iypyzr.jpg"
                            alt="QR Pago"
                            className="w-48 h-48 mx-auto mb-6 object-contain"
                        />


                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPaymentFile(e.target.files[0])}
                            className="mb-4 w-full"
                        />

                        <button
                            disabled={!paymentFile || loading}
                            onClick={handleSubmitToBackend}
                            className="w-full py-3 rounded-xl text-white font-bold disabled:opacity-50"
                            style={{ backgroundColor: "#02478f" }}
                        >
                            {loading ? "Enviando..." : "Confirmar y enviar pedido"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}