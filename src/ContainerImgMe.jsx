import React, { useState } from "react";

export default function ContainerImgMe({ nameContainer }) {
  const [active, setActive] = useState("active-me");
  const [active2, setActive2] = useState("desactive-me");

  function changeMe() {
    if (active === "active-me") setActive("desactive-me");
    else setActive("active-me");

    if (active2 === "desactive-me") setActive2("active-me");
    else setActive2("desactive-me");
  }

  return (
    <div className="container me pt-5 mb-5 col-5">
      <span
        className="bbtn"
        onClick={changeMe}
        title="button-me"
        aria-labelledby="This is a button to change me-img"
        role="button"
        tabIndex={0}
        aria-roledescription="button"
      />
      <div className="container">
        <div className={`container over-img ${nameContainer}`}>
          <div className={active} />
          <div className={active2} />
        </div>
      </div>
    </div>
  );
}
