const display = document.querySelector(".display")
const numberBtn = document.querySelectorAll(".numberBtn");
const clearBtn = document.querySelector(".clearBtn");
const deleteBtn = document.querySelector(".deleteBtn");
const equalBtn = document.querySelector(".equalBtn");
const operatorBtn = document.querySelectorAll(".operatorBtn");

let firstNum = "";
let secondNum = "";
let result;
let operator = null;
let num = "";

numberBtn.forEach(function(numberBtn) {
    numberBtn.addEventListener("click", displayNum);
});

operatorBtn.forEach(function(operatorBtn) {
    operatorBtn.addEventListener("click", () => {
        if (operator === null) {

            firstNum = num;
            console.log(firstNum);
            display.textContent = "";
            operator = this.textContent;
            console.log(this);
            console.log(operator);
            num = "";

        } else {

            secondNum = num;
            operator = this.textContent;
            operate(firstNum,secondNum);
            console.log(result);
            display.textContent = result;
            num = "";
        } 
    })
})

equalBtn.addEventListener("click", () => {
        secondNum = num;
        operator = this.textContent;
        operate(firstNum,secondNum);
        console.log(result);
        display.textContent = result;
        num = "";
});

clearBtn.addEventListener("click", () => {
    firstNum = "";
    secondNum = "";
    result = 0;
    operator = null;
    num = "";
    display.textContent = "";
});

deleteBtn.addEventListener("click", () => {
    return num = Number(num.toString().slice(0, -1));
})

function operate(a, b) {

    switch(operator) {

        case "+":
            result = a + b;
            return;

        case "-":
            result = a - b;
            return;

        case "/":
            result = a / b;
            return;
        
        case "*":
            result = a * b;
            return;

    }
}

function displayNum() {
    num += this.textContent;
    display.textContent = num;
    num = Number(num);
    console.log(num);
    console.log(typeof num);
};