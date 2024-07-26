// Arquivo src/controllers/main.ts
import { Request, Response } from 'express';
import { loremIpsum } from 'lorem-ipsum';

const index = ((req: Request, res: Response) => {
    res.render('main/home', {
        mensagem: 'Seja bem vindo ao site!',
    });
});

const hb1 = ((req : Request, res : Response) => {
    res.render('main/hb1', {
        mensagem: 'Olá, você está aprendendo Express + HBS!',
    });
});

const testCookie = (req: Request, res: Response) => {
    if(!("test" in  req.cookies)){
        res.cookie("test", "1");
        res.send("Você ainda não tinha o cookie. Criando...");

    }else{
        res.send("Você já tinha o cookie");
    }
}

const hb2 = ((req : Request, res : Response) => {
    res.render('main/hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
    });
});

const hb3 = ((req : Request, res : Response) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('main/hb3', { profes, 
    });
});

const hb4 = (function(req : Request,res : Response){
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
        ];
    res.render('main/hb4', { technologies,
    });
})

const bemvindo = ((req: Request, res: Response) => {
    res.send('Sem Bem Vindo ao site ' + req.params.nome + '!');
});

const lorem = ((req: Request, res: Response) => {
    const num = parseInt(req.params.num, 10);
    if (isNaN(num) || num <= 0) {
        return res.status(400).send('Número de parágrafos inválido.');
    }

    const paragraphs = loremIpsum({
        count: num,
        units: 'paragraphs',
        format: 'html'
    });

    res.send(paragraphs);
});

const math = ((req: Request, res: Response) => {
    const op = req.params.op;
    const num1 = parseInt(req.params.num1,10);
    const num2 = parseInt(req.params.num2,10);

    if(op === 'sum'){
        res.send(`A soma de ${num1} e ${num2} é ${num1 + num2}`);
    }else if(op === 'sub'){
        res.send(`A subtração de ${num1} e ${num2} é ${num1 - num2}`);
    }
    else if(op === 'mul'){
        res.send(`A multiplicação de ${num1} e ${num2} é ${num1 * num2}`);
    }
    else if(op === 'div'){
        res.send(`A divisão de ${num1} e ${num2} é ${num1 / num2}`);
    }
    else{
        res.status(400).send('Operação inválida');
    }

});




export default { index, lorem, bemvindo, hb1, hb2, hb3, hb4, testCookie, math };