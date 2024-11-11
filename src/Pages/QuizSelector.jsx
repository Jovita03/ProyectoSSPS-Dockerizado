import React, { useState } from "react";
import Quiz from "./Quiz";
import NavBar from "../Components/NavBar";

const cuestionariosDisponibles = [
    { id: 1, titulo: "Introducción a la Ciberseguridad", descripcion: "Conceptos básicos sobre ciberseguridad." },
    { id: 2, titulo: "Amenazas en la Red", descripcion: "Tipos comunes de amenazas en línea." },
    // Más cuestionarios...
];

function QuizSelector() {
    const [cuestionarioSeleccionado, setCuestionarioSeleccionado] = useState(null);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
            {/* Navbar */}
            <NavBar />

            <main className="flex-1 w-full flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-20 py-8 sm:py-10 md:py-12">
                {/* Si no hay cuestionario seleccionado, mostramos los disponibles */}
                {!cuestionarioSeleccionado ? (
                    <>
                        <h1 className="text-3xl font-bold mb-8 text-center">Selecciona un Cuestionario</h1>
                        <div className="space-y-6 w-full max-w-xl">
                            {cuestionariosDisponibles.map((quiz) => (
                                <button
                                    key={quiz.id}
                                    onClick={() => setCuestionarioSeleccionado(quiz.id)}
                                    className="w-full p-6 text-left bg-white rounded-xl shadow-lg hover:bg-blue-100 hover:shadow-xl transition duration-300 transform hover:scale-105"
                                >
                                    <h2 className="text-2xl font-semibold text-gray-800">{quiz.titulo}</h2>
                                    <p className="text-gray-700 mt-2">{quiz.descripcion}</p>
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    // Si se seleccionó un cuestionario, mostramos el componente Quiz
                    <Quiz id={cuestionarioSeleccionado} volver={() => setCuestionarioSeleccionado(null)} />
                )}
            </main>
        </div>
    );
}

export default QuizSelector;
