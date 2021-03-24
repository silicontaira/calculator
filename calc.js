//Main Code

//Variables
let displayNum = 0;
let firstNum = 0;
let total = 0;
let operator;
let newNumFlag = 0;                             //status flag created to know when to append numbers together or replace them on the screen
                                                //i.e. pressing 3 twice in a row should equal 33 but without the flag it would just end up replacing 3 with 3
let finalNum = 0;
let intNum = 0;                                 //temp number for multiple operation presses
let decFlag = 0;                                //prevents user from using multiple decimals in one number
const numButts = document.querySelectorAll('.numButt');
const opButts = document.querySelectorAll('.opButt');
const eqlButt = document.querySelector('#equal');
const clrButt = document.querySelector('#clear');
const screen = document.querySelector('#screen');
const decimal = document.querySelector('#dot');
const percent = document.querySelector('#percent');
const signChange = document.querySelector('#signChange');

//Event listener for anytime a number button is pressed
numButts.forEach(numButt => numButt.addEventListener('click', function() { 
    let tempNum = parseFloat(this.textContent);
    display(tempNum);
    displayNum = parseFloat(screen.textContent);
}));

//Event listener for anytime an operation button is pressed
opButts.forEach(opButt => opButt.addEventListener('click', opPress));

//Event listener for "=" button press
eqlButt.addEventListener('click', equals);

//Event listener for "AC" button press
clrButt.addEventListener('click', clear);

//Event listener for "." button press
decimal.addEventListener('click', function() {
    if (decFlag == 0) {
        console.log(this.textContent);
        let dec = this.textContent;
        display(dec);
        displayNum = parseFloat(screen.textContent);
        decFlag = 1;    
    }
});

percent.addEventListener('click', function() {
    tempNum = parseFloat(screen.textContent)/100;
    newNumFlag = 1;
    display(tempNum);
    newNumFlag = 1;
});

signChange.addEventListener('click', function() {
    tempNum = parseFloat(screen.textContent) * -1;
    newNumFlag = 1;
    display(tempNum);
    newNumFlag = 1;
});

//Functions
function equals(e) {
    if (operator == undefined) {
        return;
    }
    else {
        console.log(firstNum, displayNum);
        finalNum = operate(operator, firstNum, displayNum);
        console.log(finalNum);
        firstNum = finalNum;
        newNumFlag = 1;
        display(finalNum);
        newNumFlag = 1;
    }
}
function operate(operator, a, b) {
    if (operator == 'sum') {
        return sum(a, b);
    }
    if (operator == 'subtract') {
        return subtract(a, b);
    }
    if (operator == 'multiply') {
        return multiply(a, b);
    }
    if (operator == 'divide') {
        return divide(a, b);
    }
}

function display(num) {                             //Updates calc screen
    if (newNumFlag == 0) {
        if (screen.textContent == 0) {
            screen.textContent = num;
        }
        else {
            screen.textContent += num;
        }
    }
    else {
        screen.textContent = num;
        newNumFlag = 0;
    }
}

function clear(e) {
    screen.textContent = 0;
    firstNum = 0;
    displayNum = 0;
    total = 0;
    operator = undefined;
    newNumFlag = 0;
    decFlag = 0;
}

function opPress(e) {
    prevOperator = operator;
    operator = this.id;
    if(firstNum == 0) {
        firstNum = displayNum;
    }
    else{
        if (prevOperator == undefined) {
            intNum = operate(operator, firstNum, displayNum);
        }
        else {
            intNum = operate(prevOperator, firstNum, displayNum);
        }
        newNumFlag = 1;
        display(intNum);
        firstNum = intNum;
    }
    newNumFlag = 1;
    decFlag = 0;
}

//Basic math functions
function sum(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) return "ERROR";
    return a / b;
}

/******************errors
 Add keyboard functionality
                         ****************/
                        