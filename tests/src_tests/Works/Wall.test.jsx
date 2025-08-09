/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
  
import Wall from "../../../src/Works/Wall";
import { getWorksForWall } from "../../../src/Works/worksPresentation";

jest.mock("../../../src/Works/BuildingWindow", () => {
    return function DummyBuildingWindow(props) {
        return (
            <div>DummyBuildingWindow</div>
        );
    };
});

jest.mock("../../../src/Works/worksPresentation", () => {
    const originalModule = jest.requireActual("../../../src/Works/worksPresentation");

    const NA = {
        img: "/img/NA.webp",
        squaredImg: "/img/NA-squared.webp",
        alternativeText: "It's a building's window, there's no work there already",
        workUrlId: "/",
    };

    const mockedFunc = jest.fn();
    mockedFunc.mockReturnValue(new Array(8).fill(NA));
    mockedFunc.mockReturnValueOnce(undefined);

    return {
        __esModule: true,
        ...originalModule,
        getWorksForWall: mockedFunc,
    };
});

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

it("should create a p tag with the text content 'An error ocurred'", () => {
    act(() => {
        root.render(<Wall wallID="1"/>);
    });

    expect(document.querySelector("p")).not.toBeNull();
    expect(document.querySelector("p").parentElement).toEqual(document.querySelector(".wall"));
    expect(document.querySelector("p").textContent).toEqual("An error ocurred");
});

describe("Structure", () => {
    
    it("should have and id equals to 'wall-$id' where $id is the number passed through", () => {
        act(() => {
            root.render(<Wall wallID="1"/>);
        });

        expect(document.getElementById("wall-1")).not.toBeNull();
        expect(document.getElementById("wall-2")).toBeNull();
        expect(document.getElementById("wall-3")).toBeNull();

        act(() => {
            root.render(
                <>
                    <Wall wallID="1"/>
                    <Wall wallID="2"/>
                    <Wall wallID="3"/>
                </>
            );
        });

        expect(document.getElementById("wall-1")).not.toBeNull();
        expect(document.getElementById("wall-2")).not.toBeNull();
        expect(document.getElementById("wall-3")).not.toBeNull();
    });

    it("should have a style attribute correspondent to the wallID prop", () => {
        act(() => {
            root.render(<Wall wallID="1"/>);
        });

        expect(document.getElementById("wall-1").getAttribute("style")).toEqual("--i: 1;");

        act(() => {
            root.render(<Wall wallID="2"/>);
        });

        expect(document.getElementById("wall-2").getAttribute("style")).toEqual("--i: 2;");
    });

});