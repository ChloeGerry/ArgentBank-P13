import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Error from "@/pages/Error";
import Signup from "@/pages/Signup";
import Transactions from "@/pages/Transactions";

const Routing = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard/:id" element={<Dashboard />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/dashboard/:id/accounts/:accountId/transactions" element={<Transactions />} />
    <Route path="/*" element={<Error />} />
  </Routes>
);

export default Routing;
