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
  waitingForSecondOperand: false,
  resultCalculated: false,
};

numberBtn.forEach(button => {
    button.addEventListener("click", () => {
        inputDigit(button.textContent);
        updateDisplay(calculator.displayValue);
    });
});

operatorBtn.forEach(function(operatorBtn) {
    operatorBtn.addEventListener("click", (e) => {
        handleOperator(e.target.textContent);
    })
})

equalBtn.addEventListener("click", handleEquals);

clearBtn.addEventListener("click", resetCalculator);

deleteBtn.addEventListener("click", () => {
    calculator.displayValue = calculator.displayValue.slice(0, -1);
    updateDisplay(calculator.displayValue);
})

dotBtn.addEventListener("click", () => {
    inputDecimal(".");
    updateDisplay(calculator.displayValue);
});

function handleOperator(target) {
    let currentValue = Number(calculator.displayValue);
    console.log(currentValue);
    console.log(calculator.operator);

    // Handled edge case: typing 2 operators in a row
    if (calculator.operator && calculator.waitingForSecondOperand && calculator.displayValue === "") {
        calculator.operator = target;
        console.log("This has been ran;")
        return;
    }

    if (calculator.firstOperand == null) {
        calculator.firstOperand = currentValue;
    } else if (calculator.operator) {
        let result = operate(calculator.firstOperand, currentValue, calculator.operator);
        calculator.displayValue = result;
        calculator.firstOperand = result;
        updateDisplay(result);
    }

    calculator.displayValue = "";
    calculator.resultCalculated = false;
    calculator.operator = target;
    calculator.waitingForSecondOperand = true;

    console.log(calculator);
}

//A function to manage the workflow, the controller function
function handleEquals() {

        if (calculator.operator === null && calculator.waitingForSecondOperand === false) {
            return;
        }

        let currentValue = Number(calculator.displayValue);

        // --- GUARD CLAUSE ---
        //CHeck the state of the APP instead of the calculation
        if (calculator.operator === null) {
            resetCalculator();
            return;
        } 

        // --- CALL THE WORKER ---
        let result = operate(calculator.firstOperand, currentValue, calculator.operator);

        // --- UPDATE THE UI & STATE
       updateDisplay(result);
       updateCalculatorStateAfterCalculation(result);
}

function updateDisplay(value) {
    if ((value === "ERROR") || (value === undefined)) {
        display.textContent = "Please be wise!";
    } else {
        display.textContent = String(value).slice(0,12);
    }
}

function updateCalculatorStateAfterCalculation(result) {
    if (result === "ERROR") {
        display.textContent = "Please be wise!";
    } else {
        //Prepare for the next calculation
        calculator.firstOperand = result;
        calculator.displayValue = String(result);
        calculator.operator = null;
        calculator.resultCalculated = true;
        calculator.waitingForSecondOperand = false;
        console.log(calculator);
    }
}

function operate(firstOperand, secondOperand, operator) {

    if ((secondOperand === 0) && (operator === "/")) {
            return;
        }

    switch(operator) {

        case "+":
            return firstOperand + secondOperand;

        case "-":
            return firstOperand - secondOperand;

        case "/":
            return firstOperand / secondOperand;

        case "*":
            return firstOperand * secondOperand;

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
    calculator.resultCalculated = false;
}

function inputDigit(digit) {
    if (calculator.resultCalculated === true) {
        resetCalculator();
        calculator.displayValue = digit;
    } else {
        calculator.displayValue += digit;
    }
}

function inputDecimal(dot) {
    if ((calculator.displayValue) && (calculator.displayValue.includes(".") === false)) {
        calculator.displayValue += dot;
    } else {
        return;
    }
}

// //A function to display Number on the screen
// function displayNum() {
//     if (calculator.displayValue.length > 12) {
//         display.textContent = calculator.displayValue.slice(-13, -1);;
//     } else {
//         display.textContent = calculator.displayValue;
//     }
// };