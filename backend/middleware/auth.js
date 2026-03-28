const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rcp_tecnologia_secret_2024');
        req.user = decoded;
        console.log('Usuário autenticado:', req.user);
        next();
    } catch (error) {
        console.error('Token inválido:', error.message);
        return res.status(401).json({ error: 'Token inválido' });
    }
};

const adminMiddleware = (req, res, next) => {
    console.log('Verificando admin. Role do usuário:', req.user?.role);
    
    if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
        return res.status(403).json({ error: 'Acesso negado. Área administrativa.' });
    }
    next();
};

const superAdminMiddleware = (req, res, next) => {
    console.log('Verificando super admin. Role do usuário:', req.user?.role);
    
    if (req.user.role !== 'super_admin') {
        return res.status(403).json({ error: 'Acesso negado. Apenas super administradores.' });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware, superAdminMiddleware };