const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'rcp_tecnologia',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Banco de dados conectado com sucesso!');
        
        // Testar query
        const [tables] = await connection.query('SHOW TABLES');
        console.log('📊 Tabelas encontradas:', tables.length);
        
        // Testar produtos
        const [products] = await connection.query('SELECT COUNT(*) as total FROM products WHERE active = TRUE');
        console.log('📦 Produtos ativos:', products[0].total);
        
        connection.release();
    } catch (error) {
        console.error('❌ Erro ao conectar ao banco de dados:', error.message);
    }
};

testConnection();

module.exports = pool;