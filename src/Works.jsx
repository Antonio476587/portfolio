import React, { useRef } from "react";

const contents = [
  {
    h1: "lorem ipsum",
    p: "lorem ipsum avec se suari no pairet.",
  },
  {
    h1: "lorem ipsum",
    p: "lorem ipsum avec se suari no pairet.",
  },
  {
    h1: "lorem ipsum",
    p: "lorem ipsum avec se suari no pairet.",
  },
];

function CarouselItem({ urlId, content, classActive = "" }) {
  return (
    <div className={`carousel-item ${classActive}`}>
      <div
        className="bd-placeholder-img"
        userselect="none"
        aria-hidden="true"
      />

      <div className="container">
        <div className="carousel-caption text-start">
          <h1>{content.h1}</h1>
          <p>{content.p}</p>
          <p>
            <a className="btn btn-lg btn-light" href={urlId}>
              See More
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Works() {
  const worksRef = useRef();

  return (
    <div
      id="myCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      ref={worksRef}
    >
      <div className="carousel-inner">
        <CarouselItem
          urlId="work/1"
          content={contents[0]}
          classActive="active"
        />
        <CarouselItem urlId="work/2" content={contents[1]} />
        <CarouselItem urlId="tic-tac-toe.html" content={contents[2]} />
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="false" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
