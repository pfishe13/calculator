
function add(left, right) {
    return returnWithCorrectDecimals(left + right);
    // return value;
}

function subtract(left, right) {
    return returnWithCorrectDecimals(left - right);
    // return value;
}

function multiply(left, right) {
    return returnWithCorrectDecimals(left * right);
}

function divide(left, right) {
    if (right === 0) {
        return "Sorry, Can't Divide By Zero";
    }
    let value = left / right;
    return returnWithCorrectDecimals(value);
}

function power(left, right) {
    let value = left ** right;
    return returnWithCorrectDecimals(value);
}

function returnWithCorrectDecimals(numInput) {
    let stringValue = numInput.toString();
    if(stringValue.includes('.')) {
        stringValue = parseFloat(stringValue).toFixed(2);
        return Number(stringValue);
    } else {
        return numInput;
    }
}

function operate(left, op, right) {
    switch(op) {
        case '+':
            return add(left, right);
        case '−':
            return subtract(left, right);
        case '×':
            return multiply(left, right);
        case '÷':
            return divide(left, right);
        case '^':
            return power(left, right);
        default:
            return 0;
    }
}

let displayValue = "";
let computed = null;

let currentInput = {
    newInput: null,
    left: null,
    operator: null,
    right: null
}

function updateDisplayValue() {
    let displayContainerLong = document.querySelector('.calculator-display-long');
    displayContainerLong.textContent = `${displayValue}`;
}

function setEventListener() {
    const allItems = document.querySelectorAll('.calculator-button');
    allItems.forEach(item => {
        item.addEventListener('click', updateCalculation);
    })
}

function updateCalculation(e) {
    let clickedButtonID = e.target.id;
    let clickedButtonText = e.target.textContent;

    if(clickedButtonID[0] === "b") {
        clickedButtonID = clickedButtonID[1];
    }

    // console.log("Clicked Button ID", clickedButtonID);
    // console.log("Clicked Button Text", clickedButtonText);

    if (clickedButtonID === "clear") {
        currentInput["newInput"] = null;
        currentInput["left"] = null;
        currentInput["operator"] = null;
        currentInput["right"] = null;
        displayValue = "";
        computed = null;
    }
    
    if (clickedButtonID === "equal" && currentInput["left"] !== null && currentInput["right"] === null) {
        return;
    }

    if ( (clickedButtonID === "add" || clickedButtonID === "subtract" || clickedButtonID === "multiply" || clickedButtonID === "divide" || clickedButtonID === "power") && currentInput["left"] !== null && currentInput["operator"] !== null && currentInput["right"] === null) {
        return;
    }
    
    displayValue = `${displayValue}${e.target.textContent}`;

    // If the input is a number between 0 and 9
    if( (Number(clickedButtonText) >= 0 && Number(clickedButtonText) <= 9) || clickedButtonText === "." ) {
        if (currentInput["newInput"] === null) {
            currentInput["newInput"] = clickedButtonText;
        } else {
            currentInput["newInput"] += clickedButtonText;
        }
    }
    
    if(currentInput["operator"] === null) {
        if(computed === null) {
            currentInput["left"] = currentInput["newInput"];
        }
    }

    if(currentInput["operator"] !== null) {
        currentInput["right"] = currentInput["newInput"];
    }

    if(currentInput["left"] !== null){
        if(clickedButtonID === "equal" || clickedButtonID === "add" || clickedButtonID === "subtract" || clickedButtonID === "multiply" || clickedButtonID === "divide" || clickedButtonID === "power") {
            if(currentInput["operator"] !== null && currentInput["left"] !== null && currentInput["right"] !== null ) {
                let leftNum = Number(currentInput["left"]);
                let rightNum = Number(currentInput["right"]);
                computed = operate(leftNum, currentInput["operator"], rightNum);
                if (computed === "Sorry, Can't Divide By Zero") {
                    displayValue = `${computed}, Enter new number to for division`;
                } else {
                    currentInput["left"] = computed.toString();
                    currentInput["newInput"] = null;
                    currentInput["right"] = null;
                    if (clickedButtonText === "=") {
                        currentInput["operator"] = null;
                        displayValue = `${currentInput["left"]}`;
                        
                    } else {
                        currentInput["operator"] = clickedButtonText;
                        displayValue = `${currentInput["left"]}${currentInput["operator"]}`;
                    }
                }

            } else if (currentInput["operator"] === null) {
                if(currentInput["left"] !== null) {
                    currentInput["operator"] = clickedButtonText;
                }
                currentInput["newInput"] = null;
            }        
        }

    } else {
        displayValue = "";
    }
    updateDisplayValue();
}

setEventListener();
