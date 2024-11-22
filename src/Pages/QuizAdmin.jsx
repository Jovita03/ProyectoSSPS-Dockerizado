import React, { useState, useEffect } from "react";
import Navbar from "../Components/NavBar";
import { FaTrash, FaEdit } from "react-icons/fa";

import Swal from 'sweetalert2';

function QuizAdmin() {
    const [cuestionarios, setCuestionarios] = useState([
       
    ]);

    const [nuevoCuestionario, setNuevoCuestionario] = useState({
        titulo: "",
        descripcion: "",
        preguntas: []
    });

    const [editando, setEditando] = useState(false);
    const [cuestionarioEnEdicion, setCuestionarioEnEdicion] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoCuestionario({
            ...nuevoCuestionario,
            [name]: value
        });
    };

    const handlePreguntaChange = (index, e) => {
        const { name, value } = e.target;
        const preguntas = [...nuevoCuestionario.preguntas];
        preguntas[index][name] = value;
        setNuevoCuestionario({ ...nuevoCuestionario, preguntas });
    };

    const agregarPregunta = () => {
        setNuevoCuestionario({
            ...nuevoCuestionario,
            preguntas: [...nuevoCuestionario.preguntas, { texto: "", opciones: ["", "", "", ""], respuestaCorrecta: null }]
        });
    };

    const handleOpcionChange = (preguntaIndex, opcionIndex, e) => {
        const preguntas = [...nuevoCuestionario.preguntas];
        preguntas[preguntaIndex].opciones[opcionIndex] = e.target.value;
        setNuevoCuestionario({ ...nuevoCuestionario, preguntas });
    };

    const handleRespuestaCorrectaChange = (preguntaIndex, opcionIndex) => {
        const preguntas = [...nuevoCuestionario.preguntas];
        preguntas[preguntaIndex].respuestaCorrecta = opcionIndex;
        setNuevoCuestionario({ ...nuevoCuestionario, preguntas });
    };

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://quizzes-service:5004/quizzes');
                if (!response.ok) {
                    throw new Error("Failed to fetch quizzes");
                }
                const quizzes = await response.json();
                setCuestionarios(quizzes);
            } catch (err) {
                console.error("Error fetching quizzes:", err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch quizzes'
                });
            }
        };
    
        fetchQuizzes();
    }, []);

    const agregarCuestionario = async () => {
        if (editando) {
            setCuestionarios(
                cuestionarios.map((quiz) =>
                    quiz.id === cuestionarioEnEdicion.id ? nuevoCuestionario : quiz
                )
            );
            setEditando(false);
            setCuestionarioEnEdicion(null);
        } else {
            setCuestionarios([...cuestionarios, { ...nuevoCuestionario, id: Date.now() }]);

            console.log(cuestionarios);
            console.log(nuevoCuestionario);

            const response = await fetch('http://quizzes-service:5004/quizzes',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoCuestionario), 

            });

            if(response.ok){
                Swal.fire({
                    icon: 'success',
                    title: 'Cuestionario agregado con éxito'
                });

            }
            
            
        }
        setNuevoCuestionario({ titulo: "", descripcion: "", preguntas: [] });
    };

    const editarCuestionario = (cuestionario) => {
        setNuevoCuestionario(cuestionario);
        setEditando(true);
        setCuestionarioEnEdicion(cuestionario);
    };

    const eliminarCuestionario = async (id) => {
        console.log(id);
        
        
            try {
                const response = await fetch(`http://quizzes-service:5004/quizzes/${id}`, {
                    method: "DELETE",
                });
        
                if (response.ok) {
                    console.log("Cuestionario eliminado con éxito!");
                    
                    setCuestionarios((prev) => prev.filter((cuestionario) => cuestionario.id !== id));
                } else {
                    console.error("No se pudo eliminar el cuestionario");
                }
            } catch (error) {
                console.error("Error al eliminar el cuestionario:", error);
            }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-600 flex flex-col">
            <Navbar />

            <main className="flex-1 w-full flex flex-col items-center text-white px-6 py-12">
                <h2 className="text-4xl font-bold text-gray-200 mb-12">Administrar Cuestionarios</h2>

                <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg mb-8">
                    <h3 className="text-2xl font-semibold text-indigo-700 mb-4">
                        {editando ? "Editar Cuestionario" : "Nuevo Cuestionario"}
                    </h3>
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        value={nuevoCuestionario.titulo}
                        onChange={handleInputChange}
                        className="w-full p-4 rounded-lg border border-gray-300 text-gray-900 mb-4"
                    />
                    <textarea
                        name="descripcion"
                        placeholder="Descripción"
                        value={nuevoCuestionario.descripcion}
                        onChange={handleInputChange}
                        className="w-full p-4 rounded-lg border border-gray-300 text-gray-900 mb-4"
                    />

                    <h4 className="text-xl font-semibold text-indigo-700 mb-2">Preguntas</h4>
                    {nuevoCuestionario.preguntas.map((pregunta, preguntaIndex) => (
                        <div key={preguntaIndex} className="mb-4">
                            <input
                                type="text"
                                name="texto"
                                placeholder="Pregunta"
                                value={pregunta.texto}
                                onChange={(e) => handlePreguntaChange(preguntaIndex, e)}
                                className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 mb-2"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                {pregunta.opciones.map((opcion, opcionIndex) => (
                                    <div key={opcionIndex} className="flex items-center">
                                        <input
                                            type="radio"
                                            name={`respuestaCorrecta-${preguntaIndex}`}
                                            checked={pregunta.respuestaCorrecta === opcionIndex}
                                            onChange={() => handleRespuestaCorrectaChange(preguntaIndex, opcionIndex)}
                                            className="mr-2"
                                        />
                                        <input
                                            type="text"
                                            placeholder={`Opción ${opcionIndex + 1}`}
                                            value={opcion}
                                            onChange={(e) => handleOpcionChange(preguntaIndex, opcionIndex, e)}
                                            className="p-3 rounded-lg border border-gray-300 text-gray-900"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={agregarPregunta}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg mt-2 mb-4 hover:bg-green-700 transition duration-300"
                    >
                        Agregar Pregunta
                    </button>

                    <button
                        onClick={agregarCuestionario}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        {editando ? "Guardar Cambios" : "Añadir Cuestionario"}
                    </button>
                </div>

                <div className="w-full max-w-4xl grid grid-cols-1 gap-8">
                    {cuestionarios.map((cuestionario) => (
                        <div
                            key={cuestionario.id}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
                        >
                            <h3 className="text-2xl font-semibold text-indigo-700 mb-4">
                                {cuestionario.titulo}
                            </h3>
                            <p className="text-md text-gray-600 mb-4">{cuestionario.descripcion}</p>
                            
                            <button
                                onClick={() => eliminarCuestionario(cuestionario.id)}
                                className="text-red-600"
                            >
                                <FaTrash /> Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default QuizAdmin;
