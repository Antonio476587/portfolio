import React from "react";

interface NavProps {
  typeLink?: string;
}

const Nav = React.forwardRef(
  function Nav(
    { typeLink }: NavProps,
    ref: React.ForwardedRef<HTMLAnchorElement>,
  ) {
    if (typeLink === "LinkFirst") {
      return (
        <div className="second-nav">
          <li className="nav-item">
            <a
              className="nav-link active"
              href="/works"
              ref={ref}
            >
              Works
            </a>
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
          <a
            className="nav-link"
            href="/?P=false"
            ref={ref}
            aria-current="location"
          >
            Home
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/about" ref={ref}>
            About
          </a>
        </li>
      </div>
    );
  },
);

export default Nav;
