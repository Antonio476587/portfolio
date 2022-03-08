import React, { useEffect, useRef } from "react";

import { briefcase, twitter, textRight, linkedin, github } from "./Svg.jsx";
import FormContact from "./FormContact.jsx";
import MenuNFT from "./MenuNFT.jsx";

function ContactLink({ title, svg, link }) {
  const contactLinkRef = useRef();

  useEffect(() => {
    const { current } = contactLinkRef;
    current.addEventListener("click", () => {
      location.assign(link);
    });
    return () => {
      current.removeEventListener("click", () => {
        location.assign(link);
      });
    };
  }, [link]);

  return (
    <div
      className="container contacts col-6 d-flex flex-column align-items-center justify-content-center contact__link"
      title={title}
      ref={contactLinkRef}
    >
      {svg}
      <div className={title} />
    </div>
  );
}

function BlockquouteDate({ cite, content, autor }) {
  return (
    <blockquote
      aria-current="date"
      cite={cite}
      dir="ltr"
      className="col-md-8 col-lg-4"
    >
      <b>
        {content}
        <br />
        <i>→{autor}←</i>
      </b>
    </blockquote>
  );
}

const Contact = React.forwardRef(({ changeVisibilityMenu }, ref) => (
  <div className="contact d-flex flex-column" id="Contact" ref={ref}>
    <MenuNFT />
    <div className="d-flex flex-shrink-0 bg-light align-items-center">
      <span className="container nav-contact-icon-span py-1 border-bottom">
        <img src="./img/icon.png" alt="fantonix" />
      </span>

      <div className="container-sm py-3 abrir text-end">
        <div
          className="btn btn-secondary"
          type="button"
          role="button"
          aria-roledescription="button"
          tabIndex="0"
          onClick={changeVisibilityMenu}
        >
          {textRight}
        </div>
      </div>
    </div>

    <div className="container-fluid div-contact">
      <div className="row contact-row gx-0">
        <ContactLink
          title="Freelancer"
          svg={briefcase}
          link="https://www.freelancer.com/u/AntonioServicio"
        />
        <ContactLink
          title="twitter"
          svg={twitter}
          link="https://twitter.com/AntonioCab111"
        />
        <ContactLink
          title="linkedIN"
          svg={linkedin}
          link="https://www.linkedin.com/in/felix-antonio-cabello-06a4a0228"
        />
        <ContactLink
          title="github"
          svg={github}
          link="https://github.com/Antonio476587"
        />
      </div>
    </div>

    <FormContact />

    <footer className="d-flex flex-column footer container-fluid pt-4 flex-grow-1">
      <div className="container header-foot">
        <div className="row bq-container container text-center mx-auto justify-content-center">
          <BlockquouteDate
            cite="instagram/soydalto.com"
            content="No programes para solucionar problemas, programa para crear soluciones."
            autor="Soy Dalto"
          />
          <BlockquouteDate
            cite="twitter/elon-musk.com"
            content="Por mi parte, nunca me rendiré, y quiero decir nunca."
            autor="Elon Musk"
          />
          <BlockquouteDate
            cite="instagram/soydalto.com"
            content="Puede ser fácil hacerlo, pero todo está en si lo haces o no."
            autor="Shiny Flakes"
          />
        </div>
      </div>
      <div className="container goodbye text-center">
        <h3 className="h3-gb">Goodbye‼</h3>
        <h6 className="h6">2021☺</h6>
        <h6 className="h6">Towards the future</h6>
      </div>
    </footer>
  </div>
));

export default Contact;
