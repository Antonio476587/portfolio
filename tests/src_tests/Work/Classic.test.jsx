/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import Classic from "../../../src/Work/Classic";
 
let container = null;
let root = null;
 
let mockedPrevSectionFunction = null;
let mockedNextSectionFunction = null;
let mockedChangeSectionFunctions = new Array(2);
 
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    mockedPrevSectionFunction = jest.fn();
    mockedNextSectionFunction = jest.fn();
    mockedChangeSectionFunctions = [mockedPrevSectionFunction, mockedNextSectionFunction];
});
 
afterEach(() => {
    act(() => {
        root.unmount();
    });
    container.remove();
    container = null;
    mockedPrevSectionFunction = null;
    mockedNextSectionFunction = null;
});
 
const mockedWorkToRender = {
    h2: "h2",
    p1: "p1",
    p2: "p2",
    p3: "p3",
    p4: "p4",
    media1: ["media1.jpg", "media1"],
    media2: ["media2.jpg", "media2"],
    media3: ["media3.jpg", "media3"],
    media4: ["media4.jpg", "media4"],
};
 
describe("When the buttons in the footer are clicked, they should call a function to change the section (page)", () => {
 
    test("When the first button is called", () => {
        act(() => {
            root.render(<Classic work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });
 
        expect(mockedChangeSectionFunctions[0]).not.toHaveBeenCalled();
 
        act(() => {
            document.getElementById("prev-section-button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
 
        expect(mockedChangeSectionFunctions[0]).toHaveBeenCalled();
    });
 
    test("When the second button is called", () => {
        act(() => {
            root.render(<Classic work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });
 
        expect(mockedChangeSectionFunctions[1]).not.toHaveBeenCalled();
 
        act(() => {
            document.getElementById("next-section-button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
 
        expect(mockedChangeSectionFunctions[1]).toHaveBeenCalled();
    });
 
});

describe("Testing the strucutre of the workToRender inside the Classic component", () => {
 
    test("The h2 property should be the unique h1 element in the component", () => {
        act(() => {
            root.render(<Classic work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });
 
        expect(document.querySelector("h2").textContent).toEqual(mockedWorkToRender.h2);
    });
 
    test("The p tags or paragraph should be sorted with his correspondent text", () => {
        act(() => {
            root.render(<Classic work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });
 
        const { p1, p2, p3, p4 } = mockedWorkToRender;
 
        const mockedParagraphsToRender = [p1, p2, p3, p4];
 
        document.querySelectorAll("p").forEach((el, index) => {
            if (index == 3) return expect(el.textContent).toEqual(mockedParagraphsToRender[index]);
            expect(el.textContent.startsWith("#")).toBeTruthy();
            expect(el.textContent.slice(1).trimStart()).toEqual(mockedParagraphsToRender[index]);
        });
    });
 
    test("All the images should be sorted and with his correspondent alt attribute", () => {
        act(() => {
            root.render(<Classic work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });
 
        const { media1, media2, media3, media4 } = mockedWorkToRender;
 
        const mockedImgsToRender = [media1, media2, media3, media4];
 
        document.querySelectorAll("img").forEach((el, index) => {
            expect(el.src).toEqual("http://localhost/" + mockedImgsToRender[index][0]);
            expect(el.alt).toEqual(mockedImgsToRender[index][1]);
        });
    });
 
});

test("Scroll up button", () => {
    act(() => {
        root.render(<Classic work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
    });

    delete globalThis.scrollTo;
    globalThis.scrollTo = jest.fn();

    expect(globalThis.scrollTo).not.toHaveBeenCalled();
    
    act(() => {
        document.getElementById("scroll-up-button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    
    expect(globalThis.scrollTo).toHaveBeenCalledWith(0, 0);

    act(() => {
        document.getElementById("scroll-up-button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        document.getElementById("scroll-up-button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(globalThis.scrollTo).toHaveBeenCalledTimes(3);
});