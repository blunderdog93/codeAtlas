const { execFile } = require("child_process");
const fs = require("fs");
const path = require("path");

function isValidGitHubUrlFormat(url) {
  const patterns = [
    /^https?:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+\/?$/,
    /^git@github\.com:[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+\.git$/,
    /^https?:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+\.git\/?$/,
  ];

  return patterns.some((pattern) => pattern.test(url));
}

function cloneRepository(repoUrl, destination) {
  return new Promise((resolve, reject) => {
    if (!isValidGitHubUrlFormat(repoUrl)) {
      return reject(new Error("Invalid GitHub repository URL"));
    }

    if (!destination || typeof destination !== "string") {
      return reject(new Error("Invalid destination path"));
    }

    if (!fs.existsSync(destination)) {
      return reject(new Error("Destination path does not exist"));
    }

    if (!fs.statSync(destination).isDirectory()) {
      return reject(new Error("Destination path is not a directory"));
    }

    const repoName = repoUrl.split("/").pop().replace(".git", "");

    const repositoryPath = path.join(destination, repoName);

    if (fs.existsSync(repositoryPath)) {
      return reject(new Error("Repository already exists at destination"));
    }

    execFile(
      "git",
      ["clone", repoUrl, repositoryPath],
      (error, stdout, stderr) => {
        if (error) {
          return reject(new Error(stderr || error.message));
        }

        resolve({
          message: "Repository cloned successfully",
          repositoryPath,
          output: stdout,
        });
      },
    );
  });
}

module.exports = {
  cloneRepository,
  isValidGitHubUrlFormat,
};
