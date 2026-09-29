const { cloneRepository } = require("../services/gitService");

const pool = require("../db/db");

async function cloneAndAnalyze(req, res) {
  try {
    const { githubUrl, path } = req.body;

    if (!githubUrl || !path) {
      return res.status(400).json({
        error: "URL and path destination is required",
      });
    }

    const result = await cloneRepository(githubUrl, path);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function getRepositories(req, res) {
  try {
    const [repositories] = await pool.execute("SELECT * FROM repositories");

    return res.status(200).json(repositories);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = { cloneAndAnalyze, getRepositories };
