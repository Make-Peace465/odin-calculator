let firstNum;
let secondNum;
let operator;

const selectedBtns = document.querySelectorAll(".numberBtnContainer > button")
    selectedBtns.forEach(btn => {
	    btn.addEventListener("click", showDigitOnScreen);
    })

const selectedOperatorBtns = document.querySelectorAll(".operatorContainer > button")
    selectedOperatorBtns.forEach(btn => {
        btn.addEventListener("click", getTheFirstNum);
        btn.addEventListener("click", getTheOperators);
        btn.addEventListener("click", clearTheScreen);
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
    const clickedBtn = event.target.textContent;
    displayScreen.append(clickedBtn);
    return clickedBtn;
}

function getTheFirstNum() {
    const displayScreen = document.querySelector(".display");
    firstNum = Number(displayScreen.textContent);
    return firstNum;
}

function getTheOperators(event) {
    const clickedBtn = event.target.textContent;
    operator = clickedBtn;
    console.log(operator)
    return operator;
}

function getTheSecondNum() {
    secondNum = Number(btn.textContent);
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
    return;
}