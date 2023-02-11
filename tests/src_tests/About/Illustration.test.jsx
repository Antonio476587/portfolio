/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import Illustration from "../../../src/About/Illustration";

jest.mock("../../../src/About/abilities", () => {
    const dummyAbilities = [
        {
            id: "info",
            ability: "Information",
            abs: [
                {
                    name: "Name:",
                    content: "Felix Cabello",
                },
                {
                    name: "Age:",
                    content: "18",
                },
                {
                    name: "Country:",
                    content: "Venezuela",
                },
                {
                    name: "State:",
                    content: "La Guaira",
                },
                {
                    name: "Favorites",
                    subAbs: [
                        {
                            name: "Meal:",
                            content: "Soup",
                        },
                        {
                            name: "Color:",
                            content: <span className="span-orange" />,
                        },
                        {
                            name: "Anime:",
                            content: "Naruto",
                        },
                        {
                            name: "Sport:",
                            content: "Martial Arts",
                        },
                    ],
                },
            ],
        },
        {
            id: "infoTwo",
            ability: "Information",
            abs: [
                {
                    name: "Name:",
                    content: "Felix Cabello",
                },
                {
                    name: "Age:",
                    content: "18",
                },
                {
                    name: "Country:",
                    content: "Venezuela",
                },
                {
                    name: "State:",
                    content: "La Guaira",
                },
                {
                    name: "Favorites",
                    subAbs: [
                        {
                            name: "Meal:",
                            content: "Soup",
                        },
                        {
                            name: "Color:",
                            content: <span className="span-orange" />,
                        },
                        {
                            name: "Anime:",
                            content: "Naruto",
                        },
                        {
                            name: "Sport:",
                            content: "Martial Arts",
                        },
                    ],
                },
            ],
        },
        {
            id: "infoThree",
            ability: "Information",
            abs: [
                {
                    name: "Name:",
                    content: "Felix Cabello",
                },
                {
                    name: "Age:",
                    content: "18",
                },
                {
                    name: "Country:",
                    content: "Venezuela",
                },
                {
                    name: "State:",
                    content: "La Guaira",
                },
                {
                    name: "Favorites",
                    subAbs: [
                        {
                            name: "Meal:",
                            content: "Soup",
                        },
                        {
                            name: "Color:",
                            content: <span className="span-orange" />,
                        },
                        {
                            name: "Anime:",
                            content: "Naruto",
                        },
                        {
                            name: "Sport:",
                            content: "Martial Arts",
                        },
                    ],
                },
            ],
        },
    ];
    globalThis.dummyAbilities = dummyAbilities;
    return dummyAbilities;
});

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

test("does it render", () => {
    act(() => {
        root.render(<Illustration />);
    });

    expect(document.querySelector(".container-illustration")).not.toBeNull();
});

