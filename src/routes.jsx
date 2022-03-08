import React from "react";

import MainPage from "./MainPage.jsx";
import About from "./About.jsx";
import Works from "./Works.jsx";
import Work from "./Work.jsx";
import NotFound from "./NotFound.jsx";

import workContents from "./workContents.js";

const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/about", element: <About /> },
  { path: "/works", element: <Works /> },
  { path: "/work/1", element: <Work work={workContents[0]} index={1} /> },
  { path: "/work/2", element: <Work work={workContents[1]} index={2} /> },
  { path: "/work/3", element: null },
  { path: "/work/:id", element: <Work work={workContents[0]} index={1} /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
