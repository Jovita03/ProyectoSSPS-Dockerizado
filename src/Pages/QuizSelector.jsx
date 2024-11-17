import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import NavBar from "../Components/NavBar";

function QuizSelector() {
    const [cuestionariosDisponibles, setCuestionariosDisponibles] = useState([]);
    const [cuestionarioSeleccionado, setCuestionarioSeleccionado] = useState(null);

    // Cargar los datos desde la API al montar el componente
    useEffect(() => {
        const fetchCuestionarios = async () => {
            try {
                const response = await fetch("http://localhost:5000/getQuizzes");
                const data = await response.json();
                setCuestionariosDisponibles(data);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };

        fetchCuestionarios();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
            <NavBar />
            <main className="flex-1 w-full flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-20 py-8 sm:py-10 md:py-12">
                {!cuestionarioSeleccionado ? (
                    <>
                        <h1 className="text-3xl font-bold mb-8 text-center">Selecciona un Cuestionario</h1>
                        <div className="space-y-6 w-full max-w-xl">
                            {cuestionariosDisponibles.map((quiz) => (
                                <button
                                    key={quiz.id}
                                    onClick={() => setCuestionarioSeleccionado(quiz)}
                                    className="w-full p-6 text-left bg-white rounded-xl shadow-lg hover:bg-blue-100 hover:shadow-xl transition duration-300 transform hover:scale-105"
                                >
                                    <h2 className="text-2xl font-semibold text-gray-800">{quiz.titulo}</h2>
                                    <p className="text-gray-700 mt-2">{quiz.descripcion}</p>
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <Quiz
                        cuestionario={cuestionarioSeleccionado}
                        volver={() => setCuestionarioSeleccionado(null)}
                    />
                )}
            </main>
        </div>
    );
}

export default QuizSelector;
