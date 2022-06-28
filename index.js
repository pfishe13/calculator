
function add(left, right) {
    // console.log("calling add");
    return left + right;
}

function subtract(left, right) {
    // console.log("calling subtract");
    return left - right;
}

function multiply(left, right) {
    // console.log("calling multiply");
    return left * right;
}

function divide(left, right) {
    // console.log("calling divide");
    if (right === 0) {
        return "Sorry, Can't Divide By Zero";
    }
    let value = left / right;
    let stringValue = value.toString();
    if(stringValue.includes('.')) {
        stringValue = parseFloat(stringValue).toFixed(2);
        return Number(stringValue);
    } else {
        console.log(typeof value);
        return value;
    }
}

function operate(left, op, right) {
    switch(op) {
        case '+':
            return add(left, right);
        case '-':
            return subtract(left, right);
        case '*':
            return multiply(left, right);
        case '/':
            return divide(left, right);
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
    let displayContainer = document.querySelector('.calculator-display');
    displayContainer.textContent = `${displayValue}`;
}

function setEventListener() {
    const allItems = document.querySelectorAll('.calculator-button');
    allItems.forEach(item => {
        item.addEventListener('click', updateCalculation);
    })
}

function updateCalculation(e) {
    
    if (e.target.textContent === "Clear") {
        currentInput["newInput"] = null;
        currentInput["left"] = null;
        currentInput["operator"] = null;
        currentInput["right"] = null;
        displayValue = "";
        computed = null;
    }
    
    if (e.target.textContent === "=" && currentInput["left"] !== null && currentInput["right"] === null) {
        return;
    }

    if ( (e.target.textContent === "+" || e.target.textContent === "-" || e.target.textContent === "*" || e.target.textContent === "/") && currentInput["left"] !== null && currentInput["operator"] !== null && currentInput["right"] === null) {
        return;
    }
    
    displayValue = `${displayValue}${e.target.textContent}`;

    // If the input is a number between 0 and 9
    if( Number(e.target.textContent) >= 0 && Number(e.target.textContent) <= 9) {
        console.log(e.target.textContent);
        if (currentInput["newInput"] === null) {
            //console.log("Was blank");
            currentInput["newInput"] = e.target.textContent;
        } else {
            //console.log("Not blank");
            currentInput["newInput"] += e.target.textContent;
        }
        //console.log("Exiting number loop");
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
        if(e.target.textContent === "=" || e.target.textContent === "+" || e.target.textContent === "-" || e.target.textContent === "*" || e.target.textContent === "/" ) {
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
                    // currentInput["operator"] = null;
                    if (e.target.textContent === "=") {
                        currentInput["operator"] = null;
                        displayValue = `${currentInput["left"]}`;
                        
                    } else {
                        currentInput["operator"] = e.target.textContent;
                        displayValue = `${currentInput["left"]}${currentInput["operator"]}`;
                    }
                }

            } else if (currentInput["operator"] === null) {
                if(currentInput["left"] !== null) {
                    currentInput["operator"] = e.target.textContent;
                }
                currentInput["newInput"] = null;
            }
    
            // let op = e.target.textContent;
        
        }

    } else {
        displayValue = "";
    }

    console.log(currentInput);





    updateDisplayValue();
}

setEventListener();
