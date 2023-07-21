const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 8081;
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(express.json());
app.use(cors());
const connection = require("./connection/connection");
const adminModel = require("./models/loginModel");
const patientModel = require("./models/patientModel");

dotenv.config();
connection();

mongoose.connection.on("connected", () => console.log("Connected to MongoDb"));
mongoose.connection.on("error", () =>
  console.log("Failed to connect to MongoDb")
);
app.use(routes);

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});
