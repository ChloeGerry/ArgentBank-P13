import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Routing from "./components/Routing/index.tsx";
import Footer from "./components/layout/Footer/index.tsx";
import { store } from "./utils/store.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
        <Footer />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
