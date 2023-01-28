import { type ReactElement } from "https://esm.sh/react@18.2.0";

interface workToRender {
  h2: string | ReactElement;
  media1: string[];
  media2: string[];
  media3: string[];
  media4: string[];
  p1: string | ReactElement;
  p2: string | ReactElement;
  p3: string | ReactElement;
  p4: string | ReactElement;
}

interface WorkChild {
  work: workToRender;
  changeSectionFunctions: [() => void, () => void];
}

export default WorkChild;
