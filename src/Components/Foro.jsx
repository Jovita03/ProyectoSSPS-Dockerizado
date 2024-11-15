import React, { useState, useEffect } from 'react';
import { FaRegComment, FaPlus } from 'react-icons/fa';

function Foro({admin}) {
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [newComment, setNewComment] = useState('');
    const [posts, setPosts] = useState([]);  // Inicializamos el estado con un arreglo vacío

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/publication');
                const data = await response.json();

                console.log("Publicaciones recibidas:", data);

                if (Array.isArray(data)) {
                    setPosts(data);
                } else {
                    console.error('No se recibieron publicaciones válidas');
                }
            } catch (error) {
                console.error('Error al obtener publicaciones:', error);
            }
        };

        fetchPosts();
    }, []); 

    // Función para crear una nueva publicación
    const handleCreatePost = () => {
        const fullName = localStorage.getItem('full_name'); // Cambiado a fullName para coincidir con el backend
    
        const postPublication = async () => {
            try {
                const body = JSON.stringify({
                    newPostTitle,
                    newPostContent,
                    fullName, // Usamos el mismo nombre que en el backend
                });
    
                const response = await fetch('http://localhost:5000/postPublication', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body,
                });
    
                const result = await response.json();
    
                if (!response.ok) {
                    console.error('Error al registrar la publicación:', result.message);
                    
                    return;
                }
            } catch (error) {
                console.error('Error interno:', error);
                alert('Ocurrió un error interno. Inténtalo de nuevo más tarde.');
            }
        };
    
        postPublication();
        setNewPostTitle('');
        setNewPostContent('');
    };

    // Función para agregar un comentario a una publicación
    const handleAddComment = (index) => {
        if (!newComment) return;
        const updatedPosts = [...posts];
        updatedPosts[index].comments.push({ text: newComment, commentAuthor: "Anónimo" });
        setPosts(updatedPosts);
        setNewComment('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-800 p-8 flex flex-col items-center">
            {/* Formulario para crear una nueva publicación */}
            <div className="mb-12 w-full max-w-4xl bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
                <h2 className="text-3xl text-gray-800 font-semibold mb-6">Crear nueva publicación</h2>
                <input
                    type="text"
                    aria-label="Título de la publicación"
                    className="w-full p-4 mb-4 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Título de la publicación"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <textarea
                    aria-label="Contenido de la publicación"
                    className="w-full p-4 mb-6 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Contenido de la publicación"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                />
                <button
                    onClick={handleCreatePost}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                    <FaPlus />
                    <span>Crear Publicación</span>
                </button>
            </div>

            {/* Listado de publicaciones */}
            <div className="w-full max-w-4xl space-y-8">
                <h2 className="text-3xl text-gray-800 font-semibold mb-6">Publicaciones</h2>
                {posts.length === 0 ? (
                    <p className="text-gray-200">No hay publicaciones aún.</p>
                ) : (
                    posts.map((post) => (  
                        <div key={post.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                {post.title} <span className="text-sm text-gray-500">por {post.user}</span>
                            </h3>
                            {admin? <button className='bg-black w-20 h-auto p-1'>
                                borrar
                            </button>: null}
                            
                            <p className="text-lg text-gray-700 mb-6">
                                {post.content}
                            </p>

                            {/* Comentarios */}
                            <div className="mb-6">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                                    <FaRegComment className="inline mr-2" />
                                    Comentarios:
                                </h4>
                                {Array.isArray(post.comments) && post.comments.length === 0 ? (
                                    <p className="text-gray-500">No hay comentarios aún.</p>
                                ) : (
                                    <ul className="list-disc pl-6 space-y-2">
                                        {Array.isArray(post.comments) &&
                                            post.comments.map((comment, idx) => (
                                                <li key={idx} className="text-sm text-gray-700">
                                                    <span className="font-semibold">{comment.commentAuthor}:</span> {comment.text}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>

                            {/* Formulario para agregar comentarios */}
                            <div className="flex flex-col space-y-4">
                                <textarea
                                    aria-label="Agregar un comentario"
                                    className="w-full p-4 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                    placeholder="Agregar un comentario"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button
                                    onClick={() => handleAddComment(index)}  // Pasamos el índice correcto
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
        </div>
    );
}

export default Foro;
