import React, { useState, useEffect } from 'react';
import Navbar from '../Components/NavBar';
import { FaBan } from 'react-icons/fa';

function Blacklist() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para obtener los usuarios del backend
    const fetchUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:5002/users');
            const data = await response.json();

            if (data.success) {
                const users = data.users.map((user) => ({
                    id: user.id, // Usar el ID real de la base de datos
                    nombre: user.full_name,
                    email: user.email,
                    bloqueado: user.is_block,
                }));
                setUsuarios(users);
                
            } else {
                console.error('Error al obtener usuarios:', data.message);
            }
        } catch (error) {
            console.error('Error al conectar con el backend:', error);
        } finally {
            setLoading(false);
        }
    };

    // Función para actualizar el estado de bloqueo
    const handleToggleBlock = async (id, isBlocked) => {
        try {
            const response = await fetch('http://localhost:5002/users/toggleBlock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    is_block: !isBlocked,
                }),
            });
    
            const data = await response.json();
            if (data.success) {
                // Mostrar un mensaje de éxito
                setUsuarios((prevUsuarios) =>
                    prevUsuarios.map((usuario) =>
                        usuario.id === id ? { ...usuario, bloqueado: !isBlocked } : usuario
                    )
                );
            } else {
                console.error('Error al actualizar el estado de bloqueo:', data.message);
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error al hacer la solicitud para bloquear/desbloquear:', error);
            alert('Error al conectar con el servidor.');
        }
    };
    

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-600 flex flex-col">
            <Navbar />

            <main className="flex-1 w-full flex flex-col items-center text-white px-6 py-12">
                <h2 className="text-4xl font-bold text-gray-200 mb-12">Administrar Usuarios</h2>

                {/* Mostrando el estado de carga */}
                {loading ? (
                    <p className="text-gray-300 text-center">Cargando usuarios...</p>
                ) : (
                    <div className="w-full max-w-4xl grid grid-cols-1 gap-8">
                        {usuarios.length === 0 ? (
                            <p className="text-gray-300 text-center">No hay usuarios registrados aún.</p>
                        ) : (
                            usuarios.map((usuario) => (
                                <div
                                    key={usuario.id}
                                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex items-center justify-between"
                                >
                                    <div>
                                        <h3 className="text-2xl font-semibold text-indigo-700 mb-2">
                                            {usuario.nombre}
                                        </h3>
                                        <p className="text-md text-gray-600">{usuario.email}</p>
                                        <p className={`text-sm font-semibold mt-2 ${usuario.bloqueado ? 'text-red-500' : 'text-green-500'}`}>
                                            {usuario.bloqueado ? 'Cuenta bloqueada' : 'Cuenta activa'}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleToggleBlock(usuario.id, usuario.bloqueado)}
                                        className={`px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center space-x-2 ${
                                            usuario.bloqueado
                                                ? 'bg-gray-600 text-white hover:bg-gray-700'
                                                : 'bg-red-600 text-white hover:bg-red-700'
                                        }`}
                                    >
                                        <FaBan />
                                        <span>{usuario.bloqueado ? 'Desbloquear' : 'Bloquear'} Usuario</span>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Blacklist;
