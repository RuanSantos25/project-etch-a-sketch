const body = document.querySelector("body");
const colorsButtons = ["Black Color", "White Color", "Random Color"];
const defaultSquareColor = "rgba(255, 243, 226, 1)";
const defaultSquareSize = 16;
const modesButtons = ["New Grid", "Reset Grid", "Hover Mode"];
const opacityButtons = ["+ Transparency", "- Transparency"];

function drawHeaderText() {
    const h1 = document.createElement("h1");
    h1.setAttribute("id", "header-text");
    h1.textContent = "Etch-a-Sketch";
    body.insertBefore(h1, body.children[0]);
}

function drawButtons() {
    function drawButtonsContainer(div, arrayName) {
        div.setAttribute("id", "buttons-container");
        if (arrayName === "modesButtons") body.insertBefore(div, body.children[1]);
        else if (arrayName === "colorsButtons") body.insertBefore(div, body.children[2]);
        else if (arrayName === "opacityButtons") body.insertBefore(div, body.children[3]);
    }

    function createButtons(buttonsArray, arrayName) {
        const div = document.createElement("div");
        for (let buttonIndex = 0; buttonIndex < buttonsArray.length; buttonIndex++) {
            const button = document.createElement("button");
            button.setAttribute("id", `button-${buttonsArray[buttonIndex].toLowerCase().replace(" ", "-")}`);
            button.classList.add("button");
            button.textContent = buttonsArray[buttonIndex];
            switch (buttonsArray[buttonIndex]) {
                case "New Grid":
                    button.title = "Draws a new grid by getting user input";     
                    break;
                case "Reset Grid":
                    button.title = "Resets all the squares to white";     
                    break;
                case "Click Mode":
                case "Hover Mode":
                    button.title = "Changes the type of how the grid works with the mouse\nClick Mode: user can be more precise and choose where to change the color\nHover Mode: user cannot choose where to draw, it's rely on mouse hovering the squares on grid";
                    break;
                case "Black Color":
                    button.title = "Changes the color of the pen to black";
                    break;
                case "White Color":
                    button.title = "Changes the color of the pen to white";     
                    break;
                case "Random Color":
                    button.title = "Changes the color of the pen to an random color";     
                    break;
                case "+ Transparency":
                    button.title = "Makes the square darker each time you interact";
                    break;
                case "- Transparency":
                    button.title = "Makes the square lighter each time you interact";
                    break;
                default:
                    button.title = "PLEASE ADD SOME CONTEXT TO THIS BUTTON!";
            }
            div.appendChild(button);
        }
        drawButtonsContainer(div, arrayName);
    }
    // Gets the name of arrays to string, we use it to setup correctly order on DOM tree
    const modesButtonsArrName = Object.keys({modesButtons})[0];
    const colorsButtonsArrName = Object.keys({colorsButtons})[0];
    const opacityButtonsArrName = Object.keys({opacityButtons})[0];

    createButtons(modesButtons, modesButtonsArrName);
    createButtons(colorsButtons, colorsButtonsArrName);
    createButtons(opacityButtons, opacityButtonsArrName);
}

function drawGrid(squareSize, squareColor) {
    function createSquare(size, color) {
        const div = document.createElement("div");
        div.setAttribute("id", "white-square");
        div.classList.add("grid");
        div.style.flexBasis = `calc(100% / ${size})`;
        div.style.backgroundColor = color;
        return div;
    }

    function createGrid(squareSize, squareColor) {
        const grid = document.querySelector("#grid-container");
        for (let square = 1; square <= squareSize * squareSize; square++) {
            grid.appendChild(createSquare(squareSize, squareColor));
        }
        body.insertBefore(grid, body.children[2]);
    }
    createGrid(squareSize, squareColor);
}

drawHeaderText();
drawButtons();
drawGrid(defaultSquareSize, defaultSquareColor);