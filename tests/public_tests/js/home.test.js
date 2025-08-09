/**
 * @jest-environment jsdom
 */

// For functionality purpose
import gsap from "npm:gsap";
import ScrollTrigger from "npm:gsap/dist/ScrollTrigger";

jest.mock("gsap");
jest.mock("gsap/dist/ScrollTrigger");

beforeAll(() => {

    // Global variables

    globalThis.gsap = gsap;
    globalThis.ScrollTrigger = ScrollTrigger;

    globalThis.scrollY = 1800;
    window.scrollMaxY = window.scrollY;

});

beforeEach(() => {

    // Reseting modules
    jest.resetModules();

    // Global varialbes

    globalThis.gsap.to = jest.fn();

    globalThis.gsap.getProperty = jest.fn();
    globalThis.gsap.getProperty.mockReturnValue(45);

    globalThis.killFunction = jest.fn();
    globalThis.gsap.timeline = jest.fn();
    globalThis.gsap.timeline.mockReturnValue({ kill: jest.fn(() => globalThis.killFunction()) });

    globalThis.gsap.utils.clamp = jest.fn();

    globalThis.utilPipeReturnedFunctionCalledTransformer = jest.fn();
    globalThis.utilPipeReturnedFunctionCalledTransformer.mockReturnValue(100);
    globalThis.gsap.utils.pipe = jest.fn();
    globalThis.gsap.utils.pipe.mockReturnValue(jest.fn(arg => globalThis.utilPipeReturnedFunctionCalledTransformer(arg)));

    globalThis.quickSetterReturnedFunction = jest.fn();
    globalThis.gsap.quickSetter = jest.fn();
    globalThis.gsap.quickSetter.mockReturnValue(jest.fn(arg => globalThis.quickSetterReturnedFunction(arg)));

    globalThis.ScrollTrigger.create = jest.fn();

    delete globalThis.scrollTo;
    globalThis.scrollTo = jest.fn();

    // HTML Content
    document.body.innerHTML = " ";

    const home = document.createElement("div");
    const bgComplement = document.createElement("div");
    const bgComplementContainer = document.createElement("div");
    const btnMenuHome = document.createElement("div");
    const menu = document.createElement("div");

    home.classList.add("home");
    bgComplement.classList.add("bg-complement");
    bgComplementContainer.classList.add("bg-complement-container");
    btnMenuHome.classList.add("btn", "btn-secondary", "btn-home");
    menu.classList.add("menu");

    menu.setAttribute("hidden", "");

    const documentFragment = document.createDocumentFragment();

    documentFragment.append(home);
    documentFragment.append(bgComplement);
    documentFragment.append(bgComplementContainer);
    documentFragment.append(btnMenuHome);
    documentFragment.append(menu);

    document.body.appendChild(documentFragment);

});

test("btnMenuHome functionality", () => {

    require("../../../public/js/home");

    const menu = document.querySelector(".menu");

    expect(menu.hasAttribute("hidden")).toBeTruthy();

    document.querySelector(".btn.btn-secondary.btn-home").dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(menu.hasAttribute("hidden")).toBeFalsy();
    expect(globalThis.gsap.to).toHaveBeenCalledTimes(1);
    expect(globalThis.gsap.to.mock.calls[0][0]).toEqual(".menu-base-footer");

    document.querySelector(".btn.btn-secondary.btn-home").dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(menu.hasAttribute("hidden")).toBeTruthy();
    expect(globalThis.gsap.set).toHaveBeenCalledTimes(1);
    expect(globalThis.gsap.set.mock.calls[0][0]).toEqual(".menu-base-footer");

    document.querySelector(".btn.btn-secondary.btn-home").dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(menu.hasAttribute("hidden")).toBeFalsy();
    expect(globalThis.gsap.to).toHaveBeenCalledTimes(2);
    expect(globalThis.gsap.to.mock.calls[1][0]).toEqual(".menu-base-footer");

    document.querySelector(".btn.btn-secondary.btn-home").dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(menu.hasAttribute("hidden")).toBeTruthy();
    expect(globalThis.gsap.set).toHaveBeenCalledTimes(2);
    expect(globalThis.gsap.set.mock.calls[1][0]).toEqual(".menu-base-footer");

});

