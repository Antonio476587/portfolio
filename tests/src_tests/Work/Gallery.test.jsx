/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import Gallery from "../../../src/Work/Gallery";

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
            root.render(<Gallery work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });

        expect(mockedChangeSectionFunctions[0]).not.toHaveBeenCalled();

        act(() => {
            document.querySelectorAll("#gallery-footer > div button")[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(mockedChangeSectionFunctions[0]).toHaveBeenCalled();
    });

    test("When the second button is called", () => {
        act(() => {
            root.render(<Gallery work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });

        expect(mockedChangeSectionFunctions[1]).not.toHaveBeenCalled();

        act(() => {
            document.querySelectorAll("#gallery-footer > div button")[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(mockedChangeSectionFunctions[1]).toHaveBeenCalled();
    });

});


describe("Carousel", () => {

    test("The slide active by default must be the first", () => {
        act(() => {
            root.render(<Gallery work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });

        expect(document.querySelector(".carousel-inner").firstElementChild).toEqual(document.querySelector(".carousel-item.active"));
    });

    test("All the images should have the width and height attributes with '100%'", () => {
        act(() => {
            root.render(<Gallery work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });

        document.querySelectorAll("img").forEach(el => {
            expect(el.getAttribute("width")).toEqual("100%");
            expect(el.getAttribute("height")).toEqual("100%");
        });
    });

});
 

describe("Testing the strucutre of the workToRender inside the Gallery component", () => {

    test("The h2 property should be the unique h1 element in the component", () => {
        act(() => {
            root.render(<Gallery work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });

        expect(document.querySelector("h1").textContent).toEqual(mockedWorkToRender.h2);
    });

    test("The p tags or paragraph should be sorted with his correspondent text", () => {
        act(() => {
            root.render(<Gallery work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });

        const { p1, p2, p3, p4 } = mockedWorkToRender;

        const mockedParagraphsToRender = [p1, p2, p3, p4];

        document.querySelectorAll("p").forEach((el, index) => {
            expect(el.textContent).toEqual(mockedParagraphsToRender[index]);
        });
    });

    test("All the images should be sorted and with his correspondent alt attribute", () => {
        act(() => {
            root.render(<Gallery work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });

        const { media1, media2, media3, media4 } = mockedWorkToRender;

        const mockedImgsToRender = [media1, media2, media3, media4];

        document.querySelectorAll("img").forEach((el, index) => {
            expect(el.src).toEqual("http://localhost/" + mockedImgsToRender[index][0]);
            expect(el.alt).toEqual(mockedImgsToRender[index][1]);
        });
    });

});