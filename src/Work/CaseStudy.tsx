import React, { useEffect, useRef } from "https://esm.sh/react@18.2.0";

import { arrow, arrowCaret } from "../Utils/Svg.tsx";

import WorkChild from "./WorkChild.tsx";

const regVideo = /mp4/;

function CaseStudy({ work, changeSectionFunctions }: WorkChild): JSX.Element {
  const divitionRefs: React.RefObject<Array<HTMLDivElement>> = useRef([]);
  const sectionRef1: React.RefObject<HTMLElement> = useRef(null);
  const sectionRef2: React.RefObject<HTMLElement> = useRef(null);
  const sectionRef3: React.RefObject<HTMLElement> = useRef(null);
  const sectionRef4: React.RefObject<HTMLElement> = useRef(null);
  const tl: React.MutableRefObject<gsap.core.Timeline | null> = useRef(null);

  const [prevSection, nextSection] = changeSectionFunctions;

  useEffect(() => {
    tl.current = gsap.timeline({
      defaults: {
        y: 50,
        autoAlpha: 0,
      },
    });

    if (divitionRefs.current) {
      divitionRefs.current.forEach((div: HTMLDivElement) => {
        tl.current?.from(div, {
          scrollTrigger: {
            trigger: div,
            scrub: true,
            toggleActions: "play none none reverse",
            end: "bottom center+=100",
          },
        });
      });
    }
    return () => {
      if (tl.current) tl.current.kill();
    };
  }, [divitionRefs.current, divitionRefs]);

  useEffect(() => {
    let animation4: gsap.core.Tween, animation5: gsap.core.Tween;

    console.log("animating")
    console.log(ScrollTrigger);
    const animation2: gsap.core.Tween = gsap.from(document.querySelector(".banner-1-img"), {
      duration: 1,
      autoAlpha: 0,
      xPercent: 100,
      delay: 3.4,
      clearProps: "transform",
      onComplete: () => {
        console.log("animating on Complete");
        animation2.kill();
        animation4 = gsap.to(document.querySelector(".banner-1-img"), {
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
    const animation3: gsap.core.Tween = gsap.from(document.querySelectorAll(".container")[0], {
      duration: 1,
      autoAlpha: 0,
      xPercent: -100,
      delay: 3.4,
      onComplete: () => {
        animation3.kill();
        animation5 = gsap.to(document.querySelectorAll(".container")[0], {
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

    const animation6: gsap.core.Tween = gsap.to(".arrow-span-1", {
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
      animation2.kill();
      animation3.kill();
      animation4?.kill();
      animation5?.kill();
      animation6.kill();
    };
  }, [sectionRef1]);

  useEffect(() => {
    const animation1: gsap.core.Tween = gsap.from(document.querySelectorAll(".div-img")[0], {
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
    const animation2: gsap.core.Tween = gsap.from(document.querySelectorAll(".div-p")[0], {
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
  }, [sectionRef2]);

  useEffect(() => {
    const animation1: gsap.core.Tween = gsap.from(document.querySelectorAll(".div-img")[1], {
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
    const animation2: gsap.core.Tween = gsap.from(document.querySelectorAll(".div-p")[1], {
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
  }, [sectionRef3]);

  useEffect(() => {
    const animation1: gsap.core.Tween = gsap.from(document.querySelectorAll(".div-p")[2], {
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
    const animation2: gsap.core.Tween = gsap.from(".main-footer-bottom", {
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
  }, [sectionRef4]);

  function addRefs(el: HTMLDivElement): void {
    if (divitionRefs.current) {
      if (el && !divitionRefs.current.includes(el)) {
        divitionRefs.current.push(el);
      }
    }
  }

  return (
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
            <img src={work.media1[0]} alt={work.media1[1]} />
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
          {work.media2[0]?.match(regVideo)
            ? <video src={work.media2[0]} autoPlay loop controls />
            : <img src={work.media2[0]} alt={work.media2[1]} />}
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
          {work.media3[0]?.match(regVideo)
            ? <video src={work.media3[0]} autoPlay loop controls />
            : <img src={work.media3[0]} alt={work.media3[1]} />}
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
            aria-label="Previous Section"
          >
            {arrow}
          </button>
          <div>
            {work.media4[0]?.match(regVideo)
              ? <video src={work.media4[0]} autoPlay loop controls />
              : <img src={work.media4[0]} alt={work.media4[1]} />}
          </div>
          <button
            type="button"
            className="main-footer-span"
            onClick={nextSection}
            aria-label="Next Section"
          >
            {arrow}
          </button>
        </div>
      </footer>

      <div className="divition" ref={addRefs} />
    </main>
  );
}

export default CaseStudy;
