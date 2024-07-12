const express = require("express");
const dotenv = require('dotenv');
const app = express();

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT ?? 3456;

app.get("/", (req, res) => {
    res.send("Hello world!");
    });
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
    });