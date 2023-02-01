import React from "https://esm.sh/react@18.2.0";

interface BuildingWindow {
  defaultStatus: string;
  img: string;
  alternativeText: string;
  workUrlId: string;
}

function BuildingWindow(
  { defaultStatus, img, alternativeText, workUrlId }: BuildingWindow,
) {
  return (
    <div className={defaultStatus}>
      <a href={`/work/${workUrlId}`}>
        <img src={img} alt={alternativeText} />
      </a>
    </div>
  );
}

export default BuildingWindow;
