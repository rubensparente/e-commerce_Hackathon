const pool = require('../config/database');

class Offer {
    static async findAll() {
        const [rows] = await pool.query(`
            SELECT o.*, p.name as product_name, p.price as original_price,
                   ROUND(p.price * (1 - o.discount_percent/100), 2) as discounted_price
            FROM offers o
            INNER JOIN products p ON o.product_id = p.id
            WHERE o.active = TRUE
            ORDER BY o.created_at DESC
        `);
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query(`
            SELECT o.*, p.name as product_name, p.price as original_price
            FROM offers o
            INNER JOIN products p ON o.product_id = p.id
            WHERE o.id = ?
        `, [id]);
        return rows[0];
    }

    static async create(offerData) {
        const { product_id, discount_percent, start_date, end_date } = offerData;
        
        const [result] = await pool.query(
            `INSERT INTO offers (product_id, discount_percent, start_date, end_date, active) 
             VALUES (?, ?, ?, ?, TRUE)`,
            [product_id, discount_percent, start_date, end_date]
        );
        
        return result.insertId;
    }

    static async update(id, offerData) {
        const { discount_percent, start_date, end_date, active } = offerData;
        
        const [result] = await pool.query(
            'UPDATE offers SET discount_percent = ?, start_date = ?, end_date = ?, active = ? WHERE id = ?',
            [discount_percent, start_date, end_date, active, id]
        );
        
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query('UPDATE offers SET active = FALSE WHERE id = ?', [id]);
        return result.affectedRows;
    }

    static async getActive() {
        const [rows] = await pool.query(`
            SELECT o.*, p.name as product_name, p.price as original_price
            FROM offers o
            INNER JOIN products p ON o.product_id = p.id
            WHERE o.active = TRUE AND o.end_date > NOW()
            ORDER BY o.discount_percent DESC
        `);
        return rows;
    }
}

module.exports = Offer;