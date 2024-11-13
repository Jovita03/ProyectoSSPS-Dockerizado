import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Importamos el ícono de "Salir"
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate(); 
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:5000/logout', {
                method: 'GET',
                credentials: 'include', // Importante para enviar la cookie
            });
            navigate('/'); // Redirige al login tras hacer logout
        } catch (error) {
            console.error('Error al hacer logout:', error);
        }
    };

    return (
        <header className="w-full py-4 bg-white shadow-lg z-20 rounded-b-lg">
            <div className="flex justify-between items-center px-6">
                {/* Logo o Título */}

                {/* Botón de menú hamburguesa para pantallas pequeñas */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden text-3xl text-indigo-700 focus:outline-none hover:text-blue-600 transition duration-300"
                >
                    &#9776;
                </button>

                {/* Navegación para pantallas grandes */}
                <nav className="hidden lg:flex space-x-8 flex-grow">
                    <NavLink
                        to="/quiz"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "text-lg font-semibold text-blue-600 border-b-2 border-blue-600 pb-2"
                                : "text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
                        }
                    >
                        Cuestionarios
                    </NavLink>
                    <NavLink
                        to="/topics"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "text-lg font-semibold text-blue-600 border-b-2 border-blue-600 pb-2"
                                : "text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
                        }
                    >
                        Temas de interés
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "text-lg font-semibold text-blue-600 border-b-2 border-blue-600 pb-2"
                                : "text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
                        }
                    >
                        Foro
                    </NavLink>
                    <NavLink
                        to="/topicsadmin"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "text-lg font-semibold text-blue-600 border-b-2 border-blue-600 pb-2"
                                : "text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
                        }
                    >
                        Añadir Temas de interes
                    </NavLink>
                    <NavLink
                        to="/blacklist"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "text-lg font-semibold text-blue-600 border-b-2 border-blue-600 pb-2"
                                : "text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
                        }
                    >
                        Lista de usuarios
                    </NavLink>
                    <NavLink
                        to="/quizadmin"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "text-lg font-semibold text-blue-600 border-b-2 border-blue-600 pb-2"
                                : "text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
                        }
                    >
                        Actualizacion de quiz
                    </NavLink>
                </nav>

                {/* Enlace para salir - Alineado a la derecha */}
                <div className="ml-auto hidden lg:block">
                    <NavLink
                        to="/"
                        onClick={handleLogout}
                        className={({ isActive }) =>
                            isActive
                                ? "text-lg font-semibold text-blue-600 border-b-2 border-blue-600 pb-2"
                                : "text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
                        }
                    >
                        <FaSignOutAlt className="inline-block mr-2" /> Salir
                    </NavLink>
                </div>
            </div>

            {/* Menú desplegable en móviles */}
            {menuOpen && (
                <div className="lg:hidden bg-white shadow-lg rounded-b-lg flex flex-col items-center space-y-4 p-4">
                    <NavLink
                        to="/quiz"
                        onClick={closeMenu}
                        className="block text-lg font-semibold text-gray-800 hover:text-blue-600"
                    >
                        Cuestionarios
                    </NavLink>
                    <NavLink
                        to="/topics"
                        onClick={closeMenu}
                        className="block text-lg font-semibold text-gray-800 hover:text-blue-600"
                    >
                        Temas de interés
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        onClick={closeMenu}
                        className="block text-lg font-semibold text-gray-800 hover:text-blue-600"
                    >
                        Foro
                    </NavLink>
                    {/* Nueva opción para el administrador en el menú móvil */}
                    <NavLink
                        to="/topicsadmin"
                        onClick={closeMenu}
                        className="block text-lg font-semibold text-gray-800 hover:text-blue-600"
                    >
                        Añadir Temas de interes
                    </NavLink>
                    <NavLink
                        onClick={closeMenu}
                        to="/blacklist"
                       className="block text-lg font-semibold text-gray-800 hover:text-blue-600"
                    > 
                        
                        Lista de usuarios
                    
                    </NavLink>
                    <NavLink
                        to="/quizadmin"
                       className="block text-lg font-semibold text-gray-800 hover:text-blue-600"
                       onClick={closeMenu}
                    > 
                        
                        Actualizacion de quiz
                    
                    </NavLink>
                    {/* Enlace para salir en el menú móvil - solo aparece aquí */}
                    <NavLink
                        to="/"
                        onClick={handleLogout}
                        className="block text-lg font-semibold text-gray-800 hover:text-blue-600"
                    >
                        <FaSignOutAlt className="inline-block mr-2" /> Salir
                    </NavLink>
                </div>
            )}
        </header>
    );
}

export default Navbar;
