/**
 * @module componentFactory
 * @author Felix Cabello <https://github.com/Antonio476587> */

import components from "../src/components.tsx";

import { type DefineComponent } from "https://esm.sh/vue@3.2.47";

type Component = {
  Component: ((props?: any) => JSX.Element) | DefineComponent<any, any, any>;
  name: string;
  type: "react" | "vue";
  groups: Record<string, string> | undefined
};

/** componentFactory
 * @param {Request["url"]} url
 * @return {Component} Represents the concrete Component to create
 */
function componentFactory(url: Request["url"]): Component {
  for (const componentObject of Object.values(components)) {
    if (
      (new URLPattern({ pathname: componentObject.path })).test({
        pathname: new URL(url).pathname,
      })
    ) {
      const { component, name, type } = componentObject;
      const groups = new URLPattern({ pathname: componentObject.path }).exec({ pathname: new URL(url).pathname })?.pathname?.groups;

      return {
        Component: component,
        name,
        type,
        groups
      };
    }
  }
  return {
    Component: components.NotFound.component,
    name: components.NotFound.name,
    type: "react",
    groups: undefined
  };
}

export default componentFactory;