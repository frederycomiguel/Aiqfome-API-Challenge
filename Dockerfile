# Etapa de construção da imagem
FROM node:16-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar o package.json e o package-lock.json para dentro do container
COPY package*.json ./

# Instalar as dependências do Node
RUN npm install

# Copiar o restante dos arquivos para o container
COPY . .

# Expõe a porta 3000 para acessar a aplicação
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
