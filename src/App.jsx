import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "bootstrap";
import Page from "./Page.jsx";

const element = (
  <BrowserRouter>
    <Page />
  </BrowserRouter>
);

const pathName = window.location.pathname;

console.log("Funcionando?");

if (pathName) {
  if (pathName === "/") ReactDOM.hydrate(element, document.getElementById("page"));
  if (pathName !== "/") ReactDOM.hydrate(element, document.getElementById("body"));
}
