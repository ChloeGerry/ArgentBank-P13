import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Routing from "./Routing.tsx";
import Footer from "./components/layout/Footer/index.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routing />
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
