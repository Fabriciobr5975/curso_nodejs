import { Router } from "express";

const endpoints = Router();

endpoints.get('/calculadora/somar/:n1/:n2', (req, resp) => {
    if (isNaN(req.params.n1) || isNaN(req.params.n2)) {
        resp.status(400).send({
            erro: "Os parâmentro devem ser números"
        });
        return;
    }

    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let soma = n1 + n2;

    resp.status(201).send({
        entrada: {
            numero1: n1,
            numero2: n2
        },
        soma: soma
    })
})

endpoints.get('/calculadora/somar', (req, resp) => {
    if (!req.query.n1 || isNaN(req.query.n1)) {
        resp.status(400).send({
            erro: 'O segundo valor não é válido'
        });
        return;
    }

    if (!req.query.n2 || isNaN(req.query.n2)) {
        resp.status(400).send({
            erro: 'O segundo valor não é válido'
        });
        return;
    }

    let n1 = Number(req.query.n1);
    let n2 = Number(req.query.n2);
    let soma = n1 + n2;
    resp.send({ soma });
});

export default endpoints;