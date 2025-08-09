/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import FormContact, { ContactForm } from "../../../src/MainPage/FormContact";

jest.mock("../../../src/Utils/TextInput", () => {

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const React = require("react");

    return function DumbTextInput(props) {

        const { value: propsValue, ...inputProps } = props.inputProps;

        const dumbTextInputOnBlurFunction = jest.fn((e, value) => props.upperChange(e, value));
        const onChange = jest.fn();

        // function onBlurF(e) {
        //     props.upperChange(e, value);
        // }
        globalThis.dumbTextInputOnBlurFunction = dumbTextInputOnBlurFunction;

        return (
            <input
                {...inputProps}
                onChange={onChange}
                value={propsValue}
            />
        );
    };
});

let container = null;
let root = null;

// It has to be called in a test
function fullSetupToFetch() {

    const textInputNameNewValue = "newValue";
    const textInputEmailNewValue = "google@gmail.com";
    const textInputMessageNewValue = "Lorem ipsum dolor, sit";

    const textInputName = document.getElementById("name");
    const textInputEmail = document.getElementById("email");
    const textInputMessage = document.getElementById("message");


    textInputName.addEventListener("blur", (e) => {
        globalThis.dumbTextInputOnBlurFunction(e, textInputNameNewValue);
    });
    textInputEmail.addEventListener("blur", (e) => {
        globalThis.dumbTextInputOnBlurFunction(e, textInputEmailNewValue);
    });
    textInputMessage.addEventListener("blur", (e) => {
        globalThis.dumbTextInputOnBlurFunction(e, textInputMessageNewValue);
    });

    act(() => {
        textInputName.dispatchEvent(new MouseEvent("blur", { bubbles: true }));
        textInputEmail.dispatchEvent(new MouseEvent("blur", { bubbles: true }));
        textInputMessage.dispatchEvent(new MouseEvent("blur", { bubbles: true }));
    });

}

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

