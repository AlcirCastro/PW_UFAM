import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import router from './router/router';
import { engine } from 'express-handlebars';
import logger from "./middlewares/logger";
import cookieParser from 'cookie-parser';
import session from "express-session";
import { v4 } from "uuid"; 
import getMethod from './middlewares/getMethod';

declare module "express-session"{
    interface SessionData{
        uid: string;
    }
}


// Carregar as variáveis de ambiente
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT ?? 3456;
const LOG_FORMAT = process.env.FORMATO_LOG as "combined" | "short" || "short";  // Adiciona LOG_FORMAT
const app = express();

const publicPath = path.join(process.cwd(), 'public');

app.use('/css', express.static(path.join(publicPath, 'css')));
app.use('/js', express.static(path.join(publicPath, 'js')));
app.use('/img', express.static(path.join(publicPath, 'img')));

app.engine("handlebars", engine({
    helpers: require(`${__dirname}/views/helpers/helpers`),
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);
app.locals.valor = "10";

app.use(logger(LOG_FORMAT));
app.use(cookieParser());


app.use(session({
    genid: () => v4(),
    secret: "4m04kplsvltvdokqKwut",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 360000 }
}))
app.use(express.urlencoded({ extended: false }));
app.use(router);


app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});


app.use(getMethod);