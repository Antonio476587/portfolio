/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import About, { InfoAbout } from "../../../src/About/About";


jest.mock("../../../src/About/HeaderAbout");

jest.mock("../../../src/About/Illustration");

function BrowserRouterWrapper(props) {
    return (
        <BrowserRouter>
            <About />
        </BrowserRouter>
    );
}

function InfoAboutWrapper(props) {
    const infoAboutRef = React.useRef();
    return (
        <InfoAbout ref={infoAboutRef} />
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

it("should exist", () => {
    act(() => {
        root.render(<BrowserRouterWrapper />);
    });

    expect(document.getElementById("About")).not.toBeNull();
});

it("should render the .svg-div elements", () => {
    act(() => {
        root.render(<BrowserRouterWrapper />);
    });

    document.querySelectorAll(".svg-div").forEach(element => {
        expect(element.getAttribute("style").includes("translate")).toBeTruthy();
        expect(element.getAttribute("style").includes("rotate")).toBeTruthy();
    });
});

describe("when location.pathname == /about", () => {

    let location = null;
    beforeAll(() => {
        delete globalThis.location;
        location = new URL("https://test.fantonix.space/about");
        globalThis.location = location;
    });

    afterAll(() => {
        delete globalThis.location;
        location = new URL("https://test.fantonix.space/");
        globalThis.location = location;
        location = null;
    });

    test("location.pathname == /about", () => {
        expect(location.pathname).toEqual("/about");
    });

    it("should animate .svg-div elements", () => {
        act(() => {
            root.render(<BrowserRouterWrapper />);
        });

        document.querySelectorAll(".svg-div").forEach(animatedElement => {
            expect(animatedElement.getAttribute("style").includes("scale")).toBeTruthy();
        });
    });
});

describe("when location.pathname != '/about", () => {

    test("location.pathname != '/about", () => {
        expect(location.pathname).toEqual("/");
        expect(location.pathname).not.toEqual("/about");
    });

    it("shouldn't animate .svg-div elements", () => {
        act(() => {
            root.render(<BrowserRouterWrapper />);
        });

        document.querySelectorAll(".svg-div").forEach(notAnimatedElement => {
            expect(notAnimatedElement.getAttribute("style").includes("scale")).toBeFalsy();
        });

    });

});

describe("InfoAbout", () => {

    it("should exist?", () => {
        act(() => {
            root.render(<InfoAboutWrapper />);
        });

        expect(document.querySelector(".about-me.cajita")).not.toBeNull();
    });

    it("should have a h3 element which content is equal to 'About me'", () => {
        act(() => {
            root.render(<InfoAboutWrapper />);
        });

        expect(document.querySelector("h3.h3").textContent).toEqual("About me");
    });

    it("should have a parragraph which content length is (250, 500] ", () => {
        act(() => {
            root.render(<InfoAboutWrapper />);
        });

        expect(document.querySelector("p.p-about-me").textContent.length).toBeLessThan(501);
        expect(document.querySelector("p.p-about-me").textContent.length).toBeGreaterThan(250);
    });

});