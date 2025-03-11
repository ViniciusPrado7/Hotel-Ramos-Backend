const { json } = require('body-parser');
const UsersService = require('../services/UsersService');

module.exports = {
    cadastrarUsers: async (req, res) => {
        let json = { error: "", result: {}};

        let { email_user, nome_user} = req.body;

        if(email_user && nome_user) {
            try {
                let user = await UsersService.cadastrarUsers(email_user, nome_user);
            json.result = user;

            return res.status(201).json(json);
            } catch (error) {
                json.error = 'Erro ao cadastrar';
                return res.status(400).json(json);
            }
        } else {
            json.error = 'Campos não enviados.'
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email_user} = req.body;

            const result = await UsersService.loginUser(email_user);;

            if(!result.success) {
                return res.status(400).json({error: result.message});
            }
            return res.status(200).json({
                success: true,
                user: result.user,
                token: result.token,
            });
        } catch (error) {
            console.error('Erro no login: ', error);
            return res.status(500),json({message: 'Erro interno do servidor.'});
        }
    },
    getUserPorEmail: async (req, res) => {
        let json = { error: '', result: [] };

        let emailUser = req.params.email_user;

        if (emailUser) {
            try {
                let user = await UsersService.getUserPorEmail(emailUser);

                if (user.length > 0) {
                    json.result = user[0];
                } else {
                    json.error = 'User não encontrado.'
                }
            } catch (error) {
                json.error = 'Erro ao buscar usuario por email.' + error.message;
            }
        } else {
            json.error = 'Não existe user com esse email.';
        }
        res.json(json);
    }
}