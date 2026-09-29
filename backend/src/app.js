const express = require("express");
const cors = require("cors");
const app = express();

const repoRoute = require("../src/routes/repoRoute");
const repoStructureRoutes = require("../src/routes/repoStructureRoute");

app.use(cors());
app.use(express.json());

app.use("/api/repository", repoRoute);
app.use("/api/repository", repoStructureRoutes);

module.exports = app;
