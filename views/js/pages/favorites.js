import { productAPI } from '../utils/api.js';
import auth from '../utils/auth.js';
import favoritesService from '../utils/favorites.js';
import Header from '../components/Header.js';
import { utils } from '../config.js';

class FavoritesPage {
    constructor() {
        this.favoritesList = document.getElementById('favorites-list');
        this.emptyMsg = document.getElementById('emptyMsg');
        this.init();
    }

    init() {
        // Verificar autenticação
        if (!auth.requireAuth()) return;

        // Carregar header
        this.loadHeader();
        
        // Carregar favoritos
        this.loadFavorites();
    }

    async loadHeader() {
        const header = new Header();
        await header.render();
    }

    async loadFavorites() {
        const favorites = favoritesService.getFavorites();
        
        if (favorites.length === 0) {
            this.showEmptyMessage();
            return;
        }

        this.hideEmptyMessage();
        await this.renderFavorites(favorites);
    }

    async renderFavorites(favorites) {
        this.favoritesList.innerHTML = '';
        
        for (const productId of favorites) {
            try {
                const product = await productAPI.getById(productId);
                const card = this.createFavoriteCard(product);
                this.favoritesList.appendChild(card);
            } catch (error) {
                console.warn(`Produto ${productId} não encontrado, removendo dos favoritos`);
                favoritesService.removeFavorite(productId);
            }
        }

        if (favoritesService.getFavoritesCount() === 0) {
            this.showEmptyMessage();
        }
    }

    createFavoriteCard(product) {
        const card = document.createElement('div');
        card.className = 'bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col justify-between';
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h2 class="text-xl font-semibold text-gray-900">${product.name}</h2>
                <button class="remove-favorite-btn text-red-500 hover:text-red-700" data-product-id="${product.id}">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
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
                <span class="text-xs text-gray-500">Adicionado aos favoritos</span>
            </div>
        `;

        const removeBtn = card.querySelector('.remove-favorite-btn');
        removeBtn.addEventListener('click', () => this.removeFavorite(product.id, card));

        return card;
    }

    removeFavorite(productId, cardElement) {
        favoritesService.removeFavorite(productId);
        cardElement.remove();
        
        this.updateHeader();
        
        if (favoritesService.getFavoritesCount() === 0) {
            this.showEmptyMessage();
        }
    }

    async updateHeader() {
        const header = new Header();
        await header.render();
    }

    showEmptyMessage() {
        this.favoritesList.innerHTML = '';
        this.emptyMsg.classList.remove('hidden');
    }

    hideEmptyMessage() {
        this.emptyMsg.classList.add('hidden');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new FavoritesPage();
}); 