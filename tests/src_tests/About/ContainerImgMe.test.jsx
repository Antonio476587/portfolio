/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import ContainerImgMe from "../../../src/About/ContainerImgMe";

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

it("should not render the nameContainer prop", () => {
    act(() => {
        root.render(<ContainerImgMe />);
    });

    expect(document.querySelector(".container.over-img").classList.contains("conCojones")).toBeFalsy();
});

it("should render the nameContainer prop", () => {
    act(() => {
        root.render(<ContainerImgMe nameContainer="conCojones" />);
    });

    expect(document.querySelector(".container.over-img").classList.contains("conCojones")).toBeTruthy();
});

test("the first div is active and the second one is desactive by default", () => {
    act(() => {
        root.render(<ContainerImgMe nameContainer="conCojones" />);
    });

    expect(document.querySelectorAll(".conCojones div")[0].classList.contains("active-me")).toBeTruthy();
    expect(document.querySelectorAll(".conCojones div")[1].classList.contains("desactive-me")).toBeTruthy();
});

test("the classes active-me and desactive-me switch between them", () => {
    act(() => {
        root.render(<ContainerImgMe nameContainer="conCojones" />);
    });

    const activeDiv = document.querySelector(".active-me");
    const desactiveDiv = document.querySelector(".desactive-me");

    expect(activeDiv.classList.contains("active-me")).toBeTruthy();
    expect(activeDiv.classList.contains("desactive-me")).toBeFalsy();

    expect(desactiveDiv.classList.contains("desactive-me")).toBeTruthy();
    expect(desactiveDiv.classList.contains("active-me")).toBeFalsy();

    act(() => {
        document.querySelector("button.bbtn").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(activeDiv.classList.contains("desactive-me")).toBeTruthy();
    expect(activeDiv.classList.contains("active-me")).toBeFalsy();

    expect(desactiveDiv.classList.contains("active-me")).toBeTruthy();
    expect(desactiveDiv.classList.contains("desactive-me")).toBeFalsy();

    act(() => {
        document.querySelector("button.bbtn").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(activeDiv.classList.contains("active-me")).toBeTruthy();
    expect(activeDiv.classList.contains("desactive-me")).toBeFalsy();

    expect(desactiveDiv.classList.contains("desactive-me")).toBeTruthy();
    expect(desactiveDiv.classList.contains("active-me")).toBeFalsy();
});