class AuthService {
    constructor() {
        this.user = this.getUser();
        this.isAuthenticated = !!this.user;
    }

    getUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    setUser(user) {
        this.user = user;
        this.isAuthenticated = !!user;
        localStorage.setItem('user', JSON.stringify(user));
    }

    logout() {
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('user');
        localStorage.removeItem('favorites');
        window.location.href = '/index.html';
    }

    requireAuth() {
        if (!this.isAuthenticated) {
            window.location.href = '/index.html';
            return false;
        }
        return true;
    }

    // Método para verificar se o usuário está logado sem redirecionar
    checkAuth() {
        return this.isAuthenticated;
    }
}

// Instância global do serviço de autenticação
const auth = new AuthService();

export default auth;

 