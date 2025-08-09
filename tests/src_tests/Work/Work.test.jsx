/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import { useParams } from "react-router-dom";

import WorkWrapper, { Work } from "../../../src/Work";

jest.mock("../../../src/Work/LikeRunes", () => {
    return function RubberLikeRunes() {
        return (
            <div id="like-runes">
                I love you Nicky Minaj
            </div>
        );
    };
});

jest.mock("../../../src/Work/HeaderWork", () => {
    return function RubberHeaderWork() {
        return (
            <div id="header-work">
                ta to saldo
            </div>
        );
    };
});

jest.mock("../../../src/Work/CaseStudy", () => {
    return function RubberCaseStudy({ work, changeSectionFunctions }) {
        return (
            <>
                <div id="case-study">
                    Waos
                </div>
                <button id="prev" onClick={changeSectionFunctions[0]}>Prev</button>
                <button id="next" onClick={changeSectionFunctions[1]}>Next</button>
            </>
        );
    };
});

jest.mock("../../../src/Work/Classic", () => {
    return function RubberClassic({ work, changeSectionFunctions }) {
        return (
            <>
                <div id="classic">
                    Like a mojito
                </div>
                <button id="prev" onClick={changeSectionFunctions[0]}>Prev</button>
                <button id="next" onClick={changeSectionFunctions[1]}>Next</button>
            </>
        );
    };
});

jest.mock("../../../src/Work/Gallery", () => {
    return function RubberGallery() {
        return (
            <div id="gallery">
                What is life?
            </div>
        );
    };
});

jest.mock("../../../src/Errors/NotFound", () => {
    return function RubberNotFound() {
        return (
            <div id="not-found">
                Los errores son solo errores si los cometes mas de una vez
            </div>
        );
    };
});

jest.mock("../../../src/Work/workContents", () => {
    const dummyWorkContents = [
        {
            h2: "Tirale al rubio si es pa negociar",
            p1: "You will never know someone well enough to criticize them.",
            media1: [
                "/imag/inate.mp4",
                "Yo tengo hermanos, no tengo amigos",
            ],
            media2: [
                "/imag/inate.mp4",
                "Yo tengo hermanos, no tengo amigos",
            ],
            p2: "You will never know someone well enough to criticize them.",
            p3: "You will never know someone well enough to criticize them.",
            media3: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            p4: "You will never know someone well enough to criticize them.",
            media4: [
                "/imag/inate.mp4",
                "Yo tengo hermanos, no tengo amigos",
            ],
            styles: [],
            type: "casestudy",
        },
        {
            h2: "Tirale al rubio si es pa negociar",
            p1: "You will never know someone well enough to criticize them.",
            media1: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            media2: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            p2: "You will never know someone well enough to criticize them.",
            p3: "You will never know someone well enough to criticize them.",
            media3: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            p4: "You will never know someone well enough to criticize them.",
            media4: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            styles: ["#AAAAAA", "#BBBBBB", "#CCCCCC"],
            type: "classic"
        },
        {
            h2: "Tirale al rubio si es pa negociar",
            p1: "You will never know someone well enough to criticize them.",
            media1: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            media2: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            p2: "You will never know someone well enough to criticize them.",
            p3: "You will never know someone well enough to criticize them.",
            media3: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            p4: "You will never know someone well enough to criticize them.",
            media4: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            styles: ["#AAAAAA", "#BBBBBB", "#CCCCCC"],
            type: "gallery"
        },
        {
            h2: "Tirale al rubio si es pa negociar",
            p1: "You will never know someone well enough to criticize them.",
            media1: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            media2: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            p2: "You will never know someone well enough to criticize them.",
            p3: "You will never know someone well enough to criticize them.",
            media3: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            p4: "You will never know someone well enough to criticize them.",
            media4: [
                "/imag/inate.jpg",
                "Yo tengo hermanos, no tengo amigos",
            ],
            styles: ["#AAAAAA", "#BBBBBB", "#CCCCCC"],
        },
        undefined
    ];
    return dummyWorkContents;
});

jest.mock("react-router-dom");

let container = null;
let root = null;
let location = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    location = new URL("https://test.fantonix.space");
    location.assign = jest.fn();
    window.location = location;
});

afterEach(() => {
    act(() => {
        root.unmount();
    });
    container.remove();
    container = null;
    location = null;
    delete window.location;
});

