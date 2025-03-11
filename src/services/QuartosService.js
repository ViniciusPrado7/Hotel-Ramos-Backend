const db = require('../db');

module.exports = {
    getTodosQuartos: async () => {
        try {
            const [results] = await db.query('SELECT * FROM quartos');
            return results;
        } catch (error) {
            throw error;
        }
    },
    getQuartoPorID: async (id_quarto) => {
        try {
            const [results] = await db.query('SELECT * FROM quartos WHERE id_quarto = ? ', [id_quarto]);
            return results;
        } catch (error) {
            throw error
        }
    },
    
}