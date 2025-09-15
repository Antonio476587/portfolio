import { useEffect } from "react";

function InfoAbout({ children }) {
  return (
    <div className="mb-5 about-me max-w-xs p-4 my-8 mx-auto">
      <p className="font-mono font-bold">
        {children}
      </p>
    </div>
  );
}

export default function About(): JSX.Element {
  useEffect(() => {
    const aboutMe = document.querySelectorAll(".about-me");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about",
        scrub: 1,
        toggleActions: "play none none reverse",
        start: "top top",
        end: "bottom-=100 top",
      },
    });

    tl.to(aboutMe[0], {
      autoAlpha: 0,
      x: -200,
      duration: .5,
    }).to(aboutMe[1], {
      autoAlpha: 0,
      x: 200,
      duration: .5,
    }).to(aboutMe[2], {
      autoAlpha: 0,
      x: -200,
      duration: .5,
    }).to(aboutMe[3], {
      autoAlpha: 0,
      x: 200,
      duration: .5,
    });

    return () => {
      tl.kill();
    };
  }, []);
  return (
    <div className="about" id="about" role="main" aria-roledescription="about">
      <div>
        <InfoAbout>
          I like basketball, martial arts and reading books and articles that
          make me grow as a person or professional.
        </InfoAbout>

        <InfoAbout>
          I have knowledge in Design Patterns, Data Structures, Algorithms and
          Software Version Control (Git), as well as multiparadigm languages
          ​​(JavaScript, Python), low level (C, Rust) and in-demand
          frameworks/libraries (React, Deno, Sass ). Focusing on Full Stack
          development (Frontend and Backend).
        </InfoAbout>
        <InfoAbout>
          I had started a career in Biology at the UCV, but I stopped because it
          was not the career I wanted and in Venezuela it is difficult to choose
          and be able to study the career you want to pursue, I hope to have the
          opportunity to obtain my degree in Computer Science, I would like to
          specialize in Neurocomputing.
        </InfoAbout>
        <InfoAbout>
          I am a young Full Stack developer, mainly based on
          JavaScript/TypeScript. I have learned self-taught, constantly, willing
          to improve to achieve my dreams.
        </InfoAbout>
      </div>
    </div>
  );
}

export { InfoAbout };
