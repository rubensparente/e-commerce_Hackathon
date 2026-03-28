const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.getCategoryById = async (req, res) => {
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
};

exports.createCategory = async (req, res) => {
    try {
        const categoryId = await Category.create(req.body);
        res.status(201).json({ 
            message: 'Categoria criada com sucesso', 
            id: categoryId 
        });
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

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