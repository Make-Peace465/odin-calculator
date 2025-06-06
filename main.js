let firstNum;
let secondNum;
let operator;
let result;
let resetScreenAfterResult = 0;
let numCount = 0;

const selectedBtns = document.querySelectorAll(".numberBtnContainer > button")
    selectedBtns.forEach(btn => {
	    btn.addEventListener("click", function() {
            console.log("resetScreenAfterResult" + resetScreenAfterResult)
            if (resetScreenAfterResult === 1) {
                clearTheScreen();
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
                console.log(resetScreenAfterResult);
                getTheOperators(event);
                getTheFirstNum(event);
                clearTheScreen();
            } else if ((resetScreenAfterResult === 0) && ((operator === "+") || (operator === "-") || (operator === "x") || (operator === "÷"))) {
                getTheOperators(event);
            } else if ((operator === "+") || (operator === "-") || (operator === "x") || (operator === "÷")) {
                getTheSecondNum();
                const calcResult = calculateTheResult();
                if (calcResult != "DIV_ZERO") {
                    displayResultOnScreen();
                }
                firstNum = result;
                getTheOperators(event);
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
    getTheSecondNum();
    clearTheScreen();
    const calcResult = calculateTheResult();
    if (calcResult != "DIV_ZERO") {
        displayResultOnScreen();
    }
    firstNum = result;
    resetScreenAfterResult = 1;
})

const selectedClearBtns = document.querySelector(".clearBtn");
selectedClearBtns.addEventListener("click", () => {
    clearTheScreen();
    resetCalculator();
})

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
    // const clickedBtn = event.target.textContent;
    displayScreen.append(event.target.textContent);
    return;
}

function getTheFirstNum() {
    const displayScreen = document.querySelector(".display");
    firstNum = Number(displayScreen.textContent);
    numCount += 1;
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
    numCount += 1;
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
    console.log("Screen cleared");
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
    displayScreen.append("No divide by zero please ;)");
    setTimeout(() => {
        resetCalculator(); 
        clearTheScreen();
    }, 2000);
    return;
}

function displayResultOnScreen() {
    const displayScreen = document.querySelector(".display");
    displayScreen.textContent = result;
    return;
}