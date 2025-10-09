// src/index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import AetherApp from "./AetherApp";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AetherApp />
  </React.StrictMode>
);
