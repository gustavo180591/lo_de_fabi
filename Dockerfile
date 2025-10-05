# Etapa de desarrollo
FROM node:20-alpine

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Puerto de la aplicación
EXPOSE 3000

# Comando para desarrollo (usando Vite en modo desarrollo)
CMD ["npm", "run", "dev", "--", "--host"]