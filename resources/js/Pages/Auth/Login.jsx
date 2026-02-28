import { useState } from "react";
import { Head, Link, useForm } from '@inertiajs/react';
import GoogleLoginButton from "./GoogleLoginButton";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
            preserveState: true,
        });
    };

    // Generamos cuadrados dispersos para animación de fondo
    const squares = Array.from({ length: 30 }).map((_, i) => {
        const size = Math.floor(Math.random() * 40) + 20;
        const left = Math.floor(Math.random() * 100);
        const delay = Math.random() * 5;
        const duration = Math.random() * 5 + 5;
        const bgColors = ['#25D366', '#128C7E', '#34B7F1', '#075E54'];
        const bg = bgColors[Math.floor(Math.random() * bgColors.length)];
        return { size, left, delay, duration, bg };
    });

    return (
        <>
            <Head title="Login | WaEvolution" />

            <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden px-4">


                {squares.map((sq, idx) => (
                    <div
                        key={idx}
                        className="absolute rounded-md animate-fall opacity-0"
                        style={{
                            width: `${sq.size}px`,
                            height: `${sq.size}px`,
                            left: `${sq.left}%`,
                            backgroundColor: sq.bg,
                            animationDelay: `${sq.delay}s`,
                            animationDuration: `${sq.duration}s`,
                        }}
                    ></div>
                ))}


                <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#25D366]/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#128C7E]/20 rounded-full blur-3xl"></div>


                <form
                    onSubmit={submit}
                    className="relative z-10 w-full max-w-md p-8 bg-white/90 backdrop-blur-lg
                               rounded-3xl border border-green-200 shadow-2xl hover:shadow-green-400
                               transition-shadow duration-300"
                >
                    <h2 className="text-3xl text-center font-extrabold mb-6 text-transparent bg-clip-text 
                                   bg-gradient-to-r from-[#25D366] to-[#34B7F1]">
                        Iniciar Sesión
                    </h2>

                    {status && <div className="mb-4 text-sm font-medium text-green-500">{status}</div>}


                    <div className="mb-4">
                        <label htmlFor="email" className="block text-green-600 font-medium mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-green-400 bg-white text-gray-800
                                       focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                            autoComplete="username"
                        />
                        {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
                    </div>


                    <div className="mb-4">
                        <label htmlFor="password" className="block text-green-600 font-medium mb-1">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-green-400 bg-white text-gray-800
                                       focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                            autoComplete="current-password"
                        />
                        {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password}</p>}
                    </div>


                    <div className="mb-6 flex items-center">
                        <input
                            id="remember"
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                            Recordarme
                        </label>
                    </div>


                    <div className="flex items-center justify-between mb-4">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-green-600 text-sm underline hover:text-green-400"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className={`px-4 py-2 rounded-lg font-semibold text-white
                                        ${processing ? 'bg-green-300' : 'bg-[#25D366] hover:bg-[#128C7E]'} transition-colors duration-200`}
                        >
                            {processing ? 'Procesando...' : 'Iniciar Sesión'}
                        </button>
                    </div>


                    <div className="mt-4">
                        <GoogleLoginButton />
                    </div>

                    <div className="mt-4 text-center text-sm text-gray-700">
                        ¿No tienes cuenta?{' '}
                        <Link
                            href={route('register')}
                            className="text-[#25D366] font-semibold hover:text-[#128C7E] transition-colors"
                        >
                            Regístrate
                        </Link>
                    </div>
                </form>


                <style>
                    {`
                        @keyframes fall {
                            0% { transform: translateY(-100%); opacity: 0; }
                            10% { opacity: 0.5; }
                            50% { opacity: 0.7; }
                            100% { transform: translateY(110vh); opacity: 0; }
                        }
                        .animate-fall {
                            animation-name: fall;
                            animation-timing-function: linear;
                            animation-iteration-count: infinite;
                        }
                    `}
                </style>
            </div>
        </>
    );
}
