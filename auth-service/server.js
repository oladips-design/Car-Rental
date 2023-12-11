const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.port || 8000;
const db = require("./config/db");
const routes = require("./routes/index");

app.use(express.json());

app.use("/api", routes.authRouter);

// async function connectDB() {
//   try {
//     let conn = await db.authenticate();

//     if (conn) {
//       console.log("Database connected");
//     } else {
//       throw new Error("connection failed");
//     }
//   } catch (error) {
//     console.log(`something went wrong: ${error}`);
//   }
// }
// connectDB();

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.listen(port, (err) => {
  if (err) process.exit(1);

  console.log(`Auth-Server running on http://localhost:${port}`);
});
