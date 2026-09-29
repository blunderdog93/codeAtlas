import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Input.css";

function Input() {
  const navigate = useNavigate();

  const [githubUrl, setGithubUrl] = useState("");
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/repository/clone",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            githubUrl,
            path,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to clone repository");
      }

      navigate("/repo", {
        state: {
          repositoryPath: data.repositoryPath,
          structure: data.structure,
        },
      });
    } catch (error) {
      setError(error.message || "Something went wrong");
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="input-page">
        <div className="input-card loading-card">
          <div className="loading-spinner"></div>

          <h1>Cloning repository...</h1>

          <p className="subtitle">
            Downloading the repository and building its file structure.
          </p>

          <div className="loading-repository">
            <span className="loading-label">Repository</span>
            <span className="loading-value">{githubUrl}</span>
          </div>

          <div className="loading-status">
            <span className="status-dot"></span>
            This may take a moment...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="input-page">
      <div className="input-card">
        <div className="github-logo">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.3 9.4 7.88 10.92.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18A11 11 0 0 1 12 5.86c.98 0 1.97.13 2.89.38 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.71 5.4-5.29 5.69.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
            />
          </svg>
        </div>

        <h1>code@las</h1>

        <p className="subtitle">
          Enter a GitHub repository to analyze its structure.
        </p>

        <form className="github-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="github-url">GitHub repository URL</label>

            <input
              id="github-url"
              type="url"
              placeholder="https://github.com/user/repository"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="repository-path">Local repository path</label>

            <input
              id="repository-path"
              type="text"
              placeholder="D:\test"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              required
            />

            <small>The repository will be cloned into this location.</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="clone-button">
            Clone Repository
          </button>
        </form>
      </div>
    </main>
  );
}

export default Input;
