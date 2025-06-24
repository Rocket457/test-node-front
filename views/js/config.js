// Configurações da aplicação
export const config = {
    // URLs da API
    api: {
        baseURL: '',
        endpoints: {
            products: '/api/products',
            login: '/api/login',
            logout: '/api/logout'
        }
    },

    // Configurações de roteamento
    routes: {
        home: '/products.html',
        login: '/index.html',
        favorites: '/favorites.html',
        productDetail: '/product-detail.html'
    },

    // Configurações de UI
    ui: {
        loadingText: 'Carregando...',
        errorText: 'Erro ao carregar dados',
        emptyText: 'Nenhum item encontrado'
    },

    // Configurações de localStorage
    storage: {
        userKey: 'user',
        favoritesKey: 'favorites'
    }
};

// Utilitários globais
export const utils = {
    // Formatar preço
    formatPrice: (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    },

    // Formatar peso
    formatWeight: (weight) => {
        return `${weight} kg`;
    },

    // Verificar se tem estoque
    hasStock: (stock) => {
        return stock > 0;
    },

    // Obter status do estoque
    getStockStatus: (stock) => {
        return stock > 0 ? 'text-green-600' : 'text-red-600';
    },

    // Obter texto do estoque
    getStockText: (stock) => {
        return stock > 0 ? `Estoque: ${stock}` : 'Fora de Estoque';
    }
};

export default { config, utils }; 