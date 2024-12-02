# Use a imagem Node.js como base
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para instalar dependências
COPY package.json yarn.lock ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação para o container
COPY . .

RUN npm run build

RUN npm run prisma:generate

# Expõe a porta onde a aplicação será executada
EXPOSE 3000

# Define o comando para iniciar a aplicação
CMD ["node", "dist/index.js"]
