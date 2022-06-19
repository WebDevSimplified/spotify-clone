import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import MainTab from "./pages/MainTab";
import SecondTab from "./pages/SecondTab";
import ThirdTab from "./pages/ThirdTab";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainTab />} />
            <Route path="premium" element={<SecondTab />} />
            <Route path="recommended" element={<ThirdTab />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
