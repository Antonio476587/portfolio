/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

// For functionality
import { BrowserRouter, Routes, Route } from "react-router-dom";

import routes from "../../src/routes";

const dummyAboutTextContent = "About";
const dummyErrorTextContent = "Error";
const dummyMainPageTextContent = "MainPage";
const dummyWorkTextContent = "Work";
const dummyWorksTextContent = "Works";

jest.mock("../../src/About", () => {
    const dummyAbout = () => <div>{dummyAboutTextContent}</div>;
    return dummyAbout;
});
jest.mock("../../src/Errors/NotFound", () => {
    const dummyError = () => <div>{dummyErrorTextContent}</div>;
    return dummyError;
});
jest.mock("../../src/MainPage", () => {
    const dummyMainPage = () => <div>{dummyMainPageTextContent}</div>;
    return dummyMainPage;
});
jest.mock("../../src/Work", () => {
    const dummyWork = () => <div>{dummyWorkTextContent}</div>;
    return dummyWork;
});
jest.mock("../../src/Works", () => {
    const dummyWorks = () => <div>{dummyWorksTextContent}</div>;
    return dummyWorks;
});

export default function DummyPage() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((attrs) => (
                    <Route {...attrs} key={attrs.path} />
                ))}
            </Routes>
        </BrowserRouter>
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

it("should have the correct structure", () => {
    routes.forEach((element) => {
        expect(element.path).toBeDefined();
        expect(element.element).toBeDefined();
    });
});

it("should have the textContent 'About'", () => {
    act(() => {
        delete globalThis.location;
        const location = new URL("http://test.fantonix.space/about");
        globalThis.location = location;
        root.render(<DummyPage />);
    });

    expect(document.body.textContent).toEqual(dummyAboutTextContent);
});

it("should have the textContent 'Error'", () => {
    act(() => {
        delete globalThis.location;
        const location = new URL("http://test.fantonix.space/thisPageShouldntExist");
        globalThis.location = location;
        root.render(<DummyPage />);
    });

    expect(document.body.textContent).toEqual(dummyErrorTextContent);
});

it("should have the textContent 'MainPage'", () => {
    act(() => {
        delete globalThis.location;
        const location = new URL("http://test.fantonix.space/");
        globalThis.location = location;
        root.render(<DummyPage />);
    });

    expect(document.body.textContent).toEqual(dummyMainPageTextContent);
});

it("should have the textContent 'Work'", () => {
    act(() => {
        delete globalThis.location;
        const location = new URL("http://test.fantonix.space/work/1");
        globalThis.location = location;
        root.render(<DummyPage />);
    });

    expect(document.body.textContent).toEqual(dummyWorkTextContent);
});

it("should have the textContent 'Works'", () => {
    act(() => {
        delete globalThis.location;
        const location = new URL("http://test.fantonix.space/works");
        globalThis.location = location;
        root.render(<DummyPage />);
    });

    expect(document.body.textContent).toEqual(dummyWorksTextContent);
});