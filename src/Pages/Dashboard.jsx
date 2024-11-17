import React, {useEffect, useState} from "react";
import Navbar from "../Components/NavBar";
import Foro from "../Components/Foro"; // Asegúrate de importar el componente del foro

function Dashboard() {

    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const fetchProtected = async () => {
            try {
                const response = await fetch('http://localhost:5000/protected', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
    
                console.log("Coookie",data);
    
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
    
        fetchProtected();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-600 flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Contenido Principal */}
            <main className="flex-1 w-full flex flex-col items-center text-white px-4 sm:px-6 md:px-10 lg:px-20 py-8 sm:py-10 md:py-12">
                {/* Foro */}
                <section className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mt-8 mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 text-center mb-4 md:mb-6 lg:mb-8">
                        Foro de Discusión
                    </h2>
                    <Foro  admin={isAdmin}/> {/* Componente del foro */}
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
