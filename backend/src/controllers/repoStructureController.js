const { cloneRepository } = require("../services/gitService");
const { folderStructure } = require("../services/repoStructureService");
const { getFileContent } = require("../services/fileService");
const pathModule = require("path");
const pool = require("../db/db");
async function cloneAndGetStructure(req, res) {
  try {
    const { githubUrl, path } = req.body;

    if (!githubUrl || !path) {
      return res.status(400).json({
        error: "URL and path destination is required",
      });
    }

    const result = await cloneRepository(githubUrl, path);

    const structure = await folderStructure(result.repositoryPath);

    const repoName = pathModule
      .basename(githubUrl.replace(/\/$/, ""))
      .replace(".git", "");

    const [dbResult] = await pool.execute(
      `INSERT INTO repositories (name, url, local_path)
       VALUES (?, ?, ?)`,
      [repoName, githubUrl, result.repositoryPath],
    );

    return res.status(201).json({
      message: result.message,
      repository: {
        id: dbResult.insertId,
        name: repoName,
        url: githubUrl,
        local_path: result.repositoryPath,
      },
      structure,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
}

async function getRepositoryStructure(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute(
      "SELECT local_path FROM repositories WHERE id = ?",
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Repository not found",
      });
    }

    const repositoryPath = rows[0].local_path;

    const structure = await folderStructure(repositoryPath);

    return res.status(200).json(structure);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
}

async function getFile(req, res) {
  try {
    const { id } = req.params;
    const { path: filePath } = req.query;

    if (!filePath) {
      return res.status(400).json({
        error: "File path is required",
      });
    }

    const [rows] = await pool.execute(
      "SELECT local_path FROM repositories WHERE id = ?",
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Repository not found",
      });
    }

    const repositoryPath = rows[0].local_path;

    const content = await getFileContent(repositoryPath, filePath);

    return res.status(200).json({
      name: pathModule.basename(filePath),
      path: filePath,
      content,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = {
  cloneAndGetStructure,
  getRepositoryStructure,
  getFile,
};
