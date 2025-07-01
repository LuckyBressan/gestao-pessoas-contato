# Usa imagem base oficial do Node
FROM node:22.17-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências e instala
COPY package*.json .

RUN npm install

# Copia todo o código-fonte
COPY . .

RUN npm run build

# Expõe a porta que o Express vai usar
EXPOSE 3333

# Comando para iniciar o servidor
CMD ["npm", "run", "start"]