const express = require("express");
const cors = require("cors");
const app = express();

const repoRoute = require("../src/routes/repoRoute");

app.use(cors());
app.use(express.json());
app.use("/api/repository", repoRoute);

module.exports = app;
