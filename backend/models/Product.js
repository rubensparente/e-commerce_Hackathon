const pool = require('../config/database');

class Product {
    // Helper para converter specifications
    static parseSpecifications(specs) {
        if (!specs) return null;
        try {
            // Se já for objeto, retorna
            if (typeof specs === 'object') return specs;
            // Se for string, tenta parse
            return JSON.parse(specs);
        } catch (e) {
            console.error('Erro ao parse specifications:', e);
            return null;
        }
    }

    static stringifySpecifications(specs) {
        if (!specs) return null;
        try {
            // Se for objeto, converte para string JSON
            if (typeof specs === 'object') {
                return JSON.stringify(specs);
            }
            // Se já for string, retorna
            return specs;
        } catch (e) {
            console.error('Erro ao stringify specifications:', e);
            return null;
        }
    }

    static async findAll() {
        const [rows] = await pool.query(`
            SELECT DISTINCT p.*, 
                   c.name as category_name,
                   o.id as offer_id,
                   o.discount_percent,
                   o.end_date as offer_end_date,
                   ROUND(p.price * (1 - IFNULL(o.discount_percent, 0)/100), 2) as discounted_price
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN offers o ON p.id = o.product_id AND o.active = TRUE AND o.end_date > NOW()
            WHERE p.active = TRUE
            GROUP BY p.id
            ORDER BY p.created_at DESC
        `);
        
        // Converter specifications de JSON para objeto
        return rows.map(product => ({
            ...product,
            specifications: this.parseSpecifications(product.specifications)
        }));
    }

    static async getDiscounted() {
        const [rows] = await pool.query(`
            SELECT DISTINCT p.*, 
                   c.name as category_name,
                   o.discount_percent,
                   o.end_date as offer_end_date,
                   ROUND(p.price * (1 - o.discount_percent/100), 2) as discounted_price
            FROM products p
            INNER JOIN offers o ON p.id = o.product_id
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE o.active = TRUE AND o.end_date > NOW() AND p.active = TRUE
            GROUP BY p.id
            ORDER BY o.discount_percent DESC
            LIMIT 12
        `);
        
        return rows.map(product => ({
            ...product,
            specifications: this.parseSpecifications(product.specifications)
        }));
    }

    static async search(query) {
        const [rows] = await pool.query(`
            SELECT DISTINCT p.*, 
                   c.name as category_name,
                   o.discount_percent
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN offers o ON p.id = o.product_id AND o.active = TRUE AND o.end_date > NOW()
            WHERE (p.name LIKE ? OR p.description LIKE ?) AND p.active = TRUE
            GROUP BY p.id
            LIMIT 10
        `, [`%${query}%`, `%${query}%`]);
        
        return rows.map(product => ({
            ...product,
            specifications: this.parseSpecifications(product.specifications)
        }));
    }

    static async findById(id) {
        const [rows] = await pool.query(`
            SELECT DISTINCT p.*, 
                   c.name as category_name,
                   o.id as offer_id,
                   o.discount_percent,
                   o.end_date as offer_end_date,
                   ROUND(p.price * (1 - IFNULL(o.discount_percent, 0)/100), 2) as discounted_price
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN offers o ON p.id = o.product_id AND o.active = TRUE AND o.end_date > NOW()
            WHERE p.id = ? AND p.active = TRUE
            GROUP BY p.id
        `, [id]);
        
        if (rows.length === 0) return null;
        
        const product = rows[0];
        product.specifications = this.parseSpecifications(product.specifications);
        
        return product;
    }

    static async getByCategory(categoryId) {
        const [rows] = await pool.query(`
            SELECT DISTINCT p.*, 
                   c.name as category_name,
                   o.id as offer_id,
                   o.discount_percent,
                   o.end_date as offer_end_date,
                   ROUND(p.price * (1 - IFNULL(o.discount_percent, 0)/100), 2) as discounted_price
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN offers o ON p.id = o.product_id AND o.active = TRUE AND o.end_date > NOW()
            WHERE p.category_id = ? AND p.active = TRUE
            GROUP BY p.id
        `, [categoryId]);
        
        return rows.map(product => ({
            ...product,
            specifications: this.parseSpecifications(product.specifications)
        }));
    }

    static async create(productData) {
        const { 
            name, 
            description, 
            price, 
            stock, 
            category_id, 
            image_url, 
            brand, 
            warranty, 
            specifications,
            active = 1
        } = productData;
        
        // Validar campos obrigatórios
        if (!name || !price) {
            throw new Error('Nome e preço são obrigatórios');
        }
        
        // Converter specifications para JSON string
        const specsJson = this.stringifySpecifications(specifications);
        
        const [result] = await pool.query(
            `INSERT INTO products 
            (name, description, price, stock, category_id, image_url, brand, warranty, specifications, active) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name, 
                description || null, 
                price, 
                stock || 0, 
                category_id || null, 
                image_url || null, 
                brand || null, 
                warranty || null, 
                specsJson,
                active
            ]
        );
        
        return result.insertId;
    }

    static async update(id, productData) {
        const { 
            name, 
            description, 
            price, 
            stock, 
            category_id, 
            image_url, 
            brand, 
            warranty, 
            specifications, 
            active 
        } = productData;
        
        // Verificar se o produto existe
        const existing = await this.findById(id);
        if (!existing) {
            throw new Error('Produto não encontrado');
        }
        
        // Converter specifications para JSON string
        const specsJson = this.stringifySpecifications(specifications);
        
        const [result] = await pool.query(
            `UPDATE products SET 
                name = COALESCE(?, name),
                description = COALESCE(?, description),
                price = COALESCE(?, price),
                stock = COALESCE(?, stock),
                category_id = COALESCE(?, category_id),
                image_url = COALESCE(?, image_url),
                brand = COALESCE(?, brand),
                warranty = COALESCE(?, warranty),
                specifications = COALESCE(?, specifications),
                active = COALESCE(?, active),
                updated_at = NOW()
            WHERE id = ?`,
            [
                name || null,
                description || null,
                price || null,
                stock !== undefined ? stock : null,
                category_id || null,
                image_url || null,
                brand || null,
                warranty || null,
                specsJson,
                active !== undefined ? active : null,
                id
            ]
        );
        
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query(
            'UPDATE products SET active = FALSE, updated_at = NOW() WHERE id = ?', 
            [id]
        );
        return result.affectedRows;
    }
}

module.exports = Product;