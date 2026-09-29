import { useState } from "react";
import "./FileTree.css";

function TreeNode({ node, level = 0, onFileSelect }) {
  const [expanded, setExpanded] = useState(level === 0);

  const isFolder = node.type === "folder";

  function handleClick() {
    if (isFolder) {
      setExpanded((current) => !current);
    } else {
      onFileSelect?.(node);
    }
  }

  return (
    <div className="tree-node">
      <div
        className={`tree-item ${!isFolder ? "file-item" : ""}`}
        style={{ paddingLeft: `${12 + level * 16}px` }}
        onClick={handleClick}
      >
        <span className="tree-arrow">
          {isFolder ? (expanded ? "^" : "›") : ""}
        </span>

        <span className="tree-icon">{isFolder ? "📁" : "📄"}</span>

        <span className="tree-name">{node.name}</span>
      </div>

      {isFolder && expanded && node.children?.length > 0 && (
        <div className="tree-children">
          {node.children.map((child, index) => (
            <TreeNode
              key={`${child.name}-${index}`}
              node={child}
              level={level + 1}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FileTree({ tree, onFileSelect }) {
  if (!tree) {
    return <div className="empty-tree">No repository structure available.</div>;
  }

  return (
    <div className="file-tree">
      <TreeNode node={tree} onFileSelect={onFileSelect} />
    </div>
  );
}

export default FileTree;
