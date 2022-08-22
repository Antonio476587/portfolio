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
            <button nameContainer={props.nameContainer} />
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
    root.unmount();
    container.remove();
    container = null;
});

it("totona", () => {
    act(() => {
        root.render(<HeaderAboutWrapper />);
    });

    expect(document.querySelectorAll("button")[0].getAttribute("nameContainer")).toEqual("simon-antonio");
    expect(document.querySelectorAll("button")[1].getAttribute("nameContainer")).toEqual("antonio-simon");
});