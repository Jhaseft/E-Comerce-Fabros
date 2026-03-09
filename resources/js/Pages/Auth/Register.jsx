import { Head, Link, useForm } from '@inertiajs/react';
import GoogleLoginButton from "./GoogleLoginButton";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'), // limpia los passwords
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
        <div className="min-h-screen flex items-center justify-center bg-white px-4 relative overflow-hidden">

            <Head title="Registro | WaEvolution" />

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
                className="w-full max-w-md p-8 bg-white/80 backdrop-blur-xl
                           rounded-3xl border border-[#25D366]/30 shadow-2xl hover:shadow-[#25D366]/40
                           transition-shadow duration-300 z-10"
            >
                <h2 className="text-2xl text-center mb-6 bg-clip-text text-transparent 
                               bg-gradient-to-r from-[#25D366] to-[#34B7F1] font-extrabold tracking-wide">
                    Crear Cuenta
                </h2>


                <div className="mb-4">
                    <label htmlFor="name" className="block text-[#25D366] font-medium mb-1">Nombre</label>
                    <input
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-[#25D366] bg-white text-gray-800
                                   focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                        required
                    />
                    {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>}
                </div>

           
                <div className="mb-4">
                    <label htmlFor="email" className="block text-[#25D366] font-medium mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-[#25D366] bg-white text-gray-800
                                   focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                        required
                    />
                    {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block text-[#25D366] font-medium mb-1">Número de Teléfono</label>
                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="+54 9 11 1234-5678"
                        className="w-full px-4 py-2 rounded-lg border border-[#25D366] bg-white text-gray-800
                                   focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                        required
                    />
                    {errors.phone && <p className="text-red-500 mt-1 text-sm">{errors.phone}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-[#25D366] font-medium mb-1">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-[#25D366] bg-white text-gray-800
                                   focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                        required
                    />
                    {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password}</p>}
                </div>

      
                <div className="mb-6">
                    <label htmlFor="password_confirmation" className="block text-[#25D366] font-medium mb-1">Confirmar Contraseña</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-[#25D366] bg-white text-gray-800
                                   focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                        required
                    />
                    {errors.password_confirmation && <p className="text-red-500 mt-1 text-sm">{errors.password_confirmation}</p>}
                </div>

                
                <div className="flex items-center justify-between mb-4">
                    <Link
                        href={route('login')}
                        className="text-[#25D366] text-sm underline hover:text-[#128C7E]"
                    >
                        ¿Ya tienes cuenta? Inicia sesión
                    </Link>

                    <button
                        type="submit"
                        disabled={processing}
                        className={`px-4 py-2 rounded-lg font-medium text-white
                                    ${processing ? 'bg-gray-400' : 'bg-[#25D366] hover:bg-[#128C7E]'} transition-colors duration-200`}
                    >
                        {processing ? 'Procesando...' : 'Registrarse'}
                    </button>
                </div>


                <div className="mt-4">
                    <GoogleLoginButton />
                </div>


                <div className="mt-4 text-center text-sm text-gray-700">
                    ¿Ya tienes cuenta?{' '}
                    <Link
                        href={route('login')}
                        className="text-[#25D366] font-semibold hover:text-[#128C7E] transition-colors"
                    >
                        Inicia sesión
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
    );
}
