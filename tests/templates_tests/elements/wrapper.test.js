/**
 * @jest-environment jsdom
 */
import pug from "pug";
import path from "path";
import { __dirname as __root_dirname } from "../../../pathEMS";

let compilerFunction = null;

beforeAll(() => {
    compilerFunction = pug.compileFile(path.resolve(__root_dirname, "templates/elements/wrapper.pug"), { pretty: "\t", doctype: "html" });

    document.body.innerHTML = compilerFunction({});
});

afterAll(() => {
    compilerFunction = null;

    document.body.innerHTML = " ";
});

it("should be a single div", () => {
    expect(document.body.childElementCount).toEqual(1);
    expect(document.body.firstElementChild).toEqual(document.querySelector("div"));
    expect(document.body.lastElementChild).toEqual(document.querySelector("div"));
});

it("should have the correspondent attributes", () => {
    expect(document.querySelector("#wrapper")).toEqual(document.querySelector("div"));
    expect(document.querySelector(".wrapper")).toEqual(document.querySelector("div"));
});