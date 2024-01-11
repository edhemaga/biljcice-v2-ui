import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./shared/util/privateRoutes";

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/auth/login/Login";
import NotFound from "./components/NotFound/NotFound";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
