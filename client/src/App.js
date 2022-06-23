import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import HomeTab from "./pages/HomeTab";
import SearchTab from "./pages/SearchTab";
import RcmTab from "./pages/RcmTab";
import LibraryTab from "./pages/LibraryTab";
import UserTab from "./pages/UserTab";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomeTab />} />
            <Route path="search" element={<SearchTab />} />
            <Route path="recommended" element={<RcmTab />} />
            <Route path="library" element={<LibraryTab />} />
            <Route path="user" element={<UserTab />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
