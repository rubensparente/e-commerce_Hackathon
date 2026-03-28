const pool = require('../config/database');

class Category {
    static async findAll() {
        const [rows] = await pool.query(`
            SELECT id, name, description, active, created_at 
            FROM categories 
            ORDER BY name
        `);
        return rows;
    }

    static async findAllActive() {
        const [rows] = await pool.query(`
            SELECT id, name, description, active, created_at 
            FROM categories 
            WHERE active = 1 
            ORDER BY name
        `);
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query(`
            SELECT id, name, description, active, created_at 
            FROM categories 
            WHERE id = ?
        `, [id]);
        return rows[0];
    }

    static async create(categoryData) {
        const { name, description, active = 1 } = categoryData;
        
        // Verificar se já existe categoria com o mesmo nome
        const [existing] = await pool.query(
            'SELECT id FROM categories WHERE name = ?',
            [name]
        );
        
        if (existing.length > 0) {
            throw new Error('Categoria já existe');
        }
        
        const [result] = await pool.query(
            'INSERT INTO categories (name, description, active) VALUES (?, ?, ?)',
            [name, description || null, active ? 1 : 0]
        );
        
        return result.insertId;
    }

    static async update(id, categoryData) {
        const { name, description, active } = categoryData;
        
        // Verificar se a categoria existe
        const [existing] = await pool.query(
            'SELECT id FROM categories WHERE id = ?',
            [id]
        );
        
        if (existing.length === 0) {
            throw new Error('Categoria não encontrada');
        }
        
        // Verificar se o novo nome já existe em outra categoria
        if (name) {
            const [nameExists] = await pool.query(
                'SELECT id FROM categories WHERE name = ? AND id != ?',
                [name, id]
            );
            
            if (nameExists.length > 0) {
                throw new Error('Já existe uma categoria com este nome');
            }
        }
        
        const [result] = await pool.query(
            `UPDATE categories SET 
                name = COALESCE(?, name), 
                description = COALESCE(?, description), 
                active = COALESCE(?, active),
                updated_at = NOW()
             WHERE id = ?`,
            [name || null, description || null, active !== undefined ? (active ? 1 : 0) : null, id]
        );
        
        return result.affectedRows;
    }

    static async delete(id) {
        // Verificar se a categoria existe
        const [existing] = await pool.query(
            'SELECT id FROM categories WHERE id = ?',
            [id]
        );
        
        if (existing.length === 0) {
            throw new Error('Categoria não encontrada');
        }
        
        // Verificar se existem produtos vinculados a esta categoria
        const [products] = await pool.query(
            'SELECT id FROM products WHERE category_id = ? AND active = 1',
            [id]
        );
        
        if (products.length > 0) {
            throw new Error('Não é possível excluir categoria com produtos vinculados');
        }
        
        const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Category;