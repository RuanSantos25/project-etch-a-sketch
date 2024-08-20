const body = document.querySelector("body");

function drawHeaderText() {
    const h1 = document.createElement("h1");
    h1.setAttribute("id", "header-text");
    h1.textContent = "Etch-a-Sketch";
    body.insertBefore(h1, body.children[0]);
}


drawHeaderText();