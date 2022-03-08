const bgComplement = document.querySelector(".bg-complement");
const bgComplementContainer = document.querySelector(
  ".bg-complement-container"
);

const menu = document.querySelector(".menu");
const btnMenuHome = document.querySelectorAll("div.btn.btn-secondary")[1];

btnMenuHome.addEventListener("click", () => {
  menu.toggleAttribute("hidden");
});

let gradosX = 50;
let gradosY = 33;
let scale = 1;
let growing = true;
let positionComplementContainer;

let bgAnimation;

const xSet = gsap.quickSetter(bgComplement, "rotationX", "deg");
const ySet = gsap.quickSetter(bgComplement, "rotationY", "deg");
const yPositionSet = gsap.quickSetter(bgComplementContainer, "y", "px");
const setScaleX = gsap.quickSetter(bgComplementContainer, "scaleX");
const setScaleY = gsap.quickSetter(bgComplementContainer, "scaleY");
const scaleSet = (val) => {
  setScaleX(val);
  setScaleY(val);
};

const transformer = gsap.utils.pipe(gsap.utils.clamp(0, 200));

const animateHome = () => {
  bgAnimation = setInterval(() => {
    if (gradosY === 393 || gradosY > 393) gradosY = 33;
    if (gradosX === 410 || gradosX > 410) gradosX = 50;
    ySet(gradosY);
    xSet(gradosX);
    scaleSet(scale);
    gradosY += 1;
    gradosX += 0.2;
  }, 10);
};

const desAnimateHome = () => {
  clearInterval(bgAnimation);
};

animateHome();
desAnimateHome();

const windowPosX = window.innerWidth / 2;
const windowPosY = window.innerHeight / 2;

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowPosX;
  mouseY = event.clientY - windowPosY;

  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  gradosX = gsap.getProperty(bgComplement, "rotateX");
  gradosY = gsap.getProperty(bgComplement, "rotateY");

  gradosX += -0.01 * (targetY - gradosX);
  gradosY += -0.01 * (targetX - gradosY);

  if (!growing) {
    scale += 0.00003 * (targetY - gradosX);
    if (scale < 1) growing = !growing;
  }
  if (growing) {
    scale += -0.00003 * (targetY - gradosX);
    if (scale > 2) growing = !growing;
  }
}

window.addEventListener("mousemove", onDocumentMouseMove);

function updateComplement() {
  positionComplementContainer = (window.scrollY - window.scrollMaxY) * -0.7;
  yPositionSet(transformer(positionComplementContainer));
}

document.addEventListener("scroll", updateComplement);

// Se activa cuando se está visualizando

ScrollTrigger.create({
  trigger: ".home",
  start: "top center",
  end: "top+=100 top",
  onToggle: (self) => {
    if (self.isActive) {
      animateHome();
      window.addEventListener("mousemove", onDocumentMouseMove);
      document.addEventListener("scroll", updateComplement);
    } else {
      desAnimateHome();
      window.removeEventListener("mousemove", onDocumentMouseMove);
      document.removeEventListener("scroll", updateComplement);
    }
  },
});
