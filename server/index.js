const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = 4707

app.use(cors());
app.use(express.json());

app.get("/players", async(req, res) => {
    try {
        const players = await pool.query("SELECT * FROM players");
        res.json(players.rows).status(200);
    }
    catch (err) {
        res.status(400);
        console.log(err);
    }
    finally {
        res.send();
    }
});

app.get("/player/:id", async(req, res) => {
    try {
        const player = await pool.query("SELECT * FROM players WHERE id = ($1)",
            [req.params.id]);
        console.log(player.rows)
        if (player.rows.length !== 0) {
            res.json(player.rows).status(200);
        }
        else {
            res.status(404);
        }
    }
    catch (err) {
        res.status(400);
        console.log(err);
    }
    finally {
        res.send();
    }
});

app.post("/player", async(req, res) => {
    try {
        const player = req.body;
        const newPlayer = await pool.query("INSERT INTO players (player_name, ranking, country) VALUES($1, $2, $3) RETURNING *",
            [player.player_name, player.ranking, player.country]);

        res.json(newPlayer).status(201);
    }
    catch (err) {
        res.status(400)
        console.log(err);
    }
    finally {
        res.send();
    }
});

app.put("/player/:id", async(req, res) => {
    try {
        const player = req.body;
        const newPlayer = await pool.query("UPDATE players SET (player_name, ranking, country) = ($1, $2, $3) WHERE id = ($4) RETURNING *",
            [player.player_name, player.ranking, player.country, req.params.id]);

        if (newPlayer.length !== 0) {
            res.json(newPlayer).status(200);
        }
        else {
            res.status(404);
        }
    }
    catch (err) {
        res.status(400)
        console.log(err);
    }
    finally {
        res.send();
    }
});

app.delete("/player/:id", async(req, res) => {
    try {
        await pool.query("DELETE FROM players WHERE id = ($1)",
            [req.params.id]);
        res.status(204);
    }
    catch (err) {
        res.status(400);
        console.log(err);
    }
    finally {
        res.send();
    }
})

app.listen(4707, () => {
    console.log(`App listening on port ${port}`);
});