import { useState } from "react";

export default function CustomerInfoForm({
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    customerMail,
    setCustomerMail,
    className = ''
}) {
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-ZÀ-ÿñÑ\s]*$/.test(value) && value.length <= 30) {
            setCustomerName(value);
            setNameError(value.length < 3 ? "El nombre debe tener al menos 3 letras." : "");
        }
    };

    const handlePhoneChange = (e) => {
        const cleaned = e.target.value.replace(/\D+/g, "");
        if (cleaned.length <= 15) {
            setCustomerPhone(cleaned);
            setPhoneError(cleaned.length < 7 ? "El número debe tener al menos 7 dígitos." : "");
        }
    };

    const handleMailChange = (e) => {
        let value = e.target.value;
        if (value.length > 60) value = value.slice(0, 60);
        setCustomerMail(value);
        const emailRegex = /^[a-zA-Z0-9._%+-]{1,}@.{1,}\..{2,}$/;
        setEmailError(value.length >= 5 && emailRegex.test(value) ? "" : "Ingresa un correo válido.");
    };

    const inputClass = (error) =>
        `w-full p-3 rounded-xl bg-gray-50 text-gray-800 border ${
            error ? "border-red-500" : "border-blue-200"
        } focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition`;

    return (
        <div className={`bg-white border border-blue-100 rounded-2xl p-6 mb-6 shadow-lg ${className}`}>
            <h3 className="font-bold text-2xl mb-5 border-b border-blue-100 pb-3" style={{ color: '#02478f' }}>
                Datos del Cliente
            </h3>

            <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium">Nombre completo</label>
                <input
                    type="text"
                    autoComplete="name"
                    value={customerName}
                    onChange={handleNameChange}
                    placeholder="Ingresa tu nombre completo"
                    className={inputClass(nameError)}
                    required
                />
                {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
            </div>

            <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium">Número de teléfono</label>
                <input
                    type="tel"
                    autoComplete="tel"
                    value={customerPhone}
                    onChange={handlePhoneChange}
                    placeholder="Ingresa tu número"
                    className={inputClass(phoneError)}
                    required
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
            </div>

            <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium">Correo electrónico</label>
                <input
                    type="email"
                    autoComplete="email"
                    value={customerMail}
                    onChange={handleMailChange}
                    placeholder="Ingresa tu correo"
                    className={inputClass(emailError)}
                    required
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <p className="text-gray-400 text-sm">
                Nos comunicaremos contigo al número o correo registrado.
            </p>
        </div>
    );
}
