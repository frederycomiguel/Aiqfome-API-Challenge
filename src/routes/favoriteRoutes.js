//APi com link externo
// Importa o Express e o Axios para chamadas externas
const express = require('express');
const axios = require('axios');

// Cria um roteador separado para definir os endpoints relacionados a "favoritos"
const router = express.Router();

// Simula um "banco de dados" de favoritos na memória (array simples)
const favoritos = [];

/**
 * @swagger
 * /api/clients/{id}/favorites:
 *   post:
 *     tags:
 *       - Favoritos
 *     summary: Adicionar produto aos favoritos
 *     description: Adiciona um produto à lista de favoritos de um cliente.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Produto adicionado aos favoritos com sucesso.
 *       400:
 *         description: ID do produto é obrigatório.
 *       409:
 *         description: Produto já está na lista de favoritos.
 *       500:
 *         description: Erro ao validar produto externo.
 */

router.post('/clients/:id/favorites', async (req, res) => {
    const clienteId = parseInt(req.params.id);
    const { productId } = req.body;

    // Verifica se o ID do produto foi enviado
    if (!productId) {
        return res.status(400).json({ message: 'ID do produto é obrigatório.' });
    }

    // Verifica se o produto já foi favoritado anteriormente pelo cliente
    const jaFavorito = favoritos.find(f => f.clienteId === clienteId && f.product.id === productId);
    if (jaFavorito) {
        return res.status(409).json({ message: 'Produto já está na lista de favoritos.' });
    }

    try {
        // Faz a requisição externa para validar o produto via API externa
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        const produto = response.data;

        // Se o produto não for encontrado
        if (!produto || !produto.id) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        // Adiciona produto à lista de favoritos
        favoritos.push({ clienteId, product: produto });

        return res.status(201).json({ message: 'Produto adicionado aos favoritos com sucesso.' });

    } catch (error) {
        return res.status(500).json({ message: 'Erro ao validar produto externo.' });
    }
});

/**
 * @swagger
 * /api/clients/{id}/favorites:
 *   get:
 *     tags:
 *       - Favoritos
 *     summary: Listar favoritos de um cliente
 *     description: Retorna todos os produtos favoritos de um cliente específico.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Lista de favoritos
 */

// Rota para listar favoritos de um cliente
router.get('/clients/:id/favorites', (req, res) => {
    const clienteId = parseInt(req.params.id);

    // Filtra apenas favoritos do cliente solicitado
    const lista = favoritos
        .filter(f => f.clienteId === clienteId)
        .map(f => f.product);

    res.json(lista);
});

/**
 * @swagger
 * /api/clients/{id}/favorites/{productId}:
 *   delete:
 *     tags:
 *       - Favoritos
 *     summary: Remover produto dos favoritos
 *     description: Remove um produto da lista de favoritos de um cliente.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Favorito removido com sucesso.
 *       404:
 *         description: Favorito não encontrado.
 */
// Rota para remover produto favorito
router.delete('/clients/:id/favorites/:productId', (req, res) => {
    const clienteId = parseInt(req.params.id);
    const productId = parseInt(req.params.productId);

    // Procura o produto na lista de favoritos
    const index = favoritos.findIndex(f => f.clienteId === clienteId && f.product.id === productId);
    if (index === -1) {
        return res.status(404).json({ message: 'Favorito não encontrado.' });
    }
    // Remove o produto da lista de favoritos
    favoritos.splice(index, 1);
    res.json({ message: 'Favorito removido com sucesso.' });
});

// Exporta o roteador para ser usado no app principal
module.exports = router;
