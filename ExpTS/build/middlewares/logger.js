"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
const logDirectory = process.env.CAMINHO || "logs";
if (!fs_1.default.existsSync(logDirectory)) {
    fs_1.default.mkdirSync(logDirectory, { recursive: true });
}
function logger(type) {
    return (req, res, next) => {
        const logTime = new Date().toISOString();
        const logData = type === "combined"
            ? `${logTime} ${req.method} ${req.url} HTTP/${req.httpVersion} ${req.get("User-Agent")}`
            : `${logTime} ${req.method} ${req.url}`;
        const logFilePath = path_1.default.join(logDirectory, "access.log");
        fs_1.default.appendFile(logFilePath, logData + "\n", (err) => {
            if (err) {
                console.error("Failed to write log:", err);
            }
        });
        console.log(logData);
        next();
    };
}
exports.default = logger;
