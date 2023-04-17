import { personSvg } from "../Utils/Svg.tsx";

function InfoAbout() {
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
          I always want to give my best, help who need it and grow as a person.
          I would like to provide a great programming experience by working with
          you, I don’t consider any project too big or small. I always try to be
          updated and consider me responsible and constant, and if I got errors,
          I try to learn from them as much as I can, ¡Thanks for visit me!
        </p>
      </div>
    </div>
  );
}

export default function About(): JSX.Element {
  return (
    <div className="about" id="About" role="main" aria-roledescription="about">

      <InfoAbout />

      <div className="floating-img" />

    </div>
  );
}

export { InfoAbout };
