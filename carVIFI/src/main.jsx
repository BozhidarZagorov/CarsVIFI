import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./ctx/AuthContext";
import { CarsProvider } from "./ctx/CarsContext";
import "./styles/main.css"
import "./styles/home.css"
import "./styles/auth.css"
import "./styles/header.css"
import "./styles/footer.css"
import "./styles/App.css"
import "./styles/cars.css"
import "./styles/carForm.css"
import "./styles/drag&drop.css"
import "./styles/renewal.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarsProvider>
        <App />
        </CarsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
