import "./LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Cloning Repository</h2>
        <p>Please wait while we clone and analyze the repository...</p>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
