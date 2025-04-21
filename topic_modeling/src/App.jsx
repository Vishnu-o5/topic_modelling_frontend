import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/login_page" element={<LoginPage />} />
        <Route path="/dashboard_page" element={<DashboardPage />} />
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
