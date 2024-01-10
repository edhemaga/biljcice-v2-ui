import "./App.css";

import Login from "./components/auth/login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/shared/util/privateRoutes";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <div style={{ margin: 0, width: "100vw", height: "100vh" }}>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
