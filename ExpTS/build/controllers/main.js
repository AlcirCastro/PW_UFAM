"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lorem_ipsum_1 = require("lorem-ipsum");
const index = ((req, res) => {
    res.send('Página principal do site');
});
const hb1 = ((req, res) => {
    res.render('hb1', {
        mensagem: 'Olá, você está aprendendo Express + HBS!',
        layout: false,
    });
});
const hb2 = ((req, res) => {
    res.render('hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
        layout: false,
    });
});
const hb3 = ((req, res) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('hb3', { profes, layout: false });
});
const hb4 = (function (req, res) {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
    res.render('hb4', { technologies, layout: false });
});
const bemvindo = ((req, res) => {
    res.send('Página principal do site');
});
const lorem = ((req, res) => {
    const num = parseInt(req.params.num, 10);
    if (isNaN(num) || num <= 0) {
        return res.status(400).send('Número de parágrafos inválido.');
    }
    const paragraphs = (0, lorem_ipsum_1.loremIpsum)({
        count: num,
        units: 'paragraphs'
    });
    res.send(paragraphs);
});
const erro = ((req, res) => {
    res.statusCode = 404;
    res.send('Página não encontrada');
});
exports.default = { index, lorem, bemvindo, hb1, hb2, hb3, hb4, erro };
