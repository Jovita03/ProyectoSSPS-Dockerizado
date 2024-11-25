import React, { useState, useEffect } from 'react';
import Navbar from '../Components/NavBar';

function TopicsAdmin() {
    const [nuevoTema, setNuevoTema] = useState({
        titulo: '',
        descripcion: '',
        contenido: '',
        fecha: '',
        tipo: '' // Almacena el id del tipo seleccionado
    });

    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTipos = async () => {
            try {
                const response = await fetch('http://topic-service/temas/type');
                if (!response.ok) {
                    throw new Error('Error al obtener los tipos');
                }
                const data = await response.json();
                setTipos(data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchTipos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoTema({
            ...nuevoTema,
            [name]: value
        });
    };

    const handleAddTopic = async () => {
        try {
            const response = await fetch('http://topic-service/temas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titulo: nuevoTema.titulo,
                    descripcion: nuevoTema.descripcion,
                    contenido: nuevoTema.contenido,
                    fecha: nuevoTema.fecha,
                    tipo: nuevoTema.tipo,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Error al agregar el tema');
            }
    
            const data = await response.json();
            console.log('Tema agregado:', data);
    
            // Limpiar el formulario después de agregar el tema
            setNuevoTema({ titulo: '', descripcion: '', contenido: '', fecha: '', tipo: '' });
    
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-600 flex flex-col">
            <Navbar />

            <main className="flex-1 w-full flex flex-col items-center text-white px-6 py-12">
                <h2 className="text-4xl font-bold text-gray-200 mb-12">Añadir Temas de Interés</h2>

                <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg mb-8">
                    <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Nuevo Tema</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <input
                            type="text"
                            name="titulo"
                            placeholder="Título"
                            value={nuevoTema.titulo}
                            onChange={handleChange}
                            className="p-4 rounded-lg border border-gray-300 text-gray-900"
                            required
                        />
                        <input
                            type="text"
                            name="descripcion"
                            placeholder="Descripción"
                            value={nuevoTema.descripcion}
                            onChange={handleChange}
                            className="p-4 rounded-lg border border-gray-300 text-gray-900"
                            required
                        />
                        <textarea
                            name="contenido"
                            placeholder="Contenido"
                            value={nuevoTema.contenido}
                            onChange={handleChange}
                            className="p-4 rounded-lg border border-gray-300 text-gray-900"
                            required
                        />
                        <input
                            type="date"
                            name="fecha"
                            value={nuevoTema.fecha}
                            onChange={handleChange}
                            className="p-4 rounded-lg border border-gray-300 text-gray-900"
                            required
                        />
                        
                        {/* Menú desplegable para el tipo */}
                        {loading ? (
                            <p className="text-gray-500">Cargando tipos...</p>
                        ) : (
                            <select
                                name="tipo"
                                value={nuevoTema.tipo}
                                onChange={handleChange}
                                required
                                className="p-4 rounded-lg border border-gray-300 text-gray-900"
                            >
                                <option value="" disabled>Selecciona un tipo</option>
                                {tipos.map((tipo) => (
                                    <option key={tipo.id} value={tipo.id}>
                                        {tipo.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        <button
                            onClick={handleAddTopic}
                            className="bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Añadir Tema
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default TopicsAdmin;
