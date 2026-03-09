import { useState } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';

export default function Index({ product, types }) {
    console.log('Multimedia del producto:', product);

    // CREATE
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [multimedia, setMultimedia] = useState(product.multimedia);
    const [file, setFile] = useState(null);
    const [typeId, setTypeId] = useState('');
    const [filterType, setFilterType] = useState('');
    const [loading, setLoading] = useState(false);

    // EDIT
    const [editingId, setEditingId] = useState(null);
    const [editTypeId, setEditTypeId] = useState('');
    const [editFile, setEditFile] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    // SUBIR NUEVO ARCHIVO
    const submit = async (e) => {
        e.preventDefault();
        if (!file || !typeId) return alert('Seleccione archivo y tipo');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('multimedia_type_id', typeId);

        if (title) formData.append('title', title);
        if (description) formData.append('description', description);
        console.log('Subiendo multimedia con datos:', { file, typeId, title, description });
        setLoading(true);
        try {
            const res = await axios.post(
                `/admin/productos/${product.id}/multimedia`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setMultimedia([...multimedia, res.data]);
            setFile(null);
            setTypeId('');
            setTitle('');
            setDescription('');
        } catch (err) {
            console.log(err.response?.data);
            alert('Error al subir multimedia');
        } finally {
            setLoading(false);
        }
    };

    // ELIMINAR
    const eliminar = async (id) => {
        if (!confirm('¿Eliminar archivo?')) return;
        await axios.delete(`/admin/multimedia/${id}`);
        setMultimedia(multimedia.filter(m => m.id !== id));
    };

    // INICIAR EDICIÓN
    const startEditing = (m) => {
        setEditingId(m.id);
        setEditTypeId(m.multimedia_type_id);
        setEditTitle(m.title || '');
        setEditDescription(m.description || '');
        setEditFile(null);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditTypeId('');
        setEditTitle('');
        setEditDescription('');
        setEditFile(null);
    };

    // GUARDAR EDICIÓN
    const saveEdit = async (id) => {
        if (!editTypeId) return alert('Seleccione un tipo válido');

        const formData = new FormData();
        formData.append('_method', 'POST');
        formData.append('multimedia_type_id', editTypeId);
        formData.append('title', editTitle);
        formData.append('description', editDescription);

        if (editFile) formData.append('file', editFile);

        setLoading(true);
        try {
            const res = await axios.post(`/admin/multimedia/${id}`, formData);
            setMultimedia(multimedia.map(m => m.id === id ? res.data : m));
            cancelEditing();
        } catch (err) {
            console.log(err.response?.data);
            alert('Error al editar multimedia');
        } finally {
            setLoading(false);
        }
    };

    // FILTRAR POR TIPO
    const multimediaFiltrada = filterType
        ? multimedia.filter(m => m.multimedia_type_id === parseInt(filterType))
        : multimedia;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <Head title={`Multimedia - ${product.name}`} />

            <h1 className="text-2xl font-bold mb-2">Multimedia del producto</h1>
            <p className="text-gray-600 mb-6">
                Producto: <strong>{product.name}</strong>
            </p>

            {/* FORM SUBIR */}
            <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                <select value={typeId} onChange={e => setTypeId(e.target.value)} className="border rounded px-3 py-2">
                    <option value="">Tipo multimedia</option>
                    {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>

                <input
                    type="text"
                    placeholder="Título (opcional)"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="border rounded px-3 py-2"
                />

                <input
                    type="text"
                    placeholder="Descripción (opcional)"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="border rounded px-3 py-2"
                />

                <input type="file" onChange={e => setFile(e.target.files[0])} className="border rounded px-3 py-2" />

                <button disabled={loading} className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
                    {loading ? 'Subiendo...' : 'Subir'}
                </button>
            </form>

            {/* FILTRO */}
            <div className="mb-6">
                <label className="mr-2 font-semibold">Filtrar por tipo:</label>
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="border rounded px-3 py-2">
                    <option value="">Todos</option>
                    {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {multimediaFiltrada.length ? multimediaFiltrada.map(m => (
                    <div key={m.id} className="bg-white rounded shadow p-2">
                        <span className="text-xs text-gray-500">{m.multimedia_type?.name}</span>

                        {editingId === m.id ? (
                            <>
                                <select
                                    value={editTypeId}
                                    onChange={e => setEditTypeId(parseInt(e.target.value))}
                                    className="border rounded px-2 py-1 mt-1 w-full"
                                >
                                    {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>

                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={e => setEditTitle(e.target.value)}
                                    placeholder="Título (opcional)"
                                    className="border rounded px-2 py-1 mt-1 w-full"
                                />

                                <textarea
                                    value={editDescription}
                                    onChange={e => setEditDescription(e.target.value)}
                                    placeholder="Descripción (opcional)"
                                    className="border rounded px-2 py-1 mt-1 w-full"
                                />

                                <input type="file" onChange={e => setEditFile(e.target.files[0])} className="border rounded px-2 py-1 mt-1 w-full" />

                                <div className="flex justify-end mt-2 gap-2">
                                    <button type="button" className="text-green-600" onClick={() => saveEdit(m.id)}>💾 Guardar</button>
                                    <button type="button" className="text-gray-600" onClick={cancelEditing}>❌ Cancelar</button>
                                </div>
                            </>
                        ) : (
                            <>
                                {m.type === 'image' ? (
                                    <img src={m.url} className="w-full h-40 object-cover rounded mt-2" />
                                ) : (
                                    <video controls className="w-full h-40 rounded mt-2">
                                        <source src={m.url} />
                                    </video>
                                )}

                                {m.title && <h4 className="font-semibold text-sm mt-2">{m.title}</h4>}
                                {m.description && <p className="text-xs text-gray-600">{m.description}</p>}

                                <div className="flex justify-end mt-2 gap-2">
                                    <button type="button" className="text-blue-600 text-sm" onClick={() => startEditing(m)}>✏️ Editar</button>
                                    <button type="button" className="text-red-600 text-sm" onClick={() => eliminar(m.id)}>✕</button>
                                </div>
                            </>
                        )}
                    </div>
                )) : (
                    <div className="col-span-4 text-center text-gray-500 p-4">
                        No hay multimedia
                    </div>
                )}
            </div>
        </div>
    );
}
