import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "../public/css/tailwind.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

// import.meta.REACT_APP_CLIENT_ID
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="83758517278-4eki251pfuanpg378sj1eeqjuivtr5d3.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
