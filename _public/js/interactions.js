
function lightInteractive() {
    const lightDiv = document.createElement("div");
    lightDiv.classList.add("lightDiv");
    lightDiv.id = "lightDiv";
    lightDiv.setAttribute("data-active", "true");

    document.getElementById("body").appendChild(lightDiv);
    document.addEventListener("mousemove", (event) => {
        lightDiv.style.setProperty("--x", event.clientX + "px");
        lightDiv.style.setProperty("--y", event.clientY + "px");
    });
}

lightInteractive();