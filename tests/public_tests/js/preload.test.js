/**
 * @jest-environment jsdom
 */

// For functionality purpose
// import anime from "animejs";
// import gsap from "gsap";

jest.mock("gsap");
jest.mock("animejs", () => {
    return function dummyAnimeJS() {
        return {
            finished: new Promise((resolve, reject) => {
                resolve();
            }),
        };
    };
});


beforeAll(() => {

    // Global variables

    globalThis.anime = anime;
    globalThis.gsap = gsap;

    globalThis.scrollY = 1800;
});

beforeEach(() => {
    // Reseting modules
    jest.resetModules();

    // Global varialbes

    globalThis.gsap.to = jest.fn();

    globalThis.quickSetterReturnedValue = jest.fn();
    globalThis.gsap.quickSetter = jest.fn().mockReturnValue(globalThis.quickSetterReturnedValue);

    global.anime.set = jest.fn();

    const mockedTlInstance = jest.fn();
    mockedTlInstance.add = jest.fn().mockReturnValue(mockedTlInstance);
    mockedTlInstance.finished =  new Promise((resolve, reject) => {
        resolve();
    }),

    global.anime.timeline = jest.fn().mockReturnValue(mockedTlInstance);

    delete globalThis.scrollTo;
    globalThis.scrollTo = jest.fn();

    // HTML Content
    document.body.innerHTML = " ";

    const preload = document.createElement("div");
    const containerWelcome = document.createElement("div");
    const home = document.createElement("div");

    const prequote = document.createElement("div");
    const quote = document.createElement("div");
    const preloadLogoWrapper = document.createElement("div");

    const svg = document.createElement("svg");

    preload.classList.add("preload");
    containerWelcome.classList.add("con-welcome");
    home.classList.add("home");

    prequote.setAttribute("id", "prequote");
    quote.setAttribute("id", "quote");
    preloadLogoWrapper.setAttribute("id", "preload-logo-wrapper");

    Object.defineProperty(home, "offsetTop", {
        writable: true,
        value: scrollY / 3,
    });

    const documentFragment = document.createDocumentFragment();

    preloadLogoWrapper.appendChild(svg);

    preload.appendChild(prequote);
    preload.appendChild(quote);
    preload.appendChild(preloadLogoWrapper);

    documentFragment.append(preload);
    documentFragment.append(containerWelcome);
    documentFragment.append(home);

    document.body.appendChild(documentFragment);
});

test("when the load event is dispatched in the window", () => {
    require("../../../public/js/preload");

    const scrollMaxYExist = globalThis.scrollMaxY ? true : false;

    window.dispatchEvent(new Event("load", { bubbles: true }));

    expect(globalThis.scrollTo).toHaveBeenCalled();
    expect(globalThis.scrollTo).toHaveBeenCalledWith(0, document.querySelector(".home").offsetTop);
    // If scrollMaxY doesn't exist it should be implementend when the event is dispatched
    if (!scrollMaxYExist) expect(globalThis.scrollMaxY).toEqual(globalThis.scrollY);
    expect(globalThis.scrollMaxY).toBeDefined();

});

