/**
 * @jest-environment jsdom
 */
import template from "../../server/template";
import templateCompiler from "../../utils/templateCompiler";

test("Inside of the div#body should render the default comments", () => {
    const newChildren = template("");
    document.querySelector("html").innerHTML = newChildren;

    const  divBodyContentLines = document.querySelector("div#body").innerHTML.trim().split("\n");

    divBodyContentLines.forEach((line) => {
        expect(line.trim()).toMatch(/<!-- (.)+ -->/);
    });
});

test("Inside of the div#body > div.textContent shouldn't render 'nothing'", () => {
    const divChild = document.createElement("div");
    const divChildContent = document.createTextNode("nothing");
    divChild.appendChild(divChildContent);

    const newChildren = template(divChild.outerHTML);
    document.querySelector("html").innerHTML = newChildren;

    expect(document.querySelector("div#body").firstElementChild.nodeName).toEqual("DIV");
    expect(document.querySelector("div#body div").innerHTML).toEqual("nothing");
});

it("should content 'templates/head/head.pug' template inside of the template", () => {
    const newChildren = template("");

    expect(newChildren.includes(templateCompiler("templates/head/head.pug"))).toBeTruthy();
});

it("should content 'templates/scripts/scripts.pug' template inside of the template", () => {
    const newChildren = template("");

    expect(newChildren.includes(templateCompiler("templates/scripts/scripts.pug"))).toBeTruthy();
});