const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class Client {
    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM clients WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await pool.query(
            'SELECT id, name, email, cpf, phone, address, city, state, zip_code, created_at FROM clients WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    static async getAll() {
        const [rows] = await pool.query(
            'SELECT id, name, email, cpf, phone, address, city, state, zip_code, created_at FROM clients ORDER BY created_at DESC'
        );
        return rows;
    }

    static async create(clientData) {
        const { name, email, password, cpf, phone, address, city, state, zip_code } = clientData;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [result] = await pool.query(
            `INSERT INTO clients (name, email, password, cpf, phone, address, city, state, zip_code) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, email, hashedPassword, cpf || null, phone || null, address || null, city || null, state || null, zip_code || null]
        );
        
        return result.insertId;
    }

    static async update(id, clientData) {
        const { name, email, cpf, phone, address, city, state, zip_code } = clientData;
        
        const [result] = await pool.query(
            `UPDATE clients SET 
                name = ?, 
                email = ?, 
                cpf = ?, 
                phone = ?, 
                address = ?, 
                city = ?, 
                state = ?, 
                zip_code = ?,
                updated_at = NOW()
             WHERE id = ?`,
            [name, email, cpf || null, phone || null, address || null, city || null, state || null, zip_code || null, id]
        );
        
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM clients WHERE id = ?', [id]);
        return result.affectedRows;
    }

    static async verifyPassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

module.exports = Client;