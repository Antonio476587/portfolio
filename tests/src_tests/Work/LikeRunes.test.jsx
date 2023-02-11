/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import LikeRunes from "../../../src/Work/LikeRunes";

let container = null;
let root = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    jest.useFakeTimers();
});

afterEach(() => {
    act(() => {
        root.unmount();
    });
    container.remove();
    jest.useRealTimers();
});

test("The divs should start the animation from these values", () => {
    act(() => {
        root.render(<LikeRunes />);
    });

    document.querySelectorAll("#like-runes div").forEach((el) => {
        el.getAttribute("style").includes("width: 50%");
    });
});