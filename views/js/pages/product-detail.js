import { productAPI } from '../utils/api.js';
import auth from '../utils/auth.js';
import favoritesService from '../utils/favorites.js';
import Header from '../components/Header.js';
import { utils } from '../config.js';

class ProductDetailPage {
    constructor() {
        this.productDetail = document.getElementById('product-detail');
        this.favoriteBtnContainer = null;
        this.product = null;
        this.init();
    }

    init() {
        // Verificar autenticação
        if (!auth.requireAuth()) return;

        // Carregar header
        this.loadHeader();
        
        // Carregar detalhes do produto
        this.loadProductDetail();
    }

    // Método para obter a role do usuário logado
    getUserRole() {
        const user = auth.getUser();
        return user ? user.role : null;
    }

    // Método para verificar se o usuário é admin
    isAdmin() {
        return this.getUserRole() === 'admin';
    }

    // Método para verificar se o usuário é viewer
    isViewer() {
        return this.getUserRole() === 'viewer';
    }

    async loadHeader() {
        const header = new Header();
        await header.render();
    }

    async loadProductDetail() {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');

        if (!productId) {
            this.showError('ID do produto não informado.');
            return;
        }

        try {
            this.product = await productAPI.getById(productId);
            this.renderProductDetail();
            this.loadFavoriteButton();
        } catch (error) {
            this.showError('Produto não encontrado.');
        }
    }

    renderProductDetail() {
        const userRole = this.getUserRole();
        const isAdmin = this.isAdmin();
        
        this.productDetail.innerHTML = `
            <div class="mb-6">
                <a href="/products.html" class="text-blue-600 hover:underline mb-4 inline-block">
                    &larr; Voltar para a lista
                </a>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-8 max-w-6xl mx-auto">
                <div class="flex justify-between items-start mb-6">
                    <h1 class="text-3xl font-bold text-gray-900">${this.product.name}</h1>
                    <div id="favorite-btn-container"></div>
                </div>
                
                ${isAdmin ? `
                    <div class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p class="text-blue-700 text-sm">
                            <strong>Modo Admin:</strong> Você tem permissões de administrador para este produto.
                        </p>
                    </div>
                ` : ''}
                
                <p class="text-gray-700 text-lg mb-6">${this.product.description}</p>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div class="space-y-4">
                        <div class="flex items-center">
                            <span class="font-semibold text-gray-700 w-24">Marca:</span>
                            <span class="text-gray-600">${this.product.brand}</span>
                        </div>
                        <div class="flex items-center">
                            <span class="font-semibold text-gray-700 w-24">Cor:</span>
                            <span class="text-gray-600">${this.product.color}</span>
                        </div>
                        <div class="flex items-center">
                            <span class="font-semibold text-gray-700 w-24">Peso:</span>
                            <span class="text-gray-600">${utils.formatWeight(this.product.weight)}</span>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="text-center">
                            <div class="text-4xl font-bold text-indigo-600 mb-2">
                                ${utils.formatPrice(this.product.price)}
                            </div>
                            <div class="text-lg font-semibold ${utils.getStockStatus(this.product.stock)}">
                                ${utils.getStockText(this.product.stock)}
                            </div>
                        </div>
                        
                        ${this.product.stock > 0 ? `
                            <button class="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
                                Adicionar ao Carrinho <!-- Por enquanto não faz nada -->
                            </button>
                        ` : `
                            <button class="w-full bg-gray-400 text-white py-3 px-6 rounded-lg cursor-not-allowed" disabled>
                                Produto Indisponível
                            </button>
                        `}
                        
                        ${isAdmin ? `
                            <div class="space-y-3">
                                <button id="edit-product-btn" class="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors">
                                    <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                    Editar Produto
                                </button>
                                <button id="delete-product-btn" class="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors">
                                    <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                    Excluir Produto
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="border-t border-gray-200 pt-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Especificações Técnicas</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div class="bg-gray-50 p-4 rounded">
                            <span class="font-medium text-gray-700">Código do Produto:</span>
                            <span class="text-gray-600 ml-2">${this.product.id}</span>
                        </div>
                        <div class="bg-gray-50 p-4 rounded">
                            <span class="font-medium text-gray-700">Categoria:</span>
                            <span class="text-gray-600 ml-2">Eletrônicos</span>
                        </div>
                        ${isAdmin ? `
                            <div class="bg-gray-50 p-4 rounded">
                                <span class="font-medium text-gray-700">Role do Usuário:</span>
                                <span class="text-gray-600 ml-2">${userRole}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;

        this.favoriteBtnContainer = document.getElementById('favorite-btn-container');
        
        // Adicionar event listeners para os botões de admin
        if (isAdmin) {
            this.addAdminEventListeners();
        }
    }

    addAdminEventListeners() {
        const editBtn = document.getElementById('edit-product-btn');
        const deleteBtn = document.getElementById('delete-product-btn');
        
        if (editBtn) {
            editBtn.addEventListener('click', () => this.editProduct());
        }
        
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => this.deleteProduct());
        }
    }

    async editProduct() {
        // Criar modal de edição
        const modal = this.createEditModal();
        document.body.appendChild(modal);
        
        // Mostrar modal
        modal.classList.remove('hidden');
    }

    createEditModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h2 class="text-xl font-bold mb-4">Editar Produto</h2>
                <form id="edit-product-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                        <input type="text" id="edit-name" value="${this.product.name}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                        <textarea id="edit-description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required>${this.product.description}</textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                        <input type="text" id="edit-brand" value="${this.product.brand}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Cor</label>
                        <input type="text" id="edit-color" value="${this.product.color}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                        <input type="number" id="edit-price" value="${this.product.price}" step="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Estoque</label>
                        <input type="number" id="edit-stock" value="${this.product.stock}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Peso (g)</label>
                        <input type="number" id="edit-weight" value="${this.product.weight}" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                    </div>
                    <div class="flex space-x-3 pt-4">
                        <button type="submit" class="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                            Salvar
                        </button>
                        <button type="button" id="cancel-edit" class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        `;

        // Event listeners
        const form = modal.querySelector('#edit-product-form');
        const cancelBtn = modal.querySelector('#cancel-edit');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.saveProductChanges(modal);
        });
        
        cancelBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        // Fechar modal ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        return modal;
    }

    async saveProductChanges(modal) {
        try {
            const formData = {
                name: document.getElementById('edit-name').value,
                description: document.getElementById('edit-description').value,
                brand: document.getElementById('edit-brand').value,
                color: document.getElementById('edit-color').value,
                price: parseFloat(document.getElementById('edit-price').value),
                stock: parseInt(document.getElementById('edit-stock').value),
                weight: parseFloat(document.getElementById('edit-weight').value)
            };

            const updatedProduct = await productAPI.update(this.product.id, formData);
            
            if (updatedProduct) {
                this.product = updatedProduct;
                this.renderProductDetail();
                this.loadFavoriteButton();
                modal.remove();
                
                // Mostrar mensagem de sucesso
                this.showSuccessMessage('Produto atualizado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            this.showErrorMessage('Erro ao atualizar produto. Tente novamente.');
        }
    }

    async deleteProduct() {
        if (!confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) {
            return;
        }

        try {
            await productAPI.delete(this.product.id);
            
            // Mostrar mensagem de sucesso
            this.showSuccessMessage('Produto excluído com sucesso!');
            
            // Redirecionar para a lista de produtos após um breve delay
            setTimeout(() => {
                window.location.href = '/products.html';
            }, 1500);
            
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            this.showErrorMessage('Erro ao excluir produto. Tente novamente.');
        }
    }

    showSuccessMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    showErrorMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    loadFavoriteButton() {
        const isFavorite = favoritesService.isFavorite(this.product.id);
        const button = this.createFavoriteButton(isFavorite);
        this.favoriteBtnContainer.appendChild(button);
    }

    createFavoriteButton(isFavorite) {
        const button = document.createElement('button');
        button.className = `favorite-btn p-3 rounded-full transition-colors ${
            isFavorite 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`;
        
        button.innerHTML = `
            <svg class="w-6 h-6" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
        `;

        button.addEventListener('click', () => this.toggleFavorite(button));
        
        return button;
    }

    toggleFavorite(button) {
        const isFavorite = favoritesService.toggleFavorite(this.product.id);
        
        // Atualizar aparência do botão
        if (isFavorite) {
            button.className = 'favorite-btn p-3 rounded-full transition-colors bg-red-500 text-white hover:bg-red-600';
            button.querySelector('svg').setAttribute('fill', 'currentColor');
        } else {
            button.className = 'favorite-btn p-3 rounded-full transition-colors bg-gray-200 text-gray-600 hover:bg-gray-300';
            button.querySelector('svg').setAttribute('fill', 'none');
        }

        // Atualizar header (contador de favoritos)
        this.updateHeader();
    }

    async updateHeader() {
        const header = new Header();
        await header.render();
    }

    showError(message) {
        this.productDetail.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <div class="text-red-600 text-lg font-semibold mb-2">Erro</div>
                <div class="text-red-500">${message}</div>
                <a href="/products.html" class="text-blue-600 hover:underline mt-4 inline-block">
                    Voltar para a lista de produtos
                </a>
            </div>
        `;
    }
}

// Inicializar a página quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ProductDetailPage();
}); 