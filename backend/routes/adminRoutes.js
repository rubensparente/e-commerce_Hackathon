const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware, superAdminMiddleware } = require('../middleware/auth');
const Admin = require('../models/Admin');
const Client = require('../models/Client');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Offer = require('../models/Offer');
const Order = require('../models/Order');
const adminOrderController = require('../controllers/adminOrderController');

// ==================== DASHBOARD ====================
router.get('/dashboard', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const products = await Product.findAll();
        const clients = await Client.getAll();
        const offers = await Offer.getActive();
        const admins = await Admin.getAll();
        
        res.json({
            totalProducts: products.length,
            totalClients: clients.length,
            totalAdmins: admins.length,
            totalOrders: 0,
            activeOffers: offers.length,
            products: products.slice(0, 5),
            recentClients: clients.slice(0, 5)
        });
    } catch (error) {
        console.error('Erro no dashboard:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// ==================== ADMINISTRADORES ====================
// Listar todos os administradores (apenas super admin)
router.get('/admins', authMiddleware, superAdminMiddleware, async (req, res) => {
    try {
        const admins = await Admin.getAll();
        res.json(admins);
    } catch (error) {
        console.error('Erro ao buscar admins:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Criar novo administrador (apenas super admin)
router.post('/admins', authMiddleware, superAdminMiddleware, async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        const existingAdmin = await Admin.findByEmail(email);
        if (existingAdmin) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        
        const adminId = await Admin.create({ name, email, password, role });
        res.status(201).json({ 
            message: 'Administrador criado com sucesso', 
            id: adminId 
        });
    } catch (error) {
        console.error('Erro ao criar admin:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Atualizar administrador (apenas super admin)
router.put('/admins/:id', authMiddleware, superAdminMiddleware, async (req, res) => {
    try {
        const affected = await Admin.update(req.params.id, req.body);
        if (affected === 0) {
            return res.status(404).json({ error: 'Administrador não encontrado' });
        }
        res.json({ message: 'Administrador atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar admin:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Alterar senha do administrador (apenas super admin)
router.put('/admins/:id/password', authMiddleware, superAdminMiddleware, async (req, res) => {
    try {
        const { password } = req.body;
        const adminId = req.params.id;
        
        if (!password || password.length < 6) {
            return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });
        }
        
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const pool = require('../config/database');
        const [result] = await pool.query(
            'UPDATE admins SET password = ? WHERE id = ?',
            [hashedPassword, adminId]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Administrador não encontrado' });
        }
        
        res.json({ message: 'Senha alterada com sucesso' });
    } catch (error) {
        console.error('Erro ao alterar senha:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Deletar administrador (apenas super admin - não pode deletar a si mesmo)
router.delete('/admins/:id', authMiddleware, superAdminMiddleware, async (req, res) => {
    try {
        const adminId = parseInt(req.params.id);
        const currentAdminId = req.user.id;
        
        if (currentAdminId === adminId) {
            return res.status(403).json({ error: 'Não é possível deletar seu próprio usuário' });
        }
        
        const affected = await Admin.delete(adminId);
        
        if (affected === 0) {
            return res.status(404).json({ error: 'Administrador não encontrado' });
        }
        
        res.json({ message: 'Administrador removido com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar admin:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// ==================== PRODUTOS ====================
// Listar todos os produtos (admin)
router.get('/products', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Criar novo produto
router.post('/products', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const productId = await Product.create(req.body);
        res.status(201).json({ 
            message: 'Produto criado com sucesso', 
            id: productId 
        });
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Atualizar produto
router.put('/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const affected = await Product.update(req.params.id, req.body);
        if (affected === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Deletar produto (soft delete)
router.delete('/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const affected = await Product.delete(req.params.id);
        if (affected === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto removido com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// ==================== CATEGORIAS ====================
// Listar todas as categorias (admin)
router.get('/categories', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Criar nova categoria
router.post('/categories', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { name, description, icon } = req.body;
        
        const existingCategories = await Category.findAll();
        const categoryExists = existingCategories.some(c => c.name === name);
        
        if (categoryExists) {
            return res.status(400).json({ error: 'Categoria já existe' });
        }
        
        const categoryId = await Category.create({ name, description, icon });
        res.status(201).json({ 
            message: 'Categoria criada com sucesso', 
            id: categoryId 
        });
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Atualizar categoria
router.put('/categories/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const affected = await Category.update(req.params.id, req.body);
        if (affected === 0) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        res.json({ message: 'Categoria atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Deletar categoria (soft delete)
router.delete('/categories/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const affected = await Category.delete(req.params.id);
        if (affected === 0) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        res.json({ message: 'Categoria removida com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// ==================== OFERTAS ====================
// Listar todas as ofertas
router.get('/offers', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const offers = await Offer.findAll();
        res.json(offers);
    } catch (error) {
        console.error('Erro ao buscar ofertas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Listar ofertas ativas
router.get('/offers/active', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const offers = await Offer.getActive();
        res.json(offers);
    } catch (error) {
        console.error('Erro ao buscar ofertas ativas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Criar nova oferta
router.post('/offers', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { product_id, discount_percent, start_date, end_date, active } = req.body;
        
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        
        const existingOffers = await Offer.findAll();
        const existingOffer = existingOffers.find(o => o.product_id === product_id && o.active);
        
        if (existingOffer) {
            return res.status(400).json({ error: 'Produto já possui uma oferta ativa' });
        }
        
        const offerId = await Offer.create({ product_id, discount_percent, start_date, end_date, active });
        res.status(201).json({ 
            message: 'Oferta criada com sucesso', 
            id: offerId 
        });
    } catch (error) {
        console.error('Erro ao criar oferta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Atualizar oferta
router.put('/offers/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const affected = await Offer.update(req.params.id, req.body);
        if (affected === 0) {
            return res.status(404).json({ error: 'Oferta não encontrada' });
        }
        res.json({ message: 'Oferta atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar oferta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Deletar oferta (soft delete)
router.delete('/offers/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const affected = await Offer.delete(req.params.id);
        if (affected === 0) {
            return res.status(404).json({ error: 'Oferta não encontrada' });
        }
        res.json({ message: 'Oferta removida com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar oferta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// ==================== CLIENTES ====================
// Listar todos os clientes (admin)
router.get('/clients', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const clients = await Client.getAll();
        res.json(clients);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Buscar cliente por ID (admin)
router.get('/clients/:id', authMiddleware, adminMiddleware, async (req, res) => {
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
router.post('/clients', authMiddleware, adminMiddleware, async (req, res) => {
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
router.put('/clients/:id', authMiddleware, adminMiddleware, async (req, res) => {
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
router.delete('/clients/:id', authMiddleware, adminMiddleware, async (req, res) => {
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

// ==================== PEDIDOS ====================
// Listar todos os pedidos (admin)
router.get('/orders', authMiddleware, adminMiddleware, adminOrderController.getOrders);

// Estatísticas de pedidos
router.get('/orders/stats', authMiddleware, adminMiddleware, adminOrderController.getOrderStats);

// Buscar pedido por ID
router.get('/orders/:id', authMiddleware, adminMiddleware, adminOrderController.getOrderById);

// Atualizar status do pedido
router.put('/orders/:id/status', authMiddleware, adminMiddleware, adminOrderController.updateOrderStatus);

// ==================== ESTATÍSTICAS ====================
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const products = await Product.findAll();
        const clients = await Client.getAll();
        const offers = await Offer.getActive();
        
        const productsByCategory = {};
        products.forEach(product => {
            const cat = product.category_name || 'Sem categoria';
            productsByCategory[cat] = (productsByCategory[cat] || 0) + 1;
        });
        
        res.json({
            totalProducts: products.length,
            totalClients: clients.length,
            activeOffers: offers.length,
            productsByCategory: productsByCategory
        });
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;