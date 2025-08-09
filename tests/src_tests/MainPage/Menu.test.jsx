/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import Menu from "../../../src/MainPage/Menu";

let changeVisibilityMenu = null;
let container = null;
let root = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    changeVisibilityMenu = jest.fn();
});

afterEach(() => {
    act(() => {
        root.unmount();
    });
    container.remove();
    container = null;
    changeVisibilityMenu = null;
});

it("should be hidden by default", () => {
    act(() => {
        root.render(<Menu changeVisibilityMenu={changeVisibilityMenu} />);
    });

    expect(document.getElementById("menu").hasAttribute("hidden")).toBeTruthy();
});

it("should call the changeVisibilityMenu function by clicking the button", () => {
    act(() => {
        root.render(<Menu changeVisibilityMenu={changeVisibilityMenu} />);
    });

    act(() => {
        document.querySelector(".menu-button-div button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(changeVisibilityMenu).toHaveBeenCalledTimes(1);

    act(() => {
        document.querySelector(".menu-button-div button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        document.querySelector(".menu-button-div button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(changeVisibilityMenu).toHaveBeenCalledTimes(3);
});

it("should call the changeVisibilityMenu function by clicking on the anchor elements", () => {
    act(() => {
        root.render(<Menu changeVisibilityMenu={changeVisibilityMenu} />);
    });

    const anchorElements = document.querySelectorAll(".menu-item a");

    act(() => {
        anchorElements.forEach((element) => {
            element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
    });

    expect(changeVisibilityMenu).toHaveBeenCalledTimes(anchorElements.length);
});