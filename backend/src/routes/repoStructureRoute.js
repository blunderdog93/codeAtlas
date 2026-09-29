const express = require("express");

const {
  cloneAndGetStructure,
} = require("../controllers/repoStructureController");

const router = express.Router();

router.get("/structure", cloneAndGetStructure);

module.exports = router;
