import React, { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";

const fetchComments = async (postId) => {
    try {
        const response = await fetch('http://localhost:5003/publicaciones/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: postId }), // Envía el ID correcto
        });
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return await response.json();

    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        return [];
    }
};


function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
        const getComments = async () => {
                    setLoading(true);
                    setError(null);
                    const data = await fetchComments(postId);
                    if (data) {
                        console.log(data);
                        
                        setComments(data);
                    } else {
                        setError('No se pudieron cargar los comentarios.');
                    }
                    setLoading(false);
                };

        useEffect(() => {
                getComments();
        }, [location.state]);

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h4 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FaRegComment className="text-blue-500 mr-2" />
                Comentarios
            </h4>
            {loading ? (
                <p className="text-gray-500">Cargando comentarios...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : comments.length > 0 ? (
                <ul className="space-y-4">
                    {comments.map((comment, index) => (
                        <li
                            key={index}
                            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                        >
                            <p className="text-sm text-gray-500 mb-2">
                                <strong>Fecha:</strong> {comment.Date || "Fecha desconocida"}
                            </p>
                            <p className="text-sm text-gray-700">
                                <strong>Usuario:</strong> {comment.full_name || "Anónimo"}
                            </p>
                            <p className="text-gray-800 mt-2">
                                {comment.content || "Comentario vacío"}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No hay comentarios aún.</p>
            )}
        </div>
    );
}

export default Comments;
