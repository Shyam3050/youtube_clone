import { Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Watch from "./pages/Watch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="/watch/:id" element = {<Watch />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
