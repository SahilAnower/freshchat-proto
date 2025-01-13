import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContextProvider } from "./context/ToastContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="716886604204-l2m5ts7csiqurmua583nvpk4mjrcsknc.apps.googleusercontent.com">
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContextProvider>
            <App />
          </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
