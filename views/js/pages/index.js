import { authAPI } from '../utils/api.js';
import auth from '../utils/auth.js';

class LoginPage {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.errorMsg = document.getElementById('errorMsg');
        this.init();
    }

    init() {
        // Se já estiver logado, redireciona
        if (auth.checkAuth()) {
            window.location.href = '/products.html';
            return;
        }

        this.form.addEventListener('submit', this.handleLogin.bind(this));
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        this.hideError();
        
        try {
            const user = await authAPI.login({ email, password });
            auth.setUser(user);
            window.location.href = '/products.html';
        } catch (error) {
            let errorMessage = 'Erro ao fazer login';
            
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

    showError(message) {
        this.errorMsg.textContent = message;
        this.errorMsg.classList.remove('hidden');
    }

    hideError() {
        this.errorMsg.classList.add('hidden');
    }
}

// Inicializar a página quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new LoginPage();
}); 