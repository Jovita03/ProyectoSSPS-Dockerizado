# Utiliza una imagen base de Node.js con Alpine Linux
FROM node:18-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación con Vite
RUN npm run build

# Utiliza una imagen base de Nginx con Alpine Linux
FROM nginx:alpine

# Copia la configuración de Nginx (nginx.conf)
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para el servidor web
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]