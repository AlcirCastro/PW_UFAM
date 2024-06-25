import { createLink } from './utils.js';
import http from 'http';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const diretorio = process.argv.slice(2);
const PORT = process.env.PORT ?? 3456;

fs.readdir(diretorio[0], (err, files) => {
    if (err) {
        throw new Error(err);
    }

    const server = http.createServer((req, res) => {
        const url = req.url;

        if (url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            files.forEach(file => {
                res.write(createLink(file));
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
