/**
 * @jest-environment jsdom
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import MenuNFT, { MenuNFTItem } from "../../../src/MainPage/MenuNFT";

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

describe("MenuNFT", () => {

    it("should be disabled by default", () => {
        act(() => {
            root.render(<MenuNFT />);
        });

        expect(document.querySelector(".menu-nft").classList.toString().includes("disabled")).toBeTruthy();
        expect(document.querySelector(".menu-nft").classList.toString().includes("active")).toBeFalsy();
    });

    it("can be activated clicking the button in MenuNFT", () => {
        act(() => {
            root.render(<MenuNFT />);
        });

        const menuNFTDiv = document.querySelector(".menu-nft");

        act(() => {
            document.querySelector("button#nft-button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(menuNFTDiv.classList.toString().includes("disabled")).toBeFalsy();
        expect(menuNFTDiv.classList.toString().includes("active")).toBeTruthy();

        act(() => {
            document.querySelector("button#nft-button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(menuNFTDiv.classList.toString().includes("disabled")).toBeTruthy();
        expect(menuNFTDiv.classList.toString().includes("active")).toBeFalsy();

        act(() => {
            document.querySelector("button#nft-button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(menuNFTDiv.classList.toString().includes("disabled")).toBeFalsy();
        expect(menuNFTDiv.classList.toString().includes("active")).toBeTruthy();
    });

    test("all the MenuNFTItems should have a nice structure", () => {
        act(() => {
            root.render(<MenuNFT />);
        });

        document.querySelectorAll(".menu-nft-item").forEach((element) => {
            expect(element.querySelector(".nft-item-price-div h3").textContent).toMatch(/\d*(\$|bs)$/is);
            expect(element.querySelector(".menu-nft-item-portrait img").src).toMatch(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
            expect(parseInt(element.querySelector(".nft-item-detail-div h3").textContent)).toBeGreaterThan(0);
        });
    });

});

describe("MenuNFTItem", () => {

    it("should render the correct props", () => {
        const price = "100$";
        const imgSrc = "family_is_family.pngtfff";
        const name = "80";
        const childrenContent = "nonono";

        act(() => {
            root.render(<MenuNFTItem price={price} img={imgSrc} name={name} >{childrenContent}</MenuNFTItem>);
        });

        expect(document.querySelector(".nft-item-price-div h3").textContent).toEqual(price);
        expect(document.querySelector(".menu-nft-item-portrait img").src).toEqual("http://localhost/" + imgSrc);
        expect(document.querySelector(".nft-item-detail-div h3").textContent).toEqual(name);
        expect(document.querySelector(".nft-item-detail-div p").textContent).toEqual(childrenContent);
    });

    it("should change the classes by clicking the button in MenuNFTItem", () => {
        act(() => {
            root.render(<MenuNFTItem price="10000000&" img="aguacate-three-thousand.jpeg" name="jogabonito" >Sweet Pain</MenuNFTItem>);
        });

        const nftItemPriceDiv = document.querySelector(".nft-item-price-div");
        const nftItemDetailDiv = document.querySelector(".nft-item-detail-div");

        expect(nftItemPriceDiv.classList.contains("nft-item-price-hidden")).toBeFalsy();
        expect(nftItemDetailDiv.classList.contains("nft-item-detail-active")).toBeFalsy();

        act(() => {
            document.querySelector(".menu-nft-item").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(nftItemPriceDiv.classList.contains("nft-item-price-hidden")).toBeTruthy();
        expect(nftItemDetailDiv.classList.contains("nft-item-detail-active")).toBeTruthy();

        act(() => {
            document.querySelector(".menu-nft-item").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        expect(nftItemPriceDiv.classList.contains("nft-item-price-hidden")).toBeFalsy();
        expect(nftItemDetailDiv.classList.contains("nft-item-detail-active")).toBeFalsy();

    });

});