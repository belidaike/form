const express = require("express")
const cors = require("cors")
const mysql = require("mysql")

const app = express();
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "school_deped"
})

// Login



// Login end


app.get("/", (req, res) => {
    const sql = "SELECT * FROM crud";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO crud (`name`, `email`) VALUES (?, ?)";
    const values = [req.body.name, req.body.email];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE crud SET `name` = ?, `email` = ? WHERE id = ?";
    const values = [req.body.name, req.body.email];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM crud WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});


app.listen(8081, () => {
    console.log("listening")
})
