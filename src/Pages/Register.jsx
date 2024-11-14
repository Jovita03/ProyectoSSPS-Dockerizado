import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");    
    
        try {
            // Verificar si el correo ya existe
            const response = await fetch(`http://localhost:5000/users/${email}`);
    
            if (!response.ok) {
                if (response.status === 404) {
                    Swal.fire({
                        title: 'Correo disponible',
                        text: 'Este correo se puede usar para el registro',
                        icon: 'success'
                    });
                } else {
                    throw new Error('Error al verificar el correo');
                }
            } else {
                const data = await response.json();
    
                if (data) {
                    Swal.fire({
                        title: 'Correo existente',
                        text: 'Intenta con otro correo',
                        icon: 'error'
                    });
                    return;
                }
            }
    
            const registerResponse = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    fullName: fullName,
                }),
            });
            Swal.fire({
                title: 'Registro exitoso',
                text: 'Tu cuenta ha sido creada correctamente.',
                icon: 'success'
            });
    
            // Redirigir al usuario al dashboard
            navigate("/");
        } catch (error) {
            setErrorMessage(error.message); // Mostrar error en caso de fallo
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error'
            });
        }
    };
    


    return (
        <div className="w-full h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
            <div className="w-full md:w-2/3 lg:w-1/3 p-8 bg-white rounded-3xl shadow-2xl border-2 border-gray-100 transform transition duration-500 hover:scale-105">
                <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
                    Regístrate
                </h2>

                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}

                {/* Formulario de registro */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            placeholder="Ingresa tu correo electrónico"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            placeholder="Ingresa tu nombre completo"
                            required
                        />
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/" className="text-blue-600 hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