describe("HTML structure", () => {

    describe("img", () => {

        test("src attribue", () => {
            act(() => {
                root.render(<Illustration />);
            });

            expect(document.querySelector(".container-illustration > img").getAttribute("src")).toMatch(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
        });

        test("alt attribute", () => {
            act(() => {
                root.render(<Illustration />);
            });

            expect(document.querySelector(".container-illustration > img").getAttribute("alt")).toBeDefined();
        });

        test("srcSet attribute", () => {
            act(() => {
                root.render(<Illustration />);
            });

            const imgSrcSet = document.querySelector(".container-illustration > img").getAttribute("srcset").split(",");

            imgSrcSet.forEach(str => {
                const [src, srcWidth] = str.trim().split(" ");
                expect(src).toMatch(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
                expect(srcWidth).toMatch(/[\d]+w/);
            });
        });

    });

    describe("ul.notes", () => {

        test("does ul.notes exits?", () => {
            act(() => {
                root.render(<Illustration />);
            });

            expect(document.querySelector("ul.notes")).not.toBeNull();
        });

        describe("ul.notes' children (li elements)", () => {

            test("li's id", () => {
                act(() => {
                    root.render(<Illustration />);
                });

                document.querySelectorAll("ul.notes li").forEach(liElement => {
                    expect(liElement.getAttribute("id")).toMatch(/note\d/);
                });
            });

            test("li's title", () => {
                act(() => {
                    root.render(<Illustration />);
                });

                document.querySelectorAll("ul.notes li").forEach((liElement, index) => {
                    const expectedTitleValue = globalThis.dummyAbilities[index].id;
                    expect(liElement.getAttribute("title")).toEqual(expectedTitleValue);
                });
            });

        });

    });

});

describe("Functions and functionality", () => {

    it("should call the changleTableState function and show the first table", () => {
        act(() => {
            root.render(<Illustration />);
        });

        expect(document.querySelectorAll(".container.div-abilities")[0].hasAttribute("hidden")).toBeTruthy();
        expect(document.getElementById("note1").classList.contains("note-active")).toBeFalsy();

        act(() => {
            document.getElementById("note1").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(document.getElementById("note1").classList.contains("note-active")).toBeTruthy();
        expect(document.querySelectorAll(".container.div-abilities")[0].hasAttribute("hidden")).toBeFalsy();
    });

    it("should show the first table and then dissapear it", () => {
        act(() => {
            root.render(<Illustration />);
        });

        expect(document.getElementById("note1").classList.contains("note-active")).toBeFalsy();
        expect(document.querySelectorAll(".container.div-abilities")[0].hasAttribute("hidden")).toBeTruthy();

        act(() => {
            document.getElementById("note1").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            document.querySelectorAll(".container.div-abilities")[0].dispatchEvent(new Event("animationend", { bubbles: true }));
        });

        expect(document.getElementById("note1").classList.contains("note-active")).toBeTruthy();
        expect(document.querySelectorAll(".container.div-abilities")[0].hasAttribute("hidden")).toBeFalsy();

        act(() => {
            document.getElementById("note1").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            document.querySelectorAll(".container.div-abilities")[0].dispatchEvent(new Event("animationend", { bubbles: true }));
        });

        expect(document.getElementById("note1").classList.contains("note-active")).toBeFalsy();
        expect(document.querySelectorAll(".container.div-abilities")[0].hasAttribute("hidden")).toBeTruthy();
    });

    it("should dissapear the visible table by clicking on other note", () => {
        act(() => {
            root.render(<Illustration />);
        });

        expect(document.getElementById("note1").classList.contains("note-active")).toBeFalsy();
        expect(document.querySelectorAll(".container.div-abilities")[0].hasAttribute("hidden")).toBeTruthy();

        act(() => {
            document.getElementById("note1").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            document.querySelectorAll(".container.div-abilities")[0].dispatchEvent(new Event("animationend", { bubbles: true }));
        });

        expect(document.getElementById("note1").classList.contains("note-active")).toBeTruthy();
        expect(document.querySelectorAll(".container.div-abilities")[0].hasAttribute("hidden")).toBeFalsy();

        act(() => {
            document.getElementById("note2").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            document.querySelectorAll(".container.div-abilities")[0].dispatchEvent(new Event("animationend", { bubbles: true }));
            document.querySelectorAll(".container.div-abilities")[1].dispatchEvent(new Event("animationend", { bubbles: true }));
        });

        expect(document.getElementById("note1").classList.contains("note-active")).toBeFalsy();
        expect(document.getElementById("note2").classList.contains("note-active")).toBeTruthy();
        expect(document.querySelectorAll(".container.div-abilities")[0].hasAttribute("hidden")).toBeTruthy();
        expect(document.querySelectorAll(".container.div-abilities")[1].hasAttribute("hidden")).toBeFalsy();
    });

    test("mixIndexOfTarget case 'string' should behave normally", () => {
        act(() => {
            root.render(<Illustration />);
        });

        document.getElementById("note1").setAttribute("value", "'0'");

        expect(document.getElementById("note1").classList.contains("note-active")).toBeFalsy();
        expect(document.querySelectorAll(".container.div-abilities")[0].hasAttribute("hidden")).toBeTruthy();

        act(() => {
            document.getElementById("note1").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            document.querySelectorAll(".container.div-abilities")[0].dispatchEvent(new Event("animationend", { bubbles: true }));
        });

        expect(document.getElementById("note1").classList.contains("note-active")).toBeTruthy();
        expect(document.querySelectorAll(".container.div-abilities")[0].hasAttribute("hidden")).toBeFalsy();
    });

});