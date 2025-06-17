const express = require("express");
const productService = require("../services/ProductService");

const router = express.Router();

router.get("/products", (req, res) => {
    try {
        const products = productService.getAllProducts();
        return res.json(products);
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        return res
            .status(500)
            .json({ message: "Erro interno do servidor ao listar produtos." });
    }
});

router.get("/products/:id", (req, res) => {
    try {
        const { id } = req.params;
        const product = productService.getProductById(id);

        if (product) {
            return res.json(product);
        } else {
            return res
                .status(404)
                .json({ message: `Produto com ID '${id}' não encontrado.` });
        }
    } catch (error) {
        console.error("Erro ao buscar produto por ID:", error);
        return res
            .status(500)
            .json({ message: "Erro interno do servidor ao buscar produto." });
    }
});

module.exports = router;
