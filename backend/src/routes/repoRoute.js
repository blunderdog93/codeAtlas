const express = require("express");
const router = express.Router();
const { cloneAndAnalyze } = require("../controllers/repoController");

router.post("/clone", cloneAndAnalyze);

module.exports = router;