test("quickSetter should be called when the file is required and with a pattern", () => {

    require("../../../public/js/home");

    const bgComplement = document.querySelector(".bg-complement");
    const bgComplementContainer = document.querySelector(".bg-complement-container");

    expect(globalThis.gsap.quickSetter).toHaveBeenCalledTimes(5);

    expect(globalThis.gsap.quickSetter).toHaveBeenCalledWith(bgComplement, "rotationX", "deg");
    expect(globalThis.gsap.quickSetter).toHaveBeenCalledWith(bgComplement, "rotationY", "deg");

    expect(globalThis.gsap.quickSetter).toHaveBeenCalledWith(bgComplementContainer, "scaleX");
    expect(globalThis.gsap.quickSetter).toHaveBeenCalledWith(bgComplementContainer, "scaleY");

    expect(globalThis.gsap.quickSetter).toHaveBeenCalledWith(bgComplementContainer, "y", "px");

});

test("animateComplement function", () => {

    require("../../../public/js/home");

    expect(globalThis.gsap.timeline).toHaveBeenCalled();
    expect(globalThis.quickSetterReturnedFunction).not.toHaveBeenCalled();

    globalThis.gsap.timeline.mock.calls[0][0].onUpdate();

    expect(globalThis.quickSetterReturnedFunction).toHaveBeenCalledTimes(4);

    globalThis.gsap.timeline.mock.calls[0][0].onUpdate();
    globalThis.gsap.timeline.mock.calls[0][0].onUpdate();
    globalThis.gsap.timeline.mock.calls[0][0].onUpdate();

    expect(globalThis.quickSetterReturnedFunction).toHaveBeenCalledTimes(16);

});

describe("when ScrollTrigger is executed", () => {

    test("The trigger should be .home", () => {

        require("../../../public/js/home");

        expect(globalThis.ScrollTrigger.create.mock.calls[0][0].trigger).toEqual(".home");

    });

    describe("onToggle property", () => {

        test("When self.isActive is true", () => {

            const bgComplement = document.querySelector(".bg-complement");

            require("../../../public/js/home");

            const self = {
                isActive: true,
            };

            globalThis.ScrollTrigger.create.mock.calls[0][0].onToggle(self);

            expect(globalThis.gsap.timeline).toHaveBeenCalledTimes(2);

            // Window mousemove event

            window.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: 400, clientY: 1200 }));

            expect(globalThis.gsap.getProperty).toHaveBeenCalledTimes(2);
            expect(globalThis.gsap.getProperty).toHaveBeenCalledWith(bgComplement, "rotateX");
            expect(globalThis.gsap.getProperty).toHaveBeenCalledWith(bgComplement, "rotateY");

            window.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: 400, clientY: -40000000 }));
            window.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: 400, clientY: -40000000 }));
            window.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: 400, clientY: -40000000 }));

            expect(globalThis.gsap.getProperty).toHaveBeenCalledTimes(8);

            // Document scroll event

            expect(globalThis.gsap.utils.clamp).toHaveBeenCalled();
            expect(globalThis.gsap.utils.pipe).toHaveBeenCalled();
            expect(globalThis.utilPipeReturnedFunctionCalledTransformer).not.toHaveBeenCalled();

            document.dispatchEvent(new Event("scroll", { bubbles: true }));

            expect(globalThis.utilPipeReturnedFunctionCalledTransformer).toHaveBeenCalled();
            expect(globalThis.utilPipeReturnedFunctionCalledTransformer).toHaveBeenCalledWith((window.scrollY - window.scrollMaxY) * -0.7);
            expect(globalThis.quickSetterReturnedFunction).toHaveBeenCalled();
            expect(globalThis.quickSetterReturnedFunction).toHaveBeenCalledWith(100);

        });

        test("When self.isActive is false", () => {

            const windowRemoveEventListenerSpy = jest.spyOn(window, "removeEventListener");
            const documentRemoveEventListenerSpy = jest.spyOn(document, "removeEventListener");

            require("../../../public/js/home");

            globalThis.ScrollTrigger.create.mock.calls[0][0].onToggle({ isActive: true });

            expect(globalThis.gsap.timeline).toHaveBeenCalledTimes(2);

            globalThis.ScrollTrigger.create.mock.calls[0][0].onToggle({ isActive: false });

            expect(globalThis.killFunction).toHaveBeenCalledTimes(2);

            expect(windowRemoveEventListenerSpy).toHaveBeenCalled();
            
            expect(documentRemoveEventListenerSpy).toHaveBeenCalled();

        });

    });

});