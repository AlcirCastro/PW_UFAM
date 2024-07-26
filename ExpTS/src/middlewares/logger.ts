import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const logDirectory = process.env.CAMINHO || "logs";
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

function logger(type: "combined" | "short") {
    return (req: Request, res: Response, next: NextFunction) => {
        const logTime = new Date().toISOString();
        const logData =
            type === "combined"
                ? `${logTime} ${req.method} ${req.url} HTTP/${req.httpVersion} ${req.get("User-Agent")}`
                : `${logTime} ${req.method} ${req.url}`;
        
        const logFilePath = path.join(logDirectory, "access.log");
        fs.appendFile(logFilePath, logData + "\n", (err) => {
            if (err) {
                console.error("Failed to write log:", err);
            }
        });

        console.log(logData);
        next();
    };
}

export default logger;
