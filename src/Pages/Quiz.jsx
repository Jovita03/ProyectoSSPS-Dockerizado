import React, { useState } from "react";

const preguntasPorCuestionario = {
    1: [
        {
            texto: "¿Qué es la ciberseguridad?",
            opciones: ["Protección de sistemas", "Técnica de ataque", "Ambos", "Ninguno"]
        },
        {
            texto: "¿Cuál es una amenaza común en la red?",
            opciones: ["Virus", "Rayo láser", "Ola gigante", "Apagón eléctrico"]
        },
    ],
    2: [
        {
            texto: "¿Qué es el phishing?",
            opciones: ["Pescar en línea", "Suplantación de identidad", "Ataque físico", "Ninguno"]
        },
        {
            texto: "¿Qué es un ransomware?",
            opciones: ["Un tipo de virus", "Un troyano", "Un malware que cifra datos", "Ninguno"]
        },
    ],
    // Más preguntas para otros cuestionarios...
};

function Quiz({ id, volver }) {
    const [respuestas, setRespuestas] = useState([]);
    const [resultado, setResultado] = useState(false);
    const preguntas = preguntasPorCuestionario[id];

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
            <button onClick={volver} className="text-blue-600 underline mb-4">← Volver a la selección de cuestionarios</button>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Cuestionario</h1>
            {resultado ? (
                <p className="text-green-600 text-center">¡Gracias por completar el cuestionario!</p>
            ) : (
                <div>
                    {preguntas.map((pregunta, indice) => (
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
