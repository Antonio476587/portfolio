/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import MainMenuItem from "../../../src/MainPage/MainMenuItem";

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

test("The div's style variables should be in descending order", () => {
    act(() => {
        root.render(<MainMenuItem />);
    });

    function styleParser(styleString) {
        if (typeof styleString == "string") {
            const styleArray = styleString.split(";");
            let selectedStringVariable = null;

            styleArray.forEach(element => {
                if (element.includes("--i")) selectedStringVariable = element;
            });

            if (selectedStringVariable !== null) {
                const selectedArrayVariable = selectedStringVariable.split(":");
                selectedStringVariable = selectedArrayVariable[1];
            }

            return parseInt(selectedStringVariable);
        }
        return undefined;
    }

    function stlyeVerifier(parentElement) {
        const divToVerifyItsStyle = parentElement.firstChild;

        if (styleToVerify == null) return;

        const styleToVerify = styleParser(divToVerifyItsStyle.getAttribute("style"));
        const parentElementStyle = styleParser(parentElement.getAttribute("style"));

        if (typeof styleToVerify == "number" && typeof parentElementStyle == "number") {
            expect(styleToVerify).toBeGreaterThan(parentElementStyle);
        }

        stlyeVerifier(divToVerifyItsStyle);
    }

    const MainMenuItemElement = document.querySelector(".main-menu-item");
    stlyeVerifier(MainMenuItemElement);
});

describe("props rendering", () => {

    it("with id", () => {
        act(() => {
            root.render(<MainMenuItem id="viendo-al-futuro" />);
        });

        expect(document.querySelector(".main-menu-item").id).toEqual("viendo-al-futuro");
    });

    it("name prop", () => {
        act(() => {
            root.render(<>
                <MainMenuItem name="About" id="wisa" />
                <MainMenuItem name="Works" id="wasi" />
            </>);
        });

        expect(document.querySelectorAll(".main-menu-item")[0].id).toEqual("wisa");
        expect(document.querySelectorAll(".main-menu-item")[1].id).toEqual("wasi");

        expect(document.querySelector("#wisa svg").outerHTML == document.querySelector("#wasi svg").outerHTML).toBeFalsy();

    });

});