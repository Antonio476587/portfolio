/**
 * @jest-environment jsdom
 */
import pug from "pug";
import path from "path";
import { __dirname as __root_dirname } from "../../../pathEMS";

let compilerFunction = null;

beforeAll(() => {
    compilerFunction = pug.compileFile(path.resolve(__root_dirname, "templates/scripts/scripts.pug"), { pretty: "\t", doctype: "html" });
    
    document.body.innerHTML = compilerFunction({});
});

afterAll(() => {
    compilerFunction = null;

    document.body.innerHTML = " ";
});

it("should have the same structure as in the body.innerHTML", () => {
    expect(document.body.innerHTML).toEqual(compilerFunction({}));
});

describe("it should include these scripts tags and their corresponding attributes", () => {

    test("polyfill script", () => {
        const polyfillScriptHTMLElement = document.querySelector("script[src=\"/js/polyfill.bundle.min.js\"]");

        expect(polyfillScriptHTMLElement).not.toBeNull();
        expect(polyfillScriptHTMLElement.getAttribute("type")).toEqual("application/javascript");
    });

    test("app script", () => {
        const appScriptHTMLElement = document.querySelector("script[src=\"/js/app.bundle.min.js\"]");

        expect(appScriptHTMLElement).not.toBeNull();
        expect(appScriptHTMLElement.getAttribute("type")).toEqual("application/javascript");
    });

    test("vendor script", () => {
        const vendorScriptHTMLElement = document.querySelector("script[src=\"/js/vendor.bundle.min.js\"]");

        expect(vendorScriptHTMLElement).not.toBeNull();
        expect(vendorScriptHTMLElement.getAttribute("type")).toEqual("application/javascript");
    });

    test("interactions script", () => {
        const interactionsScriptHTMLElement = document.querySelector("script[src=\"/js/interactions.js\"]");

        expect(interactionsScriptHTMLElement).not.toBeNull();
        expect(interactionsScriptHTMLElement.getAttribute("type")).toEqual("application/javascript");
    });

});