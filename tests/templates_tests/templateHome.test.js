/**
 * @jest-environment jsdom
 */
import templateHome from "../../server/templateHome";
import templateCompiler, { convertToValidPugInsertion } from "../../utils/templateCompiler";

import gsapScripts from "../../templates/head/gsapScriptsHTMLTemplate";


test("Inside of the div#page shouldn't render nothing", () => {
    const newChildren = templateHome("");
    document.querySelector("html").innerHTML = newChildren;

    expect(document.querySelector("div#page").innerHTML.trim()).toEqual("");
});

test("Inside of the div#page shouldn render 'nothing'", () => {
    const newChildren = templateHome("nothing");
    document.querySelector("html").innerHTML = newChildren;

    expect(document.querySelector("div#page").innerHTML.trim()).toEqual("nothing");
});

it("should content 'templates/head/head.pug' template inside of the template", () => {
    const newChildren = templateHome("");

    expect(newChildren.includes(templateCompiler("templates/head/head.pug", { headTags: convertToValidPugInsertion(gsapScripts) }))).toBeTruthy();
});

it("should content 'templates/elements/preload.pug' template inside of the template", () => {
    const newChildren = templateHome("");

    expect(newChildren.includes(templateCompiler("templates/elements/preload.pug"))).toBeTruthy();
});

it("should content 'templates/elements/home.pug' template inside of the template", () => {
    const newChildren = templateHome("");

    expect(newChildren.includes(templateCompiler("templates/elements/home.pug"))).toBeTruthy();
});

it("should content 'templates/elements/nav.pug' template inside of the template", () => {
    const newChildren = templateHome("");

    expect(newChildren.includes(templateCompiler("templates/elements/nav.pug"))).toBeTruthy();
});

it("should content 'templates/scripts/scripts.pug' template inside of the template", () => {
    const newChildren = templateHome("");

    expect(newChildren.includes(templateCompiler("templates/scripts/scripts.pug"))).toBeTruthy();
});