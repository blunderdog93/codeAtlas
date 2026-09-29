const fs = require("fs/promises");
const path = require("path");

async function getFileContent(repositoryPath, filePath) {
  const fullPath = path.resolve(repositoryPath, filePath);

  // Prevent accessing files outside the repository
  const relativePath = path.relative(repositoryPath, fullPath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error("Invalid file path");
  }

  const content = await fs.readFile(fullPath, "utf8");

  return content;
}

module.exports = {
  getFileContent,
};
