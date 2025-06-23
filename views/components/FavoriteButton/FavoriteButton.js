class FavoriteButton {
    constructor(isFavorite, onClick) {
        this.isFavorite = isFavorite;
        this.onClick = onClick;
    }

    async render() {
        const res = await fetch('/components/FavoriteButton/FavoriteButton.html');
        let template = await res.text();
        template = template
            .replace(/{{btnText}}/g, this.isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos')
            .replace(/{{btnClass}}/g, this.isFavorite ? 'bg-gray-400 hover:bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700');
        const wrapper = document.createElement('div');
        wrapper.innerHTML = template;
        const btn = wrapper.firstElementChild;
        btn.onclick = this.onClick;
        return btn;
    }
} 