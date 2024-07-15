
import AboutPage from './pages/AboutPage';
import ContactUs from './pages/ContactUs';
import Details from './pages/DetailsPage';
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
          <Route exact path="/details" element={<Details/>} />
          <Route exact path="/contactus" element={<ContactUs/>} />
          <Route exact path="/about" element={<AboutPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
