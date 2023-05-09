import { useStore } from "@nanostores/react";
import { isMenuOpen } from "../../stores/menuStore.ts";

export default function MenuButtton() {
    const $isMenuOpen = useStore(isMenuOpen);

    return (
        <button className="btn btn-secondary btn-home" aria-label="Click here to open the menu" type="button" role="button" aria-roledescription="button" onClick={() => isMenuOpen.set(!$isMenuOpen)}>
            <svg className="bi bi-text-right" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"></path>
            </svg>
        </button>
    )
}