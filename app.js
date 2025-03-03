import express from 'express'
import cors from 'cors'
import multer from 'multer'

const servidor = express();
servidor.use(express.json());
servidor.use(cors());

let uploadPerfil = multer({ dest: './storage/perfil' });

servidor.get('/helloworld', (req, resp) => {
    resp.send({ mensagem: "Hello World" });
});

servidor.get('/mensagem/boasvindas', (req, resp) => {
    resp.send('Olá, sejam bem-vindos e bem-vindas');
})

servidor.get('/mensagem/boasvindas/:nome', (req, resp) => {
    let nome = req.params.nome;
    let mensagem = `Olá ${nome}, seja bem-vindo/a`;
    resp.send({ mensagem });
});

servidor.get('/calculadora/somar/:n1/:n2', (req, resp) => {
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

servidor.get('/calculadora/somar', (req, resp) => {
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

servidor.get('/mensagem/ola', (req, resp) => {
    if (!req.query.nome) {
        resp.status(400).send({
            erro: 'O parâmetro query (nome) é obrigatório.'
        });
        return;
    }


    let nome = req.query.nome ?? '!!!';
    resp.send({ nome: `Olá ${nome}` });
})

servidor.post('/media', (req, resp) => {
    try {

        if (!req.body.n1 || isNaN(req.body.n1)) {
            resp.status(400).send({
                erro: "O primeiro número é inválido"
            });
            return;
        }

        if (!req.body.n2 || isNaN(req.body.n2)) {
            resp.status(400).send({
                erro: "O segundo número é inválido"
            });
            return;
        }

        if (!req.body.n3 || isNaN(req.body.n3)) {
            resp.status(400).send({
                erro: "O terceiro número é inválido"
            });
            return;
        }

        let n1 = Number(req.body.n1);
        let n2 = Number(req.body.n2);
        let n3 = Number(req.body.n3);
        let media = (n1 + n2 + n3) / 3;

        resp.send({ media });

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

servidor.post('/dobro', (req, resp) => {
    try {
        if (!req.body.numeros || !req.body.numeros.every(num => !isNaN(num))) {
            resp.status(400).send({
                erro: "A lista não contem valores válidos"
            });
            return;
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

    }
});

servidor.post('/loja/pedido', (req, resp) => {
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

servidor.post('/loja/pedido/completo', (req, resp) => {
    try {
        if (!req.body.parcelas || isNaN(req.body.parcelas)) throw new Error("O parâmetro parcela está inválido");

        if (!req.body.itens) throw new Error("O parâmetro itens está inválido");

        let parcelas = req.body.parcelas;
        let itens = req.body.itens;
        let cupom = req.query.cupom;

        let total = 0;
        for (let produto of itens) {
            total += produto.preco;
        }


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
            qtdParcelas: parcelas,
            parcela: valorParcela
        });

    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

servidor.post('/perfil/capa', uploadPerfil.single('imagem'), (req, resp) => {
    try {
        let caminho = req.file.path;
        let extensao = req.file.mimetype;
        let nome = req.file.originalname;

        resp.send({
            caminho: caminho,
            extensao: extensao,
            nome: nome
        });

    } catch (err) {
        resp.status(400).send({
            erro: "Erro ao pegar a imagem"
        });
    }
})

servidor.listen(5001, () => console.log("API subiu com sucesso na porta 5001"));