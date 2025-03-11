const express = require('express');
const QuartosController = require('./controllers/QuartosController');
const UsersController = require('./controllers/UsersController');
const AdminController = require('./controllers/AdminController');
const router = express.Router();

router.get('/quartos', QuartosController.getTodosQuartos);
router.get('/quartos/:id_quarto' , QuartosController.getQuartoPorID);

router.post('/user', UsersController.cadastrarUsers);
router.post('/login', UsersController.loginUser);
router.post('/admin', AdminController.cadastrarAdmin);
router.post('/login', AdminController.loginAdmin);


router.get('/users/:email_user', UsersController.getUserPorEmail);

module.exports = router;