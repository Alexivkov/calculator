const buttonClasses = [
  "calculate",
  "comma",
  "zero",
  "add",
  "three",
  "two",
  "one",
  "subtract",
  "six",
  "five",
  "four",
  "multiply",
  "nine",
  "eight",
  "seven",
  "divide",
  "percent",
  "change-sign",
  "clear",
];
let buttonNames = [
  "=",
  "pass",
  "0",
  "+",
  "3",
  "2",
  "1",
  "-",
  "6",
  "5",
  "4",
  "x",
  "9",
  "8",
  "7",
  "/",
  "%",
  "+/-",
  "AC",
];

const display = document.querySelector(".calculator__display");
const keys = document.querySelector(".calculator__keys");
for (let lines = 0; lines < 5; lines++) {
  let newDiv = document.createElement("div");
  newDiv.className = "line";
  keys.appendChild(newDiv);
  for (let rows = 0; rows < 4; rows++) {
    if (buttonNames[buttonNames.length - 1] == "pass") {
      buttonNames[buttonNames.length - 1] = ".";
      continue;
    }
    addClassAndTextToDiv(
      "line__button ",
      buttonClasses[buttonClasses.length - 1],
      newDiv,
      buttonNames[buttonNames.length - 1]
    );
    buttonClasses.pop();
    buttonNames.pop();
  }
}

//check 0.1 + 0.2
//out of display range
//check . in secondNum

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = display.dataset.previousKeyType;
    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      display.dataset.previousKeyType = "number";
    } else if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = display.dataset.firstValue;
      const operator = display.dataset.operator;
      const secondValue = displayedNum;
      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = operate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        // Update calculated value as firstValue
        display.dataset.firstValue = calcValue;
      } else {
        // If there are no operations, set displayedNum as the firstValue
        display.dataset.firstValue = displayedNum;
      }
      display.dataset.previousKeyType = "operator";
      display.dataset.operator = action;
    } else if (action === "comma") {
      if (previousKeyType === "operator" || previousKeyType === "calculate") {
        display.textContent = "0.";
      } else if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else display.dataset.previousKey = "decimal";
    } else if (action == "change-sign") {
      display.textContent = -1 * display.textContent;
    } else if (action === "clear") {
      display.textContent = 0;
      display.dataset.firstValue = "";
      display.dataset.modValue = "";
      display.dataset.operator = "";
      display.dataset.previousKeyType = "";
      display.dataset.previousKeyType = "clear";
    } else if (action === "calculate") {
      let firstValue = display.dataset.firstValue;
      const operator = display.dataset.operator;
      let secondValue = displayedNum;
      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = display.dataset.modValue;
        }
        display.textContent = operate(firstValue, operator, secondValue);
      }
      display.dataset.modValue = secondValue;
      display.dataset.previousKeyType = "calculate";
    }
  }
});

function addClassAndTextToDiv(firstClassName, secondClassName, div, text) {
  let newButton = document.createElement("button");
  newButton.className = firstClassName + secondClassName;
  if (!isNaN(text)) {
  } else {
    newButton.setAttribute("data-action", secondClassName);
  }

  newButton.textContent = text;
  div.appendChild(newButton);
}

const createResultForDisplay = (key, displayedNum, state) => {
  const keyContent = key.textContent;
  const action = key.dataset.action;
  const firstValue = state.firstValue;
  const modValue = state.modValue;
  const operator = state.operator;
  const previousKeyType = state.previousKeyType;

  if (!action) {
    if (
      displayedNum === "0" ||
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
    ) {
      return keyContent;
    } else {
      return displayedNum + keyContent;
    }
  } else if (action === "comma") {
    if (previousKeyType === "operator" || previousKeyType === "calculate") {
      return "0.";
    } else if (!displayedNum.includes(".")) {
      return displayedNum + ".";
    } else return displayedNum;
  } else if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  ) {
    const firstValue = display.dataset.firstValue;
    const operator = display.dataset.operator;
    if (
      firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
    ) {
      return operate(firstValue, operator, displayedNum);
    } else return displayedNum;
  } else if (action === "clear") {
    return 0;
  } else if (action == "change-sign") {
    return -1 * displayedNum;
  } else if (action === "calculate") {
    let firstValue = display.dataset.firstValue;
    const operator = display.dataset.operator;
    let secondValue = displayedNum;
    if (firstValue) {
      if (previousKeyType === "calculate") {
        firstValue = displayedNum;
        secondValue = display.dataset.modValue;
      }
      return operate(firstValue, operator, secondValue);
    } else return displayedNum;
  }
};

function operate(firstNumber, operator, secondNumber) {
  const firstNum = parseFloat(firstNumber);
  const secondNum = parseFloat(secondNumber);
  if (operator === "add") return firstNum + secondNum;
  if (operator === "subtract") return firstNum - secondNum;
  if (operator === "multiply") return firstNum * secondNum;
  if (operator === "divide") return firstNum / secondNum;
}
