/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React, { useRef } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import HeaderAbout from "../../../src/About/HeaderAbout";

jest.mock("../../../src/About/ContainerImgMe", () => {
    return function dummyContainerImgMe(props) {
        return (
            <button className={props.nameContainer} />
        );
    };
});

function HeaderAboutWrapper() {
    const dummyRef = useRef();

    return (
        <HeaderAbout ref={dummyRef} />
    );
}

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

it("should give the nameContainer props", () => {
    act(() => {
        root.render(<HeaderAboutWrapper />);
    });

    expect(document.querySelectorAll("button")[0].classList.toString()).toEqual("simon-antonio");
    expect(document.querySelectorAll("button")[1].classList.toString()).toEqual("antonio-simon");
});