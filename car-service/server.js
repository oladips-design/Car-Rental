const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.port || 7000;
const db = require("./config/db");
const routes = require("./routes/car");

app.use(express.json());

app.use("/api", routes);

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.listen(port, (err) => {
  if (err) process.exit(1);

  console.log(`Auth-Server running on http://localhost:${port}`);
});
