import { type DefineComponent } from "https://esm.sh/vue@3.2.47";

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
    component: (props: any) => <div>hola</div>,
    name: "MainPage",
    path: "/",
    type: "react",
  },
};

Object.freeze(components);
export default components;
