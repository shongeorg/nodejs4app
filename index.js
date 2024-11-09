const express = require("express");
const { Client } = require("pg");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const connectWithRetry = () => {
  client
    .connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => {
      console.error("Connection error", err.stack);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT NOW()");
    res.send(`Connected to PostgreSQL at: ${result.rows[0].now}`);
  } catch (err) {
    console.error("Query error", err.stack);
    res.status(500).send("Error querying the database");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
