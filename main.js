let names = 
    ["count", "=", "comma", "pass", "zero", "0", "sum", "+", "three", "3",
     "two", "2", "one", "1", "substract", "-", "six", "6","five", "5",
     "four", "4", "multiply", "x", "nine", "9", "eight", "8", "seven", "7",
     "divide", "/", "percent", "%", "change-sign", "+/-", "delete", "AC"]
let buttons = document.querySelector(".buttons");
for (let i = 0; i < 5; i ++){    
    let newDiv = document.createElement('div');
    newDiv.className = 'line';
    buttons.appendChild(newDiv);
    for (let j = 0; j < 4; j++ ) {
        if(names[names.length - 1] == "pass"){
            names[names.length - 1] =",";
            continue;
        }
        let newDivLine = document.createElement('div');
        newDivLine.textContent = names[names.length - 1];
        names.pop();
        newDivLine.className = 'line__button ' + names[names.length - 1];
        // console.log(names[names.length - 1]);
        names.pop();
        newDiv.appendChild(newDivLine);

    }   
}

let display = document.querySelector(".display");
let digit = 0;
let number = 0;
// display.textContent += digit;
// buttonClick();
// && display.textContent.length < 9
// if(display.textContent[0] == "0"){
//     display.textContent = display.textContent.slice(1);
// }
// if((e.target.textContent == "," || !isNaN(e.target.textContent))){

buttonClick();

function buttonClick() {
    let button = document.querySelectorAll('.line__button');
    button.forEach((elem) => {
        elem.addEventListener("click", function (e) {
            digit = e.target.textContent;      
            console.log(digit);
            if(number == 0) number = "";
            if(number.length < 9) number += digit.toString();
            console.log(number);
            display.textContent = number;
        });
    });
}

function sum(first, second){
    return first + second;
}

function substract(first, second){
    return first - second;
}

function multiply(first, second){
    return first * second;
}

function divide(first, second){
    return first / second;
}

function operate(operator, first, second) {
    switch(operator){
        case "+":
            return sum(first, second);
            break;
        case "-":
            return substract(first, second);
            break;
        case "*":
            return multiply(first, second);
            break;
        case "/":
            return divide(first, second);
            break;
    }

}
// console.log(operate("*", 5, 3));