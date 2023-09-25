const db = require('../config/db');

class User {
    constructor({username, name, password}) {
        this.username = username;
        this.name = name;
        this.password = password;
    }

    async save() {
        const query = `INSERT INTO USER 
        (username, name, password) VALUES (?, ?, ?)`;

        const [newUser, _] = await db.execute(query, [this.username, this.name, this.password]);
        return newUser;
    }

    static async findByUsername(username) {
        const query = 'SELECT * FROM USER WHERE username = ?';
        
        const [user, _] = await db.execute(query, [username]);
        console.log(user);
        return user[0];
    }
}

module.exports = User;