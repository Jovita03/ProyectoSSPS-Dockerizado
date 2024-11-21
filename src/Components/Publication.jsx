import React, { useState, useEffect } from "react";
import { FaRegComment } from 'react-icons/fa';
import Comments from "./Comments";
import { useLocation } from 'react-router-dom';

function Publication({ admin, posts, fetchPosts  }) {
    const [newComments, setNewComments] = useState({}); 
    const location = useLocation();

    // Función para eliminar una publicación
    const handleDelete = async (postId) => {

        try{
            const responseDeleteComments = await fetch('http://localhost:5000/deleteComments',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: postId }),
            })
            if (!responseDeleteComments.ok) {
                console.error('Error al eliminar los comentarios');
                return;
            }
        }catch{
            console.error('Error interno:', error);
        }

        try {
            const response = await fetch('http://localhost:5000/deletePublication', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: postId }),
            });

            if (!response.ok) {
                console.error('Error al eliminar la publicación');
                return;
            }

            fetchPosts(); // Actualiza la lista tras eliminar
        } catch (error) {
            console.error('Error interno:', error);
        }
    };

    // Función para obtener comentarios por publicación
    const fetchComments = async (postId) => {
        try {
            const response = await fetch('http://localhost:5003/publicaciones/deleteComments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: postId }),
            });
            const data = await response.json();
        } catch (error) {
            console.error('Error al obtener comentarios:', error);
        }
    };

    // Función para agregar un comentario
    const handleAddComment = async (postId) => {
        const content = newComments[postId];
        if (!content) return;
    
        try {
            const response = await fetch('http://localhost:5003/publicaciones/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    postId,
                    content,
                }),
                credentials: 'include',
            });
    
            if (response.ok) {
                console.log("Comentario agregado, actualizando publicaciones...");
                window.location.reload()
                setNewComments((prev) => ({ ...prev, [postId]: '' }));
            }
        } catch (error) {
            console.error('Error al agregar comentario:', error);
        }
    };
    
    
    

    useEffect(() => {
        fetchComments();
        fetchPosts();
    }, [location.state]);


    const handleCommentChange = (postId, event) => {
        setNewComments((prev) => ({
            ...prev,
            [postId]: event.target.value, // Asignamos el comentario de la publicación específica
        }));
    };

    return (
        <div className="w-full max-w-4xl space-y-8">
            <h2 className="text-3xl text-gray-800 font-semibold mb-6">Publicaciones</h2>
            {posts.length === 0 ? (
                <p className="text-gray-200">No hay publicaciones aún.</p>
            ) : (
                posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                            {post.title} <span className="text-sm text-gray-500">por {post.user}</span>
                        </h3>
                        {admin && (
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                onClick={() => handleDelete(post.id)}
                            >
                                Eliminar
                            </button>
                        )}
                        <p className="text-lg text-gray-700 mb-6">{post.content}</p>

                        {/* Comentarios */}
                        <Comments postId={post.id} fetchComments={fetchComments} />

                        {/* Formulario para agregar un comentario */}
                        <div className="flex flex-col space-y-4">
                            <textarea
                                className="w-full p-4 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                placeholder="Agregar un comentario"
                                value={newComments[post.id] || ''} // Mostramos el comentario específico de esta publicación
                                onChange={(e) => handleCommentChange(post.id, e)} // Actualizamos el comentario de esta publicación
                            />
                            <button
                                onClick={() => handleAddComment(post.id)}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <FaRegComment />
                                <span>Agregar comentario</span>
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Publication;
