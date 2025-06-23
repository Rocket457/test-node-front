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
}

module.exports = new ProductService();
