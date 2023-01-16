/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React, { useRef } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import Nav from "../../../src/Work/HeaderWorkNav";

function Wrapper(props) {
    const aRefs = useRef();

    const addALinksRefs = (el) => {
        if (aRefs.current) {
            if (el && aRefs.current.includes(el)) {
                aRefs.current.push(el);
            }
        }
    };

    if (props.navChilds == 2) {
        return (
            <>
                <Nav ref={addALinksRefs} />
                <Nav typeLdeink="LinkFirst" ref={addALinksRefs} />
            </>
        );
    } else if (props.typeLink) {
        return (
            <>
                <Nav typeLink="LinkFirst" ref={addALinksRefs} />
            </>
        );
    } else {
        return (
            <>
                <Nav ref={addALinksRefs} />
            </>
        );
    }
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


it("should have just 2 or 4 nav-links", () => {
    act(() => {
        root.render(<Wrapper />);
    });

    expect(document.querySelectorAll(".nav-link").length).toEqual(2);

    act(() => {
        root.render(<Wrapper navChilds={2} />);
    });

    expect(document.querySelectorAll(".nav-link").length).toEqual(4);
});

it("should be the first kind of link", () => {

    act(() => {
        root.render(<Wrapper typeLink={true} />);
    });

    expect(document.querySelector(".nav-link.active")).toBeDefined();
});

it("should not be the first kind of link", () => {
    act(() => {
        root.render(<Wrapper />);
    });

    expect(document.querySelector(".nav-link.active")).toBeNull();
});

it("should have aria-current=location", () => {
    act(() => {
        root.render(<Wrapper />);
    });

    expect(document.querySelector("a[href='/?P=false']").hasAttribute("aria-current")).toBeTruthy();
    expect(document.querySelector("a[href='/?P=false']").getAttribute("aria-current")).toBe("location");
});