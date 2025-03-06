import { calcularMedia } from "../service/exercicios/mediaService.js";
import { mediaValidation } from "../validation/exercicios/mediaValidation.js";

import { Router } from "express";

const endpoints = Router();

endpoints.post('/media', (req, resp) => {
    try {
        mediaValidation(req);

        let n1 = Number(req.body.n1);
        let n2 = Number(req.body.n2);
        let n3 = Number(req.body.n3);

        let media = calcularMedia(n1, n2, n3);

        resp.send({ media });

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.post('/dobro', (req, resp) => {
    try {
        if (!req.body.numeros || !req.body.numeros.every(num => !isNaN(num))) {
            throw new Error("A lista não contem valores válidos");
        }

        let vetor = req.body.numeros;
        let vetorComDobro = [];

        for (let item of vetor) {
            vetorComDobro.push(item * 2);
        }

        resp.send({
            numeros: vetor,
            dobros: vetorComDobro
        });

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

export default endpoints;