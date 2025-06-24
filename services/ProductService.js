const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const DB_FILE = "database/products.json";

const adapter = new FileSync(DB_FILE);
const db = low(adapter);

db.defaults({ products: [] }).write();

/**
 * Classe de serviço para manipular operações relacionadas a produtos.
 * Encapsula a lógica de acesso aos dados.
 */
class ProductService {
    /**
     * @returns {Array} Uma lista de todos os produtos.
     */
    getAllProducts() {
        return db.get("products").value();
    }

    /**
     * Retorna um produto específico pelo seu ID.
     * @param {string} id O ID do produto a ser buscado.
     * @returns {Object|undefined} O objeto do produto se encontrado, ou undefined caso contrário.
     */
    getProductById(id) {
        return db.get("products").find({ id: id }).value();
    }

    /**
     * Atualiza um produto existente.
     * @param {string} id O ID do produto a ser atualizado.
     * @param {Object} productData Os novos dados do produto.
     * @returns {Object} O produto atualizado ou null se não encontrado.
     */
    updateProduct(id, productData) {
        const product = this.getProductById(id);
        if (!product) {
            return null;
        }

        const updatedProduct = { ...product, ...productData };
        db.get("products").find({ id: id }).assign(updatedProduct).write();
        return updatedProduct;
    }

    /**
     * Exclui um produto pelo seu ID.
     * @param {string} id O ID do produto a ser excluído.
     * @returns {boolean} true se o produto foi excluído, false se não encontrado.
     */
    deleteProduct(id) {
        const product = this.getProductById(id);
        if (!product) {
            return false;
        }

        db.get("products").remove({ id: id }).write();
        return true;
    }
}

module.exports = new ProductService();
