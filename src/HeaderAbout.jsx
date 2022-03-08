import React from "react";
import ContainerImgMe from "./ContainerImgMe.jsx";

const HeaderAbout = React.forwardRef((props, ref) => (
  <div className="flexing cajita" ref={ref}>
    <ContainerImgMe nameContainer="simon-antonio" />
    <ContainerImgMe nameContainer="antonio-simon" />
  </div>
));

export default HeaderAbout;
