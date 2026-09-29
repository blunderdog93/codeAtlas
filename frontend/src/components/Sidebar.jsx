import { useState } from "react";
import "./Sidebar.css";
import FolderTree from "./FileTree";

function Sidebar({ structure, repoName, selectedFile, onFileSelect }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && <h3>📁 {repoName || "Repository"}</h3>}

        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {!collapsed && (
        <div className="sidebar-content">
          <FolderTree
            items={structure}
            selectedFile={selectedFile}
            onFileSelect={onFileSelect}
          />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
