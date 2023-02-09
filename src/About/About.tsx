import anime from "https://esm.sh/animejs@3.2.1";
import React, { useEffect, useRef } from "https://esm.sh/react@18.2.0";
import { hydrateRoot } from "https://esm.sh/react-dom@18.2.0/client";

import HeaderAbout from "./HeaderAbout.tsx";
import Illustration from "./Illustration.tsx";
import { arrowLeftSquare, personSvg, workSvg } from "../Utils/Svg.tsx";

const azure = "rgb(240, 255, 255)";
const black = "rgb(34, 38, 42)";
const orange = "rgb(253, 126, 23)";
const sand = "rgb(106, 90, 205)";
let colorBox;
let colorBox2;

const InfoAbout = React.forwardRef(function InfoAbout(
  _props,
  ref: React.ForwardedRef<HTMLDivElement>,
): JSX.Element {
  return (
    <div className="container mb-5 about-me cajita" ref={ref}>
      <div className="container title-me d-flex">
        <div className="container">
          <h3 className="h3">About me</h3>
        </div>
        <span className="container">{personSvg}</span>
      </div>

      <div className="container text-container">
        <p className="text m-1 pr p-about-me">
          I always want to give my best, help who need it and grow as a person.
          I would like to provide a great programming experience by working with
          you, I don’t consider any project too big or small. I always try to be
          updated and consider me responsible and constant, and if I got errors,
          I try to learn from them as much as I can, ¡Thanks for visit me!
        </p>
      </div>
    </div>
  );
});

export default function About(): JSX.Element {
  const box: React.RefObject<HTMLDivElement> = useRef(null);
  const infoAboutRef: React.RefObject<HTMLDivElement> = useRef(null);
  const headerAboutRef: React.RefObject<HTMLDivElement> = useRef(null);
  const illustrationRef: React.RefObject<HTMLDivElement> = useRef(null);

  const boxes: JSX.Element[] = [];

  for (let i = 0; i < 50; i++) {
    const element: JSX.Element = <div key={i + 1} className="svg-div" />;
    boxes.push(element);
  }

  useEffect(() => {
    globalThis.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    anime.set(".svg-div", {
      translateX: () => anime.random(-400, 400),
      translateY: () => anime.random(-1100, 1100),
      rotate: () => anime.random(0, 360),
    });
  }, []);

  useEffect(() => {
    function randomValues() {
      if (location.pathname !== "/about") return;
      anime({
        targets: [".svg-div"],
        easing: "easeInOutQuad",
        duration: 6000,
        scale: () => anime.random(0.5, 1.5),
        translateX: () => anime.random(-400, 400),
        translateY: () => anime.random(-1100, 1100),
        rotate: () => anime.random(0, 360),
        complete: randomValues,
      });
      gsap.getProperty(".svg-div", "--gradient-color") === black
        ? (colorBox = azure)
        : (colorBox = black);
      gsap.to(".svg-div", {
        duration: 6,
        "--gradient-color": colorBox,
      });
      gsap.getProperty(".svg-div", "--gradient-color-2") === sand
        ? (colorBox2 = orange)
        : (colorBox2 = sand);
      gsap.to(".svg-div", {
        duration: 6,
        "--gradient-color-2": colorBox2,
      });
    }

    if (location.pathname == "/about") randomValues();
  }, [box]);

  useEffect(() => {
    const infoAbout = infoAboutRef.current ?? false;
    const headerAbout = headerAboutRef.current ?? false;
    const illustration = illustrationRef.current ?? false;

    let animationInfoAbout: gsap.core.Tween;
    let animationInfoAboutCallback: gsap.core.Tween;
    let animationHeaderAbout: gsap.core.Tween;
    let animationIllustration: gsap.core.Tween;

    if (infoAbout) {
      animationInfoAbout = gsap.to(infoAbout, {
        delay: 0.5,
        duration: 1,
        autoAlpha: 1,
        scale: 1,
        rotation: 0,
        onComplete: () => {
          animationInfoAbout.kill();
          animationInfoAboutCallback = gsap.to(infoAbout, {
            rotation: 45,
            autoAlpha: 0,
            scrollTrigger: {
              id: "infoTrigger",
              trigger: infoAbout,
              start: "top top",
              end: "bottom top+=50",
              scrub: true,
              toggleActions: "play none none reverse",
            },
          });
        },
      });
    }

    if (headerAbout && illustration) {
      animationHeaderAbout = gsap.to(headerAbout, {
        autoAlpha: 1,
        scale: 1,
        xPercent: 3,
        scrollTrigger: {
          id: "section1",
          trigger: headerAbout,
          start: "bottom bottom",
          end: "center center",
          scrub: true,
          once: true,
        },
      });
      animationIllustration = gsap.from(illustration, {
        opacity: 0,
        scrollTrigger: {
          id: "section3",
          trigger: illustration,
          start: "top bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
          scrub: true,
        },
      });
    }

    return () => {
      animationInfoAbout?.kill();
      animationInfoAboutCallback?.kill();
      animationHeaderAbout?.kill();
      animationIllustration?.kill();
    };
  }, [
    illustrationRef,
    illustrationRef.current,
    headerAboutRef,
    headerAboutRef.current,
  ]);

  return (
    <div className="about" id="About" role="main" aria-roledescription="about">
      <a href="/?P=false" className="back-about">
        <span className="container">{arrowLeftSquare}</span>
      </a>

      <div ref={box}>{boxes}</div>

      <InfoAbout ref={infoAboutRef} />

      <HeaderAbout ref={headerAboutRef} />

      <Illustration ref={illustrationRef} />

      <a href="/works" className="go-work">
        <span className="container">{workSvg}</span>
      </a>
    </div>
  );
}

try {
  const about = document.getElementById("About");
  if (about) {
    hydrateRoot(about, <About />);
  }
} catch (e) {
  console.error(e);
}
export { InfoAbout };
