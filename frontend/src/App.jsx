import { BrowserRouter, Routes, Route } from "react-router-dom";
import Input from "./pages/Input";
import Repository from "./pages/Repository";
import RepositoryHome from "./pages/RepositoryHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RepositoryHome />} />
        <Route path="/repository/:id" element={<Repository />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
