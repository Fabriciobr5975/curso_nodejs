import { horaAtual } from "./dateTime.js";

global.logError = function logError(err) {
    console.log(`${horaAtual()} ERRO --> ${err.message}`);
}

global.criarErro = function criarErro(err) {
    const obj = {
        erro: err.message
    }
    return obj;
}