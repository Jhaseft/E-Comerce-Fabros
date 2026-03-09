import { Link } from '@inertiajs/react';
import { Home } from 'lucide-react';

export default function CheckoutHeader() {
    return (
        <div className="flex justify-between items-start mb-8">
            <div>
                <h1
                    className="text-4xl font-bold"
                    style={{ color: '#02478f', fontFamily: "'Playfair Display', serif", letterSpacing: '2px' }}
                >
                    FABROS
                </h1>
                <p className="text-sm mt-1 font-medium" style={{ color: '#02478f' }}>
                    Representante oficial · DongFeng · ZNA · Yutong Buses
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                    Bolivia · Más de 15 años de experiencia
                </p>
            </div>

            <Link href="/" className="hover:opacity-70 transition-opacity" style={{ color: '#02478f' }}>
                <Home size={28} />
            </Link>
        </div>
    );
}
