/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
 
import BuildingWindow from "../../../src/Works/BuildingWindow";
 
function BuildingWindowWrapper (props) {
    return (
        <BrowserRouter>
            <BuildingWindow {...props} />
        </BrowserRouter>  
    );
}

let container = null;
let root = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
        root = createRoot(container);
    });
});
 
afterEach(() => {
    act(() => {
        root.unmount();
    });
    container.remove();
    container = null;
});

describe("Rendered props", () => {

    test("defaultStatus prop", () => {
        const defaultStatus = "default-status";

        act(() => {
            root.render(<BuildingWindowWrapper defaultStatus={defaultStatus} />);
        });

        expect(document.querySelector(`div.${defaultStatus}`)).not.toBeNull();
    });

    test("img prop", () => {
        const imgUrl = "url/to/an/image/awesome.jpg";

        act(() => {
            root.render(<BuildingWindowWrapper img={imgUrl} />);
        });

        expect(document.querySelector("img").getAttribute("src")).toEqual(imgUrl);
    });

    test("alternativeText prop", () => {
        const alternativeText = "this is the alternative text for the image";

        act(() => {
            root.render(<BuildingWindowWrapper alternativeText={alternativeText} />);
        });

        expect(document.querySelector("img").alt).toEqual(alternativeText);
    });

    test("workUrlId prop", () => {
        const workUrlId = "2";

        act(() => {
            root.render(<BuildingWindowWrapper workUrlId={workUrlId} />);
        });

        expect(document.querySelector("a").getAttribute("href")).toEqual(`/work/${workUrlId}`);
    });

});