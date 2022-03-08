import React from "react";
import { aboutSvg, workSvg } from "./Svg.jsx";

export default function MainMenuItem({ name, id }) {
  let svg;
  if (name === "About") {
    svg = aboutSvg;
  }
  if (name === "Works") {
    svg = workSvg;
  }

  return (
    <div className="main-menu-item" tabIndex="0" id={id} key={id}>
      <div style={{ "--i": 1 }} className="main-item-div">
        <div style={{ "--i": 2 }}>
          <div style={{ "--i": 3 }}>
            <div style={{ "--i": 4 }}>
              <div style={{ "--i": 5 }} className="main-menu-div">
                <span className="span-main-menu">
                  <span>
                    <h3>{name}</h3>
                    {svg}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
