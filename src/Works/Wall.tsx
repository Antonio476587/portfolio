import React from "https://esm.sh/react@18.2.0";

import { getWorksForWall } from "./worksPresentation.tsx";
import BuildingWindow from "./BuildingWindow.tsx";

interface Wall {
  wallID: string;
}

function isEven(num: number): boolean {
  return num % 2 === 0 ? true : false;
}

function Wall({ wallID }: Wall) {
  const works = getWorksForWall(wallID);

  let lastImgInserted: "landscape" | "squared";

  return (
    <div id={`wall-${wallID}`} className="wall" style={{ "--i": wallID }}>
      {works !== undefined
        ? works.map((value, index) => {
          const { img, squaredImg, ...leftoverProps } = value;

          if (isEven(index)) {
            if (Math.round(Math.random() * 10) > 5) {
              lastImgInserted = "landscape";
              return (
                <BuildingWindow
                  key={index}
                  defaultStatus="img"
                  img={img}
                  {...leftoverProps}
                />
              );
            }
            lastImgInserted = "squared";
            return (
              <BuildingWindow
                key={index}
                defaultStatus="img-squared"
                img={squaredImg}
                {...leftoverProps}
              />
            );
          } else {
            if (lastImgInserted === "squared") {
              lastImgInserted = "landscape";
              return (
                <BuildingWindow
                  key={index}
                  defaultStatus="img"
                  img={img}
                  {...leftoverProps}
                />
              );
            }
            lastImgInserted = "squared";
            return (
              <BuildingWindow
                key={index}
                defaultStatus="img-squared"
                img={squaredImg}
                {...leftoverProps}
              />
            );
          }
        })
        : <p>An error ocurred</p>}
    </div>
  );
}

export default Wall;

export { isEven };
