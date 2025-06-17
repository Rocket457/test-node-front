const express = require("express");
const path = require("path");

const productRoutes = require("./routes/productRoutes");

const port = 3000;
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "views")));

app.use("/api", productRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(
        `Para listar todos os produtos, acesse: http://localhost:${port}/api/products`
    );
    console.log(
        `Para buscar um produto por ID (exemplo 'prod001'), acesse: http://localhost:${port}/api/products/prod001`
    );
});
