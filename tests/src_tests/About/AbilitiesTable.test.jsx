/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import AbilitiesTable, { AbilitiesRow } from "../../../src/About/AbilitiesTable";

const DummyAbility = {
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
};

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


describe("AbilitiesTable tests", () => {

    it("should render the table", () => {
        act(() => {
            root.render(<AbilitiesTable id={DummyAbility.id} ability={DummyAbility.ability} abs={DummyAbility.abs} />);
        });

        expect(document.querySelector("table")).not.toBeNull();
    });

    describe("the table and their children render the correct classes or content", () => {

        test("the table render the correct classes", () => {
            act(() => {
                root.render(<AbilitiesTable id={DummyAbility.id} ability={DummyAbility.ability} abs={DummyAbility.abs} />);
            });

            expect(document.querySelector("table").classList.toString()).toEqual("container div-abilities info");
        });

        test("the th.abilities render the correct content", () => {
            act(() => {
                root.render(<AbilitiesTable id={DummyAbility.id} ability={DummyAbility.ability} abs={DummyAbility.abs} />);
            });

            expect(document.querySelector("th.abilities").textContent).toEqual("Information");
        });

    });

});

describe("AbilitiesRow tests", () => {

    describe("rendering without subAbs", () => {

        it("should render without subAbs", () => {
            act(() => {
                root.render(<AbilitiesRow ab={DummyAbility.abs[0]} />);
            });

            expect(document.querySelector(".h4.ability").textContent).toEqual("Name:");
            expect(document.querySelector(".container.level").textContent).toEqual("Felix Cabello");
            expect(document.querySelector(".ul-sub-abs")).toBeNull();

            act(() => {
                root.render(<AbilitiesRow ab={DummyAbility.abs[1]} />);
            });

            expect(document.querySelector(".h4.ability").textContent).toEqual("Age:");
            expect(document.querySelector(".container.level").textContent).toEqual("18");
            expect(document.querySelector(".ul-sub-abs")).toBeNull();
        });

    });

    describe("rendering with subAbs", () => {

        it("should render with subAbs", () => {
            act(() => {
                root.render(<AbilitiesRow ab={DummyAbility.abs[4]} />);
            });

            expect(document.querySelector(".h4.ability").textContent).toEqual("Favorites");
            expect(document.querySelector(".ul-sub-abs")).not.toBeNull();
        });

        test("the button functionality to hid the sub-abs", () => {
            act(() => {
                root.render(<AbilitiesRow ab={DummyAbility.abs[4]} />);
            });

            expect(document.querySelector("button.buttonContent").id.toString()).toBe("btn-Favorites");
            expect(document.querySelector(".ul-sub-abs").hasAttribute("hidden")).toBeTruthy();

            act(() => {
                document.querySelector("button#btn-Favorites").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(document.querySelector(".ul-sub-abs").hasAttribute("hidden")).toBeFalsy();
        });

        test("the sub-ab content", () => {
            act(() => {
                root.render(<AbilitiesRow ab={DummyAbility.abs[4]} />);
            });
            
            expect(document.querySelectorAll(".h5.sub-ability")[0].textContent).toEqual("Meal:");
            expect(document.querySelectorAll(".container.sub-level")[0].textContent).toEqual("Soup");


            expect(document.querySelectorAll(".h5.sub-ability")[1].textContent).toEqual("Color:");
            expect(document.querySelectorAll(".container.sub-level")[1].innerHTML).toEqual("<span class=\"span-orange\"></span>");
        });

    });

});