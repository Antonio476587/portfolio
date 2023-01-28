import React, { useEffect, useRef } from "https://esm.sh/react@18.2.0";
import anime from "https://esm.sh/animejs@3.2.1";

import Wall from "./Wall.tsx";
import { arrowDownCircle } from "../Utils/Svg.tsx";

export default function Works() {
  const stateRef: React.RefObject<HTMLDivElement> = useRef(null);
  const scrollDownTipRef: React.RefObject<HTMLDivElement> = useRef(null);
  const cityRef: React.RefObject<HTMLDivElement> = useRef(null);
  const streetRef: React.RefObject<HTMLDivElement> = useRef(null);
  const floorRef: React.RefObject<HTMLDivElement> = useRef(null);
  const placeRef: React.RefObject<HTMLDivElement> = useRef(null);
  const buildingRef: React.RefObject<HTMLDivElement> = useRef(null);

  function handleAnimationEnd(ev: Event) {
    ev.stopPropagation();
    if (ev.target) {
      ev.target.classList.remove(
        "animate__animated",
        "animate__bounce",
        "animate__delay-2s",
        "animate__repeat-3",
      );
      ev.target.classList.add("animate__animated", "animate__fadeOutDown");
    }
  }

  function scrollAnimator(_ev: Event): void {
    const pageScrollPercent = (scrollY * 100) / globalThis.scrollMaxY;
    const pageScrollPercentDividedByAnHundred = pageScrollPercent / 100;

    const timelineProperties = {
      duration: 1000,
      easing: "easeOutCubic",
    };

    if (cityRef.current) {
      cityRef.current.style.transform = `translateY(${scrollY}px)`;
    }
    if (placeRef.current) {
      anime.set(placeRef.current, {
        scale: Math.min(
          pageScrollPercentDividedByAnHundred + 0.9,
          1.8,
        ),
      });
    }

    if (pageScrollPercent > 50) {
      anime.set(cityRef.current, {
        overflowY: "scroll",
      });
      anime.set("#building .wall", {
        boxShadow: "0px 0px 100px 70px rgba(0, 0, 0, 0.4)",
      });

      const tl = anime.timeline(timelineProperties);

      tl
        .add({
          targets: placeRef.current,
          rotateX: "0",
          rotateY: "270",
        }, 0)
        .add({
          targets: buildingRef.current,
          translateY: 150,
        }, 0)
        .add({
          targets: streetRef.current,
          height: 0,
          top: "90%",
          duration: 500,
          easing: "easeOutCirc",
        }, 0);

      return;
    }

    {
      anime.set(cityRef.current, {
        overflowY: "hidden",
      });
      anime.set("#building .wall", {
        boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)",
      });

      const tl = anime.timeline(timelineProperties);

      tl
        .add({
          targets: placeRef.current,
          rotateX: "-30",
          rotateY: "235",
        }, 0)
        .add({
          targets: buildingRef.current,
          translateY: 0,
        }, 0)
        .add({
          targets: streetRef.current,
          height: "95vw",
          top: "1%",
          duration: 500,
          easing: "easeOutCirc",
        }, 0);

      return;
    }
  }

  useEffect(() => {
    // Pre setting
    globalThis.scrollTo(0, 0);

    anime.set(placeRef.current, {
      rotateX: "-30",
      rotateY: "235",
      scale: "0.9",
    });

    // Events

    if (scrollDownTipRef.current) {
      scrollDownTipRef.current.addEventListener(
        "animationend",
        handleAnimationEnd,
      );
    }

    if (stateRef.current) {
      if (!globalThis.scrollMaxY) {
        const offsetHeight = document.lastElementChild?.offsetHeight;
        if (offsetHeight) {
          globalThis.scrollMaxY = typeof offsetHeight === "number"
            ? offsetHeight
            : parseInt(offsetHeight);
        }
      }

      globalThis.addEventListener("scroll", scrollAnimator);
    }

    return () => {
      if (scrollDownTipRef.current) {
        scrollDownTipRef.current.removeEventListener(
          "animationend",
          handleAnimationEnd,
          { once: true },
        );
      }
      if (stateRef.current) {
        globalThis.removeEventListener("scroll", scrollAnimator);
      }
    };
  }, []);

  return (
    <div id="state" ref={stateRef}>
      <div id="city" ref={cityRef}>
        <div id="place" ref={placeRef}>
          <div id="building" ref={buildingRef}>
            <div id="roof" />
            {[1, 2, 3, 4].map((value) => (
              <Wall wallID={`${value}`} key={value} />
            ))}
            <div id="foundations" />
          </div>
        </div>
        <div id="street" ref={streetRef}>
          <div id="floor" ref={floorRef} />
        </div>
      </div>
      <div
        id="scroll-down-tip"
        className="animate__animated animate__bounce animate__delay-2s animate__repeat-3"
        ref={scrollDownTipRef}
      >
        {arrowDownCircle}
      </div>
    </div>
  );
}
