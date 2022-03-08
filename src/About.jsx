import anime from "animejs";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import HeaderAbout from "./HeaderAbout.jsx";
import Illustration from "./Illustration.jsx";
import { personSvg, arrowLeftSquare, workSvg } from "./Svg.jsx";

gsap.registerPlugin(ScrollTrigger);

const azure = "rgb(240, 255, 255)";
const black = "rgb(34, 38, 42)";
const orange = "rgb(253, 126, 23)";
const sand = "rgb(252, 255, 158)";
let colorBox;
let colorBox2;

const InfoAbout = React.forwardRef((props, ref) => (
  <div className="container mb-5 about-me cajita" ref={ref}>
    <div className="container title-me d-flex">
      <div className="container">
        <h3 className="h3">About me</h3>
      </div>
      <span className="container">{personSvg}</span>
    </div>

    <div className="container text-container">
      <p className="text m-1 pr p-about-me">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta officiis provident quo accusantium quisquam aliquam non ipsam dicta fugiat atque ad, voluptates sunt maxime a voluptatem facere nisi, hic quidem velit. In non dolore fugiat facilis! Totam, facilis. Modi error non commodi atque aperiam a sed mollitia voluptate corporis magni.
      </p>
    </div>
  </div>
));

export default function About() {
  const box = useRef();
  const infoAboutRef = useRef();
  const headerAboutRef = useRef();
  const illustrationRef = useRef();
  const tl = useRef();
  const q = gsap.utils.selector(box);

  const boxes = [];

  for (let i = 0; i < 50; i++) {
    const element = <div key={i + 1} className="svg-div" />;
    boxes.push(element);
  }

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
      gsap.to(q(".svg-div"), {
        duration: 6,
        "--gradient-color": colorBox,
      });
      gsap.getProperty(".svg-div", "--gradient-color-2") === sand
        ? (colorBox2 = orange)
        : (colorBox2 = sand);
      gsap.to(q(".svg-div"), {
        duration: 6,
        "--gradient-color-2": colorBox2,
      });
    }

    randomValues();
  });

  useEffect(() => {
    let animation2;
    tl.current = gsap.timeline({
      defaults: {
        duration: 1,
        scale: 0.3,
        autoAlpha: 0,
      },
    });

    const animation1 = gsap.from(infoAboutRef.current, {
      delay: 0.5,
      duration: 1,
      autoAlpha: 0,
      scale: 0.3,
      rotation: 45,
      onComplete: () => {
        animation1.kill();
        animation2 = gsap.to(infoAboutRef.current, {
          rotation: 45,
          autoAlpha: 0,
          scrollTrigger: {
            id: "infoTrigger",
            trigger: infoAboutRef.current,
            start: "top top",
            end: "bottom top+=50",
            scrub: true,
            toggleActions: "play none none reverse",
          },
        });
      },
    });

    tl.current
      .from(headerAboutRef.current, {
        xPercent: 3,
        scrollTrigger: {
          id: "section1",
          trigger: headerAboutRef.current,
          start: "top+=150 bottom",
          end: "center center",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      })
      .from(illustrationRef.current, {
        scrollTrigger: {
          id: "section3",
          trigger: illustrationRef.current,
          start: "top bottom",
          end: "center bottom",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      });

    return () => {
      tl.current.kill();
      animation1.kill();
      animation2.kill();
    };
  }, []);

  return (
    <div className="about" id="About" role="main" aria-roledescription="about">
      <a href="/?P=false" className="back-about">
        <span className="container">{arrowLeftSquare}</span>
      </a>

      <div ref={box}>{boxes}</div>

      <InfoAbout ref={infoAboutRef} />

      <HeaderAbout ref={headerAboutRef} />

      <Illustration ref={illustrationRef} />

      <Link to="/works" className="go-work">
        <span className="container">{workSvg}</span>
      </Link>
    </div>
  );
}
