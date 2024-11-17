import React, { useState } from "react";

function Quiz({ cuestionario, volver }) {
    const [respuestas, setRespuestas] = useState([]);
    const [resultado, setResultado] = useState(false);

    const manejarRespuestas = (indicePregunta, indiceRespuesta) => {
        const nuevasRespuestas = [...respuestas];
        nuevasRespuestas[indicePregunta] = indiceRespuesta;
        setRespuestas(nuevasRespuestas);
    };

    const manejarEnvio = () => {
        setResultado(true);
        console.log("Respuestas enviadas:", respuestas);
    };

    return (
        <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-lg mt-8">
            <button onClick={volver} className="text-blue-600 underline mb-4">
                ← Volver a la selección de cuestionarios
            </button>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">{cuestionario.titulo}</h1>
            {resultado ? (
                <p className="text-green-600 text-center">¡Gracias por completar el cuestionario!</p>
            ) : (
                <div>
                    {cuestionario.preguntas.map((pregunta, indice) => (
                        <div key={indice} className="mb-6">
                            <h2 className="text-xl font-medium text-gray-800">{pregunta.texto}</h2>
                            <div className="mt-4 space-y-2">
                                {pregunta.opciones.map((opcion, indiceOpcion) => (
                                    <label key={indiceOpcion} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name={`pregunta-${indice}`}
                                            onChange={() => manejarRespuestas(indice, indiceOpcion)}
                                            checked={respuestas[indice] === indiceOpcion}
                                            className="text-blue-600"
                                        />
                                        <span className="text-gray-700">{opcion}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={manejarEnvio}
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Enviar Respuestas
                    </button>
                </div>
            )}
        </div>
    );
}

export default Quiz;
