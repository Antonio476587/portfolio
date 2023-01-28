import React from "https://esm.sh/react@18.2.0";
import { aboutSvg, workSvg } from "../Utils/Svg.tsx";

interface MainMenuItemProps {
  name: "About" | "Works";
  id: string;
}

export default function MainMenuItem({ name, id }: MainMenuItemProps) {
  const svg: React.ReactElement<SVGElement> = name === "About"
    ? aboutSvg
    : workSvg;
  return (
    <div className="main-menu-item" tabIndex={0} id={id} key={id}>
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
