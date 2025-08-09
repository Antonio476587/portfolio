/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import Works from "../../../src/Works";

jest.mock("../../../src/Works/Wall", () => {
    return function dummyWorksFunction(props) {
        return <div className="wall" />;
    };
});

const getElById = (stringToGetElement, options) => {
    const el = document.getElementById(stringToGetElement);
    if (options) {
        switch (true) {
            case options.fC:
                return el.firstChild;
            case options.lC:
                return el.lastChild;
            case options.len:
                return el.children.length;
            default:
                return el;
        }
    }
    return el;
};

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

test("the HTML structure must be correctly done", () => {
    act(() => {
        root.render(<Works />);
    });

    const rootElement = document.body.children[0];

    expect(rootElement.children.length).toEqual(1);
    expect(rootElement.firstChild).toEqual(getElById("state"));

    expect(getElById("state", { len: true })).toEqual(2);
    expect(getElById("state", { fC: true })).toEqual(getElById("city"));
    expect(getElById("state", { lC: true })).toEqual(getElById("scroll-down-tip"));

    // City
    expect(getElById("city", { len: true })).toEqual(2);
    expect(getElById("city", { fC: true })).toEqual(getElById("place"));
    expect(getElById("city", { lC: true })).toEqual(getElById("street"));

    // // Place
    expect(getElById("place", { len: true })).toEqual(1);
    expect(getElById("place", { fC: true })).toEqual(getElById("building"));


    expect(getElById("building", { len: true })).toEqual(6);
    expect(getElById("building", { fC: true })).toEqual(getElById("roof"));
    expect(document.getElementsByClassName("wall").length).toEqual(4);
    expect(getElById("building", { lC: true })).toEqual(getElById("foundations"));

    // // Street

    expect(getElById("street", { len: true })).toEqual(1);
    expect(getElById("street", { fC: true })).toEqual(getElById("floor"));

    // Scroll Down Tip
    expect(getElById("scroll-down-tip", { len: true })).toEqual(1);
    expect(getElById("scroll-down-tip", { fC: true })).toEqual(document.querySelector(".bi-arrow-down-circle"));

});

test("Pre setting", () => {
    act(() => {
        root.render(<Works />);
    });

    expect(getElById("place").getAttribute("style")).toEqual("transform: rotateX(-30deg) rotateY(235deg) scale(0.9) ;");
});

describe("Events", () => {

    test("scrollTip animationend event", () => {
        act(() => {
            root.render(<Works />);
        });

        const scrollDownTip = getElById("scroll-down-tip");
        const scrollDownTipClassList = scrollDownTip.classList.toString();

        act(() => {
            scrollDownTip.dispatchEvent(new Event("animationend", { bubbles: true }));
        });
        
        expect(scrollDownTip.classList.toString()).not.toEqual(scrollDownTipClassList);
    });

    describe("globalThis scroll event handled by scrollAnimator function", () => {

        beforeAll(() => {
            globalThis.scrollMaxY = 500;
            globalThis.scrollY = 1;
        });

        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        test("when pageScrollPercent is less than 50", () => {
            const pageScrollPercent = (scrollY * 100) / globalThis.scrollMaxY;
            const pageScrollPercentDividedByAnHundred = pageScrollPercent / 100;
    
            act(() => {
                root.render(<Works />);
            });
    
            act(() => {
                globalThis.dispatchEvent(new Event("scroll", { bubbles: true }));
            });
    
            act(() => {
                jest.advanceTimersByTime(1500);
            });

            expect(getElById("city").getAttribute("style")).toEqual(`transform: translateY(${globalThis.scrollY}px); overflow-y: hidden;`);
            expect(getElById("place").getAttribute("style")).toEqual(`transform: rotateX(-30deg) rotateY(235deg) scale(${(Math.min(
                pageScrollPercentDividedByAnHundred + 0.9,
                1.8
            ))}) ;`);

            document.querySelectorAll(".wall").forEach((el) => {
                expect(el.getAttribute("style")).toEqual("box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);");
            });

            expect(getElById("place").getAttribute("style").includes("rotateX(-30deg)")).toBeTruthy();
            expect(getElById("place").getAttribute("style").includes("rotateY(235deg)")).toBeTruthy();
            expect(getElById("building").getAttribute("style")).toEqual("transform: translateY(0px) ;");
            expect(getElById("street").getAttribute("style")).toEqual("height: 95vw; top: 1%;");
        });

        test("when pageScrollPercent is greater than 50", () => {
            delete globalThis.scrollY;
            globalThis.scrollY = 260;

            const pageScrollPercent = (scrollY * 100) / globalThis.scrollMaxY;
            const pageScrollPercentDividedByAnHundred = pageScrollPercent / 100;

            act(() => {
                root.render(<Works />);
            });

            act(() => {
                globalThis.dispatchEvent(new Event("scroll", { bubbles: true }));
            });

            act(() => {
                jest.advanceTimersByTime(1500);
            });

            expect(getElById("city").getAttribute("style")).toEqual(`transform: translateY(${globalThis.scrollY}px); overflow-y: scroll;`);
            expect(getElById("place").getAttribute("style")).toEqual(`transform: rotateX(0deg) rotateY(270deg) scale(${(Math.min(
                pageScrollPercentDividedByAnHundred + 0.9,
                1.8
            ))}) ;`);
            
            document.querySelectorAll(".wall").forEach((el) => {
                expect(el.getAttribute("style")).toEqual("box-shadow: 0px 0px 100px 70px rgba(0, 0, 0, 0.4);");
            });

            expect(getElById("place").getAttribute("style").includes("rotateX(0deg)")).toBeTruthy();
            expect(getElById("place").getAttribute("style").includes("rotateY(270deg)")).toBeTruthy();
            expect(getElById("building").getAttribute("style")).toEqual("transform: translateY(150px) ;");
            expect(getElById("street").getAttribute("style")).toEqual("height: 0px; top: 20%;");
        });

    });

});

