const Admin = require('../models/Admin');
const Client = require('../models/Client');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Offer = require('../models/Offer');

// ==================== DASHBOARD ====================
exports.getDashboard = async (req, res) => {
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
};

// ==================== ADMINISTRADORES ====================
// Listar todos os administradores
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.getAll();
        res.json(admins);
    } catch (error) {
        console.error('Erro ao buscar admins:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Criar novo administrador
exports.createAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Verificar se email já existe
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
};

// Atualizar administrador
exports.updateAdmin = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const adminId = req.params.id;
        
        const affected = await Admin.update(adminId, { name, email, role });
        
        if (affected === 0) {
            return res.status(404).json({ error: 'Administrador não encontrado' });
        }
        
        res.json({ message: 'Administrador atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar admin:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Alterar senha do administrador
exports.updateAdminPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const adminId = req.params.id;
        
        // Validação da senha
        if (!password || password.length < 6) {
            return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });
        }
        
        const affected = await Admin.updatePassword(adminId, password);
        
        if (affected === 0) {
            return res.status(404).json({ error: 'Administrador não encontrado' });
        }
        
        res.json({ message: 'Senha alterada com sucesso' });
    } catch (error) {
        console.error('Erro ao alterar senha:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Deletar administrador
exports.deleteAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        
        // Verificar se não está tentando deletar o próprio admin logado
        if (req.user.id === parseInt(adminId)) {
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
};

// ==================== PRODUTOS ====================
// Listar todos os produtos (admin)
exports.getAllProductsAdmin = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Criar novo produto
exports.createProduct = async (req, res) => {
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
};

// Atualizar produto
exports.updateProduct = async (req, res) => {
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
};

// Deletar produto (soft delete)
exports.deleteProduct = async (req, res) => {
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
};

// ==================== CATEGORIAS ====================
// Listar todas as categorias (admin)
exports.getAllCategoriesAdmin = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Criar nova categoria
exports.createCategory = async (req, res) => {
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
};

// Atualizar categoria
exports.updateCategory = async (req, res) => {
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
};

// Deletar categoria (soft delete)
exports.deleteCategory = async (req, res) => {
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
};

// ==================== OFERTAS ====================
// Listar todas as ofertas
exports.getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.findAll();
        res.json(offers);
    } catch (error) {
        console.error('Erro ao buscar ofertas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Listar ofertas ativas
exports.getActiveOffers = async (req, res) => {
    try {
        const offers = await Offer.getActive();
        res.json(offers);
    } catch (error) {
        console.error('Erro ao buscar ofertas ativas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Criar nova oferta
exports.createOffer = async (req, res) => {
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
};

// Atualizar oferta
exports.updateOffer = async (req, res) => {
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
};

// Deletar oferta (soft delete)
exports.deleteOffer = async (req, res) => {
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
};

// ==================== CLIENTES ====================
// Listar todos os clientes
exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.getAll();
        res.json(clients);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Buscar cliente por ID
exports.getClientById = async (req, res) => {
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
};

// Criar novo cliente (admin)
exports.createClient = async (req, res) => {
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
};

// Atualizar cliente
exports.updateClient = async (req, res) => {
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
};

// Deletar cliente
exports.deleteClient = async (req, res) => {
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
};

// ==================== ESTATÍSTICAS ====================
exports.getStats = async (req, res) => {
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
};