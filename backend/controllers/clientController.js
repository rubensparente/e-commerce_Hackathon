const Client = require('../models/Client');
const bcrypt = require('bcryptjs');

// ==================== PERFIL DO CLIENTE ====================
// Obter perfil do cliente logado
exports.getProfile = async (req, res) => {
    try {
        const client = await Client.findById(req.user.id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(client);
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Atualizar perfil do cliente logado

// Atualizar perfil do cliente logado
exports.updateProfile = async (req, res) => {
    try {
        const { name, email, cpf, phone, address, city, state, zip_code } = req.body;
        
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
};

// Alterar senha do cliente logado
exports.changePassword = async (req, res) => {
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
        
        const isValidPassword = await Client.verifyPassword(currentPassword, client.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Senha atual incorreta' });
        }
        
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        const pool = require('../config/database');
        await pool.query('UPDATE clients SET password = ? WHERE id = ?', [hashedPassword, req.user.id]);
        
        res.json({ message: 'Senha alterada com sucesso' });
    } catch (error) {
        console.error('Erro ao alterar senha:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
// ==================== PEDIDOS DO CLIENTE ====================
// Listar pedidos do cliente logado
exports.getOrders = async (req, res) => {
    try {
        const pool = require('../config/database');
        const [orders] = await pool.query(`
            SELECT o.*, 
                   COUNT(oi.id) as items_count,
                   SUM(oi.quantity * oi.price) as total
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            WHERE o.client_id = ?
            GROUP BY o.id
            ORDER BY o.created_at DESC
        `, [req.user.id]);
        
        res.json(orders);
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Obter detalhes de um pedido específico
exports.getOrderDetails = async (req, res) => {
    try {
        const pool = require('../config/database');
        const orderId = req.params.id;
        
        // Buscar informações do pedido
        const [orders] = await pool.query(`
            SELECT o.*, 
                   COUNT(oi.id) as items_count,
                   SUM(oi.quantity * oi.price) as total
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            WHERE o.id = ? AND o.client_id = ?
            GROUP BY o.id
        `, [orderId, req.user.id]);
        
        if (orders.length === 0) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        
        // Buscar itens do pedido
        const [items] = await pool.query(`
            SELECT oi.*, p.name as product_name, p.image_url
            FROM order_items oi
            LEFT JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        `, [orderId]);
        
        res.json({
            order: orders[0],
            items: items
        });
    } catch (error) {
        console.error('Erro ao buscar detalhes do pedido:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// ==================== CARRINHO DE COMPRAS ====================
// Obter carrinho do cliente (simulado - será implementado com Redis/Session)
exports.getCart = async (req, res) => {
    try {
        // Aqui será implementado com Redis ou Session
        // Por enquanto retorna carrinho vazio
        res.json({
            items: [],
            total: 0,
            items_count: 0
        });
    } catch (error) {
        console.error('Erro ao buscar carrinho:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Adicionar item ao carrinho
exports.addToCart = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        
        if (!product_id || !quantity || quantity <= 0) {
            return res.status(400).json({ error: 'Produto e quantidade são obrigatórios' });
        }
        
        const Product = require('../models/Product');
        const product = await Product.findById(product_id);
        
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        
        if (product.stock < quantity) {
            return res.status(400).json({ error: 'Estoque insuficiente' });
        }
        
        // Aqui será implementada a lógica do carrinho
        // Por enquanto retorna sucesso
        res.json({ 
            message: 'Produto adicionado ao carrinho',
            item: { product_id, quantity, product }
        });
    } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Remover item do carrinho
exports.removeFromCart = async (req, res) => {
    try {
        const { product_id } = req.params;
        
        // Aqui será implementada a lógica do carrinho
        res.json({ message: 'Produto removido do carrinho' });
    } catch (error) {
        console.error('Erro ao remover do carrinho:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Atualizar quantidade no carrinho
exports.updateCartItem = async (req, res) => {
    try {
        const { product_id } = req.params;
        const { quantity } = req.body;
        
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ error: 'Quantidade inválida' });
        }
        
        // Aqui será implementada a lógica do carrinho
        res.json({ message: 'Carrinho atualizado' });
    } catch (error) {
        console.error('Erro ao atualizar carrinho:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Finalizar compra (checkout)
exports.checkout = async (req, res) => {
    try {
        const { payment_method, shipping_address } = req.body;
        
        // Aqui será implementada a lógica de checkout
        // Por enquanto retorna sucesso simulado
        res.json({ 
            message: 'Pedido realizado com sucesso',
            order_id: Math.floor(Math.random() * 10000)
        });
    } catch (error) {
        console.error('Erro ao finalizar compra:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// ==================== ENDEREÇOS DO CLIENTE ====================
// Listar endereços do cliente
exports.getAddresses = async (req, res) => {
    try {
        const pool = require('../config/database');
        const [addresses] = await pool.query(`
            SELECT * FROM client_addresses 
            WHERE client_id = ? 
            ORDER BY is_default DESC, created_at DESC
        `, [req.user.id]);
        
        res.json(addresses);
    } catch (error) {
        console.error('Erro ao buscar endereços:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Adicionar novo endereço
exports.addAddress = async (req, res) => {
    try {
        const { address, city, state, zip_code, complement, is_default } = req.body;
        
        if (!address || !city || !state || !zip_code) {
            return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
        }
        
        const pool = require('../config/database');
        
        // Se for endereço padrão, remover padrão de outros endereços
        if (is_default) {
            await pool.query(
                'UPDATE client_addresses SET is_default = 0 WHERE client_id = ?',
                [req.user.id]
            );
        }
        
        const [result] = await pool.query(`
            INSERT INTO client_addresses (client_id, address, city, state, zip_code, complement, is_default)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [req.user.id, address, city, state, zip_code, complement, is_default || 0]);
        
        res.status(201).json({ 
            message: 'Endereço adicionado com sucesso',
            id: result.insertId
        });
    } catch (error) {
        console.error('Erro ao adicionar endereço:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Atualizar endereço
exports.updateAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        const { address, city, state, zip_code, complement, is_default } = req.body;
        
        const pool = require('../config/database');
        
        // Verificar se endereço pertence ao cliente
        const [existing] = await pool.query(
            'SELECT * FROM client_addresses WHERE id = ? AND client_id = ?',
            [addressId, req.user.id]
        );
        
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Endereço não encontrado' });
        }
        
        // Se for endereço padrão, remover padrão de outros endereços
        if (is_default) {
            await pool.query(
                'UPDATE client_addresses SET is_default = 0 WHERE client_id = ?',
                [req.user.id]
            );
        }
        
        await pool.query(`
            UPDATE client_addresses 
            SET address = ?, city = ?, state = ?, zip_code = ?, complement = ?, is_default = ?
            WHERE id = ?
        `, [address, city, state, zip_code, complement, is_default || 0, addressId]);
        
        res.json({ message: 'Endereço atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar endereço:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Deletar endereço
exports.deleteAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        
        const pool = require('../config/database');
        
        // Verificar se endereço pertence ao cliente
        const [existing] = await pool.query(
            'SELECT * FROM client_addresses WHERE id = ? AND client_id = ?',
            [addressId, req.user.id]
        );
        
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Endereço não encontrado' });
        }
        
        await pool.query('DELETE FROM client_addresses WHERE id = ?', [addressId]);
        
        res.json({ message: 'Endereço removido com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar endereço:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};