console.log(calculator("V - V"));

function calculator(string) {
  const arrayFromInput = string.split(/\s+/);
  let flag;
  const arabArrayForOperation;
  let arabResultForRoman;

  if (arrayFromInput.length != 3) {
    throw new SyntaxError("throws Error");
  }

  if (isStringRoman(string)) {
    if (~string.indexOf(/[0-9]/)) {
      throw new SyntaxError("throws Error");
    }
    flag = "roman";
    arabArrayForOperation = arrayFromInput.map(romanToArab);
  } else {
    if (!isIntegerNumbers(arrayFromInput)) {
      throw new SyntaxError("throws Error");
    }
    arabArrayForOperation = arrayFromInput;
  }
  if (
    arabArrayForOperation[0] > 10 ||
    arabArrayForOperation[2] > 10 ||
    arabArrayForOperation[0] < 1 ||
    arabArrayForOperation[2] < 1
  ) {
    throw new SyntaxError("throws Error");
  }

  arabResultForRoman = Math.floor(
    operate(
      arabArrayForOperation[0],
      arabArrayForOperation[1],
      arabArrayForOperation[2]
    )
  );

  if (flag == "roman") {
    return arabToRoman(arabResultForRoman);
  }
  return arabResultForRoman.toString();
}

function isStringRoman(string) {
  if (~string.indexOf("I") || ~string.indexOf("V") || ~string.indexOf("X")) {
    return true;
  }
  return false;
}

function isIntegerNumbers(array) {
  if (Number.isInteger(+array[0]) && Number.isInteger(+array[2])) {
    return true;
  }
  return false;
}

function arabToRoman(number) {
  const arabicArray = [100, 90, 50, 40, 10, 9, 5, 4, 1];
  const romanArray = ["C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let roman = "";

  for (let i = 0; i < arabicArray.length; i++) {
    while (arabicArray[i] <= number) {
      roman += romanArray[i];
      number -= arabicArray[i];
    }
  }
  return roman;
}

function romanToArab(number) {
  if (number == "+" || number == "-" || number == "*" || number == "/") {
    return number;
  }
  switch (number) {
    case "I":
      return "1";
      break;
    case "II":
      return "2";
      break;
    case "III":
      return "3";
      break;
    case "IV":
      return "4";
      break;
    case "V":
      return "5";
      break;
    case "VI":
      return "6";
      break;
    case "VII":
      return "7";
      break;
    case "VIII":
      return "8";
      break;
    case "IX":
      return "9";
      break;
    case "X":
      return "10";
      break;
    default:
      throw new SyntaxError("throws Error");
  }
}
function sum(first, second) {
  return first + second;
}

function substract(first, second) {
  return first - second;
}

function multiply(first, second) {
  return first * second;
}

function divide(first, second) {
  if (second == 0) throw new SyntaxError("throws Error");
  return first / second;
}

function operate(first, operator, second) {
  first = +first;
  second = +second;
  switch (operator) {
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
    default:
      throw new SyntaxError("throws Error");
  }
}
