import express from 'express'

const servidor = express();
servidor.use(express.json());

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
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let soma = n1 + n2;
    resp.send({ soma })
})

servidor.get('/calculadora/somar', (req, resp) => {
    let n1 = Number(req.query.n1);
    let n2 = Number(req.query.n2);
    let soma = n1 + n2;
    resp.send({ soma });
});

servidor.get('/mensagem/ola', (req, resp) => {
    let nome = req.query.nome ?? '!!!';
    resp.send({ nome: `Olá ${nome}` });
})

servidor.post('/media', (req, resp) => {
    let n1 = Number(req.body.n1);
    let n2 = Number(req.body.n2);
    let n3 = Number(req.body.n3);
    let media = (n1 + n2 + n3) / 3; 

    resp.send({media});
});

servidor.post('/dobro', (req, resp) => {
    let vetor = req.body.numeros;
    let vetorComDobro = [];

    for(let item of vetor) {
        vetorComDobro.push(item * 2);
    }

    resp.send({vetorComDobro});
}); 

servidor.post('/loja/pedido', (req, resp) => {
    let total = req.body.total;
    let parcelas = req.body.parcelas;
    let cupom = req.query.cupom;

    if(parcelas > 1) {
        let juros = total * 0.05;
        total += juros;     
    }

    if(cupom == 'QUERO100') {
        total -= 100;
    }

    resp.send({total});
});

servidor.listen(5001, () => console.log("API subiu com sucesso na porta 5001"));