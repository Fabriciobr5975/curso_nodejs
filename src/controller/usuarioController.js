import { Router } from "express";
import multer from 'multer'

const endpoints = Router();

let uploadPerfil = multer({ dest: './storage/perfil' });

endpoints.post('/perfil/capa', uploadPerfil.single('imagem'), (req, resp) => {
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

export default endpoints;