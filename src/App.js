import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Recs from './pages/Recs'
import CreateRecs from './pages/CreateRecs'


function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Sustaineubility</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Smoothie</Link>
        <Link to="/">Recommendations</Link>
        <Link to="/create">Give Recommendation</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/recommendations" element={<Recs />} />
        <Route path="/create-recommendation" element={<CreateRecs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
