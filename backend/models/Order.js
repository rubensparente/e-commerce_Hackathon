const pool = require('../config/database');

class Order {
    static async create(orderData) {
        const {
            client_id, order_number, total, subtotal, discount, shipping_cost,
            payment_method, shipping_address, shipping_city, shipping_state, shipping_zip, notes
        } = orderData;
        
        const [result] = await pool.query(
            `INSERT INTO orders (
                client_id, order_number, total, subtotal, discount, shipping_cost,
                payment_method, shipping_address, shipping_city, shipping_state, shipping_zip, notes, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
            [
                client_id, order_number, total, subtotal, discount || 0, shipping_cost || 0,
                payment_method, shipping_address, shipping_city, shipping_state, shipping_zip, notes || null
            ]
        );
        
        return result.insertId;
    }
    
    static async addItem(orderId, itemData) {
        const {
            product_id, product_name, quantity, price, discount_percent, image_url
        } = itemData;
        
        const subtotal = price * quantity * (1 - (discount_percent || 0) / 100);
        
        const [result] = await pool.query(
            `INSERT INTO order_items (
                order_id, product_id, product_name, quantity, price, discount, discount_percent, subtotal, image_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                orderId, product_id, product_name, quantity, price, 0, discount_percent || 0, subtotal, image_url || null
            ]
        );
        
        return result.insertId;
    }
    
    static async getByClientId(clientId) {
        try {
            const [orders] = await pool.query(`
                SELECT * FROM orders 
                WHERE client_id = ?
                ORDER BY created_at DESC
            `, [clientId]);
            
            for (const order of orders) {
                const [items] = await pool.query(`
                    SELECT * FROM order_items 
                    WHERE order_id = ?
                    ORDER BY id
                `, [order.id]);
                order.items = items;
            }
            
            return orders;
        } catch (error) {
            console.error('Erro em getByClientId:', error);
            throw error;
        }
    }
    
    // ==================== MÉTODOS ADMIN ====================
    
    static async getAllOrders(page = 1, limit = 20, status = null, search = null) {
        try {
            const offset = (page - 1) * limit;
            let query = `
                SELECT o.*, 
                       c.name as client_name,
                       c.email as client_email,
                       COUNT(oi.id) as items_count,
                       SUM(oi.subtotal) as total_calculated
                FROM orders o
                LEFT JOIN clients c ON o.client_id = c.id
                LEFT JOIN order_items oi ON o.id = oi.order_id
                WHERE 1=1
            `;
            const params = [];
            
            if (status && status !== 'all') {
                query += ` AND o.status = ?`;
                params.push(status);
            }
            
            if (search) {
                query += ` AND (o.order_number LIKE ? OR c.name LIKE ? OR c.email LIKE ?)`;
                const searchTerm = `%${search}%`;
                params.push(searchTerm, searchTerm, searchTerm);
            }
            
            query += ` GROUP BY o.id ORDER BY o.created_at DESC LIMIT ? OFFSET ?`;
            params.push(limit, offset);
            
            const [orders] = await pool.query(query, params);
            
            // Buscar itens para cada pedido
            for (const order of orders) {
                const [items] = await pool.query(`
                    SELECT * FROM order_items 
                    WHERE order_id = ?
                `, [order.id]);
                order.items = items;
            }
            
            // Contar total
            let countQuery = `SELECT COUNT(*) as total FROM orders o WHERE 1=1`;
            const countParams = [];
            
            if (status && status !== 'all') {
                countQuery += ` AND o.status = ?`;
                countParams.push(status);
            }
            
            if (search) {
                countQuery += ` AND (o.order_number LIKE ? OR o.client_id IN (SELECT id FROM clients WHERE name LIKE ? OR email LIKE ?))`;
                const searchTerm = `%${search}%`;
                countParams.push(searchTerm, searchTerm, searchTerm);
            }
            
            const [countResult] = await pool.query(countQuery, countParams);
            
            return {
                orders,
                total: countResult[0].total,
                page,
                limit,
                totalPages: Math.ceil(countResult[0].total / limit)
            };
        } catch (error) {
            console.error('Erro em getAllOrders:', error);
            throw error;
        }
    }
    
    static async getById(orderId) {
        const [orders] = await pool.query(`
            SELECT o.*, 
                   c.name as client_name,
                   c.email as client_email,
                   c.cpf as client_cpf,
                   c.phone as client_phone,
                   c.address as client_address,
                   c.city as client_city,
                   c.state as client_state,
                   c.zip_code as client_zip
            FROM orders o
            LEFT JOIN clients c ON o.client_id = c.id
            WHERE o.id = ?
        `, [orderId]);
        
        if (orders.length === 0) return null;
        
        const order = orders[0];
        const [items] = await pool.query(`
            SELECT * FROM order_items 
            WHERE order_id = ?
            ORDER BY id
        `, [orderId]);
        
        order.items = items;
        
        return order;
    }
    
    static async updateStatus(orderId, status, notes = null) {
        const [result] = await pool.query(
            'UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?',
            [status, orderId]
        );
        
        if (notes) {
            await pool.query(
                'INSERT INTO order_status_history (order_id, status, notes) VALUES (?, ?, ?)',
                [orderId, status, notes]
            );
        }
        
        return result.affectedRows;
    }
    
    static async getStats() {
        const [totalOrders] = await pool.query(`
            SELECT COUNT(*) as total, 
                   COALESCE(SUM(total), 0) as total_value
            FROM orders
        `);
        
        const [pendingOrders] = await pool.query(`
            SELECT COUNT(*) as total, 
                   COALESCE(SUM(total), 0) as total_value
            FROM orders
            WHERE status = 'pending'
        `);
        
        const [processingOrders] = await pool.query(`
            SELECT COUNT(*) as total, 
                   COALESCE(SUM(total), 0) as total_value
            FROM orders
            WHERE status = 'processing'
        `);
        
        const [shippedOrders] = await pool.query(`
            SELECT COUNT(*) as total, 
                   COALESCE(SUM(total), 0) as total_value
            FROM orders
            WHERE status = 'shipped'
        `);
        
        const [deliveredOrders] = await pool.query(`
            SELECT COUNT(*) as total, 
                   COALESCE(SUM(total), 0) as total_value
            FROM orders
            WHERE status = 'delivered'
        `);
        
        const [cancelledOrders] = await pool.query(`
            SELECT COUNT(*) as total, 
                   COALESCE(SUM(total), 0) as total_value
            FROM orders
            WHERE status = 'cancelled'
        `);
        
        const [monthlySales] = await pool.query(`
            SELECT DATE_FORMAT(created_at, '%Y-%m') as month,
                   COUNT(*) as total,
                   COALESCE(SUM(total), 0) as total_value
            FROM orders
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
            GROUP BY DATE_FORMAT(created_at, '%Y-%m')
            ORDER BY month DESC
        `);
        
        return {
            total: totalOrders[0],
            pending: pendingOrders[0],
            processing: processingOrders[0],
            shipped: shippedOrders[0],
            delivered: deliveredOrders[0],
            cancelled: cancelledOrders[0],
            monthlySales
        };
    }
}

module.exports = Order;