import { atom } from "nanostores";

export const isMenuOpen = atom(false);

globalThis.isMenuOpen = isMenuOpen;