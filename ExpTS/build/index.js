"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("./router/router"));
const express_handlebars_1 = require("express-handlebars");
const logger_1 = __importDefault(require("./middlewares/logger"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const uuid_1 = require("uuid");
const getMethod_1 = __importDefault(require("./middlewares/getMethod"));
// Carregar as variáveis de ambiente
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3456;
const LOG_FORMAT = process.env.FORMATO_LOG || "short"; // Adiciona LOG_FORMAT
const app = (0, express_1.default)();
const publicPath = path_1.default.join(process.cwd(), 'public');
app.use('/css', express_1.default.static(path_1.default.join(publicPath, 'css')));
app.use('/js', express_1.default.static(path_1.default.join(publicPath, 'js')));
app.use('/img', express_1.default.static(path_1.default.join(publicPath, 'img')));
app.engine("handlebars", (0, express_handlebars_1.engine)({
    helpers: require(`${__dirname}/views/helpers/helpers`),
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);
app.locals.valor = "10";
app.use((0, logger_1.default)(LOG_FORMAT));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    genid: () => (0, uuid_1.v4)(),
    secret: "4m04kplsvltvdokqKwut",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 360000 }
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(router_1.default);
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
app.use(getMethod_1.default);
