import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";

function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
