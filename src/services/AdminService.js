const db = require('../db');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

module.exports = {
    cadastrarAdmin: async (email_admin, nome_admin) => {
       const [existeEmail] = await db.query('SELECT * FROM admins WHERE email_admin = ?',[email_admin]);
       if(existeEmail.length > 0) {
            return 'E-mail ja está em uso.';
       } else {
            try {
                const [results] = await db.query('INSERT INTO admins (email_admin, nome_admin) VALUES (?, ?)', [email_admin, nome_admin]);
                return results;
            } catch (error) {
                throw error;
            }
       }
    },
    loginAdmin : async (email_admin) => {
        try {
            const [existeEmail] = await db.query('SELECT * FROM admins WHERE email_admin = ?',[email_admin]);

            if(existeEmail.length === 0) {
                return {success: false, message: 'E-mail não encontrado.'};
            }

            const admin = existeEmail[0];

            const token = jwt.sign({ email: admin.email_admin}, secretKey,{
                expiresIn: '1h',
            });

            return {success: true, message: 'Login bem-sucedido', token, admin};
        } catch (error) {
            console.error('Erro no login: ', error);
            return {success: false, message: 'Erro no servidor'};
        }
    },
    getAdminPorEmail: async (email_admin) => {
        try {
            const [results] = await db.query('SELECT * FROM admins WHERE email_admin = ? ', [email_admin]);
            return results;
        } catch (error) {
            throw error;
        }
    },

}