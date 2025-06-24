import auth from '../utils/auth.js';
import favoritesService from '../utils/favorites.js';

class Header {
    constructor() {
        this.container = document.getElementById('header-container');
    }

    async render() {
        if (!this.container) return;

        const user = auth.getUser();
        const favoritesCount = favoritesService.getFavoritesCount();

        this.container.innerHTML = `
            <header class="bg-white shadow-sm border-b border-gray-200 mb-6">
                <div class="max-w-4xl mx-auto px-4 py-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-6">
                            <h1 class="text-xl font-semibold text-gray-900">
                                <a href="/products.html" class="hover:text-indigo-600">Loja Online</a>
                            </h1>
                            <nav class="hidden md:flex space-x-6">
                                <a href="/products.html" class="text-gray-600 hover:text-indigo-600">Produtos</a>
                                <a href="/favorites.html" class="text-gray-600 hover:text-indigo-600 relative">
                                    Favoritos
                                    ${favoritesCount > 0 ? `<span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">${favoritesCount}</span>` : ''}
                                </a>
                            </nav>
                        </div>
                        <div class="flex items-center space-x-4">
                            ${user ? `
                                <span class="text-sm text-gray-600">Olá, ${user.name || user.email}</span>
                                <button id="logoutBtn" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm">
                                    Sair
                                </button>
                            ` : `
                                <a href="/index.html" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm">
                                    Entrar
                                </a>
                            `}
                        </div>
                    </div>
                </div>
            </header>
        `;

        // Adicionar event listener para logout
        const logoutBtn = this.container.querySelector('#logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => auth.logout());
        }
    }
}

export default Header; 