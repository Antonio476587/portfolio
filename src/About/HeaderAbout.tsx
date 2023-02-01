import React from "https://esm.sh/react@18.2.0";
import ContainerImgMe from "./ContainerImgMe.tsx";

const HeaderAbout = React.forwardRef(
  function HeaderAbout(_props, ref: React.RefObject<HTMLDivElement>) {
    return (
      <div className="flexing cajita" ref={ref}>
        <ContainerImgMe nameContainer="simon-antonio" />
        <ContainerImgMe nameContainer="antonio-simon" />
      </div>
    );
  },
);

export default HeaderAbout;
