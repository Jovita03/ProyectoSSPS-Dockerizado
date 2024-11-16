import React, { useState, useEffect } from 'react';
import Navbar from '../Components/NavBar';
import { useLocation } from 'react-router-dom';
function Topics() {
    const [temas, setTemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false)
    const location = useLocation();
    // Obtener temas desde la API
    const fetchTemas = async () => {
        try {
            const response = await fetch('http://localhost:5000/topics'); // URL de tu API
            if (!response.ok) {
                throw new Error('Error al obtener los temas');
            }
            const data = await response.json();
            console.log(data)
            // Mapeamos los datos para que coincidan con las propiedades que usamos en el frontend
            const temasMapeados = data.map((tema) => ({
                id: tema.id,
                titulo: tema.Title,
                descripcion: tema.Description,
                contenido: tema.Content,
                fecha: tema.Date,
                tipo: tema.type.name
            }));

            setTemas(temasMapeados); // Guardar los temas mapeados en el estado
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };
    
    const fetchProtected = async () => {
        try {
            const response = await fetch('http://localhost:5000/protected', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();

            console.log(data);

            if (!response.ok) {
                navigate('/');
            } else {
                setIsAdmin(data.isAdmin)
            }
        } catch (error) {
            console.error("Error al hacer la solicitud protegida:", error);
            navigate('/');
        }
    };

    useEffect(() => {
        fetchProtected();
        fetchTemas();
    }, [location.state]);

    const handleDelete = async (idTopic) =>{
        console.log("eliminar: ", idTopic);
        try {
            const response = await fetch('http://localhost:5000/deleteTopic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: idTopic }),
            });
            if (!response.ok) {
                console.error('Error al eliminar el tema');
                return;
            }
            fetchProtected();
            fetchTemas(); 
        } catch (error) {
            console.error('Error interno:', error);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-600 flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Contenido Principal */}
            <main className="flex-1 w-full flex flex-col items-center text-white px-6 py-12">
                <h2 className="text-4xl font-bold text-gray-200 mb-12">Temas de Interés en Ciberseguridad</h2>

                {/* Listado de temas */}
                <div className="w-full max-w-4xl grid grid-cols-1 gap-8">
                    {loading ? (
                        <p className="text-gray-300 text-center">Cargando temas...</p>
                    ) : temas.length === 0 ? (
                        <p className="text-gray-300 text-center">No hay temas disponibles aún.</p>
                    ) : (
                        temas.map((tema, index) => (
                            <div
                                key={tema.id}
                                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
                            >
                                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">{tema.titulo}</h3>
                                <p className="text-md text-gray-600 mb-4">{tema.descripcion}</p>
                                <p className="text-sm text-gray-500 mb-6"><strong>Fecha:</strong> {tema.fecha}</p>
                                <p className="text-sm text-gray-500 mb-6"><strong>Tipo de tema:</strong> {tema.tipo}</p>
                                <p className="text-md text-gray-700">{tema.contenido}</p>
                                {isAdmin?<button onClick={() => handleDelete(tema.id)}  className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300">
                                    Eliminar
                                </button>:null}
                                
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

export default Topics;
