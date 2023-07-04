import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import MovieInfo from "./pages/MovieInfo";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/search"
              element={<Search />}
            />
            <Route
              path="/movie/:id"
              element={<MovieInfo />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
