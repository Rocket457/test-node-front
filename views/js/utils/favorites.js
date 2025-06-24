class FavoritesService {
    constructor() {
        this.favorites = this.getFavorites();
    }

    getFavorites() {
        const favoritesStr = localStorage.getItem('favorites');
        return favoritesStr ? JSON.parse(favoritesStr) : [];
    }

    addFavorite(productId) {
        if (!this.favorites.includes(productId)) {
            this.favorites.push(productId);
            this.saveFavorites();
        }
    }

    removeFavorite(productId) {
        this.favorites = this.favorites.filter(id => id !== productId);
        this.saveFavorites();
    }

    toggleFavorite(productId) {
        if (this.isFavorite(productId)) {
            this.removeFavorite(productId);
        } else {
            this.addFavorite(productId);
        }
        return this.isFavorite(productId);
    }

    isFavorite(productId) {
        return this.favorites.includes(productId);
    }

    getFavoritesCount() {
        return this.favorites.length;
    }

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    clearFavorites() {
        this.favorites = [];
        this.saveFavorites();
    }
}

// Instância global do serviço de favoritos
const favoritesService = new FavoritesService();

export default favoritesService; 