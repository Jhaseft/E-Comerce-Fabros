import { useState, useEffect } from "react";

export default function CategoryModal({
  open,
  close,
  editingCategory,
  setEditingCategory,
  refresh,
  categories = [] // lista de categorías para parent_id
}) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setDescription(editingCategory.description || "");
      setParentId(editingCategory.parent_id || null);
      setImagePreview(editingCategory.image || null);
      setImage(null);
    } else {
      setName("");
      setDescription("");
      setParentId(null);
      setImage(null);
      setImagePreview(null);
    }
  }, [editingCategory]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const save = async () => {
    if (!name.trim()) return alert("Ingresa un nombre válido");

    setLoading(true);

    const url = editingCategory ? `/admin/categories/${editingCategory.id}` : "/admin/categories";
    const method = editingCategory ? "PUT" : "POST";

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description || '');
    if (parentId) formData.append('parent_id', parentId);
    if (image) formData.append('image', image);

    // Para métodos PUT, necesitamos agregar _method
    if (method === "PUT") {
      formData.append('_method', 'PUT');
    }

    await fetch(url, {
      method: "POST", // Siempre POST con FormData
      headers: {
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
      },
      body: formData
    });

    setLoading(false);
    close();
    refresh();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000] p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">
          {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
        </h3>

        <input
          type="text"
          className="w-full px-3 py-2 mb-3 border rounded-lg"
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <textarea
          className="w-full px-3 py-2 mb-3 border rounded-lg resize-none"
          rows={3}
          placeholder="Descripción (opcional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        {/* Selector de categoría padre */}
        <select
          className="w-full px-3 py-2 mb-3 border rounded-lg"
          value={parentId || ""}
          onChange={e => setParentId(e.target.value || null)}
        >
          <option value="">Categoría raíz</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Selector de imagen */}
        <div className="mb-3">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Imagen de la categoría
          </label>

          {imagePreview && (
            <div className="mb-3 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            Formatos: JPG, PNG, GIF, WEBP (máx. 10MB)
          </p>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={close}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            onClick={save}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
