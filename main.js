const display = document.querySelector(".display")
const numberBtn = document.querySelectorAll(".numberBtn");
const clearBtn = document.querySelector(".clearBtn");
const deleteBtn = document.querySelector(".deleteBtn");
const equalBtn = document.querySelector(".equalBtn");
const operatorBtn = document.querySelectorAll(".operatorBtn");

let firstNum = "";
let secondNum = "";
let result = 0;
let operator = null;
let num = "";

numberBtn.forEach(function(numberBtn) {
    numberBtn.addEventListener("click", displayNum);
});

operatorBtn.forEach(function(operatorBtn) {
    operatorBtn.addEventListener("click", function(e) {
        num = Number(num);

        //First time calculation
        if (operator === null) {

            firstNum = num;
            console.log(`first number is ${firstNum}`)
            operator = this.textContent;
            display.textContent = "";
            num = "";

        } else {

            secondNum = num;
            console.log(`second number is ${secondNum}`)
            //operate the number first
            operate(firstNum,secondNum);
            //update the number
            operator = this.textContent;

            //check if second number is zero
            if ((secondNum === 0) && (operator === "/")) {
                display.textContent = "Please be wise!";
                return;
            }

            //display the result
            textResult = result.toString().slice(0, 13);
            display.textContent = textResult;

            //move the result to first number
            firstNum = result;
            num = "";
        } 
    })
})

equalBtn.addEventListener("click", () => {
        num = Number(num);

        if (operator === null) {
            return;
        }

        secondNum = num; 

        if ((secondNum === 0) && (operator === "/")) {
            display.textContent = "Please be wise!";
            return;
        }

        operate(firstNum,secondNum);
        textResult = result.toString().slice(0, 12);
        display.textContent = textResult;
        console.log(`first number is ${firstNum}`)
        console.log(`second number is ${secondNum}`)
        firstNum = result;
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
    //Convert a and b to number to ensure
    a = +a;
    b = +b;

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

    if (num.length > 12) {
        display.textContent = num.slice(-13, -1);;
    } else {
        display.textContent = num;
    }
};