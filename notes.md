## Main purposes
Create a simple calculator that does the following calculation:
    - add
    - subtract
    - multiply
    - divide

Consists of the following parts:
    - A display screen
    - Operating buttons
    - Equal button
    - number buttons

## Setup
- Find the number buttons and store them in a variable called numberBtn
- Find the operating buttons and store them in a variable called operating buttons
- Find the equal buttons and store them in a variable called equalBtn

## Variables
- let firstNum = "";
- let SecondNum = "";
- let result;
- let operator = "";
- let num = "";

## What the buttons will do
- Number button
    - When the number buttons are clicked
        - the number will be shown on screen
        - the number will be stored in a variable for later usage
**Use the display() function**

- operating button
    - When the operating buttons are clicked
        If there are no previous operators (first time calculation)
            - Save the number to the firstNum variable
            - Save the operator to the operator variable
            - Call the operate() function
            - Clear the screen
            - Clear num for storing the next number

            firstNum = num;
            operator = this.textContent;
            operate(firstNum, secondNum);
            display.textContent = "";
            num = "";

        If there are previous operators (operators !== null)
            - Save the number to the secondNum variable
            - Call the operate() function
            - Display the result
            - Save the result to the firstNum variable
            - Clear num for storing the next number

            secondNum = num;
            operate(firstNum, secondNum);
            display.textContent = "";
            num = "";
            firstNum = result;

- Equal button
    - When the equal button is clicked
        - Save the number to the secondNum variable
        - Call the operate() function
        - Display the result
        - Save the result to the firstNum variable
        - Clear num for storing the next number

        secondNum = num;
        operate(firstNum, secondNum);
        display.textContent = "";
        num = "";
        firstNum = result;

- Clear button
    - When the clear button is clicked
        - Set everything to "";
        - Clear the screen

        firstNum = "";
        secondNum = "";
        result = 0;
        operator = "";
        num = "";
        display.textContent = "";

- Del button
    - When the delete button is clicked
        - Convert num to string
        - remove 1 character from the string

        num = Number(num.toString().slice(0, -1));

## function
A function called display() that shows the number on the display when the digit button is clicked
1. Get the text content of the button
2. show the text content on the screen
3. store the content of the display in the variable firstNum
4. Convert the text content into number

FUNCTION display():
    num += this.textContent;
    display.textContent = num;
    num = Number(firstNum);
END FUNCTION

A function called operate() that will calculate the number (The equal button)
1. Get the first and second number variable
2. Perform the suitable operation according to the operators

FUNCTION operate(a, b):

    SWITCH(operator):

        CASE "+":
            RETURN result = a + b;

        CASE "-":
            RETURN result = a - b;

        CASE "/":
            RETURN result = a / b;
        
        CASE "*":
            RETURN result = a * b;

    END SWITCH
END FUNCTION

## Question
- Will number add string become string? 
    Yes, the + operator will performs type coercion
- How to remove the last character from the string?
    - Use the slice() method
    - Other resources: https://coreui.io/blog/how-to-remove-the-last-character-from-a-string-in-javascript/.
- What is the proper way of using forEach?
    - syntax: array.forEach(callback(element, index, arr), thisValue);
    

