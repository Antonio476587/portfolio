/**
 * @module componentFactory
 * @author Felix Cabello <https://github.com/Antonio476587> */

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import components from "../src/components.tsx";

type Component = {
  Component: (props?: any) => JSX.Element;
  name: string;
};

/** componentFactory
 * @param {Request["url"]} url - A string URL with a pathname
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
  console.log("ahuevo");
  return {
    Component: components.NotFound.component,
    name: components.NotFound.name,
  };
}

Deno.test({
  name: "ComponentFactory",
  fn() {
    const mockedUrl: Request["url"] = "https://kingkongvsnaruto.com/about";
    const { component: Component, name } = components.About;

    const component = componentFactory(mockedUrl);

    assertEquals({Component, name}, component);
  },
})

export default componentFactory;