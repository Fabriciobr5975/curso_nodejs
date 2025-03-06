import { Router } from "express";

const endpoints = Router();

endpoints.get('/helloworld', (req, resp) => {
    resp.send({ mensagem: "Hello World" });
});

endpoints.get('/mensagem/boasvindas', (req, resp) => {
    resp.send('Olá, sejam bem-vindos e bem-vindas');
})

endpoints.get('/mensagem/boasvindas/:nome', (req, resp) => {
    let nome = req.params.nome;
    let mensagem = `Olá ${nome}, seja bem-vindo/a`;
    resp.send({ mensagem });
});

endpoints.get('/mensagem/ola', (req, resp) => {
    if (!req.query.nome) {
        resp.status(400).send({
            erro: 'O parâmetro query (nome) é obrigatório.'
        });
        return;
    }

    let nome = req.query.nome ?? '!!!';
    resp.send({ nome: `Olá ${nome}` });
})

export default endpoints;