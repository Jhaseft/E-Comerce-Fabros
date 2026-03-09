import { useState } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';

export default function Index({ product }) {

    const [caracteristicas, setCaracteristicas] = useState(product.caracteristicas);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        nombre: '',
        valor: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setForm({ nombre: '', valor: '' });
        setEditingId(null);
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingId) {
                // UPDATE
                const res = await axios.put(
                    `/admin/caracteristicas/${editingId}`,
                    form
                );

                setCaracteristicas(
                    caracteristicas.map(c =>
                        c.id === editingId ? res.data : c
                    )
                );

            } else {
                // CREATE
                const res = await axios.post(
                    `/admin/productos/${product.id}/caracteristicas`,
                    form
                );

                setCaracteristicas([...caracteristicas, res.data]);
            }

            resetForm();

        } catch (error) {
            alert('Error al guardar');
        } finally {
            setLoading(false);
        }
    };

    const editar = (c) => {
        setEditingId(c.id);
        setForm({
            nombre: c.nombre,
            valor: c.valor
        });
    };

    const eliminar = async (id) => {
        if (!confirm('¿Eliminar característica?')) return;

        try {
            await axios.delete(`/admin/caracteristicas/${id}`);
            setCaracteristicas(caracteristicas.filter(c => c.id !== id));
        } catch (error) {
            alert('Error al eliminar');
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <Head title={`Características de ${product.name}`} />

            <h1 className="text-2xl font-bold mb-2">
                Características del producto
            </h1>

            <p className="text-gray-600 mb-6">
                Producto: <strong>{product.name}</strong>
            </p>

            {/* FORM */}
            <form
                onSubmit={submit}
                className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
            >
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                />

                <input
                    type="text"
                    name="valor"
                    placeholder="Valor"
                    value={form.valor}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                />

                <button
                    disabled={loading}
                    className={`text-white rounded px-4 py-2 ${
                        editingId ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading
                        ? 'Guardando...'
                        : editingId
                            ? 'Actualizar'
                            : 'Guardar'
                    }
                </button>

                {editingId && (
                    <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <div className="bg-white rounded shadow">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Nombre</th>
                            <th className="p-3">Valor</th>
                            <th className="p-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {caracteristicas.length ? (
                            caracteristicas.map(c => (
                                <tr key={c.id} className="border-t">
                                    <td className="p-3">{c.nombre}</td>
                                    <td className="p-3">{c.valor}</td>
                                    <td className="p-3 text-right space-x-3">
                                        <button
                                            onClick={() => editar(c)}
                                            className="text-yellow-600 hover:underline"
                                        >
                                            Editar
                                        </button>

                                        <button
                                            onClick={() => eliminar(c.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="p-4 text-center text-gray-500">
                                    No hay características
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
