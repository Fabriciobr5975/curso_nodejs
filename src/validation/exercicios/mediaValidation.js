
export function mediaValidation(req) {
    if (!req.body.n1 || isNaN(req.body.n1))
        throw new Error("O primeiro número é inválido");

    if (!req.body.n2 || isNaN(req.body.n2))
        throw new Error("O segundo número é inválido");

    if (!req.body.n3 || isNaN(req.body.n3))
        throw new Error("O terceiro número é inválido");
}