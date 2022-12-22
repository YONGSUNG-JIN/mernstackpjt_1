import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 8800;
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.get("/", (req,res)=> {
    res.json("Hello this is the server")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(PORT, ()=> console.log(`Connected to the server... running on Port : ${PORT}`))