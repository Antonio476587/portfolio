/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

// For functionality only, it will integrate the gsap in the globalObject so it can be called
import gsap from "gsap";
globalThis.gsap = gsap;

import MainPage from "../../../src/MainPage";

jest.mock("../../../src/MainPage/Contact", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const React = require("react");


    const DummyContact = React.forwardRef(function DummyContact({ changeVisibilityMenu }, ref) {
        return (
            <button id="dummyContactButton" onClick={() => changeVisibilityMenu()} ref={ref} >
                click_here
                <div className="linkedIN" />
            </button>
        );
    });
    return DummyContact;
});
jest.mock("../../../src/MainPage/Menu", () => {
    return function DummyMenu({ changeVisibilityMenu }) {
        return (
            <div className="menu" id="menu" hidden={true} >
                <button id="dummyMenuButton" onClick={() => changeVisibilityMenu()}>
                    click_here
                </button>
                <div className="menu-base-footer" />
            </div>
        );
    };
});

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

test("Changing the menu visibility by clicking on dummyContactButton", () => {
    act(() => {
        root.render(<MainPage />);
    });

    expect(document.querySelector(".menu").hasAttribute("hidden")).toBeTruthy();

    act(() => {
        document.getElementById("dummyContactButton").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.querySelector(".menu").hasAttribute("hidden")).toBeFalsy();

    act(() => {
        document.getElementById("dummyContactButton").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.querySelector(".menu").hasAttribute("hidden")).toBeTruthy();
});

test("Changing the menu visibility by clicking on dummyMenuButton", () => {
    act(() => {
        root.render(<MainPage />);
    });

    expect(document.querySelector(".menu").hasAttribute("hidden")).toBeTruthy();

    act(() => {
        document.getElementById("dummyMenuButton").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.querySelector(".menu").hasAttribute("hidden")).toBeFalsy();

    act(() => {
        document.getElementById("dummyMenuButton").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.querySelector(".menu").hasAttribute("hidden")).toBeTruthy();
});

describe("animations", () => {

    let gsapFromFunctionTemp = gsap.from;
    let gsapToFunctionTemp = gsap.to;

    beforeAll(() => {
        delete gsap.to;
        delete gsap.from;
        gsap.to = gsap.set;
        gsap.from = gsap.set;
    });

    afterAll(() => {
        delete gsap.to;
        delete gsap.from;
        gsap.to = gsapToFunctionTemp;
        gsap.from = gsapFromFunctionTemp;
    });

    test("animating the .menu-base-footer", () => {
        act(() => {
            root.render(<MainPage />);
        });

        const menuBaseFooterOldOuterHtml = document.querySelector(".menu-base-footer").outerHTML;

        act(() => {
            document.getElementById("dummyContactButton").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        const menuBaseFooterOldOuterHtmlTwo = document.querySelector(".menu-base-footer").outerHTML;

        expect(menuBaseFooterOldOuterHtmlTwo).not.toEqual(menuBaseFooterOldOuterHtml);
        expect(document.querySelector(".menu").hasAttribute("hidden")).toBeFalsy();

        act(() => {
            document.getElementById("dummyContactButton").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        const menuBaseFooterOldOuterHtmlThree = document.querySelector(".menu-base-footer").outerHTML;

        expect(menuBaseFooterOldOuterHtmlTwo).not.toEqual(menuBaseFooterOldOuterHtmlThree);
        expect(document.querySelector(".menu").hasAttribute("hidden")).toBeTruthy();
    });

    describe("scrollTrigger, it should be tested in a Browser, but I will try", () => {
        // To implement
    });

});