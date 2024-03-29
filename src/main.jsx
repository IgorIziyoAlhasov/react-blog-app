import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import { ThemeContextProvider } from "./ThemeContext";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeContextProvider>
            <App />
        </ThemeContextProvider>
    </React.StrictMode>
);