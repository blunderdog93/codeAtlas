const { cloneRepository } = require("../services/gitService");

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
module.exports = { cloneAndAnalyze };
