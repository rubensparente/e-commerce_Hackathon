const Order = require('../models/Order');
const Cart = require('../models/Cart'); // Você precisará criar este modelo
const Product = require('../models/Product');

// Criar novo pedido
exports.createOrder = async (req, res) => {
    try {
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
        
        // Gerar número do pedido
        const orderNumber = `RCP${Date.now()}${Math.floor(Math.random() * 1000)}`;
        
        // Criar pedido
        const orderId = await Order.create({
            client_id: clientId,
            order_number: orderNumber,
            total: total,
            subtotal: subtotal,
            discount: discount || 0,
            shipping_cost: shipping_cost || 0,
            payment_method: payment_method,
            shipping_address: shipping_address,
            shipping_city: shipping_city,
            shipping_state: shipping_state,
            shipping_zip: shipping_zip,
            notes: notes
        });
        
        // Adicionar itens ao pedido
        for (const item of items) {
            await Order.addItem(orderId, {
                product_id: item.product_id,
                product_name: item.name,
                quantity: item.quantity,
                price: item.price,
                discount_percent: item.discount_percent || 0,
                image_url: item.image_url
            });
            
            // Atualizar estoque
            await Product.updateStock(item.product_id, item.quantity);
        }
        
        // Registrar status inicial
        await Order.updateStatus(orderId, 'pending', 'Pedido criado');
        
        // Limpar carrinho (opcional)
        // await Cart.clear(clientId);
        
        res.status(201).json({
            message: 'Pedido criado com sucesso',
            orderId: orderId,
            orderNumber: orderNumber
        });
        
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Listar pedidos do cliente
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.getByClientId(req.user.id);
        
        // Buscar itens de cada pedido
        for (const order of orders) {
            order.items = await Order.getItems(order.id);
        }
        
        res.json(orders);
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Obter detalhes de um pedido
exports.getOrderDetails = async (req, res) => {
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
};

// Cancelar pedido
exports.cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        
        await Order.cancel(orderId, req.user.id);
        
        res.json({ message: 'Pedido cancelado com sucesso' });
    } catch (error) {
        console.error('Erro ao cancelar pedido:', error);
        res.status(500).json({ error: error.message || 'Erro interno do servidor' });
    }
};

// Atualizar estoque (método auxiliar)
Product.updateStock = async (productId, quantity) => {
    const pool = require('../config/database');
    await pool.query(
        'UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?',
        [quantity, productId, quantity]
    );
};