import { useStore } from "@nanostores/react";
import { isMenuOpen } from "../stores/menuStore.ts";

const menuItems = ["Home", "About", "Works", "Contact"] as const;

export default function Menu() {
  let $isMenuOpen = useStore(isMenuOpen);

  return $isMenuOpen ? (
    <div id="menu" class="animate__animated animate__fadeInLeft">
      <div id="menu-base">
        {menuItems.map((value) => {
          return <div class="menu-item">
            <a class="menu-item-box" href={"#" + value.toLowerCase()} onClick={(e) => isMenuOpen.set(!$isMenuOpen)}>
              <h3>{value}</h3>
            </a>
          </div>
        })}
      </div>
    </div>
  ) : (
    <></>
  );
}