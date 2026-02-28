import { useState } from "react";

export default function ProductFormModal({ categoryId, product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    longDescription: product?.longDescription || "",
    precio_anterior: product?.precio_anterior || "",
    precio_actual: product?.precio_actual || "",
    files: [], // archivos nuevos (tipo General)
  });

  const [existingMedia, setExistingMedia] = useState(
    product?.multimedia?.filter(m => m.multimedia_type_id === 1) || []
  );
  const [previews, setPreviews] = useState([]); // objetos {file, url}
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "files") {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setFormData((prev) => ({ ...prev, files: [...prev.files, ...newFiles] }));
      setPreviews((prev) => [...prev, ...newPreviews]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveExisting = (id) => {
    setExistingMedia((prev) => prev.filter((m) => m.id !== id));
  };

  const handleRemoveNewFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
    setPreviews((prev) => {
      // liberar URL.createObjectURL
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "files") {
          value.forEach((file) => data.append("files[]", file));
        } else if (value !== null && value !== "") {
          data.append(key, value);
        }
      });

      const removedIds = product?.multimedia
        ?.filter((m) => m.multimedia_type_id === 1 && !existingMedia.find((em) => em.id === m.id))
        .map((m) => m.id);
      if (removedIds?.length) {
        removedIds.forEach((id) => data.append("removed_media_ids[]", id));
      }

      let url = "/admin/products";
      let method = "POST";

      if (product) {
        url = `/admin/products/${product.id}`;
        data.append("_method", "PUT");
      } else {
        data.append("category_id", categoryId);
      }

      const res = await fetch(url, {
        method,
        headers: {
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
          "Accept": "application/json",
        },
        body: data,
      });

      if (!res.ok) {
        const text = await res.text();
        try {
          const jsonErr = JSON.parse(text);
          setErrors(jsonErr.errors || {});
        } catch {
          console.error("Error inesperado:", text);
          alert("Error inesperado del servidor");
        }
        setLoading(false);
        return;
      }

      const json = await res.json();

      if (json.status === "success") {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onSave(json.product, !!product);
        }, 1500);
      } else {
        alert("Error al guardar producto");
      }
    } catch (err) {
      console.error(err);
      alert("Error en la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-24 h-24 border-4 border-gray-200 border-t-pink-600 rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && !success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 grid gap-6 overflow-auto max-h-[90vh]"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">
              {product ? "Editar" : "Agregar"} Producto
            </h2>

            {Object.keys(errors).length > 0 && (
              <div className="bg-red-100 text-red-700 p-3 rounded">
                {Object.entries(errors).map(([field, msgs]) => (
                  <p key={field} className="text-sm">
                    <strong>{field}:</strong> {msgs.join(", ")}
                  </p>
                ))}
              </div>
            )}

            {/* Multimedia existente (solo General) */}
            {existingMedia.length > 0 && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Imágenes Generales Actuales
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {existingMedia.map((media) => (
                    <div key={media.id} className="relative">
                      {media.type === "image" ? (
                        <img src={media.url} className="w-full h-24 object-cover rounded border-2 border-gray-300" alt="Multimedia" />
                      ) : (
                        <video src={media.url} className="w-full h-24 rounded border-2 border-gray-300" controls />
                      )}
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        onClick={() => handleRemoveExisting(media.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Previews de archivos nuevos */}
            {previews.length > 0 && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nuevas Imágenes Generales
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {previews.map(({ file, url }, i) => {
                    const isVideo = file.type.startsWith("video");
                    return (
                      <div key={i} className="relative">
                        {isVideo ? (
                          <video src={url} className="w-full h-24 rounded border-2 border-gray-300" controls />
                        ) : (
                          <img src={url} className="w-full h-24 object-cover rounded border-2 border-gray-300" alt="Preview" />
                        )}
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                          onClick={() => handleRemoveNewFile(i)}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* INPUTS */}
            <div className="grid gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Descripción Corta</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Descripción breve del producto"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Descripción Larga</label>
                <textarea
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Descripción detallada del producto (puede incluir HTML)"
                />
              </div>

              {/* Precios */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Precios</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Precio Anterior</label>
                    <input
                      type="number"
                      name="precio_anterior"
                      value={formData.precio_anterior}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Ej: 5990000"
                    />
                    <p className="text-xs text-gray-400 mt-1">Dejar vacío si no aplica descuento</p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Precio Actual</label>
                    <input
                      type="number"
                      name="precio_actual"
                      value={formData.precio_actual}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Ej: 4990000"
                    />
                  </div>
                </div>
              </div>

              {/* Multimedia General */}
              <div className="border-t pt-4">
                <label className="block text-gray-700 font-semibold mb-1">
                  Agregar Imágenes Generales
                </label>
                <p className="text-sm text-gray-600 mb-2">
                  Las imágenes se agregarán como tipo "General" (multimedia_type_id = 1)
                </p>
                <input
                  type="file"
                  name="files"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                />
              </div>
            </div>

            {/* BOTONES */}
            <div className="flex justify-end gap-2 border-t pt-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 font-semibold"
                onClick={onClose}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 font-semibold"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
