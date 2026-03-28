const Product = require('../models/Product');

// ==================== ROTAS PÚBLICAS ====================

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.getDiscountedProducts = async (req, res) => {
    try {
        const products = await Product.getDiscounted();
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos com desconto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || q.length < 2) {
            return res.json([]);
        }
        const products = await Product.search(q);
        res.json(products);
    } catch (error) {
        console.error('Erro na busca:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(product);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.getByCategory(req.params.categoryId);
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos por categoria:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// ==================== ROTAS ADMINISTRATIVAS ====================

exports.createProduct = async (req, res) => {
    try {
        const { specifications, ...otherData } = req.body;
        
        // Se specifications vier como string, tenta fazer parse para objeto
        let specsData = specifications;
        if (typeof specifications === 'string') {
            try {
                specsData = JSON.parse(specifications);
            } catch (e) {
                console.error('Erro ao parse specifications:', e);
                specsData = null;
            }
        }
        
        const productData = {
            ...otherData,
            specifications: specsData
        };
        
        const productId = await Product.create(productData);
        
        res.status(201).json({ 
            message: 'Produto criado com sucesso', 
            id: productId 
        });
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ error: error.message || 'Erro interno do servidor' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { specifications, ...otherData } = req.body;
        
        // Se specifications vier como string, tenta fazer parse para objeto
        let specsData = specifications;
        if (typeof specifications === 'string') {
            try {
                specsData = JSON.parse(specifications);
            } catch (e) {
                console.error('Erro ao parse specifications:', e);
                specsData = null;
            }
        }
        
        const productData = {
            ...otherData,
            specifications: specsData
        };
        
        const affected = await Product.update(id, productData);
        
        if (affected === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        
        res.json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: error.message || 'Erro interno do servidor' });
    }
};

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