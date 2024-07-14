
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/explore" element={<HomePage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
