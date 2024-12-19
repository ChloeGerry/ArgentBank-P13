import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Error from "./Error";

const Routing = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard/:id" element={<Dashboard />} />
    <Route path="/*" element={<Error />} />
  </Routes>
);

export default Routing;
