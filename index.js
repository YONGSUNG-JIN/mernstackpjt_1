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


app.use(express.json())


app.get("/", (req, res) => {
    res.json("Hello this is the server")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post("/books", (req, res) => {
    console.log(req.body)

    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUE (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book content created!");
    })
})



app.listen(PORT, () => console.log(`Connected to the server... running on Port : ${PORT}`))