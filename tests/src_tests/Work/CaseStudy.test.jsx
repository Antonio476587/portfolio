/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import CaseStudy from "../../../src/Work/CaseStudy";

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
    media1: ["video1.mp4", "video1"],
    media2: ["video2.mp4", "video2"],
    media3: ["media3.jpg", "media3"],
    media4: ["video4.mkv", "video4"],
};

describe("When the buttons in the footer are clicked, they should call a function to change the section (page)", () => {

    test("When the first button is called", () => {
        act(() => {
            root.render(<CaseStudy work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });

        expect(mockedChangeSectionFunctions[0]).not.toHaveBeenCalled();

        act(() => {
            document.querySelectorAll(".main-footer div button")[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(mockedChangeSectionFunctions[0]).toHaveBeenCalled();
    });

    test("When the second button is called", () => {
        act(() => {
            root.render(<CaseStudy work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });

        expect(mockedChangeSectionFunctions[1]).not.toHaveBeenCalled();

        act(() => {
            document.querySelectorAll(".main-footer div button")[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(mockedChangeSectionFunctions[1]).toHaveBeenCalled();
    });

});

describe("Testing the strucutre of the workToRender inside the CaseStudy component", () => {

    test("The h2[title=\"work-title\"] element text content should be equal to the h2 property in mockedWorkToRender", () => {
        act(() => {
            root.render(<CaseStudy work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });

        expect(document.querySelector("h2[title=\"work-title\"]").textContent).toEqual(mockedWorkToRender.h2);
    });

    test("The p tags or paragraph should be sorted with his correspondent text", () => {
        act(() => {
            root.render(<CaseStudy work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });

        const { p1, p2, p3, p4 } = mockedWorkToRender;

        const mockedParagraphsToRender = [p1, p2, p3, p4];

        document.querySelectorAll("p").forEach((el, index) => {
            expect(el.textContent).toEqual(mockedParagraphsToRender[index]);
        });
    });

    test("All the images should be sorted and with his correspondent alt attribute and the videos should be only mp4 format", () => {
        act(() => {
            root.render(<CaseStudy work={mockedWorkToRender} changeSectionFunctions={mockedChangeSectionFunctions} />);
        });

        const { media1, media2, media3, media4 } = mockedWorkToRender;

        const mockedImgsToRender = [media1, media2, media3, media4];

        expect(document.querySelectorAll("img")[0].src).toEqual("http://localhost/" + mockedImgsToRender[0][0]);
        expect(document.querySelectorAll("img")[0].alt).toEqual(mockedImgsToRender[0][1]);

        expect(document.querySelectorAll("video")[0].src).toEqual("http://localhost/" + mockedImgsToRender[1][0]);

        expect(document.querySelectorAll("img")[1].src).toEqual("http://localhost/" + mockedImgsToRender[2][0]);
        expect(document.querySelectorAll("img")[1].alt).toEqual(mockedImgsToRender[2][1]);

        expect(document.querySelectorAll("img")[2].src).toEqual("http://localhost/" + mockedImgsToRender[3][0]);
        expect(document.querySelectorAll("img")[2].alt).toEqual(mockedImgsToRender[3][1]);
    });

});