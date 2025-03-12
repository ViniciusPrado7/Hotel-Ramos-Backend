const { json } = require('body-parser');
const QuartosService = require('../services/QuartosService');

module.exports = {
    ReservaQuarto: async (req, res) => {
        let json = { error: "", result: {} };

        let id_quarto = req.params.id_quarto;
        let { email_user } = req.body;

        if (email_user && id_quarto) {
            try {
                await QuartosService.ReservaQuarto(email_user, id_quarto );
                json.result = 'Quarto reservado com sucesso';

                return res.status(201).json(json);
            } catch (error) {
                json.error = 'Erro ao cadastrar';
                return res.status(400).json(json);
            }
        } else {
            json.error = 'Campos não enviados.'
        }
    },

    getTodosQuartos: async (req, res) => {
        let json = { error: '', result: [] };

        try {
            let quartos = await QuartosService.getTodosQuartos();
            if (quartos.length > 0) {
                json.result = quartos;
            } else {
                json.error = 'Não existem quartos'
            }
        } catch (error) {
            json.error = 'Erro ao buscar quartos: ' + error.message;
        }
        res.json(json);
    },
    getQuartoPorID: async (req, res) => {
        let json = { error: '', result: [] };

        let idQuarto = req.params.id_quarto;

        if (idQuarto) {
            try {
                let quarto = await QuartosService.getQuartoPorID(idQuarto);

                if (quarto.length > 0) {
                    json.result = quarto[0];
                } else {
                    json.error = 'Quarto não encontrado';
                }
            } catch (error) {
                json.error = 'Erro ao buscar quarto por id.' + error.message;
            }
        } else {
            json.error = 'Não existe quarto com este ID.';
        }
        res.json(json);
    }
}