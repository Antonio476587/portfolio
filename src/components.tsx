import MainPage from "./MainPage/index.ts";
import About from "./About/index.ts";
import Works from "./Works/index.ts";
import WorkWrapper from "./Work/index.ts";
import { NotFound } from "./Errors/index.ts";

const components = {
  MainPage: {
    component: MainPage,
    name: MainPage.name,
    path: "/",
  },
  About: {
    component: About,
    name: About.name,
    path: "/about",
  },
  Works: {
    component: Works,
    name: Works.name,
    path: "/works",
  },
  WorkWrapper: {
    component: WorkWrapper,
    name: WorkWrapper.name,
    path: "/work/:id",
  },
  NotFound: {
    component: NotFound,
    name: NotFound.name,
    path: "*"
  },
};

Object.freeze(components);
export default components;