describe("FormContact", () => {

    it("should change the ContactForm class by clicking in the button", () => {
        act(() => {
            root.render(<FormContact />);
        });

        const bodyButton = document.querySelector(".contact-body-button#envelope-button");

        expect(document.querySelector(".contact-body-div").classList.contains("contact-body-active")).toBeFalsy();

        act(() => {
            bodyButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(document.querySelector(".contact-body-div").classList.contains("contact-body-active")).toBeTruthy();

        act(() => {
            bodyButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(document.querySelector(".contact-body-div").classList.contains("contact-body-active")).toBeFalsy();
    });

    it("should change the button content by clicking in the button", () => {
        act(() => {
            root.render(<FormContact />);
        });

        const bodyButton = document.querySelector(".contact-body-button#envelope-button");
        // IH is equal to inner html
        const firstBodyButtonIH = bodyButton.innerHTML;

        act(() => {
            bodyButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        const secondBodyButtonIH = bodyButton.innerHTML;
        expect(secondBodyButtonIH).not.toEqual(firstBodyButtonIH);

        act(() => {
            bodyButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        const thirdBodyButtonIH = bodyButton.innerHTML;
        expect(thirdBodyButtonIH).toEqual(firstBodyButtonIH);
    });

});

describe("ContactForm", () => {


    describe("The active prop", () => {

        it("should make the aria-disabled attribute true in each button", () => {
            act(() => {
                root.render(<ContactForm active={true} />);
            });

            document.querySelectorAll("button").forEach(element => {
                expect(element.getAttribute("aria-disabled")).toEqual("true");
            });
        });

        it("should make the aria-disabled attribute false in each button", () => {
            act(() => {
                root.render(<ContactForm active={false} />);
            });

            document.querySelectorAll("button").forEach(element => {
                expect(element.getAttribute("aria-disabled")).toEqual("false");
            });
        });

    });

    test("When the variable giveNFT === \"nft-gift-desactive\"", () => {
        act(() => {
            root.render(<ContactForm active={true} />);
        });

        expect(document.querySelector(".contact-nft-gift").children[1].nodeName).toEqual("BUTTON");
        expect(document.querySelector(".div-nft-gift").children.length).toEqual(2);
    });

    describe("Form", () => {

        beforeAll(() => {
            globalThis.fetch = jest.fn();
        });

        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        it("should throw an error in the toast because the empty fields", () => {
            act(() => {
                root.render(<ContactForm active={true} />);
            });

            const textInputName = document.getElementById("name");
            const textInputEmail = document.getElementById("email");

            textInputName.addEventListener("blur", (e) => {
                globalThis.dumbTextInputOnBlurFunction(e, "aaaaa");
            });
            textInputEmail.addEventListener("blur", (e) => {
                globalThis.dumbTextInputOnBlurFunction(e, "aaaaa");
            });

            function testToastError() {
                expect(toastContact.classList.contains("denied-toast")).toBeTruthy();
                expect(toastContact.children[0].textContent).toEqual("Error");
                expect(toastContact.children[1].textContent).toEqual("Error: You must fill all the fields to send the message.");
            }

            const toastContact = document.querySelector(".toast-contact");
            const tempToastContactOuterHTML = toastContact.outerHTML;

            expect(toastContact.classList.contains("denied-toast")).toBeFalsy();
            expect(toastContact.children[0].textContent).toEqual("Error");
            expect(toastContact.children[1].textContent).toEqual("Si");

            act(() => {
                document.querySelector("button[type='submit']").dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(toastContact.outerHTML).not.toEqual(tempToastContactOuterHTML);

            testToastError();

            act(() => {
                textInputName.dispatchEvent(new MouseEvent("blur", { bubbles: true }));
            });

            testToastError();

            expect(globalThis.fetch).not.toHaveBeenCalled();
        });

        it("The toast should be removed in 2 seconds", () => {
            act(() => {
                root.render(<ContactForm active={true} />);
            });


            const toastContact = document.querySelector(".toast-contact");
            const tempToastContactOuterHTML = toastContact.outerHTML;

            expect(toastContact.children[0].textContent).toEqual("Error");
            expect(toastContact.children[1].textContent).toEqual("Si");


            act(() => {
                document.querySelector(".contact-form").dispatchEvent(new Event("submit", { bubbles: true }));
                jest.advanceTimersByTime(2100);
            });

            expect(toastContact.outerHTML).not.toEqual(tempToastContactOuterHTML);

            expect(toastContact.children[0].textContent).toEqual("");
            expect(toastContact.children[1].textContent).toEqual("");

        });

        it("should change the input#name value", () => {
            act(() => {
                root.render(<ContactForm active={true} />);
            });

            // Input Name

            const textInputNameNewValue = "newValue";

            const textInputName = document.getElementById("name");

            textInputName.addEventListener("blur", (e) => {
                globalThis.dumbTextInputOnBlurFunction(e, textInputNameNewValue);
            });

            act(() => {
                textInputName.dispatchEvent(new MouseEvent("blur", { bubbles: true }));
            });

            expect(textInputName.value).toEqual(textInputNameNewValue);

            // Input Email

            const textInputEmailNewValue = "google@gmail.com";

            const textInputEmail = document.getElementById("email");

            textInputEmail.addEventListener("blur", (e) => {
                globalThis.dumbTextInputOnBlurFunction(e, textInputEmailNewValue);
            });

            act(() => {
                textInputEmail.dispatchEvent(new MouseEvent("blur", { bubbles: true }));
            });

            expect(textInputEmail.value).toEqual(textInputEmailNewValue);

            // Input Message

            const textInputMessageNewValue = "Lorem ipsum dolor, sit";

            const textInputMessage = document.getElementById("message");

            textInputMessage.addEventListener("blur", (e) => {
                globalThis.dumbTextInputOnBlurFunction(e, textInputMessageNewValue);
            });

            act(() => {
                textInputMessage.dispatchEvent(new MouseEvent("blur", { bubbles: true }));
            });

            expect(textInputMessage.value).toEqual(textInputMessageNewValue);
        });

        it("should call the fetch function, show validation in the toast and clean the inputs", () => {
            act(() => {
                root.render(<ContactForm active={true} />);
            });

            const returnedFetchMockedValue = new Error("Testing error");
            globalThis.fetch.mockReturnValueOnce({
                text: jest.fn().mockReturnValueOnce(returnedFetchMockedValue),
            });

            // Setup
            fullSetupToFetch();

            const toastContact = document.querySelector(".toast-contact");

            act(() => {
                document.querySelector(".contact-form").dispatchEvent(new Event("submit", { bubbles: true }));
            });

            expect(globalThis.fetch).toHaveBeenCalled();

            // There are a problem with the DOM and React, React isn't updating the DOM at the moment
            expect(toastContact.classList.contains("denied-toast")).toBeTruthy();
            expect(toastContact.children[0].textContent).toEqual("Error");
            expect(toastContact.children[1].textContent).toEqual(`${returnedFetchMockedValue}`);

        });

        it("should call the fetch function, show validation in the toast and clean the inputs", () => {
            act(() => {
                root.render(<ContactForm active={true} />);
            });

            delete globalThis.Date;
            globalThis.Date = jest.fn();

            const returnedFetchMockedValue = "This worked";
            globalThis.fetch.mockReturnValueOnce({
                text: () => returnedFetchMockedValue,
            });

            // Setup
            fullSetupToFetch();

            const toastContact = document.querySelector(".toast-contact");

            act(() => {
                document.querySelector(".contact-form").dispatchEvent(new Event("submit", { bubbles: true }));
            });


            expect(globalThis.fetch).toHaveBeenCalled();
            expect(globalThis.fetch).toHaveBeenCalledWith("/messages",
                {
                    method: "POST",
                    headers: new Headers({
                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify({ "nameMessage": "newValue", "email": "google@gmail.com", "message": "Lorem ipsum dolor, sit", "date": new Date() })
                }
            );

            // There are a problem with the DOM and React, React isn't updating the DOM at the moment
            expect(toastContact.classList.contains("success-toast")).toBeTruthy();
            expect(toastContact.children[0].textContent).toEqual("Success");
            expect(toastContact.children[1].textContent).toEqual(returnedFetchMockedValue);

            expect(document.querySelector(".div-nft-gift").classList.contains("nft-gift-active")).toBeTruthy();
            expect(document.querySelector(".div-nft-gift").children[2].nodeName).toEqual("IMG");
            expect(document.querySelector(".div-nft-gift").children[2].getAttribute("src")).toEqual("/img/1.png");

            expect(document.querySelector(".contact-nft-gift").children[1].nodeName).toEqual("A");
            expect(document.querySelector(".contact-nft-gift").children[1].hasAttribute("download")).toBeTruthy();
            expect(document.querySelector(".contact-nft-gift").children[1].getAnimations("href")).toEqual("/img/1.png");
            expect(document.querySelector(".contact-nft-gift").children[1].children[0].nodeName).toEqual("BUTTON");

        });

    });

});