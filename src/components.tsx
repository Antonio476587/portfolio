import MainPage from "./MainPage/index.ts";
import About from "./About/index.ts";
import Works from "./Works/index.ts";
import WorkWrapper from "./Work/index.ts";
import { NotFound } from "./Errors/index.ts";

import { type DefineComponent } from "npm:vue";

interface component {
  component: ((props: any) => JSX.Element) | DefineComponent<any, any, any>,
  name: string,
  path: string,
  type: "react" | "vue",
}

type Components = {
  [key: PropertyKey]: component
}

const components: Components = {
  MainPage: {
    component: MainPage,
    name: MainPage.name,
    path: "/",
    type: "react",
  },
  About: {
    component: About,
    name: About.name,
    path: "/about",
    type: "react",
  },
  Works: {
    component: Works,
    name: Works.name,
    path: "/works",
    type: "vue",
  },
  WorkWrapper: {
    component: WorkWrapper,
    name: WorkWrapper.name,
    path: "/work/:id",
    type: "react",
  },
  NotFound: {
    component: NotFound,
    name: NotFound.name,
    path: "*",
    type: "react",
  },
};

Object.freeze(components);
export default components;
