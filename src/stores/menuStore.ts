import { atom } from "nanostores";

export const isMenuSticky = atom(true);

globalThis.isMenuSticky = isMenuSticky;
