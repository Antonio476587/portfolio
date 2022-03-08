import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

import HeaderWork from "./HeaderWork.jsx";
import { arrow, arrowCaret } from "./Svg.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Work({ work, index }) {
  const sectionRef1 = useRef();
  const sectionRef2 = useRef();
  const sectionRef3 = useRef();
  const sectionRef4 = useRef();
  const likeRunesRef = useRef();
  const divitionRefs = useRef([]);
  const tl = useRef();
  const qRunes = gsap.utils.selector(likeRunesRef);
  const q = gsap.utils.selector(sectionRef1);
  const q2 = gsap.utils.selector(sectionRef2);
  const q3 = gsap.utils.selector(sectionRef3);
  const q4 = gsap.utils.selector(sectionRef4);

  useEffect(() => {
    tl.current = gsap.timeline({
      defaults: {
        y: 50,
        autoAlpha: 0,
      },
    });

    divitionRefs.current.forEach((div) => {
      tl.current.from(div, {
        scrollTrigger: {
          trigger: div,
          scrub: true,
          toggleActions: "play none none reverse",
          end: "bottom center+=100",
        },
      });
    });
    return () => {
      tl.current.kill();
    };
  }, []);

  useEffect(() => {
    let animation4;
    let animation5;
    const animation1 = gsap.from(qRunes(".div"), {
      duration: 2,
      width: "50%",
      delay: 0.6,
    });

    const animation2 = gsap.from(q(".banner-1-img"), {
      duration: 1,
      autoAlpha: 0,
      xPercent: 100,
      delay: 3.4,
      clearProps: "transform",
      onComplete: () => {
        animation2.kill();
        animation4 = gsap.to(q(".banner-1-img"), {
          duration: 1,
          autoAlpha: 0,
          xPercent: 100,
          scrollTrigger: {
            trigger: sectionRef1.current,
            scrub: true,
            toggleActions: "play none none reverse",
            start: "top top",
            end: "bottom center",
          },
        });
      },
    });
    const animation3 = gsap.from(q(".container"), {
      duration: 1,
      autoAlpha: 0,
      xPercent: -100,
      delay: 3.4,
      onComplete: () => {
        animation3.kill();
        animation5 = gsap.to(q(".container"), {
          duration: 1,
          autoAlpha: 0,
          xPercent: -100,
          scrollTrigger: {
            trigger: sectionRef1.current,
            scrub: true,
            toggleActions: "play none none reverse",
            start: "top top",
            end: "bottom center",
          },
        });
      },
    });

    const animation6 = gsap.to(q(".arrow-span-1"), {
      duration: 1,
      autoAlpha: 0,
      scrollTrigger: {
        trigger: sectionRef1.current,
        scrub: true,
        toggleActions: "play none none reverse",
        start: "top top",
        end: "bottom center",
      },
    });
    return () => {
      animation1.kill();

      animation4.kill();
      animation5.kill();
      animation6.kill();
    };
  }, []);

  useEffect(() => {
    const animation1 = gsap.from(q2(".div-img"), {
      duration: 1,
      autoAlpha: 0.5,
      xPercent: 70,
      yPercent: 60,
      scrollTrigger: {
        trigger: sectionRef2.current,
        scrub: true,
        toggleActions: "play none none reverse",
        end: "center center+=100",
      },
    });
    const animation2 = gsap.from(q2(".div-p"), {
      duration: 1,
      autoAlpha: 0.3,
      scale: 0.3,
      scrollTrigger: {
        trigger: sectionRef2.current,
        scrub: true,
        toggleActions: "play none none reverse",
        end: "center center+=100",
      },
    });

    return () => {
      animation1.kill();
      animation2.kill();
    };
  }, []);

  useEffect(() => {
    const animation1 = gsap.from(q3(".div-img"), {
      duration: 1,
      autoAlpha: 0.5,
      xPercent: -70,
      yPercent: 60,
      scrollTrigger: {
        trigger: sectionRef3.current,
        scrub: true,
        toggleActions: "play none none reverse",
        end: "center center+=100",
      },
    });
    const animation2 = gsap.from(q3(".div-p"), {
      duration: 1,
      autoAlpha: 0.3,
      scale: 0.3,
      scrollTrigger: {
        trigger: sectionRef3.current,
        scrub: true,
        toggleActions: "play none none reverse",
        end: "center center+=100",
      },
    });

    return () => {
      animation1.kill();
      animation2.kill();
    };
  }, []);

  useEffect(() => {
    const animation1 = gsap.from(q4(".div-p"), {
      duration: 1,
      autoAlpha: 0,
      xPercent: -100,
      scrollTrigger: {
        trigger: sectionRef4.current,
        scrub: true,
        toggleActions: "play none none reverse",
        end: "center center",
      },
    });
    const animation2 = gsap.from(q4(".main-footer-bottom"), {
      duration: 1,
      autoAlpha: 0,
      yPercent: -20,
      scrollTrigger: {
        trigger: sectionRef4.current,
        scrub: true,
        toggleActions: "play none none reverse",
        start: "top+=100 bottom",
        end: "center center",
      },
    });

    return () => {
      animation1.kill();
      animation2.kill();
    };
  }, []);

  function addRefs(el) {
    if (el && !divitionRefs.current.includes(el)) {
      divitionRefs.current.push(el);
    }
  }

  function prevSection() {
    if (index === 1) return;
    location.assign(index - 1);
  }
  function nextSection() {
    index === 2
      ? location.assign("/tic-tac-toe.html")
      : location.assign(index + 1);
  }
  return (
    <div
      id="body-work"
      style={{
        "--color-body-background": work.styles[0],
        "--color-foreground": work.styles[1],
        "--color-foreground-2": work.styles[2],
      }}
    >
      <div className="like-runes" ref={likeRunesRef}>
        <div className="div" />
        <div className="div" />
      </div>
      <HeaderWork />

      <main className="main">
        <section className="section container banner-1" ref={sectionRef1}>
          <div className="banner-1-div">
            <div className="container">
              <h2 title="work-title">{work.h2}</h2>
              <p>{work.p1}</p>

              <div className="div" />
              <div className="div" />
              <div className="div" />
            </div>

            <div className="banner-1-img">
              <img src={work.img1} alt="There will be alt text soon..." />
            </div>
          </div>

          <span className="arrow-span-1">
            {arrowCaret}
            {arrowCaret}
            {arrowCaret}
          </span>
        </section>

        <div className="divition" ref={addRefs} />

        <section className="section-2 section-main container" ref={sectionRef2}>
          <div className="div-img">
            <img src={work.img2} alt="There will be alt text soon..." />
          </div>

          <div className="div-p">
            <p>{work.p2}</p>
          </div>
        </section>

        <div className="divition" ref={addRefs} />

        <section className="section-3 section-main container" ref={sectionRef3}>
          <div className="div-p">
            <p>{work.p3}</p>
          </div>

          <div className="div-img">
            <img src={work.img3} alt="There will be alt text soon..." />
          </div>
        </section>

        <div className="divition" ref={addRefs} />

        <footer className="main-footer container" ref={sectionRef4}>
          <div className="div-p">
            <p>{work.p4}</p>
          </div>
          <div className="main-footer-bottom">
            <button
              type="button"
              className="main-footer-span"
              onClick={prevSection}
            >
              {arrow}
            </button>
            <div>
              <img src={work.img4} alt="There will be alt text soon..." />
            </div>
            <button
              type="button"
              className="main-footer-span"
              onClick={nextSection}
            >
              {arrow}
            </button>
          </div>
        </footer>

        <div className="divition" ref={addRefs} />
      </main>
    </div>
  );
}
