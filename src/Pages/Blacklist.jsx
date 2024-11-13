import React, { useState } from 'react';
import Navbar from '../Components/NavBar';
import { FaBan } from 'react-icons/fa';

function Blacklist() {
    const [usuarios, setUsuarios] = useState([
        { id: 1, nombre: "Juan Pérez", email: "juan.perez@example.com", bloqueado: false },
        { id: 2, nombre: "Ana López", email: "ana.lopez@example.com", bloqueado: false },
        { id: 3, nombre: "Carlos García", email: "carlos.garcia@example.com", bloqueado: true },
        { id: 4, nombre: "Luis Martínez", email: "luis.martinez@example.com", bloqueado: false }
    ]);

    const handleToggleBlock = (id) => {
        setUsuarios(
            usuarios.map((usuario) =>
                usuario.id === id ? { ...usuario, bloqueado: !usuario.bloqueado } : usuario
            )
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-600 flex flex-col">
            <Navbar />

            <main className="flex-1 w-full flex flex-col items-center text-white px-6 py-12">
                <h2 className="text-4xl font-bold text-gray-200 mb-12">Administrar Usuarios</h2>

                {/* Listado de usuarios */}
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
                                    onClick={() => handleToggleBlock(usuario.id)}
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
            </main>
        </div>
    );
}

export default Blacklist;
