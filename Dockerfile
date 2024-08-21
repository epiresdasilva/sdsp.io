# Use uma imagem base do Node.js
FROM node:22

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie apenas o package.json e o package-lock.json para o container
COPY package*.json ./

# Instale as dependências
RUN npm install esbuild --save-dev --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copie o código da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta que a aplicação vai rodar
EXPOSE 4321

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]

