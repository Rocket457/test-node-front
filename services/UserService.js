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
        if (user && user.password === password) {
            // Não retorna a senha
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }
}

module.exports = UserService; 