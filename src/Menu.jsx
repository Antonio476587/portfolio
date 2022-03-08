import React from "react";

import { aboutSvg, workSvg, xSquareSvg, houseSvg, envelope } from "./Svg.jsx";

function Item({ svg, h3, link = null }) {
  function activeMenu(e) {
    e.currentTarget.classList.toggle("active");
    const menu = document.querySelector(".menu");
    if (link !== null) {
      setTimeout(() => {
        location.assign(link);
      }, 800);
      return;
    }
    setTimeout(() => {
      menu.toggleAttribute("hidden");
    }, 800);
  }

  return (
    <div className="item" onClick={activeMenu} role="menuitem" tabIndex="0">
      <div style={{ "--i": 5 }}>
        <div style={{ "--i": 4 }}>
          <div style={{ "--i": 3 }}>
            <div style={{ "--i": 2 }}>
              <div style={{ "--i": 1 }} className="cinema-menu-div">
                <span className="span-cinema">
                  <span>
                    <h3>{h3}</h3>
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

export default function Menu({ changeVisibilityMenu }) {
  return (
    <div className="menu" hidden={true}>
      <div className="div-menu-btn">
        <button
          type="button"
          className="menu-btn"
          onClick={changeVisibilityMenu}
        >
          {xSquareSvg}
        </button>
      </div>
      <div className="items">
        <a href="#Home">
          <Item h3="Home" svg={houseSvg} />
        </a>
        <a href="#main">
          <Item h3="About" svg={aboutSvg} link="about" />
        </a>
        <a href="#main">
          <Item h3="Works" svg={workSvg} link="/works" />
        </a>
        <a href="#Contact">
          <Item h3="Contact" svg={envelope} />
        </a>
      </div>
      <div className="nav-menu" />
    </div>
  );
}
