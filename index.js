const express = require("express");
const { Client } = require("pg");
const app = express();
const port = 3000;
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect();

app.get("/", async (req, res) => {
  const result = await client.query("SELECT NOW()");
  res.send(`Connected to PostgreSQL at: ${result.rows[0].now}`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
