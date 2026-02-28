// CategoriesMenu.jsx
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function CategoriesMenu({ categories }) {
    const { url } = usePage();
    const activeSlug = url.split('/').pop();

    return (
        <div className="w-full bg-white  border-b border-RED-200 shadow-sm">
            
            <div className="h-1 w-full " style={{ background: 'linear-gradient(90deg, #02478f 0%, #5b9bd5 50%, #02478f 100%)' }} />

            <div className="md:justify-center flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3">
                {categories.map((cat) => {
                    const isActive = activeSlug === cat.slug;
                    return (
                        <Link
                            key={cat.id}
                            href={`/products/${cat.slug}`}
                            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 font-semibold uppercase tracking-wide text-sm"
                            style={
                                isActive
                                    ? {
                                        backgroundColor: '#02478f',
                                        color: '#ffffff',
                                        boxShadow: '0 4px 14px rgba(2,71,143,0.35)',
                                        transform: 'scale(1.05)',
                                      }
                                    : {
                                        backgroundColor: '#f0f6ff',
                                        color: '#02478f',
                                        border: '1.5px solid #c8ddf2',
                                      }
                            }
                            onMouseEnter={e => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = '#dbeafe';
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(2,71,143,0.18)';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = '#f0f6ff';
                                    e.currentTarget.style.boxShadow = 'none';
                                }
                            }}
                        >
                            <span>{cat.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
