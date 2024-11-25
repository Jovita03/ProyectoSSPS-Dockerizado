import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Publication from './Publication';
function Foro({ admin }) {

    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [posts, setPosts] = useState([]);

    const location = useLocation();

    // Función para obtener publicaciones
    const fetchPosts = async () => {
        try {
            const response = await fetch('http://publication-service/publicaciones');
            const data = await response.json();
            if (Array.isArray(data)) {
                setPosts([...data]);
            }
        } catch (error) {
            console.error('Error al obtener publicaciones:', error);
        }
    };
    


    useEffect(() => {
        fetchPosts();
    }, []);

    // Función para crear una nueva publicación
    const handleCreatePost = async () => {
        const fullName = localStorage.getItem('full_name');
        try {
            const response = await fetch('http://publication-service/publicaciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    newPostTitle,
                    newPostContent,
                    fullName,
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                console.error('Error al registrar la publicación:', result.message);
                return;
            }

            fetchPosts();
            setNewPostTitle('');
            setNewPostContent('');
        } catch (error) {
            console.error('Error interno:', error);
        }
    };
    

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-800 p-8 flex flex-col items-center">
            {/* Formulario para crear una nueva publicación */}
            <div className="mb-12 w-full max-w-4xl bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
                <h2 className="text-3xl text-gray-800 font-semibold mb-6">Crear nueva publicación</h2>
                <input
                    type="text"
                    className="w-full p-4 mb-4 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Título de la publicación"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <textarea
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
            <Publication admin={admin} posts={posts} fetchPosts={fetchPosts}  />

        </div>
    );
}

export default Foro;
