import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Error from "@/pages/Error";

const Routing = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard/:id" element={<Dashboard />} />
    <Route path="/*" element={<Error />} />
  </Routes>
);

export default Routing;
