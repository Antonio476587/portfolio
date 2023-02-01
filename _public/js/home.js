const bgComplement = document.querySelector(".bg-complement");
const bgComplementContainer = document.querySelector(
    ".bg-complement-container"
);

const btnMenuHome = document.querySelector(".btn.btn-secondary.btn-home");

btnMenuHome.addEventListener("click", () => {
    const menu = document.querySelector(".menu");

    if (menu) {
        menu.toggleAttribute("hidden");
        if (!menu.hasAttribute("hidden")) {
            gsap.to(".menu-base-footer", {
                duration: 1,
                height: "25%",
                marginTop: 0,
                clipPath: "polygon(100% 0, 100% 100%, 0 100%, 0 0, 50% 0)"
            });
        } else {
            gsap.set(".menu-base-footer", {
                height: 0,
                marginTop: "25%",
                clipPath: "polygon(100% 35%, 100% 100%, 0 100%, 0 0, 50% 60%)",
            });
        }
    }
});

let gradosX = 50;
let gradosY = 33;
let scale = 1;
let growing = true;
let positionComplementContainer;

let bgAnimation;

const xSet = gsap.quickSetter(bgComplement, "rotationX", "deg");
const ySet = gsap.quickSetter(bgComplement, "rotationY", "deg");

const setScaleX = gsap.quickSetter(bgComplementContainer, "scaleX");
const setScaleY = gsap.quickSetter(bgComplementContainer, "scaleY");
const scaleSet = (val) => {
    setScaleX(val);
    setScaleY(val);
};

const yPositionSet = gsap.quickSetter(bgComplementContainer, "y", "px");

const transformer = gsap.utils.pipe(gsap.utils.clamp(0, 200));

function animateComplement() {
    if (gradosY === 393 || gradosY > 393) gradosY = 33;
    if (gradosX === 410 || gradosX > 410) gradosX = 50;
    scaleSet(scale);
    ySet(gradosY);
    xSet(gradosX);
    gradosY += 1;
    gradosX += 0.2;
}

const animateHome = () => {
    bgAnimation = gsap.timeline({ repeat: -1, onUpdate: animateComplement, delay: 1 });
};

const desAnimateHome = () => {
    bgAnimation.kill();
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

function updateComplement() {
    positionComplementContainer = (window.scrollY - window.scrollMaxY) * -0.7;
    yPositionSet(transformer(positionComplementContainer));
}

// Se activa cuando se está visualizando

if (location.pathname == "/") {
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
} else {
    document.getElementById("home").setAttribute("hidden", "");
}
