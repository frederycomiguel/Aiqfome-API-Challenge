// Importa o Express
const express = require('express');
// Cria um roteador separado para definir os endpoints relacionados a "clientes"
const router = express.Router();
// Simula um "banco de dados" em memória (array simples para armazenar clientes temporariamente)
const clientes = [];

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Endpoints para gerenciar clientes
 */

/**
 * @swagger
 * /api/clients:
 *   post:
 *     tags: [Clientes]
 *     summary: Criar Cliente
 *     description: Cria um novo cliente com nome e e-mail.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 example: joao@example.com
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Nome ou e-mail não fornecido
 *       409:
 *         description: E-mail já cadastrado
 */
router.post('/clients', (req, res) => {
    const { nome, email } = req.body;

    // Valida se os campos obrigatórios foram enviados
    if (!nome || !email) {
        return res.status(400).json({ message: 'Nome e e-mail são obrigatórios.' });
    }
    // Verifica se o e-mail já está em uso
    const existe = clientes.find(c => c.email === email);
    if (existe) {
        return res.status(409).json({ message: 'E-mail já cadastrado.' });
    }
    // Cria um novo cliente com ID sequencial
    const novoCliente = { id: clientes.length + 1, nome, email };
    clientes.push(novoCliente);
    // Retorna o cliente criado
    res.status(201).json(novoCliente);
});

/**
 * @swagger
 * /api/clients:
 *   get:
 *     tags: [Clientes]
 *     summary: Listar todos os clientes
 *     description: Retorna a lista de todos os clientes cadastrados.
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 */
router.get('/clients', (req, res) => {
    // Retorna a lista completa de clientes cadastrados
    res.json(clientes);
});

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Atualizar cliente
 *     tags: [Clientes]
 *     description: Atualiza os dados de um cliente (nome e e-mail).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Atualizado
 *               email:
 *                 type: string
 *                 example: joao.atualizado@example.com
 *     responses:
 *       200:
 *         description: Cliente atualizado
 *       400:
 *         description: Nome ou e-mail não fornecido
 *       404:
 *         description: Cliente não encontrado
 */
router.put('/clients/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    // Verifica se os campos foram enviados
    if (!nome || !email) {
        return res.status(400).json({ message: 'Nome e e-mail são obrigatórios.' });
    }
    // Verifica se outro cliente já usa o mesmo e-mail
    const cliente = clientes.find(c => c.id == id);
    if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    const existe = clientes.find(c => c.email === email && c.id !== cliente.id);
    if (existe) {
        return res.status(409).json({ message: 'E-mail já cadastrado.' });
    }
    // Atualiza os dados do cliente
    cliente.nome = nome;
    cliente.email = email;

    res.status(200).json(cliente);
});

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     tags: [Clientes]
 *     summary: Deletar cliente
 *     description: Deleta um cliente pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente excluído com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.delete('/clients/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);

    // Encontra o índice do cliente no array
    if (index === -1) {
        return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    // Remove o cliente do array
    clientes.splice(index, 1);
    res.status(200).json({ message: 'Cliente excluído com sucesso.' });
});

// Exporta o roteador para ser usado no app principal
module.exports = router;