describe("Does the WorkWrapper work well?", () => {

    it("should render the component not found", () => {
        act(() => {
            const urlParams = { id: 2 };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.getElementById("not-found")).not.toBeNull();

        act(() => {
            const urlParams = "id";
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.getElementById("not-found")).not.toBeNull();

        act(() => {
            const urlParams = { id: "10" };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.getElementById("not-found")).not.toBeNull();
    });

    it("should render the Work component", () => {
        act(() => {
            const urlParams = { id: "2" };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.getElementById("body-work")).not.toBeNull();
    });

});

describe("It's time to see whether the Work component works", () => {

    it("should have the default styles", () => {
        act(() => {
            const urlParams = { id: "1" };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.querySelector("#body-work").getAttribute("style")).toEqual("--color-body-background: #EBEBFF; --color-foreground: #0C043E; --color-foreground-2: #111;");

    });

    it("should render the first component", () => {
        act(() => {
            const urlParams = { id: "6" };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.querySelector("#body-work").getAttribute("style")).toEqual("--color-body-background: #EBEBFF; --color-foreground: #0C043E; --color-foreground-2: #111;");
    });

    test("When the index is out of bound, it will render NotFound", () => {
        act(() => {
            const urlParams = { id: "10" };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.getElementById("body-work")).toBeNull();
        expect(document.querySelector(".not-found")).toBeDefined();
    });

    test("When work is undefined, it will render NotFound", () => {
        act(() => {
            const urlParams = { id: "5" };
            useParams.mockReturnValue(urlParams);
            root.render(<WorkWrapper />);
        });

        expect(document.getElementById("body-work")).toBeNull();
        expect(document.querySelector(".not-found")).toBeDefined();        
    });

    describe("Either a type property is provided or not, it should return a selected type of presentation (template | component) or an error", () => {

        test("When type is equal to 'casestudy'", () => {
            act(() => {
                const urlParams = { id: "1" };
                useParams.mockReturnValue(urlParams);
                root.render(<WorkWrapper />);
            });

            expect(document.getElementById("case-study")).not.toBeNull();
        });

        test("When type is equal to 'classic'", () => {
            act(() => {
                const urlParams = { id: "2" };
                useParams.mockReturnValue(urlParams);
                root.render(<WorkWrapper />);
            });

            expect(document.getElementById("classic")).not.toBeNull();
        });

        test("When type is equal to 'gallery'", () => {
            act(() => {
                const urlParams = { id: "3" };
                useParams.mockReturnValue(urlParams);
                root.render(<WorkWrapper />);
            });

            expect(document.getElementById("gallery")).not.toBeNull();
        });

        test("When type is not defined, it should show an error, therefore there should not be any rendered elements", () => {
            act(() => {
                const urlParams = { id: "4" };
                useParams.mockReturnValue(urlParams);
                root.render(<WorkWrapper />);
            });

            expect(document.getElementById("case-study")).toBeNull();
            expect(document.getElementById("classic")).toBeNull();
            expect(document.getElementById("gallery")).toBeNull();
            expect(document.querySelector("h1").textContent).toEqual("There's no type of work to select a template. Work ID = 4");
        });

    });

    describe("prevSection and nextSection functions", () => {

        test("prevSection function", () => {
            act(() => {
                const urlParams = { id: "1" };
                useParams.mockReturnValue(urlParams);
                root.render(<WorkWrapper />);
            });

            expect(location.assign).not.toHaveBeenCalled();

            act(() => {
                document.querySelector("button#prev").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(location.assign).not.toHaveBeenCalled();

            act(() => {
                const urlParams = { id: "2" };
                useParams.mockReturnValue(urlParams);
                root.render(<WorkWrapper />);
            });

            expect(location.assign).not.toHaveBeenCalled();

            act(() => {
                document.querySelector("button#prev").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(location.assign).toHaveBeenCalled();
            expect(location.assign).toHaveBeenCalledWith("1");
        });

        test("nextSection function", () => {
            act(() => {
                const urlParams = { id: "1" };
                useParams.mockReturnValue(urlParams);
                root.render(<WorkWrapper />);
            });

            expect(location.assign).not.toHaveBeenCalled();

            act(() => {
                document.querySelector("button#next").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(location.assign).toHaveBeenCalled();
            expect(location.assign).toHaveBeenCalledWith("2");

            act(() => {
                const urlParams = { id: "2" };
                useParams.mockReturnValue(urlParams);
                root.render(<WorkWrapper />);
            });

            expect(location.assign).toHaveBeenCalled();

            act(() => {
                document.querySelector("button#next").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(location.assign).toHaveBeenCalledTimes(2);
            expect(location.assign).toHaveBeenCalledWith("3");
        });

    });

});