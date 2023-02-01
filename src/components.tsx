import MainPage from "./MainPage/index.ts";
import About from "./About/index.ts";
import Works from "./Works/index.ts";
import WorkWrapper from "./Work/index.ts";
import { NotFound } from "./Errors/index.ts";

const components = {
  MainPage: {
    component: MainPage,
    name: "MainPage",
  },
  About: {
    component: About,
    name: "About",
  },
  Works: {
    component: Works,
    name: "Works",
  },
  WorkWrapper: {
    component: WorkWrapper,
    name: "Work",
  },
  NotFound: {
    component: NotFound,
    name: "NotFound",
  },
};

Object.freeze(components);
export default components;
