const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../database/users.json');

class UserService {
    static getAllUsers() {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        const json = JSON.parse(data);
        return json.users;
    }

    static findByEmail(email) {
        const users = this.getAllUsers();
        return users.find(user => user.email === email);
    }

    static validateUser(email, password) {
        const user = this.findByEmail(email);
        
        if (!user) {
            return { error: 'USER_NOT_FOUND', message: 'Usuário não encontrado.' };
        }
        
        if (user.password !== password) {
            return { error: 'INVALID_PASSWORD', message: 'Senha incorreta.' };
        }
        
        // Login bem-sucedido - não retorna a senha
        const { password: userPassword, ...userWithoutPassword } = user;
        return { success: true, user: userWithoutPassword };
    }

    static createUser({ name, email, password }) {
        // Verificar se o email já existe
        const existingUser = this.findByEmail(email);
        if (existingUser) {
            return { error: 'EMAIL_EXISTS', message: 'Este email já está cadastrado.' };
        }

        // Gerar ID único
        const users = this.getAllUsers();
        const lastUser = users[users.length - 1];
        const lastId = lastUser ? parseInt(lastUser.id.replace('user', '')) : 0;
        const newId = `user${String(lastId + 1).padStart(3, '0')}`;

        // Criar novo usuário
        const newUser = {
            id: newId,
            name,
            email,
            password,
            created_at: new Date().toISOString(),
            role: 'viewer' // Usuários novos começam como viewers TODO: criar tela para poder dar permissao de admin
        };

        // Adicionar à lista de usuários
        users.push(newUser);

        // Salvar no arquivo
        const data = { users };
        fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 4));

        // Retornar usuário sem senha
        const { password: _, ...userWithoutPassword } = newUser;
        return { success: true, user: userWithoutPassword };
    }
}

module.exports = UserService; 