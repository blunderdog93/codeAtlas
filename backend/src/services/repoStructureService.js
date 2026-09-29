const fs = require("fs");
const path = require("path");

async function folderStructure(repoPath, relativePath = "") {
  const stat = await fs.promises.stat(repoPath);

  if (stat.isFile()) {
    return {
      name: path.basename(repoPath),
      type: "file",
      path: relativePath,
    };
  }

  const node = {
    name: path.basename(repoPath),
    type: "folder",
    path: relativePath,
    children: [],
  };

  const entries = await fs.promises.readdir(repoPath, {
    withFileTypes: true,
  });

  entries.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;

    return a.name.localeCompare(b.name);
  });

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }

    const entryPath = path.join(repoPath, entry.name);

    const entryRelativePath = path.join(relativePath, entry.name);

    const childNode = await folderStructure(entryPath, entryRelativePath);

    node.children.push(childNode);
  }

  return node;
}

module.exports = {
  folderStructure,
};
