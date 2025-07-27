import $ from "jquery";
import React from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/404.css";
import "./styles/index.css";

import "bootstrap/dist/js/bootstrap.bundle";

import App from "./App";

window.jQuery = window.$ = $;

const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
