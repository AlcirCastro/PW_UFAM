const utils = require('./utils.js');
const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const diretorio = process.argv.slice(2);
const PORT = process.env.PORT ?? 3456;

fs.readdir(diretorio[0], (err, files) => {
    if (err) {
        console.log('Erro ao ler diretório', err);
        return;
    }
    const server = http.createServer(function(req, res) {
        const url = req.url;
        if (url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            files.forEach(file => {
                res.write(utils.createLink(file));
            });
            res.end();
        } else {
            const filename = path.join(diretorio[0], url);
            fs.readFile(filename, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write('Arquivo não encontrado');
                    res.end();
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                res.write(`<a href="/">Voltar</a><br><br>`);
                res.write(`<pre>${data}</pre>`);
                res.end();
            });
        }
    });
    server.listen(PORT);
});
