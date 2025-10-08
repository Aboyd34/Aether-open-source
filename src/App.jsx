import React from "react";
import logo from "./assets/image.png";  // <-- your image here
import "./index.css";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <img src={logo} alt="Cipher Sigil" className="cipher-logo" />
      </header> <-- You need this closing tag!
      <div className="container">
        <h1 className="h1">Welcome to Aether</h1>
      </div>
    </div>
  );
}
