/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import Contact, { BlockquouteDate, ContactLink } from "../../../src/MainPage/Contact";

jest.mock("../../../src/MainPage/FormContact");
jest.mock("../../../src/MainPage/MenuNFT");

let dummyContactRef = null;
let dummyChangeVisibilityMenuFunction = null;

function DummyContactWrapper() {
    dummyContactRef = React.useRef();
    dummyChangeVisibilityMenuFunction = jest.fn();

    return (
        <>
            <Contact ref={dummyContactRef} changeVisibilityMenu={dummyChangeVisibilityMenuFunction} />
        </>
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

describe("Contact testing", () => {

    test("dummyContactRef should have the #Contact inside his current property", () => {
        act(() => {
            root.render(<DummyContactWrapper />);
        });

        expect(dummyContactRef.current).toEqual(document.getElementById("Contact"));
    });

    test("should call the dummyChangeVisibilityMenu function by clicking the menu button", () => {
        act(() => {
            root.render(<DummyContactWrapper />);
        });

        const button = document.querySelector(".abrir button");

        expect(dummyChangeVisibilityMenuFunction).not.toHaveBeenCalled();

        act(() => {
            button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(dummyChangeVisibilityMenuFunction).toHaveBeenCalledTimes(1);

        act(() => {
            button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(dummyChangeVisibilityMenuFunction).toHaveBeenCalledTimes(4);
        // Like be called with nothing
        expect(dummyChangeVisibilityMenuFunction).toHaveBeenCalledWith();
    });

});

describe("ContactLink testing", () => {


    let d = "M4.854 14.854a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V3.5A2.5 2.5 0 0 1 6.5 1h8a.5.5 0 0 1 0 1h-8A1.5 1.5 0 0 0 5 3.5v9.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4z";
    let dummySvg = (<svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-arrow-90deg-down"
        viewBox="0 0 16 16"
    >
        <path
            fillRule="evenodd"
            d={d}
        />
    </svg>);
    let location = null;
    let oldLocation = globalThis.location;

    beforeAll(() => {
        delete globalThis.location;
        location = new URL("https://test.wolando.com");
        location.assign = jest.fn();
        globalThis.location = location;
    });

    afterAll(() => {
        d = null;
        dummySvg = null;
        location = null;

        delete globalThis.location;
        globalThis.location = oldLocation;
        oldLocation = null;
    });

    it("should render the correct props", () => {
        const title = "Yanomami";

        act(() => {
            root.render(<ContactLink
                title={title}
                svg={dummySvg}
            />);
        });

        expect(document.querySelector(".contact__link").getAttribute("title")).toEqual(title);
        expect(document.querySelector(".contact__link div").classList.contains(title)).toBeTruthy();

        expect(document.querySelector(".contact__link svg path").getAttribute("d")).toEqual(d);

    });

    it("must call the location.assign function", () => {
        const link = "dns://fuckingland.com/killshot";
        act(() => {
            root.render(<ContactLink
                link={link}
            />);
        });

        expect(globalThis.location.assign).not.toHaveBeenCalled();

        act(() => {
            document.querySelector(".contact__link").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(globalThis.location.assign).toHaveBeenCalled();
        expect(globalThis.location.assign).toHaveBeenCalledWith(link);

        act(() => {
            document.querySelector(".contact__link").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            document.querySelector(".contact__link").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(globalThis.location.assign).toHaveBeenCalledTimes(3);

    });

});

describe("BlockquouteDate testing", () => {

    it("should render the correct props", () => {
        const cite = "https://music.youtube.com/watch?v=7Fj8zLwyjC8";
        const content = "Ey, me acabo de ir pero ya quiero regresar";
        const autor = "Myke Towers";

        act(() => {
            root.render(
                <BlockquouteDate
                    cite={cite}
                    content={content}
                    autor={autor}
                />);

        });

        expect(document.querySelector("blockquote").cite).toEqual(cite);

        expect(document.querySelector("b").textContent.toString().includes(content)).toBeTruthy();
        expect(document.querySelector("b").textContent.toString().includes(autor)).toBeTruthy();

        expect(document.querySelector("i").textContent.toString().includes(content)).toBeFalsy();
        expect(document.querySelector("i").textContent.toString().includes(autor)).toBeTruthy();

    });

});