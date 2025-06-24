import { productAPI } from '../utils/api.js';
import auth from '../utils/auth.js';
import favoritesService from '../utils/favorites.js';
import Header from '../components/Header.js';
import { utils } from '../config.js';

class ProductsPage {
    constructor() {
        this.productList = document.getElementById('product-list');
        this.errorMessage = document.getElementById('error-message');
        this.errorText = document.getElementById('error-text');
        this.init();
    }

    init() {
        // Verificar autenticação
        if (!auth.requireAuth()) return;

        // Carregar header
        this.loadHeader();
        
        // Carregar produtos
        this.loadProducts();
    }

    async loadHeader() {
        const header = new Header();
        await header.render();
    }

    async loadProducts() {
        this.showLoading();
        this.hideError();

        try {
            const products = await productAPI.getAll();
            this.renderProducts(products);
        } catch (error) {
            this.showError(`Não foi possível carregar os produtos. ${error.message}`);
        }
    }

    showLoading() {
        this.productList.innerHTML = '<p class="text-gray-600 text-center col-span-full">Carregando produtos...</p>';
    }

    renderProducts(products) {
        if (products.length === 0) {
            this.productList.innerHTML = '<p class="text-gray-600 text-center col-span-full">Nenhum produto encontrado.</p>';
            return;
        }

        this.productList.innerHTML = '';
        
        products.forEach(product => {
            const card = this.createProductCard(product);
            this.productList.appendChild(card);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col justify-between';
        
        const isFavorite = favoritesService.isFavorite(product.id);
        
        card.innerHTML = `
            <h2 class="text-xl font-semibold text-gray-900 mb-2">${product.name}</h2>
            <p class="text-gray-600 mb-3 text-sm">${product.description}</p>
            <div class="flex flex-wrap text-sm text-gray-700 mb-2">
                <span class="mr-4"><strong>Marca:</strong> ${product.brand}</span>
                <span class="mr-4"><strong>Cor:</strong> ${product.color}</span>
                <span class="mr-4"><strong>Peso:</strong> ${utils.formatWeight(product.weight)}</span>
            </div>
            <div class="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <span class="text-2xl font-bold text-indigo-600">${utils.formatPrice(product.price)}</span>
                <span class="text-lg font-semibold ${utils.getStockStatus(product.stock)}">
                    ${utils.getStockText(product.stock)}
                </span>
            </div>
            <div class="flex justify-between items-center mt-4">
                <a href="/product-detail.html?id=${product.id}" class="text-blue-600 hover:underline">Ver detalhes</a>
                <button class="favorite-btn ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors" data-product-id="${product.id}">
                    <svg class="w-5 h-5" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                </button>
            </div>
        `;

        // Adicionar event listener para favoritos
        const favoriteBtn = card.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', () => this.toggleFavorite(product.id, favoriteBtn));

        return card;
    }

    toggleFavorite(productId, button) {
        const isFavorite = favoritesService.toggleFavorite(productId);
        
        // Atualizar aparência do botão
        const svg = button.querySelector('svg');
        if (isFavorite) {
            button.className = 'favorite-btn text-red-500 hover:text-red-500 transition-colors';
            svg.setAttribute('fill', 'currentColor');
        } else {
            button.className = 'favorite-btn text-gray-400 hover:text-red-500 transition-colors';
            svg.setAttribute('fill', 'none');
        }

        // Atualizar header (contador de favoritos)
        this.updateHeader();
    }

    async updateHeader() {
        const header = new Header();
        await header.render();
    }

    showError(message) {
        this.productList.innerHTML = '';
        this.errorText.textContent = message;
        this.errorMessage.classList.remove('hidden');
    }

    hideError() {
        this.errorMessage.classList.add('hidden');
    }
}

// Inicializar a página quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ProductsPage();
}); 