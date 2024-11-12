import React, { useState } from 'react';
import NavbarAdmin from '../Components/NavBarAdmin';

function TopicsAdmin() {
    const [temas, setTemas] = useState([
        {
            titulo: "Introducción a la Ciberseguridad",
            descripcion: "Breve descripción sobre la importancia de la ciberseguridad.",
            contenido: "La ciberseguridad es el conjunto de prácticas, tecnologías y procesos diseñados para proteger los sistemas informáticos, las redes, y los datos de posibles ciberataques.",
            fecha: "2024-11-10",
            tipo: "General"
        },
        {
            titulo: "Amenazas comunes en la red",
            descripcion: "Descripción de las amenazas más frecuentes en internet.",
            contenido: "Existen diferentes tipos de amenazas en línea como virus, phishing, ransomware, entre otros, que pueden comprometer la seguridad de la información.",
            fecha: "2024-11-09",
            tipo: "Amenazas"
        }
    ]);

    const [nuevoTema, setNuevoTema] = useState({
        titulo: '',
        descripcion: '',
        contenido: '',
        fecha: '',
        tipo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoTema({
            ...nuevoTema,
            [name]: value
        });
    };

    const handleAddTopic = () => {
        setTemas([...temas, nuevoTema]);
        setNuevoTema({ titulo: '', descripcion: '', contenido: '', fecha: '', tipo: '' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-600 flex flex-col">
            <NavbarAdmin/>

            <main className="flex-1 w-full flex flex-col items-center text-white px-6 py-12">
                <h2 className="text-4xl font-bold text-gray-200 mb-12">Añadir Temas de Interés</h2>

                {/* Formulario para añadir tema */}
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
                        />
                        <input
                            type="text"
                            name="descripcion"
                            placeholder="Descripción"
                            value={nuevoTema.descripcion}
                            onChange={handleChange}
                            className="p-4 rounded-lg border border-gray-300 text-gray-900"
                        />
                        <textarea
                            name="contenido"
                            placeholder="Contenido"
                            value={nuevoTema.contenido}
                            onChange={handleChange}
                            className="p-4 rounded-lg border border-gray-300 text-gray-900"
                        />
                        <input
                            type="date"
                            name="fecha"
                            value={nuevoTema.fecha}
                            onChange={handleChange}
                            className="p-4 rounded-lg border border-gray-300 text-gray-900"
                        />
                        <input
                            type="text"
                            name="tipo"
                            placeholder="Tipo de tema"
                            value={nuevoTema.tipo}
                            onChange={handleChange}
                            className="p-4 rounded-lg border border-gray-300 text-gray-900"
                        />
                        <button
                            onClick={handleAddTopic}
                            className="bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Añadir Tema
                        </button>
                    </div>
                </div>

                {/* Listado de temas */}
                <div className="w-full max-w-4xl grid grid-cols-1 gap-8">
                    {temas.length === 0 ? (
                        <p className="text-gray-300 text-center">No hay temas disponibles aún.</p>
                    ) : (
                        temas.map((tema, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
                            >
                                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">{tema.titulo}</h3>
                                <p className="text-md text-gray-600 mb-4">{tema.descripcion}</p>
                                <p className="text-sm text-gray-500 mb-6"><strong>Fecha:</strong> {tema.fecha}</p>
                                <p className="text-sm text-gray-500 mb-6"><strong>Tipo de tema:</strong> {tema.tipo}</p>
                                <p className="text-md text-gray-700">{tema.contenido}</p>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

export default TopicsAdmin;
