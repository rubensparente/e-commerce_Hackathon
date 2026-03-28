const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class Admin {
   static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
    return rows[0];
}

    static async findById(id) {
        const [rows] = await pool.query(
            'SELECT id, name, email, role, created_at FROM admins WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    static async getAll() {
        const [rows] = await pool.query(
            'SELECT id, name, email, role, created_at FROM admins ORDER BY created_at DESC'
        );
        return rows;
    }

    static async create(adminData) {
        const { name, email, password, role = 'admin' } = adminData;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [result] = await pool.query(
            'INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );
        
        return result.insertId;
    }

    static async update(id, adminData) {
        const { name, email, role } = adminData;
        
        const [result] = await pool.query(
            'UPDATE admins SET name = ?, email = ?, role = ? WHERE id = ?',
            [name, email, role, id]
        );
        
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM admins WHERE id = ?', [id]);
        return result.affectedRows;
    }

    static async verifyPassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    static async updatePassword(id, newPassword) {
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const [result] = await pool.query(
        'UPDATE admins SET password = ? WHERE id = ?',
        [hashedPassword, id]
    );
    
    return result.affectedRows;
}
}

module.exports = Admin;