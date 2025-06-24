const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

// Rota de login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ 
            error: 'MISSING_CREDENTIALS', 
            message: 'Email e senha são obrigatórios.' 
        });
    }
    
    const result = UserService.validateUser(email, password);
    
    if (result.success) {
        return res.json(result.user);
    } else {
        const statusCode = result.error === 'USER_NOT_FOUND' ? 404 : 401;
        return res.status(statusCode).json({ 
            error: result.error, 
            message: result.message 
        });
    }
});

// Rota de cadastro
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ 
            error: 'MISSING_FIELDS', 
            message: 'Nome, email e senha são obrigatórios.' 
        });
    }
    
    const result = UserService.createUser({ name, email, password });
    
    if (result.success) {
        return res.status(201).json(result.user);
    } else {
        return res.status(400).json({ 
            error: result.error, 
            message: result.message 
        });
    }
});

module.exports = router; 