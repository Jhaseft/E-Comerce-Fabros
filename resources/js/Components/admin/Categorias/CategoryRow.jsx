import { Link } from '@inertiajs/react';

export default function CategoryRow({
  category,
  isSelectable,
  selected,
  onSelect,
  onEdit,
  onOpenChildrenModal
}) {

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 p-4 rounded-lg shadow gap-4">
      <div className="flex items-start gap-4 w-full sm:w-auto">
        {isSelectable && (
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(category.id)}
            className="mt-1"
          />
        )}

        {/* Imagen de la categoría */}
        {category.image && (
          <div className="flex-shrink-0">
            <img
              src={category.image}
              alt={category.name}
              className="w-20 h-20 object-cover rounded-lg border-2 border-gray-300"
            />
          </div>
        )}

        {/* Información de la categoría */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{category.name}</h3>
          <p className="text-gray-500 text-sm">
            {category.products_count} productos
          </p>
          <p className="text-gray-500 text-sm">{category.description || "Sin descripción"}</p>
        </div>
      </div>

      {/* Botones de acciones */}
      <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">

        <button
          className="text-yellow-600 font-semibold hover:text-yellow-800 whitespace-nowrap"
          onClick={() => onEdit(category)}
        >
          Editar
        </button>

        {category.children?.length > 0 && (
          <button
            className="text-blue-600 font-semibold hover:text-blue-800 whitespace-nowrap"
            onClick={() => onOpenChildrenModal(category)}
          >
            Ver subcategorías →
          </button>
        )}

        <Link
          href={`/admin/categories/${category.id}/products`}
          className="text-blue-600 font-semibold hover:text-blue-800 whitespace-nowrap"
        >
          Ver productos →
        </Link>

      </div>

    </div>
  );
}
