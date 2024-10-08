const body = document.querySelector("body");
const colorsButtons = ["Black Color", "White Color", "Random Color"];
const defaultPenBlackColor = "rgba(0, 0, 0, 1)";
const defaultRandomColor = "random";
const defaultSquareWhiteColor = "rgba(255, 243, 226, 1)";
const defaultSquareSize = 16;
const maxGridSize = 100;
const minGridSize = 1;
const modesButtons = ["New Grid", "Reset Grid", "Hover Mode"];
const opacityButtons = ["+ Transparency", "- Transparency"];
const squaresInsideGrid = "#grid-container .grid";
let currentGridSize = 0;
let currentOpacityBehavior = "darker";
let currentPenColor = defaultPenBlackColor;
let currentPenBehavior = "mouseover";

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
    currentGridSize = squareSize;
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

/**
 * setSquaresBehavior() adds events listener based on the current behavior of
 * the pen to each square inside the grid. When hovered or clicked, the square will
 * receive a new id based on his new color, and a color based on his current id and 
 * current pen color. If the pen color and the square current color are the same,
 * the function will check the current behavior set(default = darker), if darker 
 * will decrement the opacity, if lighter will increment the opacity. 
 * 
 *  - Default opacity = 1;
 *  - The min opacity = 0;
 *  - The max opacity = 1;
 *  - The squares opacity is restarted if the color is changed.
 *  - Can have the behaviors: "mouseover"(hover) or "click"
 */
function setSquaresBehavior() {
    function getCurrentColor(square) {
        const color = square.style.backgroundColor;
        const colorArr = color.slice(color.indexOf("(") + 1, color.indexOf(")")).split(", ");
        return colorArr;
    }
    
    function getSquareRgbaOpacity(square) {
        color = getCurrentColor(square);
        if (color.length === 3) return 1;
        else return color[3];
    }

    function setNewSquareColor(square, currentSquareColor) {
        const black = "black-square";
        const darker = "darker";
        const lighter = "lighter";
        const opacity = getSquareRgbaOpacity(square);
        const random = "random-square";
        const white = "white-square";

        function getRandomRgbaValues() {
            let red = Math.floor(Math.random() * 255);
            let green = Math.floor(Math.random() * 255);
            let blue = Math.floor(Math.random() * 255);
            return `rgba(${red}, ${green}, ${blue}, 1)`;
        }

        function changeSquareColorTo(color) {
            if (color === defaultPenBlackColor) {
                square.setAttribute("id", black);
                square.style.backgroundColor = defaultPenBlackColor;
            } else if (color === defaultSquareWhiteColor) {
                square.setAttribute("id", white);
                square.style.backgroundColor = defaultSquareWhiteColor;
            } else if (color === defaultRandomColor) {
                square.setAttribute("id", random);
                square.style.backgroundColor = getRandomRgbaValues();
            }
        }

        function decrementSquareOpacity(square) {
            if (opacity <= 0) return;
            else {
                const rgbaColor = getCurrentColor(square);
                const newOpacity = (+opacity - 0.1).toString();
                square.style.backgroundColor = `rgba(${rgbaColor[0]}, ${rgbaColor[1]}, ${rgbaColor[2]}, ${newOpacity})`;
            }
        }

        function incrementSquareOpacity(square) {
            if (opacity >= 1) return;
            else {
                const rgbaColor = getCurrentColor(square);
                const newOpacity = (+opacity + 0.1).toString();
                square.style.backgroundColor = `rgba(${rgbaColor[0]}, ${rgbaColor[1]}, ${rgbaColor[2]}, ${newOpacity})`;
            }
        }

        // 1 From any color to BLACK
        if (
            (currentSquareColor === white)
            && (currentPenColor === defaultPenBlackColor)
        ) {
            changeSquareColorTo(defaultPenBlackColor);
        } else if (
            (currentSquareColor === random)
            && (currentPenColor === defaultPenBlackColor)
        ) {
            changeSquareColorTo(defaultPenBlackColor);
        } 

        // 1.1 If square already BLACK and current behavior DARKER (decrement opacity)
        else if (
            (currentSquareColor === black)
            && (currentPenColor === defaultPenBlackColor)
            && (currentOpacityBehavior === darker)
        ) {
            decrementSquareOpacity(square);
        }

        // 1.2 If square already BLACK and current behavior LIGHTER (increment opacity)
        else if (
            (currentSquareColor === black)
            && (currentPenColor === defaultPenBlackColor)
            && (currentOpacityBehavior === lighter)
        ) {
            incrementSquareOpacity(square);
        }

        // 2 From any color to WHITE
        else if (
            (currentSquareColor === black)
            && (currentPenColor === defaultSquareWhiteColor)
        ) {
            changeSquareColorTo(defaultSquareWhiteColor);
        } else if (
            (currentSquareColor === random)
            && (currentPenColor === defaultSquareWhiteColor)
        ) {
            changeSquareColorTo(defaultSquareWhiteColor);
        } 

        // 2.1 If square already WHITE and current behavior DARKER (decrement opacity)
        else if (
            (currentSquareColor === white)
            && (currentPenColor === defaultSquareWhiteColor)
            && (currentOpacityBehavior === darker)
        ) {
            decrementSquareOpacity(square);
        }
        
        // 2.2 If square already WHITE and current behavior LIGHTER (increment opacity)
        else if (
            (currentSquareColor === white)
            && (currentPenColor === defaultSquareWhiteColor)
            && (currentOpacityBehavior === lighter)
        ) {
            incrementSquareOpacity(square);
        }

        // 3 From any color to RANDOM
        else if (
            (currentSquareColor === white)
            && (currentPenColor === defaultRandomColor)
        ) {
            changeSquareColorTo(defaultRandomColor);
        } else if (
            (currentSquareColor === black)
            && (currentPenColor === defaultRandomColor)
        ) {
            changeSquareColorTo(defaultRandomColor);
        }

        // 3.1 If square already RANDOM and current behavior DARKER (decrement opacity)
        else if (
            (currentSquareColor === random)
            && (currentPenColor === defaultRandomColor)
            && (currentOpacityBehavior === darker)
        ) {
            decrementSquareOpacity(square);
        }

        // 3.2 If square already RANDOM and current behavior LIGHTER (increment opacity)
        else if (
            (currentSquareColor === random)
            && (currentPenColor === defaultRandomColor)
            && (currentOpacityBehavior === lighter)
        ) {
            incrementSquareOpacity(square);
        }
    }

    document.querySelectorAll(squaresInsideGrid).forEach(square => {
        square.addEventListener(currentPenBehavior, () => {
            const id = square.getAttribute("id");
            setNewSquareColor(square, id);
        })
    })
}

