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
        res.json(players.rows);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        res.send();
    }
})
app.post("/player", async(req, res) => {
    try {
        const player = req.body;
        const newPlayer = await pool.query("INSERT INTO players (player_name, ranking, country) VALUES($1, $2, $3) RETURNING *",
            [player.player_name, player.ranking, player.country]);

        res.json(newPlayer);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        res.send();
    }
})
app.listen(4707, () => {
    console.log(`App listening on port ${port}`);
});