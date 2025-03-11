const { json } = require('body-parser');
const AdminService = require('../services/AdminService');

module.exports = {
    cadastrarAdmin: async (req, res) => {
        let json = { error: "", result: {} };

        let { email_admin, nome_admin } = req.body;

        if (email_admin && nome_admin) {
            try {
                let admin = await AdminService.cadastrarAdmin(email_admin, nome_admin);
                json.result = admin;

                return res.status(201).json(json);
            } catch (error) {
                json.error = 'Erro ao cadastrar';
                return res.status(400).json(json);
            }
        } else {
            json.error = 'Campos não enviados.'
        }
    },
    loginAdmin: async (req, res) => {
        try {
            const { email_admin } = req.body;

            const result = await AdminService.loginAdmin(email_admin);;

            if (!result.success) {
                return res.status(400).json({ error: result.message });
            }
            return res.status(200).json({
                success: true,
                admin: result.admin,
                token: result.token,
            });
        } catch (error) {
            console.error('Erro no login: ', error);
            return res.status(500), json({ message: 'Erro interno do servidor.' });
        }
    },
    getAdminPorEmail: async (req, res) => {
        let json = { error: '', result: [] };

        let emailAdmin = req.params.email_admin;

        if (emailAdmin) {
            try {
                let admin = await AdminService.getAdminPorEmail(emailAdmin);

                if (admin.length > 0) {
                    json.result = admin[0];
                } else {
                    json.error = 'admin não encontrado.'
                }
            } catch (error) {
                json.error = 'Erro ao buscar usuario por email.' + error.message;
            }
        } else {
            json.error = 'Não existe admin com esse email.';
        }
        res.json(json);
    }
}