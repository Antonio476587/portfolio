import { ReactElement, useEffect } from "react";

import LikeRunes from "../../components/Work/LikeRunes.tsx";
import HeaderWork from "../../components/Work/HeaderWork.tsx";
import CaseStudy from "../../components/Work/CaseStudy.tsx";
import Classic from "../../components/Work/Classic.tsx";
import Gallery from "../../components/Work/Gallery.tsx";
import NotFound from "../Errors/NotFound.tsx";

import workContents from "./workContents.tsx";

interface Work {
  h2: string | ReactElement;
  p1: string | ReactElement;
  p2: string | ReactElement;
  p3: string | ReactElement;
  p4: string | ReactElement;
  media1: string[];
  media2: string[];
  media3: string[];
  media4: string[];
  styles: string[];
  type: "casestudy" | "gallery" | "classic";
}

interface WorkProps {
  work: Work | undefined;
  index: number;
}

function Work({ work, index }: WorkProps): JSX.Element {
  function prevSection(): void {
    if (index === 1) return;
    location.assign((index - 1).toString());
  }

  function nextSection(): void {
    location.assign((index + 1).toString());
  }

  useEffect(() => {
    globalThis.scrollTo(0, 0);
  }, []);

  if (work) {
    const { type, styles, ...workToRender } = work;
    let selectedPresentationOfWork;

    switch (type) {
      case "casestudy":
        selectedPresentationOfWork = (
          <CaseStudy
            work={workToRender}
            changeSectionFunctions={[prevSection, nextSection]}
          />
        );
        break;
      case "classic":
        selectedPresentationOfWork = (
          <Classic
            work={workToRender}
            changeSectionFunctions={[prevSection, nextSection]}
          />
        );
        break;
      case "gallery":
        selectedPresentationOfWork = (
          <Gallery
            work={workToRender}
            changeSectionFunctions={[prevSection, nextSection]}
          />
        );
        break;
      default:
        selectedPresentationOfWork = (
          <h1 style={{ color: "red" }}>
            There&apos;s no type of work to select a template. Work ID = {index}
          </h1>
        );
    }

    return (
      <div
        id="body-work"
        style={{
          "--color-body-background": styles[0] ?? "#EBEBFF",
          "--color-foreground": styles[1] ?? "#0C043E",
          "--color-foreground-2": styles[2] ?? "#111",
        }}
      >
        <LikeRunes />
        <HeaderWork />
        {selectedPresentationOfWork}
      </div>
    );
  } else return <NotFound />;
}

function WorkWrapper() {
  const splittedUrl = globalThis.location?.pathname.split("/") ?? [0];

  const id = splittedUrl[splittedUrl.length - 1];

  if (typeof id === "string") {
    const workID = parseInt(id);
    if (!isNaN(workID) && workContents[workID - 1]) {
      return <Work work={workContents[workID - 1]} index={workID} />;
    } else if (workContents.length === (workID - 1)) {
      return <Work work={workContents[0]} index={1} />;
    }
  }
  return <div class="vw-100 vh-100 d-flex justify-content-center align-items-center"></div>;
}

export default WorkWrapper;
export { Work };