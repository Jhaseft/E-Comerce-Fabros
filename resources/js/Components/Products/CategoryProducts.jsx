import { Link } from '@inertiajs/react';
import { useState } from 'react';

const BRAND_BLUE  = '#02478f';
const BRAND_LIGHT = '#9ab7ca';
const BRAND_PALE  = '#f0f6ff';

export default function CategoryProducts({ category }) {
    const [hoveredCard, setHoveredCard] = useState(null);
    if (!category) return null;

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/\./g, '-')
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };

    const renderProductsGrid = (products) => (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {products.map((p) => {
                const isHovered = hoveredCard === p.id;
                const imgUrl =
                    p.multimedia?.find(m => m.multimedia_type_id === 1)?.url
                    || p.multimedia?.[0]?.url
                    || '/placeholder.png';

                return (
                    <div
                        key={p.id}
                        className="group bg-white rounded-lg overflow-hidden flex flex-col transition-all duration-300"
                        style={{
                            border: isHovered ? `2px solid ${BRAND_BLUE}` : '2px solid #e5e7eb',
                            boxShadow: isHovered ? `0 6px 24px rgba(2,71,143,0.18)` : '0 1px 4px rgba(0,0,0,0.07)',
                        }}
                        onMouseEnter={() => setHoveredCard(p.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        
                        <div className="relative bg-gray-50 overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                            <img
                                src={imgUrl}
                                alt={p.name || 'Producto'}
                                className="absolute inset-0 w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                            />
                        
                            <div
                                className="absolute top-0 left-0 h-1 w-full transition-all duration-300"
                                style={{ backgroundColor: isHovered ? BRAND_BLUE : 'transparent' }}
                            />
                        </div>

                
                        <div className="flex flex-col flex-1 p-3 gap-2">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 leading-snug min-h-[2.6rem]">
                                {p.name}
                            </h3>

                            {p.description && (
                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                    {p.description}
                                </p>
                            )}

                            <div className="mt-auto pt-2">
                                <Link
                                    href={`/products/${generateSlug(p.name)}/${p.id}`}
                                    className="block w-full text-center py-2 text-sm font-bold rounded-md transition-all duration-300"
                                    style={{
                                        backgroundColor: isHovered ? BRAND_BLUE : BRAND_LIGHT,
                                        color: isHovered ? '#ffffff' : BRAND_BLUE,
                                    }}
                                >
                                    Ver producto
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="w-full space-y-12 pb-16">

            {category.products?.length > 0 && renderProductsGrid(category.products)}

            {category.children?.length > 0 && (
                <div className="space-y-12">
                    {category.children.map((sub) => (
                        <div key={sub.id}>
                            
                            <div
                                className="w-full px-6 py-5"
                                style={{ backgroundColor: BRAND_PALE, borderTop: `4px solid ${BRAND_BLUE}` }}
                            >
                                <div className="max-w-7xl mx-auto flex items-center gap-4">
                                    
                                    <div
                                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: BRAND_BLUE }}
                                    >
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                        </svg>
                                    </div>
                                    <h2
                                        className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide"
                                        style={{ color: BRAND_BLUE }}
                                    >
                                        {sub.name}
                                    </h2>
                                </div>
                            </div>

                            {sub.products?.length > 0
                                ? renderProductsGrid(sub.products)
                                : (
                                    <p className="text-gray-400 italic text-center mt-6">
                                        No hay productos disponibles.
                                    </p>
                                )
                            }
                        </div>
                    ))}
                </div>
            )}

            {(!category.products?.length && !category.children?.length) && (
                <p className="text-gray-400 italic text-center">
                    No hay productos disponibles.
                </p>
            )}
        </div>
    );
}
