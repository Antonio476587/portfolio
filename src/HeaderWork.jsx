import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Nav = React.forwardRef(({ typeLink }, ref) => {
  if (typeLink === "LinkFirst") {
    return (
      <div className="second-nav">
        <li className="nav-item">
          <Link
            className="nav-link active"
            to="/works"
            aria-current="page"
            ref={ref}
          >
            Works
          </Link>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/?P=false" ref={ref}>
            Contact
          </a>
        </li>
      </div>
    );
  }

  return (
    <div className="first-nav">
      <li className="nav-item">
        <a className="nav-link" href="/?P=false" ref={ref}>
          Home
        </a>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/about" ref={ref}>
          About
        </Link>
      </li>
    </div>
  );
});

export default function HeaderWork() {
  const bookmarkRef = useRef();
  const aLinksRef = useRef([]);

  function addMouseOverEvent(e) {
    aLinksRef.current.forEach((aLink) => {
      if (aLink.className.includes("active")) aLink.classList.remove("active");
    });
    e.target.classList.toggle("active");
    const { clientHeight } = e.target;
    const { clientWidth } = e.target;
    const left = e.target.offsetLeft;

    bookmarkRef.current.childNodes[0].style.height = `${clientHeight + 10}px`;
    bookmarkRef.current.childNodes[0].style.width = `${clientWidth + 10}px`;
    bookmarkRef.current.style.left = `${left - 5}px`;
  }

  function addMouseLeaveEvent(e) {
    e.target.classList.toggle("active");
    bookmarkRef.current.childNodes[0].style.height = "0px";
  }

  useEffect(() => {
    const aLinks = aLinksRef.current;
    bookmarkRef.current.style.left = `${aLinks[2].offsetLeft - 5}px`;

    aLinks.forEach((aLink) => {
      aLink.addEventListener("mouseover", addMouseOverEvent);
    });
    aLinks.forEach((aLink) => {
      aLink.addEventListener("mouseleave", addMouseLeaveEvent);
    });

    return () => {
      aLinks.forEach((aLink) => {
        aLink.removeEventListener("mouseover", addMouseOverEvent);
      });
      aLinks.forEach((aLink) => {
        aLink.removeEventListener("mouseleave", addMouseLeaveEvent);
      });
    };
  });
  /* For future changes
  function moveBookmarkResponsive() {
    if (!nav.className.includes("collapsing") || nav === undefined) return;
    bookmarkRef.current.style.left = "-1em";
    bookmarkRef.current.style.top = `${aLinks[2].offsetTop}px`;
  }
 */
  const addALinksRefs = (el) => {
    if (el && !aLinksRef.current.includes(el)) {
      aLinksRef.current.push(el);
    }
  };

  return (
    <header className="header-work">
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
