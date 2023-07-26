import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import TeamFinder from "./components/TeamFinder";
import Profile from "./components/Profile";
import CreateTeam from "./components/CreateTeam";
import Team from "./components/Team";
import About from "./components/About";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<TeamFinder />} />
          <Route path="/player/:steamid" element={<Profile />} />
          <Route path="/create" element={<CreateTeam />} />
          <Route path="/team/:teamID" element={<Team />} />{" "}
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
