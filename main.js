let firstNum;
let secondNum;
let operator;
let result;
let resetScreenAfterResult = 0;


const selectedBtns = document.querySelectorAll(".numberBtnContainer > .numberBtn")
    selectedBtns.forEach(btn => {
	    btn.addEventListener("click", function() {
            if (resetScreenAfterResult === 1) {
                clearTheScreen();
                resetCalculator();
                showDigitOnScreen(event);
                resetScreenAfterResult = 0;
            } else {
                showDigitOnScreen(event);
            }
        })
    })

const selectedOperatorBtns = document.querySelectorAll(".operatorContainer > button");
    selectedOperatorBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if ((resetScreenAfterResult === 1) && ((operator === "+") || (operator === "-") || (operator === "x") || (operator === "÷"))) {
                getTheOperators(event);
                getTheFirstNum(event);
                clearTheScreen();
            } else if ((resetScreenAfterResult === 0) && ((operator === "+") || (operator === "-") || (operator === "x") || (operator === "÷"))) {
                getTheSecondNum();
                const calcResult = calculateTheResult();
                if (calcResult != "DIV_ZERO") {
                    displayResultOnScreen();
                }
                firstNum = result;
                getTheOperators(event);
                clearTheScreen();
                resetScreenAfterResult = 1;
            } else {
                getTheFirstNum(event);
                getTheOperators(event);
                clearTheScreen();
            }
    })
    })

const selectedEqualBtns = document.querySelector(".equalBtn");
selectedEqualBtns.addEventListener("click", () => {
    if (!operator) return;
    getTheSecondNum();
    clearTheScreen();
    const calcResult = calculateTheResult();
    if (calcResult != "DIV_ZERO") {
        if (calcResult > 1000000000000) {
            checkDigitOnScreen(result);
        } else {
            displayResultOnScreen();
        }
    }
    firstNum = result;
    resetScreenAfterResult = 1;
})

const selectedClearBtns = document.querySelector(".clearBtn");
selectedClearBtns.addEventListener("click", () => {
    clearTheScreen();
    resetCalculator();
})

const deleteBtn = document.querySelector(".deleteBtn");
deleteBtn.addEventListener("click", deleteTheLastNumber);

function checkDigitOnScreen(num) {
    const displayScreen = document.querySelector(".display");
    let text = num.toString();
    let numberArray = text.split("");
    let newNumberArray = numberArray.slice(0, 11);
    number = newNumberArray.join("");
    displayScreen.append(number);
}

function addition(a, b) {
    let result = a + b;
    return result;
}

function subtraction(a, b) {
    let result = a - b;
    return result;
}

function multiplication(a, b) {
    let result = a * b;
    return result;
}

function division(a , b) {
    let result = a / b;
    return result;
}

function showDigitOnScreen(event) {
    const displayScreen = document.querySelector(".display");
    if (event.target.textContent === '.' && displayScreen.textContent.includes('.')) {
        return; 
    }
    if (Number(displayScreen.textContent) > 100000000000) {
        console.log(displayScreen.textContent);
        let text = displayScreen.textContent;
        let numberArray = text.split("");
        let number = numberArray.slice(0, 11).join("");
        clearTheScreen();
        displayScreen.append(number);
    } else {
        displayScreen.append(event.target.textContent);
    }
    return;
}

function getTheFirstNum() {
    const displayScreen = document.querySelector(".display");
    firstNum = Number(displayScreen.textContent);
    return firstNum;
}

function getTheOperators(event) {
    const clickedBtn = event.target.textContent;
    operator = clickedBtn;
    return operator;
}


function getTheSecondNum() {
    const displayScreen = document.querySelector(".display");
    // console.log(displayScreen.textContent);
    secondNum = Number(displayScreen.textContent);
    return secondNum;
}

function resetCalculator() {
    firstNum = 0;
    secondNum = 0;
    operator = "";
}

function clearTheScreen() {
    const displayScreen = document.querySelector(".display");
    displayScreen.textContent = "";
    // console.log("Screen cleared");
    return;
}

function calculateTheResult() {
    if (operator === "+") {
        result = addition(firstNum, secondNum);
        return result;
    } else if (operator === "-") {
        result = subtraction(firstNum, secondNum);
        return result;
    } else if (operator === "x") {
        result = multiplication(firstNum, secondNum);
        result = (Math.floor(result*(Math.pow(10, 10))))/Math.pow(10, 10)
        return result;
    } else if (operator === "÷") {
        if (secondNum === 0) {
            divideByZero();
            resetScreenAfterResult += 1;
            return "DIV_ZERO";
        } else {
            result = division(firstNum, secondNum);
            result = (Math.floor(result*(Math.pow(10, 10))))/Math.pow(10, 10)
            resetScreenAfterResult += 1;
            return result;
        }
    } else {
        result = secondNum;
        return result;
    }
}

function divideByZero() {
    const displayScreen = document.querySelector(".display");
    displayScreen.append("Error!");
    setTimeout(() => {
        resetCalculator(); 
        clearTheScreen();
    }, 2000);
    return;
}

function displayResultOnScreen() {
    const displayScreen = document.querySelector(".display");
    if (result > 1000000000000) {
        let text = result.toString();
        let numberArray = text.split("");
        let number = numberArray.slice(0, 11).join("");
        clearTheScreen();
        displayScreen.append(number);
    } else {
        displayScreen.append(result);
    }
    return;
}

function deleteTheLastNumber() {
    const displayScreen = document.querySelector(".display");
    let number = displayScreen.textContent;
    let numberArray = number.split("");
    numberArray.pop();
    number = numberArray.join("");
    clearTheScreen();
    displayScreen.append(number);
    return number;
}