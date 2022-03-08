import React, { useRef, useEffect } from "react";

import Contact from "./Contact.jsx";
import MainMenuItem from "./MainMenuItem.jsx";
import Menu from "./Menu.jsx";

export default function MainPage() {
  const mainRef = useRef();
  const contactRef = useRef();
  const aboutLinkRef = useRef();
  const worksLinkRef = useRef();
  const tl = useRef();

  useEffect(() => {
    tl.current = gsap.timeline({
      scrollTrigger: {
        fastScrollEnd: true,
        trigger: contactRef.current,
        id: contactRef.current.id,
        start: "center center",
        end: "center-=200 top",
        toggleAttribute: "play none none reverse",
        scrub: true,
      },
      defaults: { duration: 1, ease: "none" },
    });

    const animation1 = gsap.to(["#main-menu-item1", "#main-menu-item2"], {
      perspective: 100,
      scrollTrigger: {
        fastScrollEnd: true,
        trigger: mainRef.current,
        id: mainRef.current.id,
        start: "bottom bottom",
        end: "bottom top",
        toggleAttribute: "play none none reverse",
        scrub: true,
      },
    });

    tl.current.to(".linkedIN", {
      height: "110%",
      repeat: 1,
      yoyo: true,
    });

    return () => {
      tl.current.kill();
      if (animation1) animation1.kill();
    };
  }, []);

  useEffect(() => {
    const aboutA = aboutLinkRef.current;
    const worksA = worksLinkRef.current;
    aboutA.addEventListener("click", () => {
      scrollTo(0, mainRef.current.offsetTop);
      const q = gsap.utils.selector(aboutA);
      gsap.set(q(".main-menu-item"), { clearProps: "all" });
      gsap.to(q(".main-menu-item"), {
        perspective: 73,
        zIndex: 10,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        perspectiveOrigin: "center",
        duration: 1,
        onComplete: () =>
          location.assign(gsap.getProperty(aboutA, "data-link")),
      });
    });
    worksA.addEventListener("click", () => {
      scrollTo(0, mainRef.current.offsetTop);
      const q = gsap.utils.selector(worksA);
      gsap.set(q(".main-menu-item"), { clearProps: "all" });
      gsap.to(q(".main-menu-item"), {
        perspective: 73,
        zIndex: 10,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        perspectiveOrigin: "center",
        duration: 1,
        onComplete: () =>
          location.assign(gsap.getProperty(worksA, "data-link")),
      });
    });
    return () => {};
  }, []);

  const changeVisibilityMenu = () => {
    const menu = document.querySelector(".menu");
    menu.toggleAttribute("hidden");
  };

  return (
    <>
      <Contact changeVisibilityMenu={changeVisibilityMenu} ref={contactRef} />
      <main id="main" ref={mainRef}>
        <div className="main-menu">
          <a data-link="/about" ref={aboutLinkRef}>
            <MainMenuItem name="About" id="main-menu-item1" />
          </a>
          <a data-link="/works" ref={worksLinkRef}>
            <MainMenuItem name="Works" id="main-menu-item2" />
          </a>
        </div>
      </main>
      <Menu changeVisibilityMenu={changeVisibilityMenu} />
    </>
  );
}
