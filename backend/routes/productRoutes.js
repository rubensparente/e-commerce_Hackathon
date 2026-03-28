const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// ==================== ROTAS PÚBLICAS ====================

// Listar todos os produtos
router.get('/', productController.getAllProducts);

// Listar produtos com desconto
router.get('/discounted', productController.getDiscountedProducts);

// Buscar produtos (autocomplete)
router.get('/search', productController.searchProducts);

// Listar produtos por categoria
router.get('/category/:categoryId', productController.getProductsByCategory);

// Detalhes de um produto específico
router.get('/:id', productController.getProductById);

// ==================== ROTAS ADMINISTRATIVAS (PROTEGIDAS) ====================

// Criar novo produto
router.post('/', authMiddleware, adminMiddleware, productController.createProduct);

// Atualizar produto
router.put('/:id', authMiddleware, adminMiddleware, productController.updateProduct);

// Deletar produto (soft delete)
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;