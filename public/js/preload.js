// const and data
const paths = document.querySelectorAll(".svg path");
const preload = document.querySelector(".preload");

console.log("Cargando");

const locatitation = window.location;
let animation1;
let animation2;

let windowLoaded = false;

const colors = [
  "rgb(0, 94, 94)",
  "rgb(33, 34, 34))",
  "rgb(38, 0, 88)",
  "rgb(77, 3, 52)",
  "rgb(2, 53, 19)",
  "rgb(68, 36, 0)",
];

function handleAnimationEnd(event) {
  event.stopPropagation();
  const { target } = event;
  target.classList.remove(target.classList[3], target.classList[4]);
  preload.setAttribute("hidden", "");
  target.removeEventListener("animationend", handleAnimationEnd, {
    once: true,
  });
  return true;
}

function preloadFinished() {
  preload.classList.add("animate__animated", "animate__fadeOut");
  document
    .querySelector(".con-welcome")
    .classList.add("animate__animated", "animate__fadeInDown", "animate__slow");
  preload.addEventListener("animationend", handleAnimationEnd, {
    once: true,
  });
}

window.addEventListener("load", () => {
  windowLoaded = true;
  window.scrollTo(0, document.querySelector(".home").offsetTop);
});

function preloadCharged() {
  if (!windowLoaded) {
    window.addEventListener("load", () => {
      window.scrollTo(0, document.querySelector(".home").offsetTop);
      paths.forEach((path, i) => {
        animation2 = gsap.to(path, {
          strokeDashoffset: gsap.getProperty(path, "stroke-dasharray") + 0.5,
          duration: 2.5,
          ease: "power2",
          onComplete: preloadFinished,
          onCompleteParams: [animation2],
        });
      });
    });
  } else {
    paths.forEach((path, i) => {
      animation2 = gsap.to(path, {
        strokeDashoffset: gsap.getProperty(path, "stroke-dasharray") + 0.5,
        duration: 2.5,
        ease: "power2",
        onComplete: preloadFinished,
        onCompleteParams: [animation2],
      });
    });
  }
}

// Inicio de animation preload
if (locatitation.search === "?P=false" && locatitation.pathname === "/") {
  preload.setAttribute("hidden", "");
  window.addEventListener("load", () => {
    document
      .querySelector(".con-welcome")
      .classList.add(
        "animate__animated",
        "animate__fadeInDown",
        "animate__slow"
      );
  });
} else if (locatitation.search !== "?P=false" && locatitation.pathname === "/") {
  animation1 = anime({
    targets: paths,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutSine",
    duration: 2500,
    delay: function (el, i) {
      return i * 300;
    },
    direction: "alternate",
    loop: false,
  });

  function randomValues() {
    if (windowLoaded) return;
    animation3 = gsap.to(preload, {
      backgroundColor: gsap.utils.random(colors),
      duration: 3,
      power: "power1",
      onComplete: randomValues,
    });
  }

  randomValues();

  animation1.finished.then(preloadCharged);
}
