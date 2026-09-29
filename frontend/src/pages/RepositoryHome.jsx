import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RepositoryHome.css";

function RepositoryHome() {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/repository/repositories",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data = await response.json();
        setRepositories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  if (loading) {
    return <div className="repository-loading">Loading repositories...</div>;
  }

  if (error) {
    return <div className="repository-error">{error}</div>;
  }

  return (
    <div className="repository-page">
      <div className="repository-container">
        <div className="repository-header">
          <div className="repository-title-section">
            <h1>Code@las</h1>
            <p className="repository-subtitle">
              Select a repository to explore
            </p>
          </div>

          <button
            onClick={() => navigate("/clone")}
            className="clone-repository-button"
          >
            + Clone Repository
          </button>
        </div>

        {repositories.length === 0 ? (
          <div className="repository-empty">
            <h2>No repositories yet</h2>

            <p>Clone a GitHub repository to get started.</p>

            <button
              onClick={() => navigate("/clone")}
              className="clone-repository-button"
            >
              Clone Repository
            </button>
          </div>
        ) : (
          <div className="repository-grid">
            {repositories.map((repo) => (
              <div
                key={repo.id}
                onClick={() => navigate(`/repository/${repo.id}`)}
                className="repository-card"
              >
                <h2>{repo.name}</h2>

                <p className="repository-url">{repo.url}</p>

                <button className="open-repository">Open Repository →</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RepositoryHome;
