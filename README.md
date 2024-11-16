# Proyecto de Microservicios

Sean todos bienvenidos a nuestro proyecto de Computacion tolerante a fallas en la cual veremos una aplicacion con microservicios la cual estara trabajando con docker y kubernetes.

## 📋 Descripción del Proyecto

Este proyecto esta diseñado para que los usuarios puedan responder encuestas y explorar temas de interés relacionados con la ciberseguridad. Además, integra un foro donde los usuarios pueden interactuar entre sí mediante publicaciones, fomentando el aprendizaje y la discusión sobre este tema. El sistema está desarrollado con tecnologías modernas como Docker y Kubernetes, lo que asegura una arquitectura escalable, tolerante a fallos y altamente disponible.

## 🛠️ Tecnologías Utilizadas

- **Express**: Framework para el desarrollo del backend.
- **React**: Utilizado para el desarrollo de un frontend.
- **Supabase**: Base de datos.
- **Docker**: Contenedor para facilitar el despliegue.

## 🚀 Despliegue del Proyecto

### Paso a Paso para Desplegar

Sigue los siguientes pasos para desplegar el proyecto en tu entorno local o en un servidor.

### 1. Clonar el Repositorio 🛳️

```sh
$ git clone https://github.com/ChristianFLozano/ProyectoSSPS.git
$ cd ProyectoSSPS
```
Para el backend ingresa al siguiente link para encotrar el repo:  https://github.com/ChristianFLozano/ProyectoSSPSBackend

```sh
$ git clone https://github.com/ChristianFLozano/ProyectoSSPSBackend
$ cd ProyectoSSPSBackend
```

### 2. Instalar Dependencias 🧰
Instala las dependencias del frontend:

```sh
$ npm install && npm run dev
```

### 3. Configurar el Backend
Primero crea el .env y agrega las claves:
```sh
SUPABASE_URL=''
SUPABASE_ANON_KEY=''
SECRET_KEY=''
```

### 4. Correr el Servidor Local 

```sh
$ nodemon server.js
```

La aplicación estará disponible en `http://localhost:5000`.


## 📸 Capturas de Pantalla del Proyecto/Vista del Usuario

Aquí puedes encontrar algunas capturas de pantalla que muestran la interfaz del proyecto:

1. **Login**  

 ![Captura de pantalla 2024-11-16 110844](https://github.com/user-attachments/assets/5da63f9f-80d0-4e7b-9186-fd2a0887d316)

2. **Seleccion de cuestionarios**  
 
 ![Captura de pantalla 2024-11-16 105439](https://github.com/user-attachments/assets/7ab79e51-97f3-47a2-ba68-f98425bc8a58)

3. **Cuestionarios**  
 
 ![Captura de pantalla 2024-11-16 105718](https://github.com/user-attachments/assets/02591cc6-ea8a-4134-8300-69cbe038d655)


4. **Temas de interes**  
 
 ![Captura de pantalla 2024-11-16 105831](https://github.com/user-attachments/assets/42d213c8-7260-417b-a6d7-50c5b6bf0c25)

5. **Foro**
  
  ![Captura de pantalla 2024-11-16 110440](https://github.com/user-attachments/assets/bf6ae434-46bd-4f13-afc9-1f6eca5a1f51)

6. **Ejemplo de publicacion en el foro**
  
  ![Captura de pantalla 2024-11-16 110638](https://github.com/user-attachments/assets/b01cff33-b817-45f0-8864-27848bd5a94f)


## 📸 Capturas de Pantalla del Proyecto/Vista del Administrador

1. **Añadir temas de interes**

  ![Captura de pantalla 2024-11-16 111117](https://github.com/user-attachments/assets/a4514b72-dc8e-4260-861b-d35e8c3a5a79)

2. **Lista de usuarios**

  ![Captura de pantalla 2024-11-16 111336](https://github.com/user-attachments/assets/6dec89d3-22e7-4fa1-8a9f-a3414a2dda0d)

3. **Actualizacion de quiz**

  ![Captura de pantalla 2024-11-16 111438](https://github.com/user-attachments/assets/31781132-d35e-4c20-b9ce-4edf66b94ec2)

4. **Ejemplo de quiz**

  ![Captura de pantalla 2024-11-16 111627](https://github.com/user-attachments/assets/44c41d8e-44e7-4714-b35b-943f7b27bc77)


## ⚙️ Uso del Proyecto

1. **Registro de Usuario**: Los usuarios pueden registrarse para crear una cuenta y acceder a la plataforma.
2. **Crear y comentar publicaciones en el foro**: Los usuarios podrán crear, compartir y comentar publicaciones con otros usuarios .
3. **Responder Cuestionarios**: Los usuarios podran responder cuestionarios relacionados a varios temas, de esta forma estaran aprendiendo nuevas cosas y participando para sacar las respuestas correctas.
4. **Temas de interes**: Se observan varios temas para el aprendizaje del usuario.