function setButtonsClickedBehavior() {
    const buttons = document.querySelectorAll(".button");

    function isUserInputEmpty(userInput) {
        if (userInput === null || userInput === "") return true;
        else return false;
    }
    
    function isUserInputNumeric(userInput) {
        if (!isNaN(userInput)) return true;
        else return false;
    }
    
    function isUserInputWithinRange(userInput) {
        if (userInput >= minGridSize && userInput <= maxGridSize) return true;
        else return false;
    }
    
    function validateUserInput(userInput) {
        if (isUserInputEmpty(userInput)) {
            alert("Please, enter a number!");
            return false;
        } else if (isUserInputNumeric(userInput)) {
            if (isUserInputWithinRange(userInput)) return true
            else {
                alert(`Please, enter only number between ${minGridSize} - ${maxGridSize}!`);
                return false;
            }
        } else {
            alert("Please, enter only numeric values!");
            return false;
        }
    }

    function getUserInputGridSize() {
        const gridSize = prompt(`Enter a size for the grid(${minGridSize}-${maxGridSize}):`);
        if (validateUserInput(gridSize)) return +gridSize;
        else return defaultSquareSize;
    }

    function deleteGrid() {
        document.querySelectorAll(squaresInsideGrid).forEach(square => square.remove());
    }

    function createNewGrid(gridSize, gridColor) {
        deleteGrid();
        drawGrid(gridSize, gridColor);
        setSquaresBehavior();
    }

    function resetGrid() {
        const white = "white-square";
        document.querySelectorAll(squaresInsideGrid).forEach(square => {
            square.style.backgroundColor = defaultSquareWhiteColor;
            square.setAttribute("id", white);
        });
    }

    function setNewPenColorTo(newPenColor) {
        currentPenColor = newPenColor;
    }

    function setNewOpacityBehavior(newOpacityBehavior) {
        currentOpacityBehavior = newOpacityBehavior;
    }

    function setNewPenBehavior() {
        const click = "click";
        const hover = "mouseover";
        if (currentPenBehavior === click) {
            currentPenBehavior = hover;
            const button = document.querySelector("#button-click-mode");
            button.setAttribute("id", "button-hover-mode");
            button.textContent = "Hover Mode";
        } else if (currentPenBehavior === hover) {
            currentPenBehavior = click;
            const button = document.querySelector("#button-hover-mode");
            button.setAttribute("id", "button-click-mode")
            button.textContent = "Click Mode";
        }
        createNewGrid(currentGridSize, defaultSquareWhiteColor);
    }

    function setButtonBehaviorById(button) {
        const buttonBlackColor = "button-black-color";
        const buttonClickMode = "button-click-mode";
        const buttonHoverMode = "button-hover-mode";
        const buttonLessOpacity = "button---transparency";
        const buttonMoreOpacity = "button-+-transparency";
        const buttonNewGrid = "button-new-grid";
        const buttonRandomColor = "button-random-color";
        const buttonResetGrid = "button-reset-grid";
        const buttonWhiteColor = "button-white-color";
        const darker = "darker";
        const lighter = "lighter";
        const buttonClicked = button.getAttribute("id");
        
        // Grid/Mode buttons
        if (buttonClicked === buttonNewGrid) {
            createNewGrid(getUserInputGridSize(), defaultSquareWhiteColor);
        } else if (buttonClicked === buttonResetGrid) {
            resetGrid();
        } else if ((buttonClicked === buttonClickMode) || (buttonClicked === buttonHoverMode)) {
            setNewPenBehavior();
        }

        // Colors buttons
        else if (buttonClicked === buttonBlackColor) {
            setNewPenColorTo(defaultPenBlackColor);
        } else if (buttonClicked === buttonWhiteColor) {
            setNewPenColorTo(defaultSquareWhiteColor);
        } else if (buttonClicked === buttonRandomColor) {
            setNewPenColorTo(defaultRandomColor);
        } 
        
        // Opacity/Transparency buttons
        else if (buttonClicked === buttonMoreOpacity) {
            setNewOpacityBehavior(darker);
        } else if (buttonClicked === buttonLessOpacity) {
            setNewOpacityBehavior(lighter);
        }
    }

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {setButtonBehaviorById(event.target)});
    })
}


drawHeaderText();
drawButtons();
drawGrid(defaultSquareSize, defaultSquareWhiteColor);
setSquaresBehavior();
setButtonsClickedBehavior();