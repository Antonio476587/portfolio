import React, { useEffect, useRef } from "https://esm.sh/react@18.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@18.2.0/client";

import Contact from "./Contact.tsx";
import MainMenuItem from "./MainMenuItem.tsx";
import Menu from "./Menu.tsx";

function aboutLinkTween(
  main: HTMLElement | false,
  aboutLink: HTMLElement,
  e?: Event,
): void {
  e?.preventDefault();
  if (main) scrollTo(0, main.offsetTop);
  const q = gsap.utils.selector(aboutLink);
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
    onComplete: () => {
      if (aboutLink.dataset.link) location.assign(aboutLink.dataset.link);
    },
  });
}

function workLinkTween(
  main: HTMLElement | false,
  worksLink: HTMLElement,
  e?: Event,
): void {
  e?.preventDefault();
  if (main) scrollTo(0, main.offsetTop);
  const q = gsap.utils.selector(worksLink);
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
    onComplete: () => {
      if (worksLink.dataset.link) location.assign(worksLink.dataset.link);
    },
  });
}

export default function MainPage() {
  const mainRef: React.RefObject<HTMLElement> = useRef(null);
  const contactRef: React.RefObject<HTMLDivElement> = useRef(null);
  const aboutLinkRef: React.RefObject<HTMLAnchorElement> = useRef(null);
  const worksLinkRef: React.RefObject<HTMLAnchorElement> = useRef(null);
  const tl: React.MutableRefObject<gsap.core.Timeline | null> = useRef(null);

  useEffect(() => {
    let animation1: gsap.core.Tween;
    const contact: HTMLElement | boolean = contactRef.current ?? false;
    const main: HTMLElement | boolean = mainRef.current ?? false;
    let { current: tlCurrent } = tl;

    if (tlCurrent == null) {
      if (contact) {
        tlCurrent = gsap.timeline({
          scrollTrigger: {
            fastScrollEnd: true,
            trigger: contact,
            id: contact.id,
            start: "center center",
            end: "center-=200 top",
            toggleActions: "play none none reverse",
            scrub: true,
          },
          defaults: { duration: 1, ease: "none" },
        });
      }
    }
    if (tlCurrent) {
      if (main) {
        animation1 = gsap.to(["#main-menu-item1", "#main-menu-item2"], {
          perspective: 100,
          scrollTrigger: {
            fastScrollEnd: true,
            trigger: main,
            id: main.id,
            start: "bottom bottom",
            end: "bottom top",
            toggleActions: "play none none reverse",
            scrub: true,
          },
        });
      }
      tlCurrent.to(".linkedIN", {
        height: "110%",
        repeat: 1,
        yoyo: true,
      });
    }

    return () => {
      if (tlCurrent) tlCurrent.kill();
      if (animation1) animation1.kill();
    };
  }, []);

  useEffect(() => {
    const main: HTMLElement | boolean = mainRef.current ?? false;
    const aboutLink: HTMLElement | boolean = aboutLinkRef.current ?? false;
    const worksLink: HTMLElement | boolean = worksLinkRef.current ?? false;

    if (aboutLink && worksLink) {
      aboutLink.addEventListener(
        "click",
        (e) => {
          aboutLinkTween(main, aboutLink, e);
        },
        false,
      );
      worksLink.addEventListener(
        "click",
        (e) => {
          workLinkTween(main, worksLink, e);
        },
        false,
      );
    }
    return () => {
      if (aboutLink && worksLink) {
        aboutLink.removeEventListener(
          "click",
          (e) => {
            aboutLinkTween(main, aboutLink, e);
          },
          false,
        );
        worksLink.removeEventListener(
          "click",
          (e) => {
            workLinkTween(main, worksLink, e);
          },
          false,
        );
      }
    };
  }, []);

  const changeVisibilityMenu = () => {
    const menu: HTMLElement | null = document.querySelector(".menu");

    if (menu) {
      menu.toggleAttribute("hidden");
      if (!menu.hasAttribute("hidden")) {
        gsap.to(".menu-base-footer", {
          duration: 1,
          height: "25%",
          marginTop: 0,
          clipPath: "polygon(100% 0, 100% 100%, 0 100%, 0 0, 50% 0)",
        });
      } else {
        gsap.set(".menu-base-footer", {
          height: 0,
          marginTop: "25%",
          clipPath: "polygon(100% 35%, 100% 100%, 0 100%, 0 0, 50% 60%)",
        });
      }
    }
  };

  return (
    <>
      {/* @ts-ignore */}
      <Contact changeVisibilityMenu={changeVisibilityMenu} ref={contactRef} />
      <main id="main" ref={mainRef}>
        <div className="main-menu">
          <a data-link="/about" ref={aboutLinkRef} href="/about">
            <MainMenuItem name="About" id="main-menu-item1" />
          </a>
          <a data-link="/works" ref={worksLinkRef} href="/works">
            <MainMenuItem name="Works" id="main-menu-item2" />
          </a>
        </div>
      </main>
      <Menu changeVisibilityMenu={changeVisibilityMenu} />
    </>
  );
}

try {
  const mainPage = document.getElementById("MainPage");
  if (mainPage) {
    hydrateRoot(mainPage, <MainPage />);
  }
} catch (e) {
  console.error(e);
}