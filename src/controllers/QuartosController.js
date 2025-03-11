const QuartosService = require('../services/QuartosService');

module.exports = {
    getTodosQuartos: async (req, res) => {
        let json = { error: '', result: [] };

        try {
            let quartos = await QuartosService.getTodosQuartos();
            if(quartos.length > 0) {
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
        let json = {error: '', result: [] };

        let idQuarto = req.params.id_quarto;

        if(idQuarto) {
            try {
                let quarto = await QuartosService.getQuartoPorID(idQuarto);

                if(quarto.length > 0) {
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