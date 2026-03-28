const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const Client = require('../models/Client');
const Order = require('../models/Order');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');

// ==================== ROTAS DO PRÓPRIO CLIENTE ====================

// Obter perfil do cliente logado
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const client = await Client.findById(req.user.id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(client);
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Atualizar perfil do cliente logado
router.put('/me', authMiddleware, async (req, res) => {
    try {
        const { name, email, cpf, phone, address, city, state, zip_code } = req.body;
        
        if (email && email !== req.user.email) {
            const existingClient = await Client.findByEmail(email);
            if (existingClient && existingClient.id !== req.user.id) {
                return res.status(400).json({ error: 'Email já cadastrado por outro usuário' });
            }
        }
        
        const affected = await Client.update(req.user.id, {
            name, email, cpf, phone, address, city, state, zip_code
        });
        
        if (affected === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        
        const updatedClient = await Client.findById(req.user.id);
        res.json({ 
            message: 'Perfil atualizado com sucesso',
            client: updatedClient
        });
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Alterar senha do cliente logado
router.put('/me/password', authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Senha atual e nova senha são obrigatórias' });
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'Nova senha deve ter no mínimo 6 caracteres' });
        }
        
        const client = await Client.findById(req.user.id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        
        const [rows] = await pool.query('SELECT password FROM clients WHERE id = ?', [req.user.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        
        const isValidPassword = await bcrypt.compare(currentPassword, rows[0].password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Senha atual incorreta' });
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE clients SET password = ? WHERE id = ?', [hashedPassword, req.user.id]);
        
        res.json({ message: 'Senha alterada com sucesso' });
    } catch (error) {
        console.error('Erro ao alterar senha:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// ==================== PEDIDOS DO CLIENTE ====================

// Criar novo pedido
router.post('/orders', authMiddleware, async (req, res) => {
    try {
        console.log('=== CRIAÇÃO DE PEDIDO ===');
        console.log('User:', req.user);
        console.log('Body:', req.body);
        
        const { 
            items, 
            total, 
            subtotal, 
            discount, 
            shipping_cost,
            payment_method,
            shipping_address,
            shipping_city,
            shipping_state,
            shipping_zip,
            notes
        } = req.body;
        
        const clientId = req.user.id;
        
        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'Carrinho vazio' });
        }
        
        const orderNumber = `RCP${Date.now()}${Math.floor(Math.random() * 1000)}`;
        
        const orderId = await Order.create({
            client_id: clientId,
            order_number: orderNumber,
            total: total,
            subtotal: subtotal || total,
            discount: discount || 0,
            shipping_cost: shipping_cost || 0,
            payment_method: payment_method,
            shipping_address: shipping_address,
            shipping_city: shipping_city,
            shipping_state: shipping_state,
            shipping_zip: shipping_zip,
            notes: notes
        });
        
        for (const item of items) {
            await Order.addItem(orderId, {
                product_id: item.product_id,
                product_name: item.name,
                quantity: item.quantity,
                price: item.price,
                discount_percent: item.discount_percent || 0,
                image_url: item.image_url
            });
            
            await pool.query(
                'UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?',
                [item.quantity, item.product_id, item.quantity]
            );
        }
        
        await Order.updateStatus(orderId, 'pending', 'Pedido criado');
        
        res.status(201).json({
            message: 'Pedido criado com sucesso',
            orderId: orderId,
            orderNumber: orderNumber
        });
        
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({ error: 'Erro interno do servidor: ' + error.message });
    }
});

// Listar pedidos do cliente logado
router.get('/orders', authMiddleware, async (req, res) => {
    try {
        console.log('=== LISTAR PEDIDOS ===');
        console.log('Cliente ID:', req.user.id);
        
        const orders = await Order.getByClientId(req.user.id);
        
        console.log('Pedidos retornados pelo model:', orders.length);
        console.log('Primeiro pedido:', JSON.stringify(orders[0], null, 2));
        
        res.json(orders);
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).json({ error: 'Erro interno do servidor: ' + error.message });
    }
});

// Obter detalhes de um pedido específico
router.get('/orders/:id', authMiddleware, async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.getById(orderId, req.user.id);
        
        if (!order) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        
        const items = await Order.getItems(orderId);
        
        res.json({
            ...order,
            items: items
        });
    } catch (error) {
        console.error('Erro ao buscar detalhes do pedido:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Cancelar pedido
router.put('/orders/:id/cancel', authMiddleware, async (req, res) => {
    try {
        const orderId = req.params.id;
        
        const [order] = await pool.query(
            'SELECT * FROM orders WHERE id = ? AND client_id = ?',
            [orderId, req.user.id]
        );
        
        if (order.length === 0) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        
        if (order[0].status !== 'pending') {
            return res.status(400).json({ error: 'Pedido não pode ser cancelado' });
        }
        
        await pool.query(
            'UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?',
            ['cancelled', orderId]
        );
        
        await pool.query(
            'INSERT INTO order_status_history (order_id, status, notes) VALUES (?, ?, ?)',
            [orderId, 'cancelled', 'Cancelado pelo cliente']
        );
        
        res.json({ message: 'Pedido cancelado com sucesso' });
    } catch (error) {
        console.error('Erro ao cancelar pedido:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// ==================== ROTAS ADMINISTRATIVAS ====================

// Listar todos os clientes (admin)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const clients = await Client.getAll();
        res.json(clients);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Buscar cliente por ID (admin)
router.get('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(client);
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Criar novo cliente (admin)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { name, email, password, cpf, phone, address, city, state, zip_code } = req.body;
        
        const existingClient = await Client.findByEmail(email);
        if (existingClient) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        
        const clientId = await Client.create({
            name, email, password, cpf, phone, address, city, state, zip_code
        });
        
        res.status(201).json({ 
            message: 'Cliente criado com sucesso', 
            id: clientId 
        });
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Atualizar cliente (admin)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const affected = await Client.update(req.params.id, req.body);
        if (affected === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json({ message: 'Cliente atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Deletar cliente (admin)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const affected = await Client.delete(req.params.id);
        if (affected === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json({ message: 'Cliente removido com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;