const display = document.querySelector(".display")
const numberBtn = document.querySelectorAll(".numberBtn");
const clearBtn = document.querySelector(".clearBtn");
const deleteBtn = document.querySelector(".deleteBtn");
const equalBtn = document.querySelector(".equalBtn");
const operatorBtn = document.querySelectorAll(".operatorBtn");

let secondNum = 0;
let result = 0;

const calculator = {
  displayValue: '',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false
};

numberBtn.forEach(function(numberBtn) {
    numberBtn.addEventListener("click", displayNum);
});

operatorBtn.forEach(function(operatorBtn) {
    operatorBtn.addEventListener("click", (e) => {
        handleOperator(e.target.textContent);
    })
})

equalBtn.addEventListener("click", performCalculation);

clearBtn.addEventListener("click", resetCalculator);

deleteBtn.addEventListener("click", () => {
    return num = Number(num.toString().slice(0, -1));
})

function handleOperator(target) {
    if (calculator.waitingForSecondOperand === false) {

            calculator.firstOperand = calculator.displayValue;
            calculator.operator = this.textContent;

            display.textContent = "";
            calculator.displayValue = "";

            calculator.waitingForSecondOperand = true;
            
        } else {

            secondNum = Number(calculator.displayValue);
           
            //operate the number first
            operate(calculator.firstOperand,secondNum);
            //update the operator
            calculator.operator = this.textContent;

            //check if second number is zero
            if ((secondNum === 0) && (calculator.operator === "/")) {
                display.textContent = "Please be wise!";
                return;
            }

            //display the result
            calculator.displayValue = result.toString().slice(0, 13);
            display.textContent = calculator.displayValue;
            
            calculator.displayValue = "";

            //move the result to first number
            calculator.firstOperand = result;
        }
}

function performCalculation() {
    secondNum = calculator.displayValue;

        if (calculator.operator === null) {
            resetCalculator();
            return;
        } 

        if ((secondNum === 0) && (calculator.operator === "/")) {
            display.textContent = "Please be wise!";
            return;
        }

        operate(calculator.firstOperand,secondNum);
        calculator.displayValue = result.toString().slice(0, 12);
        display.textContent = calculator.displayValue
        calculator.firstOperand = result;

        calculator.displayValue = "";
}

function operate(a, b) {
    //Convert a and b to number to ensure
    a = +a;
    b = +b;

    switch(calculator.operator) {

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

function resetCalculator() {
    secondNum = "";
    result = 0;
    display.textContent = "";

    //calculator object
    calculator.displayValue = '';
    calculator.firstOperand = null;
    calculator.operator =  null;
    calculator.waitingForSecondOperand = false;
}

function displayNum() {
    calculator.displayValue += this.textContent;

    if (calculator.displayValue.length > 12) {
        display.textContent = calculator.displayValue.slice(-13, -1);;
    } else {
        display.textContent = calculator.displayValue;
    }
};