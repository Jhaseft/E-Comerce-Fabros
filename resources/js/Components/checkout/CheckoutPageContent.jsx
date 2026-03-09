'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/Contexts/CartContext';
import CheckoutHeader from './CheckoutHeader';
import CustomerInfoForm from './CustomerInfo';
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';
import Layout from '@/Layouts/LayoutCheckout';
import { Head, usePage } from '@inertiajs/react';

const QR_URL =
    'https://res.cloudinary.com/dnbklbswg/image/upload/v1772251355/WhatsApp_Image_2026-02-26_at_16.11.57_1_iypyzr.jpg';

export default function CheckoutPageContent() {
    const { cart = [], subtotal = 0, total = 0 } = useCart();
    const { auth } = usePage().props;
    const user = auth?.user;

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    const [customerName, setCustomerName] = useState(user?.name ?? '');
    const [customerPhone, setCustomerPhone] = useState(user?.phone ?? '');
    const [customerMail, setCustomerMail] = useState(user?.email ?? '');

    const [paymentFile, setPaymentFile] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (cart.length > 0) setLoading(false);
    }, [cart]);

    const handleContinue = () => {
        if (!customerName.trim() || !customerPhone.trim()) {
            alert('Debes ingresar tu nombre y número de teléfono.');
            return;
        }
        if (!customerMail.trim()) {
            alert('Debes ingresar tu correo electrónico.');
            return;
        }
        setStep(2);
    };

    const handlePlaceOrder = async () => {
        if (!paymentFile) {
            alert('Debes subir tu comprobante de pago.');
            return;
        }

        setProcessing(true);

        const orderItems = cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.qty,
            price: item.price,
            subtotal: item.price * item.qty,
            size: item.options.variant,
        }));

        const formData = new FormData();
        formData.append('customer_name', customerName);
        formData.append('customer_phone', customerPhone);
        formData.append('customer_email', customerMail);
        formData.append('payment_method', 1); // QR
        formData.append('status', 2);
        formData.append('total', total);
        formData.append('cart', JSON.stringify(orderItems));
        formData.append('payment_proof', paymentFile);

        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        try {
            const response = await fetch('/orders/store', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json',
                },
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setShowSuccess(true);
            } else {
                alert('Ocurrió un error al procesar el pedido.');
            }
        } catch (error) {
            console.error(error);
            alert('Error inesperado al enviar el pedido.');
        } finally {
            setProcessing(false);
        }
    };

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                window.location.href = '/';
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    return (
        <Layout title="Checkout">
            <Head title="Checkout" />

            <div className="max-w-3xl mx-auto p-6 bg-white text-gray-800 rounded-2xl shadow-lg border border-blue-100">
                <CheckoutHeader />

                {step === 1 && (
                    <>
                        <CustomerInfoForm
                            customerName={customerName}
                            setCustomerName={setCustomerName}
                            customerPhone={customerPhone}
                            setCustomerPhone={setCustomerPhone}
                            customerMail={customerMail}
                            setCustomerMail={setCustomerMail}
                        />

                        <CartItems
                            cart={cart}
                            loading={loading}
                            subtotal={subtotal}
                            total={total}
                            className="mb-6 bg-blue-50/50 rounded-lg p-4"
                        />

                        <OrderSummary
                            cart={cart}
                            subtotal={subtotal}
                            total={total}
                            loading={loading}
                            className="mb-6"
                        />

                        <button
                            onClick={handleContinue}
                            disabled={loading}
                            className="w-full py-3 px-6 rounded-xl text-white font-bold shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: '#02478f' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#013a73'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#02478f'}
                        >
                            Continuar al pago
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        {/* Resumen del pedido */}
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
                            <h3 className="font-bold text-lg mb-2" style={{ color: '#02478f' }}>
                                Resumen del pedido
                            </h3>
                            <p className="text-gray-700 text-sm"><span className="font-medium">Cliente:</span> {customerName}</p>
                            <p className="text-gray-700 text-sm"><span className="font-medium">Teléfono:</span> {customerPhone}</p>
                            <p className="text-gray-700 text-sm"><span className="font-medium">Correo:</span> {customerMail}</p>
                            <p className="text-gray-800 font-bold mt-3">Total: ${total}</p>
                        </div>

                        {/* QR de pago */}
                        <div className="bg-white border border-blue-100 rounded-2xl p-6 mb-6 shadow-lg text-center">
                            <h3 className="font-bold text-2xl mb-2 border-b border-blue-100 pb-3" style={{ color: '#02478f' }}>
                                Pago por QR
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Escanea el código QR para realizar el pago y luego sube tu comprobante.
                            </p>

                            <img
                                src={QR_URL}
                                alt="QR de pago FABROS"
                                className="w-52 h-52 mx-auto mb-6 object-contain rounded-xl border border-blue-100 shadow"
                            />

                            <label className="block text-gray-700 font-medium mb-2 text-left">
                                Subir comprobante de pago
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setPaymentFile(e.target.files[0])}
                                className="w-full mb-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:text-white cursor-pointer"
                                style={{ '--file-bg': '#02478f' }}
                            />
                            {paymentFile && (
                                <p className="text-green-600 text-sm mt-1">
                                    Archivo seleccionado: {paymentFile.name}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="w-1/3 py-3 rounded-xl font-bold border-2 text-blue-800 transition-all"
                                style={{ borderColor: '#02478f', color: '#02478f' }}
                            >
                                Volver
                            </button>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={!paymentFile || processing}
                                className="w-2/3 py-3 rounded-xl text-white font-bold shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                style={{ backgroundColor: '#02478f' }}
                                onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#013a73'; }}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#02478f'}
                            >
                                {processing && (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                )}
                                {processing ? 'Enviando pedido...' : 'Confirmar y enviar pedido'}
                            </button>
                        </div>
                    </>
                )}
            </div>

            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
                        <h2 className="text-2xl font-bold mb-2" style={{ color: '#02478f' }}>
                            ¡Pedido registrado!
                        </h2>
                        <p className="text-gray-600 mb-2">
                            Tu pedido fue enviado correctamente.<br />
                            Nos comunicaremos contigo al número o correo registrado.
                        </p>
                        <p className="text-sm text-gray-400">Serás redirigido automáticamente...</p>
                    </div>
                </div>
            )}
        </Layout>
    );
}
