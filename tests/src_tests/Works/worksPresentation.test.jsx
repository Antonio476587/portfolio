/**
 * @jest-environment jsdom
 */

import worksPresentation, { getWorksForWall } from "../../../src/Works/worksPresentation";

it("should return the 8 first elements of workPresentation", () => {
    expect(getWorksForWall(1)).toEqual(worksPresentation.slice(0, 8));
});

test("If there are no more projects to show up, it should append the NA worksPresentationObject", () => {
    const NA = {
        img: "/img/NA.webp",
        squaredImg: "/img/NA-squared.webp",
        alternativeText: "It's a building's window, there's no work there already",
        workUrlId: "/",
    };

    const NAArray = new Array(8).fill(NA, 0);

    expect(getWorksForWall(10)).toEqual(NAArray);
});

it("should return undefined if the parameter passed through getWorksForWall is not transformable to a number", () => {
    expect(getWorksForWall(["Bad Value"])).toEqual(undefined);
    expect(getWorksForWall({})).toEqual(undefined);
    expect(getWorksForWall("Bad Value")).toEqual(undefined);
});