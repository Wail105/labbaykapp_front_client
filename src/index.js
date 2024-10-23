import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Import i18n configuration from i18n.js
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ConfigProvider } from "antd";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);
console.log(i18n.language);
console.log(i18n.dir());
root.render(
  <I18nextProvider i18n={i18n}>
    <ConfigProvider >
      <BrowserRouter><App /></BrowserRouter>
    </ConfigProvider>
  </I18nextProvider>
)