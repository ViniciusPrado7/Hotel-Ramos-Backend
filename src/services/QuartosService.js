const db = require('../db');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

module.exports = {
    ReservaQuarto: async (id_quarto, email_user) => {
        const [existeReserva] = await db.query('SELECT * FROM quartos WHERE id_quarto = ?', [id_quarto]);
        if (existeReserva.length > 0) {
            return 'Reserva ja está em uso.';
        } else {
            try {
                const [results] = await db.query('UPDATE quartos SET email_user = ? WHERE id_quarto = ?', [email_user, id_quarto]);
                return results.affectedRows > 0;
            } catch (error) {
                throw error;
            }
        }
    },
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