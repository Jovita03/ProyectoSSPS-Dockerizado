import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error en el inicio de sesión');
            }
            if (data.user.is_block === false) {
                localStorage.setItem('full_name', data.user.full_name)

                Swal.fire({
                    title: 'Inicio de sesión exitoso',
                    text: 'Bienvenido/a, ' + data.user.full_name,
                    icon: 'success',
                });
                navigate('/dashboard');
            }
            else{
                Swal.fire({
                    title: 'Usted esta bloqueado',
                    icon: 'error'
                })
            }

            
        } catch (error) {
            setErrorMessage(error.message);
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
            });
        }
    };

    return (
        <div className="w-full h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
            <div className="w-full md:w-2/3 lg:w-1/3 bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100 transform transition duration-500 hover:scale-105">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
                    Iniciar sesión
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
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

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-all"
                        >
                            Iniciar sesión
                        </button>
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-center mt-4">{errorMessage}</p>
                    )}

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            ¿No tienes una cuenta?{" "}
                            <Link to="/register" className="text-blue-600 hover:underline">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
