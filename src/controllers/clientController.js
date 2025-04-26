const { Client } = require('../models/client');

exports.create = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
        }

        const existingClient = await Client.findOne({ where: { email } });
        if (existingClient) {
            return res.status(400).json({ message: 'Email já cadastrado.' });
        }

        const newClient = await Client.create({ name, email });
        return res.status(201).json(newClient);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar cliente.', error });
    }
};

exports.getAll = async (req, res) => {
    try {
        const clients = await Client.findAll();
        return res.status(200).json(clients);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar clientes.', error });
    }
};

exports.delete = async (req, res) => {
    try {
        const clientId = req.params.id;
        const client = await Client.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }

        await client.destroy();
        return res.status(200).json({ message: 'Cliente excluído com sucesso.' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao excluir cliente.', error });
    }
};
