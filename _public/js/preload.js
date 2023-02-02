// const and data
const preload = document.querySelector(".preload");

const prequote = document.getElementById("prequote");
const quote = document.getElementById("quote");
const preloadLogoWrapper = document.getElementById("preload-logo-wrapper");

const windowLocation = window.location;

// This will be the first qoute (image) to be rendered
let firstQuoteToRender;

let windowLoaded = false;

// These are the presets
const imgPrefix = "Q";
const imgSufix = ".webp";
let quoteOffset = 6;

// Shortcut functions
const prequoteImageQuickSetter = gsap.quickSetter(prequote, "backgroundImage");
const quoteImageQuickSetter = gsap.quickSetter(quote, "backgroundImage");

const animateConWelcome = () =>
  document.querySelector(".con-welcome").classList.add(
    "animate__animated",
    "animate__fadeInDown",
    "animate__slow",
  );

const scrollToTheBeginOfTheElement = () => {
  if (location.hash) return;
  window.scrollTo(0, document.querySelector(".home").offsetTop);
};

const removeAnimationsOfAnimate = (htmlElement) => {
  const htmlElementClassListString = htmlElement.classList.toString();
  const animatedClassesToBeRemoved = htmlElementClassListString.match(
    /(animate[\w]+)/g,
  );
  animatedClassesToBeRemoved.forEach((animatedClass) => {
    htmlElement.classList.remove(animatedClass);
  });
};

// Principal Logic

//
window.addEventListener("load", () => {
  windowLoaded = true;
  scrollToTheBeginOfTheElement();
  // scrollMaxY is a property required by home.js
  if (window.scrollMaxY) return;
  else window.scrollMaxY = window.scrollY;
}, { once: true });

function handleAnimationEnd(event) {
  event.stopPropagation();
  const { target } = event;
  removeAnimationsOfAnimate(target);
  preload.setAttribute("hidden", "");
  target.removeEventListener("animationend", handleAnimationEnd, {
    once: true,
  });
  return true;
}

function preloadFinished() {
  gsap.to(quote, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      preload.classList.add("animate__animated", "animate__fadeOut");
      animateConWelcome();
      preload.addEventListener("animationend", handleAnimationEnd, {
        once: true,
      });
    },
  });
}

function animatePreload() {
  if (windowLoaded) {
    scrollToTheBeginOfTheElement();
    preloadFinished();
    return;
  }

  // While the page is charging we are going to show further quotes, so we have to load them slowly
  prequoteImageQuickSetter(
    `url(/img/${imgPrefix}${quoteOffset + 1}${imgSufix})`,
  );
  quoteOffset++;

  gsap.to(quote, {
    opacity: 0,
    duration: 2.5,
    ease: "power2.out",
    onComplete: () => {
      quoteImageQuickSetter(
        `url(/img/${imgPrefix}${
          Math.floor(Math.random() * quoteOffset)
        }${imgSufix})`,
      );
      gsap.to(quote, {
        opacity: 1,
        duration: 2.5,
        ease: "power2.out",
        onComplete: animatePreload,
      });
    },
  });
}

function preloadCharged() {
  if (!windowLoaded) {
    animatePreload();
  } else {
    scrollToTheBeginOfTheElement();
    preloadFinished();
  }
}

// Inicio de animation preload
if (windowLocation.search === "?P=false") {
  window.addEventListener("load", () => {
    animateConWelcome();
  }, { once: true });
} else {
  preload.removeAttribute("hidden");
  firstQuoteToRender = `url(/static/media/native_m/${imgPrefix}${
    Math.floor(Math.random() * quoteOffset)
  }${imgSufix})`;
  quoteImageQuickSetter(firstQuoteToRender);

  // Preset
  anime.set(preloadLogoWrapper, {
    width: "100%",
    height: "0%",
    opacity: 0,
  });

  anime.timeline({
    easing: "easeOutExpo",
    duration: 2000,
  })
    .add({
      targets: preloadLogoWrapper,
      height: "100%",
      opacity: 1,
      delay: 1500,
    })
    .add({
      targets: preloadLogoWrapper,
      width: "10%",
      height: "10%",
    })
    .add({
      targets: "#fantonix-preload-logo path",
      fill: "#CC000B",
    })
    .finished.then(function () {
      anime({
        targets: preloadLogoWrapper,
        opacity: 0,
        easing: "easeOutExpo",
        duration: 2000,
        direction: "alternate",
        loop: 10,
      });
    });

  gsap.to(quote, {
    opacity: 1,
    scale: 1,
    delay: 4,
    duration: 1.5,
    ease: "power2.out",
    onComplete: preloadCharged,
  });
}
