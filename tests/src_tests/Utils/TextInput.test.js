/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import TextInput from "../../../src/Utils/TextInput";

let container = null;
let root = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
});

afterEach(() => {
    act(() => {
        root.unmount();
    });
    container.remove();
    container = null;
});

it("shouldn't render without props and be an input element", () => {
    act(() => {
        root.render(<TextInput inputProps={{}} />);
    });

    expect(document.body.innerHTML.includes("input")).toBeTruthy();
    expect(document.querySelector("input")).not.toBeNull();
    expect(document.body.firstChild.innerHTML).toEqual("<input value=\"\">");
});

it("should be a textarea", () => {
    const inputProps = {
        tag: "textarea",
        rows: "10",
        columns: "10"
    };

    act(() => {
        root.render(<TextInput inputProps={inputProps} />);
    });

    expect(document.querySelector("input")).toBeNull();
    expect(document.querySelector("textarea")).not.toBeNull();
    expect(document.querySelector("textarea").getAttribute("rows")).toEqual("10");
    expect(document.querySelector("textarea").getAttribute("columns")).toEqual("10");
});

it("should render the appropiate props", () => {
    const inputProps = {
        type: "text",
        name: "name",
        id: "name",
        key: "name",
        placeholder: "Name or enterprise name",
        value: "mamasita",
    };
    act(() => {
        root.render(<TextInput inputProps={inputProps} />);
    });
    const textInput = document.getElementsByTagName("input")[0];

    expect(textInput.getAttribute("type")).toEqual(inputProps.type);
    expect(textInput.getAttribute("name")).toEqual(inputProps.name);
    expect(textInput.getAttribute("id")).toEqual(inputProps.id);
    expect(textInput.getAttribute("placeholder")).toEqual(inputProps.placeholder);
    expect(textInput.getAttribute("value")).toEqual(inputProps.value);
});

it("should have an empty value", () => {
    const inputProps = {
        value: "baby te necesito",
    };

    act(() => {
        root.render(<TextInput inputProps={inputProps} clear={true} />);
    });

    expect(document.getElementsByTagName("input")[0].getAttribute("value")).toEqual("");
});

describe("event testing", () => {

// I wasn't able to test the onChange and onBlur events in textInput.tsx

});