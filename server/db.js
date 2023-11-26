const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "databasepassword",
    host: "localhost",
    port: 5432,
    database: "tennisdb"
});

module.exports = pool;