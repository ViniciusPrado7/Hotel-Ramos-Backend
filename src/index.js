require('dotenv').config({path: '.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

const corsOptions = {
    origin:['http://localhost:5173'],
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorizantion'],
    credenciais: true,
    optionsSucessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/hotel', router);

app.listen(process.env.PORT, () => {
    console.log(`Server rodando na porta: ${process.env.PORT}`)
})