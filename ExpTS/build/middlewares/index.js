"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("../router/router"));
const express_handlebars_1 = require("express-handlebars");
const helpers_1 = require("../views/helpers/helpers");
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3456;
const app = (0, express_1.default)();
const diretorio = (_b = process.env.CAMINHO) !== null && _b !== void 0 ? _b : './logs';
const formato = (_c = process.env.FORMATO_LOG) !== null && _c !== void 0 ? _c : 'simples';
app.engine("handlebars", (0, express_handlebars_1.engine)({
    helpers: {
        listaTech: helpers_1.listaTech,
    }
}));
app.set("view engine", "handlebars");
app.set("views", path_1.default.join(__dirname, '../views'));
const file = path_1.default.join(diretorio, 'access.log');
if (!fs_1.default.existsSync(diretorio)) {
    fs_1.default.mkdirSync(diretorio, { recursive: true });
}
app.use((req, res, next) => {
    const now = new Date().toISOString();
    const logSimples = `${now} ${req.url} ${req.method}\n`;
    const logCompleto = `${now} ${req.url} ${req.method} ${req.httpVersion} ${req.headers['user-agent']}\n`;
    const logEntry = formato === 'simples' ? logSimples : logCompleto;
    try {
        fs_1.default.appendFileSync(file, logEntry);
    }
    catch (err) {
        console.error(`Erro ao escrever no log: ${err}`);
    }
    next();
});
app.use(router_1.default);
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
