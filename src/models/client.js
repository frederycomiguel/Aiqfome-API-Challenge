// Importa os módulos necessários do Sequelize
const { Sequelize, DataTypes } = require('sequelize');

// Cria uma nova conexão com o banco de dados PostgreSQL
const sequelize = new Sequelize('postgresql://user:password@db:5432/aiqfome');


const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,  // Tipo inteiro
        primaryKey: true,          // Chave primária
        autoIncrement: true,       // Auto incremento (gera o próximo ID automaticamente)
    },
    name: {
        type: DataTypes.STRING,    // Nome do cliente (texto)
        allowNull: false,          // Campo obrigatório (não pode ser nulo)
    },
    email: {
        type: DataTypes.STRING,    // Email do cliente (texto)
        allowNull: false,          // Campo obrigatório
        unique: true,              // Email deve ser único (não pode repetir)
    }
});

// Exporta o modelo Client para ser usado em outras partes da aplicação
module.exports = { Client };
