import { calcularTotal, calcularValorParcela } from "../service/loja/pedidoCompletoService.js";
import { validarPedidoCompleto } from "../validation/loja/pedidoCompletoValidation.js";

import { Router } from "express";

const endpoints = Router();

endpoints.post('/loja/pedido', (req, resp) => {
    try {
        if (!req.body.total || isNaN(req.body.total)) throw new Error("O parâmetro total está inválido");

        if (!req.body.parcelas || isNaN(req.body.parcelas)) throw new Error("O parâmetro parcelas está inválido");

        if (!req.body.cupom || isNaN(req.body.cupom)) throw new Error("O parâmetro cupom está inválido");

        let total = req.body.total;
        let parcelas = req.body.parcelas;
        let cupom = req.query.cupom;

        if (parcelas > 1) {
            let juros = total * 0.05;
            total += juros;
        }

        if (cupom == 'QUERO100') {
            total -= 100;
        }

        let valorParcela = total / parcelas;

        resp.send({
            total: total,
            parcela: valorParcela
        });

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.post('/loja/pedido/completo', (req, resp) => {
    try {
        validarPedidoCompleto(req);

        let parcelas = req.body.parcelas;
        let itens = req.body.itens;
        let cupom = req.query.cupom;

        let total = calcularTotal(parcelas, itens, cupom);
        let valorParcela = calcularValorParcela(total, parcelas);

        resp.send({
            total: total,
            qtdParcelas: parcelas,
            parcela: valorParcela
        });

    }
    catch (err) {
        logError(err);
        resp.status(400).send(criarErro(err));
    }
});

export default endpoints;