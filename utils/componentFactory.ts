/**
 * @module componentFactory
 * @author Felix Cabello <https://github.com/Antonio476587> */

import components from "../src/components.tsx";

type Component = {
  Component: (props?: any) => JSX.Element;
  name: string;
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
      const { component, name } = componentObject;
      return {
        Component: component,
        name,
      };
    }
  }
  return {
    Component: components.NotFound.component,
    name: components.NotFound.name,
  };
}

export default componentFactory;