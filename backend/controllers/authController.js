const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Client = require('../models/Client');

const generateToken = (user, role) => {
    console.log('Gerando token para:', user.email, 'com role:', role);
    return jwt.sign(
        { id: user.id, email: user.email, role: role },
        process.env.JWT_SECRET || 'rcp_tecnologia_secret_2024',
        { expiresIn: '7d' }
    );
};

exports.login = async (req, res) => {
    try {
        const { email, password, role = 'client' } = req.body;
        
        console.log('=== LOGIN ATTEMPT ===');
        console.log('Email:', email);
        console.log('Role solicitado:', role);
        
        let user;
        if (role === 'admin') {
            user = await Admin.findByEmail(email);
            console.log('Admin encontrado:', user ? 'Sim' : 'Não');
            if (user) {
                console.log('Role no banco:', user.role);
            }
        } else {
            user = await Client.findByEmail(email);
            console.log('Cliente encontrado:', user ? 'Sim' : 'Não');
        }
        
        if (!user) {
            console.log('Usuário não encontrado');
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }
        
        const isValidPassword = role === 'admin' 
            ? await Admin.verifyPassword(password, user.password)
            : await Client.verifyPassword(password, user.password);
        
        console.log('Senha válida?', isValidPassword);
        
        if (!isValidPassword) {
            console.log('Senha incorreta');
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }
        
        // IMPORTANTE: Usar o role do banco de dados, não o role passado no login
        const userRole = role === 'admin' ? user.role : 'client';
        console.log('Role que será usado no token:', userRole);
        
        const token = generateToken(user, userRole);
        
        res.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: userRole
            }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, cpf, phone, address, city, state, zip_code } = req.body;
        
        const existingClient = await Client.findByEmail(email);
        if (existingClient) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        
        const clientId = await Client.create({
            name, email, password, cpf, phone, address, city, state, zip_code
        });
        
        const user = await Client.findById(clientId);
        const token = generateToken(user, 'client');
        
        res.status(201).json({
            message: 'Cliente cadastrado com sucesso',
            token,
            user
        });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};