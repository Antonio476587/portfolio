import { useEffect } from "react";

import { personSvg } from "../Utils/Svg.tsx";

function InfoAbout() {

  useEffect(() => {
    const animation = gsap.to(".about-me", {
      autoAlpha: 0,
      translateX: -50,
      scrollTrigger: {
        trigger: ".about",
        scrub: true,
        toggleActions: "play none none reverse",
        start: "top+=100 top",
        end: "center top",
      },
    });
  
    return () => {
      animation.kill(); 
    }
  }, [])

  return (
    <div className="container mb-5 about-me cajita">
      <div className="container title-me d-flex">
        <div className="container">
          <h3 className="h3">About me</h3>
        </div>
        <span className="container">{personSvg}</span>
      </div>

      <div className="container text-container">
        <p className="text m-1 pr p-about-me">
        I am a young Full Stack developer, mainly based on JavaScript/TypeScript. I have learned self-taught, constantly, willing to improve to achieve my dreams.
        <br />
        <br />
        I had started a career in Biology at the UCV, but I stopped because it was not the career I wanted and in Venezuela it is difficult to choose and be able to study the career you want to pursue, I hope to have the opportunity to obtain my degree in Computer Science, I would like to specialize in Neurocomputing.
        <br />
        <br />
        I have knowledge in Design Patterns, Data Structures, Algorithms and Software Version Control (Git), as well as multiparadigm languages ​​(JavaScript, Python), low level (C, Rust) and in-demand frameworks/libraries (React, Deno, Sass ). Focusing on Full Stack development (Frontend and Backend).
        <br />
        <br />
        I like basketball, martial arts and reading books and articles that make me grow as a person or professional.
        </p>
      </div>
    </div>
  );
}

export default function About(): JSX.Element {
  useEffect(() => {
    const animation = gsap.to(".floating-img", {
      translateY: "100%",
      autoAlpha: 0,
      duration: 2,
      delay: 2,
      scrollTrigger: {
        trigger: ".about",
        scrub: true,
        toggleActions: "play none none reverse",
        start: "centre top",
        end: "bottom top",
      },
    });

    return () => {
      animation.kill();
    }
  }, [])

  return (
    <div className="about" id="about" role="main" aria-roledescription="about">

      <InfoAbout />

      <div className="floating-img" />

    </div>
  );
}

export { InfoAbout };
