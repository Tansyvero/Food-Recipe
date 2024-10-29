import React from "react";
import ReactDOM from "react-dom/client";
import { AuthenticationContextProvider } from "./context/index.ts"; // Specify the extension
import App from './App.tsx'; // Import App with .tsx extension
import "./index.css";

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the main application
root.render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <App />
    </AuthenticationContextProvider>
  </React.StrictMode>
);
