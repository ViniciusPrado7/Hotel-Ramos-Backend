const db = require('../db');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

module.exports = {
    cadastrarUsers: async (email_user, nome_user) => {
       const [existeEmail] = await db.query('SELECT * FROM users WHERE email_user = ?',[email_user]);
       if(existeEmail.length > 0) {
            return 'E-mail ja está em uso.';
       } else {
            try {
                const [results] = await db.query('INSERT INTO users (email_user, nome_user) VALUES (?, ?)', [email_user, nome_user]);
                return results;
            } catch (error) {
                throw error;
            }
       }
    },
    loginUser : async (email_user) => {
        try {
            const [existeEmail] = await db.query('SELECT * FROM users WHERE email_user = ?',[email_user]);

            if(existeEmail.length === 0) {
                return {success: false, message: 'E-mail não encontrado.'};
            }

            const user = existeEmail[0];

            const token = jwt.sign({ email: user.email_user}, secretKey,{
                expiresIn: '1h',
            });

            return {success: true, message: 'Login bem-sucedido', token, user};
        } catch (error) {
            console.error('Erro no login: ', error);
            return {success: false, message: 'Erro no servidor'};
        }
    },
    getUserPorEmail: async (email_user) => {
        try {
            const [results] = await db.query('SELECT * FROM users WHERE email_user = ? ', [email_user]);
            return results;
        } catch (error) {
            throw error;
        }
    },

}