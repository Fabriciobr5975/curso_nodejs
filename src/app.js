import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';

// Importa as funções globais
import './utils/global.js';

import adicionarRotas from './rotas.js';

const servidor = express();
servidor.use(express.json());
servidor.use(cors());

// adiciona as rotas
adicionarRotas(servidor);

// Pegando uma variável de ambiente
const PORTA = process.env.PORTA;

// Subindo a API
servidor.listen(
    PORTA,
    () => console.log(`API subiu com sucesso na porta ${PORTA}!`));