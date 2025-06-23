class ProductCard {
    constructor(product) {
        this.product = product;
    }

    async render() {
        const res = await fetch('/components/ProductCard/ProductCard.html');
        let template = await res.text();
        template = template
            .replace(/{{name}}/g, this.product.name)
            .replace(/{{description}}/g, this.product.description)
            .replace(/{{brand}}/g, this.product.brand)
            .replace(/{{color}}/g, this.product.color)
            .replace(/{{weight}}/g, this.product.weight)
            .replace(/{{price}}/g, this.product.price.toFixed(2))
            .replace(/{{id}}/g, this.product.id)
            .replace(/{{stockClass}}/g, this.product.stock > 0 ? 'text-green-600' : 'text-red-600')
            .replace(/{{stockText}}/g, this.product.stock > 0 ? `Estoque: ${this.product.stock}` : 'Fora de Estoque');
        return template;
    }
} 