import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error";

const Routing = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard/:id" element={<Dashboard />} />
    <Route path="/*" element={<Error />} />
  </Routes>
);

export default Routing;
