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
          Core Competencies:
          <br />
          • Backend: Golang, Node.js, Deno, Microservices, RESTful APIs,
          Firebase Functions
          <br />
          • Frontend: React, React Native (Expo), Astro, TypeScript, JavaScript
          (ES6+)
          <br />
          • Cloud & DevOps: Google Cloud Platform (GCP), GKE, Kubernetes,
          Docker, CI/CD
          <br />
          • Security & Systems: DevSecOps Principles, Linux, Penetration Testing
          Concepts
          <br />
          • Databases: NoSQL, SQL, Graph
        </InfoAbout>

        <InfoAbout>
          I am constantly deepening my expertise in software architecture and
          cybersecurity and am actively seeking opportunities to contribute to
          innovative projects in a collaborative, remote-first environment.
        </InfoAbout>
        <InfoAbout>
          With a strong foundation in computer science fundamentals like Data
          Structures, Algorithms, and Design Patterns, I have hands-on
          experience architecting and deploying systems. My unconventional
          journey has provided me with a unique background in operations and a
          relentless drive to overcome challenges.
        </InfoAbout>
        <InfoAbout>
          I am a resilient and highly motivated Full Stack Developer
          specializing in building secure, scalable applications from the ground
          up. My passion is transforming complex problems into elegant,
          user-centric solutions, leveraging a deep understanding of modern
          cloud-native and web technologies.
        </InfoAbout>
      </div>
    </div>
  );
}

export { InfoAbout };
