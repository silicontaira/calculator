//Main Code

//Variables
let displayNum = 0;
let firstNum = 0;
let total = 0;
let operator;
let newNumFlag = 0;
let finalNum = 0;
const numButts = document.querySelectorAll('.numButt');
const opButts = document.querySelectorAll('.opButt');
const eqlButt = document.querySelector('#equal');
const clrButt = document.querySelector('#clear');
const screen = document.querySelector('#screen');

numButts.forEach(numButt => numButt.addEventListener('click', function() { 
    let tempNum = parseFloat(this.textContent);
    display(tempNum);
    displayNum = parseFloat(screen.textContent);
}));
opButts.forEach(opButt => opButt.addEventListener('click', opPress));
eqlButt.addEventListener('click', function() {
    if (operator == undefined) {
        return;
    }
    else {
        console.log(firstNum, displayNum);
        finalNum = operate(operator, firstNum, displayNum);
        firstNum = finalNum;
        console.log(finalNum);
        newNumFlag = 1;
        display(finalNum);
    }
});
clrButt.addEventListener('click', clear);

//Functions
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

function display(num) {
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
    firstnum = 0;
    displayNum = 0;
    total = 0;
    operator ='';
}
function opPress(e) {
    firstNum = displayNum;
    operator = this.id;
    newNumFlag = 1;
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
    if (b == 0) return "You can't divide by 0 silly!";
    return a / b;
}

/******************errors
problem: after '=' is pushed when new number is entered it appends to the displayText
solution: new number should overwrite displayText

problem: pressing a number then '=' deletes the number and returns a blank
solution: it should keep the same number there 3 then '=' should give a '3'
                         ****************/
                        