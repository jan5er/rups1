import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import Level1 from "./level1/Level1.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="level">
        <Route path="1" element={<Level1 />} />
      </Route>
      <Route index element={<App />} />
    </Routes>
  </BrowserRouter>
);
