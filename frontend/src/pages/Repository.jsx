import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import FileTree from "../components/FileTree";

import "./Repository.css";

function Repository() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [structure, setStructure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [fileLoading, setFileLoading] = useState(false);

  const handleFileSelect = async (file) => {
    console.log("SELECTED FILE:", file);
    console.log("FILE PATH:", file.path);
    setSelectedFile(file);
    setFileLoading(true);
    setFileContent("");

    try {
      console.log("Selected file:", file);
      console.log("File path:", file.path);

      const response = await fetch(
        `http://localhost:5000/api/repository/${id}/file?path=${encodeURIComponent(file.path)}`,
      );

      const data = await response.json();

      console.log("File API response:", response.status, data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to load file");
      }

      setFileContent(data.content);
    } catch (error) {
      console.error("File loading error:", error);
      setFileContent(`Error: ${error.message}`);
    } finally {
      setFileLoading(false);
    }
  };

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/repository/${id}/structure`,
        );

        if (!response.ok) {
          throw new Error("Failed to load repository");
        }

        const data = await response.json();

        setStructure(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepository();
  }, [id]);

  if (loading) {
    return (
      <div className="repository-loading">
        <h2>Loading repository...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="repository-error">
        <div className="repository-error-card">
          <h1>Failed to load repository</h1>

          <p>{error}</p>

          <button onClick={() => navigate("/")}>Back to Repositories</button>
        </div>
      </div>
    );
  }

  if (!structure) {
    return (
      <div className="repository-error">
        <div className="repository-error-card">
          <h1>No repository found</h1>

          <button onClick={() => navigate("/")}>Back to Repositories</button>
        </div>
      </div>
    );
  }

  return (
    <div className="repository-page">
      <aside className="repository-sidebar">
        <div className="sidebar-top">
          <div className="brand">
            <span className="brand-name">code@las</span>
          </div>

          <button
            className="new-repository-button"
            onClick={() => navigate("/")}
          >
            ← Repositories
          </button>
        </div>

        <div className="explorer-header">
          <span>EXPLORER</span>
        </div>

        <div className="repository-name">
          <span className="repository-folder-icon">📁</span>

          <span title={structure.name}>{structure.name}</span>
        </div>

        <div className="tree-container">
          <FileTree tree={structure} onFileSelect={handleFileSelect} />
        </div>
      </aside>

      <main className="repository-main">
        <header className="repository-header">
          <div>
            <h1>{selectedFile ? selectedFile.name : structure.name}</h1>

            <p>{selectedFile ? "File" : "Repository Explorer"}</p>
          </div>
        </header>

        <section className="repository-content">
          {!selectedFile ? (
            <div className="welcome-panel">
              <div className="welcome-icon">&lt;/&gt;</div>

              <h2>Welcome to {structure.name}</h2>

              <p>Select a file from the explorer to inspect and analyze it.</p>

              <div className="welcome-info">
                <div className="info-card">
                  <span className="info-icon">📁</span>

                  <div>
                    <strong>Repository Explorer</strong>

                    <span>Browse your project structure.</span>
                  </div>
                </div>

                <div className="info-card">
                  <span className="info-icon">🔍</span>

                  <div>
                    <strong>Code Analysis</strong>

                    <span>Analyze files and understand your codebase.</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="file-preview">
              <div className="file-preview-header">
                <span className="file-preview-icon">📄</span>
                <span>{selectedFile.name}</span>
              </div>

              <div className="file-preview-body">
                {fileLoading ? (
                  <p>Loading file...</p>
                ) : (
                  <pre className="code-viewer">
                    <code>{fileContent}</code>
                  </pre>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Repository;
