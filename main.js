const display = document.querySelector(".display")
const numberBtn = document.querySelectorAll(".numberBtn");
const clearBtn = document.querySelector(".clearBtn");
const deleteBtn = document.querySelector(".deleteBtn");
const equalBtn = document.querySelector(".equalBtn");
const operatorBtn = document.querySelectorAll(".operatorBtn");
const dotBtn = document.querySelector(".dotBtn");

const calculator = {
  displayValue: '',
  firstOperand: null,
  secondOperand: null,
  operator: null,
  waitingForSecondOperand: false
};

numberBtn.forEach(button => {
    button.addEventListener("click", () => inputDigit(button.textContent));
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
    let currentValue = Number(calculator.displayValue);

    if (calculator.operator && calculator.waitingForSecondOperand) {
        calculator.operator = target.textContent;
        return;
    }

    if ((firstOperand) && (calculator.operator !== null)) {
        let result = operate(calculator.firstOperand, currentValue, calculator.operator);
        calculator.displayValue = result;
        calculator.firstOperand = result;
        updateDisplay(result);
    }   else {
        calculator.firstOperand = currentValue;
    }

    calculator.waitingForSecondOperand = true
    calculator.operator = target.textContent
}

//A function to manage the workflow, the controller function
function handleEquals() {

        // --- GUARD CLAUSE ---
        //CHeck the state of the APP instead of the calculation
        if (calculator.operator === null) {
            resetCalculator();
            return;
        } 

        // --- CALL THE WORKER ---
        let result = operate(calculator.firstOperand,secondNum);

        // --- UPDATE THE UI & STATE
       updateDisplay(result);
       updateCalculatorStateAfterCalculation(result);
}

function updateDisplay(value) {
    if (value === "ERROR") {
        display.textContent = "Please be wise!";
    } else {
        display.textContent = String(value).slice(0,12);
    }
}

function updateCalculatorStateAfterCalculation(result) {
    if (result = "ERROR") {
        resetCalculator();
    } else {
        //Prepare for the next calculation
        calculator.firstOperand = result;
        calculator.displayValue = String(result);
        calculator.operator = null;
        calculator.waitingForSecondOperand = true;
    }
}

function operate(firstOperand, secondOperanad, operator) {

    if ((secondOperanad === 0) && (operator === "/")) {
            display.textContent = "Please be wise!";
            return;
        }

    switch(calculator.operator) {

        case "+":
            result = firstOperand + secondOperanad;
            return;

        case "-":
            result = firstOperand - secondOperanad;
            return;

        case "/":
            result = firstOperand / secondOperanad;
            return;
        
        case "*":
            result = firstOperand * secondOperanad;
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

function inputDigit(digit) {
    calculator.displayValue += digit;
}

function inputDecimal(dot) {
    if ((calculator.displayValue !== null) && (calculator.displayValue.includes(".") !== true)) {
        calculator.displayValue += dot;
    } else {
        return;
    }
}

//A function to display Number on the screen
function displayNum() {
    if (calculator.displayValue.length > 12) {
        display.textContent = calculator.displayValue.slice(-13, -1);;
    } else {
        display.textContent = calculator.displayValue;
    }
};