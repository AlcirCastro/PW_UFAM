"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//função que imprime o método HTTP da requisição
function getMethod(req, res) {
    console.log(`Método HTTP da requisição: ${req.method}`);
}
exports.default = getMethod;
