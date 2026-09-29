const express = require("express");

const {
  cloneAndGetStructure,
  getRepositoryStructure,
  getFile,
} = require("../controllers/repoStructureController");

const { getRepositories } = require("../controllers/repoController");

const router = express.Router();

router.post("/clone", cloneAndGetStructure);
router.get("/repositories", getRepositories);
router.get("/:id/structure", getRepositoryStructure);
router.get("/:id/file", getFile);

module.exports = router;
