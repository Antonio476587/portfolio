import React from "https://esm.sh/react@18.2.0";

import { arrowLeftSquare } from "../Utils/Svg.tsx";

import WorkChild from "./WorkChild.tsx";

function Gallery({ work, changeSectionFunctions }: WorkChild) {
  const [prevSection, nextSection] = changeSectionFunctions;

  return (
    <>
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-label="Slide 1"
            aria-current="true"
          >
          </button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            className=""
          >
          </button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
            className=""
          >
          </button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="3"
            aria-label="Slide 4"
            className=""
          >
          </button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={work.media1[0]}
              alt={work.media1[1]}
              width="100%"
              height="100%"
            />

            <div className="container">
              <div className="carousel-caption">
                <h1>{work.h2}</h1>
                <p>{work.p1}</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={work.media2[0]}
              alt={work.media2[1]}
              width="100%"
              height="100%"
            />

            <div className="container">
              <div className="carousel-caption">
                <p>{work.p2}</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={work.media3[0]}
              alt={work.media3[1]}
              width="100%"
              height="100%"
            />

            <div className="container">
              <div className="carousel-caption">
                <p>{work.p3}</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={work.media4[0]}
              alt={work.media4[1]}
              width="100%"
              height="100%"
            />

            <div className="container">
              <div className="carousel-caption">
                <p>{work.p4}</p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true">
          </span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true">
          </span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div id="gallery-footer">
        <div>
          <div>
            <button aria-label="Previous Section" onClick={prevSection}>
              {arrowLeftSquare}
            </button>
          </div>
          <div style={{ "transform": "rotate(180deg)" }}>
            <button aria-label="Previous Section" onClick={nextSection}>
              {arrowLeftSquare}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;
