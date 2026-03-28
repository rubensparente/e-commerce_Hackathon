const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Rota pública para listar categorias ativas
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAllActive();
        res.json(categories);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota pública para buscar categoria por ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        res.json(category);
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;