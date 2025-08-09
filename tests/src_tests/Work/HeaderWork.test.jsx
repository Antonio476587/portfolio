/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { Link, BrowserRouter } from "react-router-dom";
// This is for button functionality
import bootstrap from "bootstrap";
import { act } from "react-dom/test-utils";

import HeaderWork from "../../../src/Work/HeaderWork";

function BrowserRouterWrapper(props) {
    return (
        <BrowserRouter>
            <HeaderWork />
        </BrowserRouter>
    );
}

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
    container = null;
    jest.useRealTimers();
});

it("should expand the navbar and change some classes", () => {
    act(() => {
        root.render(<BrowserRouterWrapper />);
    });

    const smootherNav = document.querySelector(".smoother-nav");

    document.querySelector("button.navbar-toggler").dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(smootherNav.classList.toString()).toEqual("navbar-collapse smoother-nav collapsing");

    act(() => {
        jest.advanceTimersByTime(500);
    });

    expect(smootherNav.classList.toString()).toEqual("navbar-collapse smoother-nav collapse show");
});

it("should toggle the active class of the anchorActive and anchorHome", () => {
    act(() => {
        root.render(<BrowserRouterWrapper />);
    });


    const anchorActive = document.querySelector("a.active");
    const anchorHome = document.querySelector("a[href='/?P=false']");

    act(() => {
        anchorHome.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    });

    expect(anchorActive.classList.contains("active")).toBeFalsy();
    expect(anchorHome.classList.contains("active")).toBeTruthy();
});

it("should remove the active class", () => {
    act(() => {
        root.render(<BrowserRouterWrapper />);
    });

    const anchorActive = document.querySelector("a.active");

    act(() => {
        anchorActive.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
    });

    expect(anchorActive.classList.contains("active")).toBeFalsy();
});