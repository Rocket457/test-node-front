# 🧪 Teste Técnico – Desenvolvedor Node.js (Backend + Frontend Básico)

Este repositório contém o teste técnico para candidatos à vaga de desenvolvedor Full Stack com foco em \*\*Node.js (Express) e Frontend Básico (HTML/JavaScript/Tailwind CSS).

### 🎯 Objetivo

Implementar funcionalidades adicionais em uma aplicação Node.js existente. O desafio abrange desde a criação de um sistema de autenticação simples usando \*\*localStorage até a gestão de produtos e um sistema de favoritos do usuário, com foco em boas práticas, organização de código e legibilidade.

### 🧩 Tarefas

#### Backend (Node.js/Express)

-   Gerenciamento de Usuários:
    -   Você encontrará um arquivo users.json pré-existente com 5 usuários de exemplo (id, nome, email, senha, data de criação, role).
    -   Crie um serviço (services/UserService.js) para gerenciar a lógica de busca de usuários contra este JSON.
-   Autenticação API:
    -   Crie uma rota POST /api/login que valide as credenciais (email e senha) fornecidas pelo frontend contra o users.json usando o UserService.
    -   Em caso de sucesso, esta rota deve retornar as informações do usuário (sem a senha). Em caso de falha, deve retornar uma mensagem de erro.
-   Estrutura de Rotas:
    -   Observe a organização das rotas da API (/api/products e /api/products/:id) que estão devidamente encapsuladas em routes/productRoutes.js e utilizam o services/ProductService.js.

#### Frontend (HTML/JavaScript/Tailwind CSS)

-   Sistema de Login e Logout:
    -   Crie uma página de login (views/index.html).
    -   A sessão do usuário, após o login bem-sucedido, deve ser armazenada no `localStorage` .
    -   Restrições de Acesso: Implemente a lógica para impedir o acesso às páginas de listagem (products.html), detalhe (product-detail.html) e favoritos (favorites.html) se o usuário não estiver logado, redirecionando-o para a página de login.
    -   Botão de Logout: Adicione um botão "Sair" (Logout) em todas as telas protegidas (lista, detalhe, favoritos). Ao ser clicado, este botão deve:
        -   Limpar as informações da sessão do usuário no localStorage.
        -   Zerar a lista de produtos favoritos armazenados no navegador (localStorage).
        -   Redirecionar para a página de login (/).
-   Visualização de Detalhes do Produto:
    -   Crie uma página de detalhes de produto (views/product-detail.html) que exiba informações detalhadas de um único produto, buscando-o pela API (/api/products/:id). O ID do produto deve ser passado via parâmetro de URL (ex: product-detail.html?id=prod001).
    -   Na listagem de produtos (products.html), adicione um link em cada card de produto para sua respectiva página de detalhes.
    -   Na página de detalhes do produto, adicione um link visível que permita ao usuário retornar para a listagem geral de produtos.
-   Sistema de Favoritos:
    -   Na tela de detalhes do produto (product-detail.html), adicione um botão "Adicionar aos Favoritos".
    -   A funcionalidade do botão deve gerenciar uma lista de IDs de produtos favoritos no localStorage . O botão deve alternar seu texto (ex: "Remover dos Favoritos") e comportamento para adicionar ou remover o produto da lista de favoritos.
    -   Crie uma nova página (views/favorites.html) que exiba a lista de todos os produtos que o usuário logado favoritou. Os detalhes dos produtos devem ser buscados da API.

### ✅ Critérios de Avaliação

-   Clareza e Organização do Código: O código deve ser limpo, modularizado e de fácil entendimento, seguindo a estrutura de pastas proposta.
-   Boas Práticas de Desenvolvimento: Utilize `express.Router` para rotas, separe as preocupações (serviços, rotas, views) e siga padrões de projeto adequados.
-   Manipulação de Dados: Correta interação com o "banco de dados" JSON e utilização eficiente do `localStorage` para persistência de sessão e favoritos.
-   Lógica de Negócio: Implementação funcional e lógica precisa do sistema de login/logout e de favoritos.
-   Experiência do Usuário (Frontend): Navegação intuitiva, feedback visual claro (mensagens de erro/sucesso) e comportamento esperado dos elementos interativos.
-   Gerenciamento de Estado no Frontend: Uso adequado do localStorage para persistência de sessão e da lista de favoritos.
-   Commits Significativos: O histórico de commits deve ser claro e descritivo, refletindo o progresso das tarefas de forma incremental.
-   Legibilidade do Código: Utilize nomes de variáveis e funções claros e autoexplicativos. Adicione comentários onde necessário para explicar lógicas complexas ou decisões de design.

### 🛠️ Tecnologias e Versões

| Ferramenta       | Versão                    |
| ---------------- | ------------------------- |
| Node.js          | 16.x (definido em .nvmrc) |
| Express.js       | ^4.18.2                   |
| LowDB            | ^1.0.0                    |
| HTML, JavaScript | ES6+                      |
| Tailwind CSS     | 3.x (via CDN)             |

> Para facilitar sua pesquisa, sempre busque com a versão. Ex: "node 16 localstorage", "express static files", "javascript fetch api", "tailwind css button", etc.

### 🚀 Como rodar o projeto

1. Verifique a versão do Node.js: (Opcional, se usar NVM para gerenciar versões do Node)

    ```
    nvm use

    ```

2. Instale as dependências:

    ```
    npm install

    ```

3. Inicie o servidor:

    ```
    npm start

    ```

Após iniciar o servidor, acesse http://localhost:3000/ no seu navegador. Você será direcionado para a página de login.

### 📤 Entrega do Teste

1. Faça um fork deste repositório.
2. Faça as alterações e implementações diretamente no seu fork.
3. Garanta que seus commits sejam claros e descritivos, refletindo o progresso das tarefas.
4. Compartilhe o link do seu repositório **público** para avaliação.

Boa sorte! 🚀
