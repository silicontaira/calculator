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

//Event listener for anytime a number button is clicked
numButts.forEach(numButt => numButt.addEventListener('click', function() { 
    let tempNum = parseFloat(this.textContent);
    display(tempNum);
    displayNum = parseFloat(screen.textContent);
}));

//Event listener for anytime an operation button is clicked
opButts.forEach(opButt => opButt.addEventListener('click', opPress));

//Event listener for "=" button click
eqlButt.addEventListener('click', equals);

//Event listener for "AC" button click
clrButt.addEventListener('click', clear);

//Event listener for "." button click
decimal.addEventListener('click', function() {
    if (decFlag == 0) {
        let dec = this.textContent;
        display(dec);
        displayNum = parseFloat(screen.textContent);
        decFlag = 1;    
    }
});

//Event listener for "%" button click
percent.addEventListener('click', function() {
    tempNum = parseFloat(screen.textContent)/100;
    newNumFlag = 1;
    display(tempNum);
    displayNum = parseFloat(screen.textContent);
    newNumFlag = 1;
});

//Event listener for "+/-" button click
signChange.addEventListener('click', function() {
    tempNum = parseFloat(screen.textContent) * -1;
    newNumFlag = 1;
    display(tempNum);
    displayNum = parseFloat(screen.textContent);
    newNumFlag = 1;
});

document.addEventListener('keypress', function(e) {
    if (48 <= e.keyCode && e.keyCode <= 57) {           //Keycode for numbers 0-9
        let tempNum = parseFloat(e.key);
        display(tempNum);
        displayNum = parseFloat(screen.textContent);
    }
    if (e.keyCode == 37) {                              //Keycode for %
        tempNum = parseFloat(screen.textContent)/100;
        newNumFlag = 1;
        display(tempNum);
        displayNum = parseFloat(screen.textContent);
        newNumFlag = 1;
    }
    if (e.keyCode == 42) {                              //Keycode for *
        opButtPress(e);
    }
    if (e.keyCode == 43) {                              //Keycode for +
        opButtPress(e);
    }
    if (e.keyCode == 45) {                              //Keycode for -
        opButtPress(e);
    }
    if (e.keyCode == 46) {                              //Keycode for .
        if (decFlag == 0) {
            let dec = e.key;
            display(dec);
            displayNum = parseFloat(screen.textContent);
            decFlag = 1;    
        }
    }
    if (e.keyCode == 47) {                              //Keycode for /
        opButtPress(e);
    }
    if (e.keyCode == 13 || e.keyCode == 61) {
        equals(e);
    }
});

//Functions
function equals(e) {
    if (operator == undefined) {
        return;
    }
    else {
        finalNum = operate(operator, firstNum, displayNum);
        firstNum = finalNum;
        newNumFlag = 1;
        display(finalNum);
        newNumFlag = 1;
        operator = undefined;
        firstNum = 0;
    }
}
function operate(operator, a, b) {
    if (operator == '+') {
        return sum(a, b);
    }
    if (operator == '-') {
        return subtract(a, b);
    }
    if (operator == '*') {
        return multiply(a, b);
    }
    if (operator == '/') {
        return divide(a, b);
    }
}

function display(num) {                             //Updates calc screen
    let roundNum = round(num);
    let stringNum = roundNum.toString();
    if (stringNum.length > 11) {
        let expNum = roundNum.toExponential();
        roundNum = expNum;
    }
    if (newNumFlag == 0) {
        if (screen.textContent === '0') {
            screen.textContent = roundNum;
        }
        else {
            screen.textContent += roundNum;
        }
    }
    else {
        screen.textContent = roundNum;
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

function opPress(e) {                               //This function is for clicking operator buttons
    prevOperator = operator;
    operator = this.id;
    if(firstNum == 0) {
        firstNum = displayNum;
    }
    else{
        if (prevOperator == undefined) {

        }
        else {
            intNum = operate(prevOperator, firstNum, displayNum);
            newNumFlag = 1;
            display(intNum);
            firstNum = intNum;
        }
    }
    newNumFlag = 1;
    decFlag = 0;
}

function opButtPress(e) {                           //This function is for operator keyboard presses
    prevOperator = operator;
    operator = e.key;
    if(firstNum == 0) {
        firstNum = displayNum;
    }
    else{
        if (prevOperator == undefined) {

        }
        else {
            intNum = operate(prevOperator, firstNum, displayNum);
            newNumFlag = 1;
            display(intNum);
            firstNum = intNum;
        }
    }
    newNumFlag = 1;
    decFlag = 0;
}

function round(num) {
    return Math.round(num * 1000) / 1000;
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