import { authAPI } from '../utils/api.js';
import auth from '../utils/auth.js';

class RegisterPage {
    constructor() {
        this.form = document.getElementById('registerForm');
        this.errorMsg = document.getElementById('errorMsg');
        this.successMsg = document.getElementById('successMsg');
        this.init();
    }

    init() {
        // Se já estiver logado, redireciona
        if (auth.checkAuth()) {
            window.location.href = '/products.html';
            return;
        }

        this.form.addEventListener('submit', this.handleRegister.bind(this));
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        this.hideMessages();
        
        // Validações básicas
        if (!name || !email || !password || !confirmPassword) {
            this.showError('Todos os campos são obrigatórios.');
            return;
        }

        if (password !== confirmPassword) {
            this.showError('As senhas não coincidem.');
            return;
        }

        if (password.length < 6) {
            this.showError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showError('Por favor, insira um email válido.');
            return;
        }
        
        try {
            const user = await authAPI.register({ name, email, password });
            this.showSuccess('Conta criada com sucesso! Redirecionando...');
            
            // Fazer login automático após cadastro
            setTimeout(async () => {
                try {
                    const loginUser = await authAPI.login({ email, password });
                    auth.setUser(loginUser);
                    window.location.href = '/products.html';
                } catch (loginError) {
                    // Se o login automático falhar, redireciona para login
                    window.location.href = '/index.html';
                }
            }, 2000);
            
        } catch (error) {
            let errorMessage = 'Erro ao criar conta';
            
            // Verifica se é um erro de resposta da API
            if (error.response) {
                const responseData = await error.response.json();
                errorMessage = responseData.message || errorMessage;
            } else if (error.message) {
                // Para erros de rede ou outros
                if (error.message.includes('Failed to fetch')) {
                    errorMessage = 'Erro de conexão. Verifique sua internet.';
                } else {
                    errorMessage = error.message;
                }
            }
            
            this.showError(errorMessage);
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(message) {
        this.errorMsg.textContent = message;
        this.errorMsg.classList.remove('hidden');
        this.successMsg.classList.add('hidden');
    }

    showSuccess(message) {
        this.successMsg.textContent = message;
        this.successMsg.classList.remove('hidden');
        this.errorMsg.classList.add('hidden');
    }

    hideMessages() {
        this.errorMsg.classList.add('hidden');
        this.successMsg.classList.add('hidden');
    }
}

// Inicializar a página quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new RegisterPage();
}); 