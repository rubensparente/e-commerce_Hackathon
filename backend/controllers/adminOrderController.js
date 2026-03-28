const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const status = req.query.status || null;
        const search = req.query.search || null;
        
        const result = await Order.getAllOrders(page, limit, status, search);
        
        res.json(result);
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.getById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        
        res.json(order);
    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status, notes } = req.body;
        const orderId = req.params.id;
        
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Status inválido' });
        }
        
        const affected = await Order.updateStatus(orderId, status, notes);
        
        if (affected === 0) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        
        res.json({ message: 'Status atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.getOrderStats = async (req, res) => {
    try {
        const stats = await Order.getStats();
        res.json(stats);
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};