import anime from "animejs";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useRef, useEffect } from "react";

import HeaderAbout from "./HeaderAbout";
import Illustration from "./Illustration";
import { personSvg, arrowLeftSquare, workSvg } from "../Utils/Svg";

gsap.registerPlugin(ScrollTrigger);

const azure = "rgb(240, 255, 255)";
const black = "rgb(34, 38, 42)";
const orange = "rgb(253, 126, 23)";
const sand = "rgb(106, 90, 205)";
let colorBox;
let colorBox2;

const InfoAbout = React.forwardRef(function InfoAbout(
    _props,
    ref: React.RefObject<HTMLDivElement>
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
    const tl: React.MutableRefObject<gsap.core.Timeline | null> = useRef(null);
    const q: gsap.utils.SelectorFunc = gsap.utils.selector(box);

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

        if (location.pathname == "/about") randomValues();
    }, [q, box]);

    useEffect(() => {

        const infoAbout = infoAboutRef.current ?? false;
        const headerAbout = headerAboutRef.current ?? false;
        const illustration = illustrationRef.current ?? false;
        
        tl.current = gsap.timeline({
            defaults: {
                duration: 1,
                scale: 0.3,
                autoAlpha: 0,
            },
        });

        let animation1: gsap.core.Tween;
        let animation2: gsap.core.Tween;

        if (infoAbout) {
            
            animation1 = gsap.from(infoAbout, {
                delay: 0.5,
                duration: 1,
                autoAlpha: 0,
                scale: 0.3,
                rotation: 45,
                onComplete: () => {
                    animation1.kill();
                    animation2 = gsap.to(infoAbout, {
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

            tl.current
                .from(headerAbout, {
                    xPercent: 3,
                    scrollTrigger: {
                        id: "section1",
                        trigger: headerAbout,
                        start: "top+=150 bottom",
                        end: "center center",
                        scrub: true,
                        toggleActions: "play none none reverse",
                    },
                })
                .from(illustration, {
                    scrollTrigger: {
                        id: "section3",
                        trigger: illustration,
                        start: "top bottom",
                        end: "center bottom",
                        scrub: true,
                        toggleActions: "play none none reverse",
                    },
                });
                
        }

        return () => {
            tl.current?.kill();
            animation1?.kill();
            animation2?.kill();
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

export { InfoAbout };
