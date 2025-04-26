// Importando os pacotes necessários
const express = require('express');
const app = express();
const port = 3000;

// Middleware para tratar o corpo da requisição como JSON
app.use(express.json());

// Importação das rotas
const clientRoutes = require('./src/routes/clientRoutes');
const favoriteRoutes = require('./src/routes/favoriteRoutes');

// Usando as rotas
app.use('/api', clientRoutes);
app.use('/api', favoriteRoutes);

// Configuração do Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Favoritos',
            version: '1.0.0',
            description: 'API para gerenciar favoritos dos clientes.',
        },
    },
    apis: ['./src/routes/*.js'],
};

// Gerando a documentação Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Configuração do Swagger no Express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Inicializando o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});
