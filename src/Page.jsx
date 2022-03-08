import React from "react";
import { Routes, Route } from "react-router-dom";

import routes from "./routes.jsx";

export default function Page() {
  return (
    <Routes>
      {routes.map((attrs) => (
        <Route {...attrs} key={attrs.path} />
      ))}
    </Routes>
  );
}
