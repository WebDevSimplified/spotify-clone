import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Test from "./pages/Test";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="test" element={<Test />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
