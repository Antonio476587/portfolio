import React, { useEffect, useRef } from "react";

import Nav from "./HeaderWorkNav.tsx";

export default function HeaderWork() {
  const bookmarkRef: React.RefObject<HTMLDivElement> = useRef(null);
  const aLinksRef: React.RefObject<HTMLAnchorElement[]> = useRef([]);

  function addMouseOverEvent(event: MouseEvent): void {
    if (event.target == null) return;

    const { target } = event;

    let { clientHeight } = target;
    let { clientWidth } = target;
    let { offsetLeft: left } = target;

    clientHeight = typeof clientHeight === "string"
      ? globalThis.parseInt(clientHeight, 10)
      : clientHeight;
    clientWidth = typeof clientWidth === "string"
      ? globalThis.parseInt(clientWidth, 10)
      : clientWidth;
    left = typeof left === "string" ? globalThis.parseInt(left, 10) : left;

    if (aLinksRef.current) {
      aLinksRef.current.forEach((aLink) => {
        if (aLink.className.includes("active")) {
          aLink.classList.remove("active");
        }
      });
    }

    target.classList.add("active");

    if (bookmarkRef.current) {
      if (bookmarkRef.current.firstElementChild) {
        bookmarkRef.current.firstElementChild.style.height = `${
          clientHeight + 10
        }px`;
        bookmarkRef.current.firstElementChild.style.width = `${clientWidth + 10}px`;
        bookmarkRef.current.style.left = `${left - 5}px`;
      }
    }
  }

  function addMouseLeaveEvent(event: MouseEvent): void {
    event.target?.classList.toggle("active");
    if (bookmarkRef.current?.firstElementChild) {
      bookmarkRef.current.firstElementChild.style.height = "0px";
    }
  }

  useEffect(() => {
    const aLinks = aLinksRef.current;

    if (aLinks) {
      if (bookmarkRef.current && aLinks[2]) {
        bookmarkRef.current.style.left = `${aLinks[2].offsetLeft - 5}px`;
      }

      aLinks.forEach((aLink) => {
        aLink.addEventListener("mouseover", addMouseOverEvent);
      });
      aLinks.forEach((aLink) => {
        aLink.addEventListener("mouseleave", addMouseLeaveEvent);
      });
    }

    return () => {
      if (aLinks) {
        aLinks.forEach((aLink) => {
          aLink.removeEventListener("mouseover", addMouseOverEvent);
        });
        aLinks.forEach((aLink) => {
          aLink.removeEventListener("mouseleave", addMouseLeaveEvent);
        });
      }
    };
  }, [aLinksRef, aLinksRef.current]);
  /* For future changes
  function moveBookmarkResponsive() {
    if (!nav.className.includes("collapsing") || nav === undefined) return;
    bookmarkRef.current.style.left = "-1em";
    bookmarkRef.current.style.top = `${aLinks[2].offsetTop}px`;
  }
 */
  const addALinksRefs = (el: HTMLAnchorElement): void => {
    if (aLinksRef.current) {
      if (el && !aLinksRef.current.includes(el)) {
        aLinksRef.current.push(el);
      }
    }
  };

  return (
    <header id="header-work" className="header-work">
      <nav className="navbar navbar-expand-lg navbar-light" id="nav-work">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            /*             onClick={moveBookmarkResponsive} */
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse smoother-nav"
            id="navbarTogglerDemo02"
          >
            <ul className="navbar-nav me-auto">
              <Nav ref={addALinksRefs} />
              <Nav typeLink="LinkFirst" ref={addALinksRefs} />
            </ul>
            <div className="bookmark" ref={bookmarkRef}>
              <div className="bookmark-child"></div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
