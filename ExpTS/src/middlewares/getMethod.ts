import {Request, Response} from 'express';

//função que imprime o método HTTP da requisição

function getMethod(req: Request, res: Response) {
   console.log(`Método HTTP da requisição: ${req.method}`);
}

export default getMethod;