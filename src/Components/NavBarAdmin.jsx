import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Importamos el ícono de "Salir"

function NavbarAdmin() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

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
                        to="/topicsadmin"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "text-lg font-semibold text-blue-600 border-b-2 border-blue-600 pb-2"
                                : "text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
                        }
                    >
                        Temas de interes
                    </NavLink>
                </nav>

                {/* Enlace para salir - Alineado a la derecha */}
                <div className="ml-auto hidden lg:block">
                    <NavLink
                        to="/"
                        onClick={closeMenu}
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
                        Temas de interes
                    
                    </NavLink>
                    {/* Enlace para salir en el menú móvil - solo aparece aquí */}
                    <NavLink
                        to="/"
                        onClick={closeMenu}
                        className="block text-lg font-semibold text-gray-800 hover:text-blue-600"
                    >
                        <FaSignOutAlt className="inline-block mr-2" /> Salir
                    </NavLink>
                </div>
            )}
        </header>
    );
}

export default NavbarAdmin;
