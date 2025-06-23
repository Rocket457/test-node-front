const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

// Rota de login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
    const user = UserService.validateUser(email, password);
    if (user) {
        return res.json(user);
    } else {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
});

module.exports = router; 