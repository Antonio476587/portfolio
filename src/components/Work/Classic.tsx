import React, { useEffect, useRef } from "react";

import WorkChild from "./WorkChild.tsx";

import { arrowDownCircle, arrowLeftSquare } from "../../components/Utils/Svg.tsx";

function Classic({ work, changeSectionFunctions }: WorkChild) {
  const sectionTitle: React.RefObject<HTMLDivElement> = useRef(null);
  const sectionDescriptor: React.RefObject<HTMLDivElement> = useRef(null);
  const sectionContent: React.RefObject<HTMLDivElement> = useRef(null);
  const tl: React.MutableRefObject<gsap.core.Timeline | null> = useRef(null);

  const [prevSection, nextSection] = changeSectionFunctions;

  useEffect(() => {
    tl.current = gsap.timeline({
      duration: 1.5,
      ease: "power1.in",
    })
      .from(sectionTitle.current, {
        width: "0%",
        delay: 2,
      })
      .from(sectionDescriptor.current, {
        autoAlpha: 0,
        scale: 0.6,
        filter: "blur(5px)",
      });
  }, [sectionTitle, sectionDescriptor]);

  useEffect(() => {
    const animations: gsap.core.Tween[] = new Array(4);

    document.querySelectorAll("img").forEach((el) => {
      const animation = gsap.from(el, {
        autoAlpha: 0,
        translateY: "3rem",
        scale: 0.7,
        scrollTrigger: {
          trigger: el,
          scrub: true,
          toggleActions: "play none none reverse",
          end: "top center",
        },
      });
      animations.push(animation);
    });

    return () => {
      animations.forEach((animation) => {
        animation.kill();
      });
    };
  }, [sectionContent]);

  return (
    <main id="classic-section-wrapper">
      <section id="classic-section">
        <div id="classic-section-title" ref={sectionTitle}>
          <div>
            <h2>{work.h2}</h2>
          </div>
        </div>
        <div id="classic-section-description-wrapper" ref={sectionDescriptor}>
          <div id="classic-section-description">
            <p>
              <em>&#35;</em>&nbsp;&#32;{work.p1}
            </p>
            <hr />
            <p>
              <em>&#35;</em>&nbsp;&#32;{work.p2}
            </p>
            <hr />
            <p>
              <em>&#35;</em>&nbsp;&#32;{work.p3}
            </p>
          </div>
        </div>
        <div id="classic-section-content" ref={sectionContent}>
          <div>
            <img src={work.media1[0]} alt={work.media1[1]} />
          </div>
          <hr />
          <div>
            <img src={work.media2[0]} alt={work.media2[1]} />
          </div>
          <hr />
          <div>
            <img src={work.media3[0]} alt={work.media3[1]} />
          </div>
          <hr />
          <div>
            <img src={work.media4[0]} alt={work.media4[1]} />
          </div>
          <hr />
        </div>
        <footer id="classic-section-footer">
          <p>{work.p4}</p>
          <hr />
          <div>
            <div id="prev-section-button-wrapper">
              <button
                id="prev-section-button"
                aria-label="Previous Section"
                onClick={prevSection}
              >
                {arrowLeftSquare}
              </button>
            </div>
            <div>
              <button
                id="scroll-up-button"
                aria-label="Scroll to the top of the page"
                style={{ transform: "rotate(180deg)" }}
                onClick={() => globalThis.scrollTo(0, 0)}
              >
                {arrowDownCircle}
              </button>
            </div>
            <div
              id="next-section-button-wrapper"
              style={{ transform: "rotate(180deg)" }}
            >
              <button
                id="next-section-button"
                aria-label="Previous Section"
                onClick={nextSection}
              >
                {arrowLeftSquare}
              </button>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}

export default Classic;