describe("When location.pathname is equal to /", () => {

    beforeEach(() => {
        // Global variables
        delete globalThis.scrollTo;
        globalThis.scrollTo = jest.fn();

    });

    describe("animatePrelaod function", () => {

        test("When the window is loaded", () => {

            expect(globalThis.gsap.to).not.toHaveBeenCalled();

            require("../../../public/js/preload");

        
            // This is a pointer to the animatePreload function, it's recursive
        
            globalThis.gsap.to.mock.calls[0][1].onComplete();
            globalThis.gsap.to.mock.calls[1][1].onComplete();
            
            // If the window is loaded, it shouldn't call the function anymore
            window.dispatchEvent(new Event("load", { bubbles: true }));

            globalThis.gsap.to.mock.calls[2][1].onComplete();
    
            expect(globalThis.gsap.to).toHaveBeenCalledTimes(4);
            expect(globalThis.scrollTo).toHaveBeenCalledTimes(2);
            expect(globalThis.quickSetterReturnedValue).toHaveBeenCalledTimes(3);
            expect(globalThis.gsap.to.mock.calls[1][0]).toEqual(document.getElementById("quote"));
            expect(globalThis.gsap.to.mock.calls[2][0]).toEqual(document.getElementById("quote"));

        });

        test("When the window is not loaded", () => {

            expect(globalThis.gsap.to).not.toHaveBeenCalled();

            require("../../../public/js/preload");

        
            // This is a pointer to the animatePreload function, it's recursive
        
            globalThis.gsap.to.mock.calls[0][1].onComplete();
            globalThis.gsap.to.mock.calls[1][1].onComplete();
            globalThis.gsap.to.mock.calls[2][1].onComplete();
            
    
            expect(globalThis.gsap.to).toHaveBeenCalledTimes(4);
            expect(globalThis.scrollTo).toHaveBeenCalledTimes(0);
            expect(globalThis.quickSetterReturnedValue).toHaveBeenCalledTimes(4);
            expect(globalThis.gsap.to.mock.calls[1][0]).toEqual(document.getElementById("quote"));
            expect(globalThis.gsap.to.mock.calls[2][0]).toEqual(document.getElementById("quote"));
            expect(globalThis.gsap.to.mock.calls[3][0]).toEqual(document.getElementById("quote"));

        });

    });


    describe("preloadCharged function", () => {

        test("when the window is not loaded yet", done => {

            // Reset 
            globalThis.gsap.to = jest.fn();

            require("../../../public/js/preload");

            gsap.to.mock.calls[0][1].onComplete();

            setTimeout(() => {

                window.dispatchEvent(new Event("load", { bubbles: true }));

                expect(globalThis.scrollTo).toHaveBeenCalled();
                expect(globalThis.scrollTo).toHaveBeenCalledWith(0, document.querySelector(".home").offsetTop);

                expect(globalThis.gsap.to.mock.calls.length).toEqual(2);
                globalThis.gsap.to.mock.calls[1][1].onComplete();

                expect(globalThis.gsap.to.mock.calls.length).toEqual(3);

                done();
            }, 10);

        });

        test("when the window is loaded already", done => {

            // Reset 
            globalThis.gsap.to = jest.fn();

            require("../../../public/js/preload");

            window.dispatchEvent(new Event("load", { bubbles: true }));

            gsap.to.mock.calls[0][1].onComplete();

            setTimeout(() => {

                expect(globalThis.gsap.to.mock.calls.length).toEqual(2);

                done();
            }, 10);

        });

    });

    test("preloadFinished function and handlers", done => {

        require("../../../public/js/preload");

        const preload = document.querySelector(".preload");
        const preloadClassListString = preload.classList.toString();

        window.dispatchEvent(new Event("load", { bubbles: true }));

        const conWelcome = document.querySelector(".con-welcome");
        const conWelcomeClassListString = conWelcome.classList.toString();
        const conWelcomeClassListObject = conWelcome.classList;

        const conWelcomeSpy = jest.spyOn(conWelcomeClassListObject, "add");

        setTimeout(() => {

            globalThis.gsap.to.mock.lastCall[1].onComplete();
            globalThis.gsap.to.mock.lastCall[1].onComplete();

            expect(preloadClassListString).not.toEqual(preload.classList.toString());

            preload.dispatchEvent(new Event("animationend", { bubbles: true }));

            expect(preload.hasAttribute("hidden")).toBeTruthy();
            expect(conWelcomeClassListString).not.toEqual(conWelcome.classList.toString());
            expect(preloadClassListString).toEqual(preload.classList.toString());
            expect(conWelcomeSpy).toHaveBeenCalled();

            setTimeout(() => {

                done();
            }, 10);

        }, 10);

    });

    describe("when location.search is equal to ?P=false", () => {

        let location = null;
        let oldLocationTemp = globalThis.location;

        beforeAll(() => {
            delete globalThis.location;
            location = new URL("http://test.fantonix.space/?P=false");
            globalThis.location = location;
        });

        afterAll(() => {
            delete globalThis.location;
            globalThis.location = oldLocationTemp;
            location = null;
            oldLocationTemp = null;
        });

        test("preload should be set 'hidden'", () => {
            const preload = document.querySelector(".preload");

            expect(preload.hasAttribute("hidden")).toBeFalsy();

            require("../../../public/js/preload");

            expect(preload.hasAttribute("hidden")).toBeTruthy();
        });

        test("it should add classes to .con-welcome", () => {
            require("../../../public/js/preload");

            const conWelcomeClassListString = document.querySelector(".con-welcome").classList.toString();
            const conWelcomeClassListObject = document.querySelector(".con-welcome").classList;

            const conWelcomeSpy = jest.spyOn(conWelcomeClassListObject, "add");

            window.dispatchEvent(new Event("load", { bubbles: true }));

            expect(document.querySelector(".con-welcome").classList.toString()).not.toEqual(conWelcomeClassListString);
            expect(conWelcomeSpy).toHaveBeenCalled();
        });

    });

    describe("when location.hash exist", () => {

        let location = null;
        let oldLocationTemp = globalThis.location;

        beforeAll(() => {
            delete globalThis.location;
            location = new URL("http://test.fantonix.space/#Contact");
            globalThis.location = location;
        });

        afterAll(() => {
            delete globalThis.location;
            globalThis.location = oldLocationTemp;
            location = null;
            oldLocationTemp = null;
        });

        test("when the load event is dispatched in the window", () => {
            require("../../../public/js/preload");

            window.dispatchEvent(new Event("load", { bubbles: true }));

            expect(globalThis.scrollTo).not.toHaveBeenCalled();
            expect(globalThis.scrollTo).not.toHaveBeenCalledWith(0, document.querySelector(".home").offsetTop);

        });

    });
});
