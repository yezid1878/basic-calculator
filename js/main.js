const d = document;

const $calc = d.querySelector(".calculator__buttons"),
  $screen = d.querySelector(".calculator__display");

let operationStatus = false,
  number1,
  number2,
  typeOperation;

const calculator = () => {
  if (!$calc) return;

  $calc.addEventListener("click", (e) => {
    const t = e.target,
      d = t.dataset;

    if (d.number) writeScreen(d.number);

    if (d.operation) getOperation(t, d.operation);

    if (d.complement) runOperation(d.complement);

    if (d.delete || t.matches(`${d.delete} *`)) {
      $screen.textContent = $screen.textContent.slice(0, -1);
    }
  });

  console.log(d.number);
};

const writeScreen = (number) => {
  $screen.textContent === "0" || operationStatus === true
    ? ($screen.textContent = number)
    : number === "." && !$screen.textContent.includes(".")
    ? ($screen.textContent += number)
    : number !== "."
    ? ($screen.textContent += number)
    : null;

  operationStatus = false;
};

const getOperation = (element, operation) => {
  operationStatus = true;

  number1 = Number.parseFloat($screen.textContent);
  typeOperation = operation;

  $screen.textContent = element.textContent;
};

const runOperation = (operation) => {
  const getResult = (number1, typeOperation) => {
    number2 = Number.parseFloat($screen.textContent);

    let result;

    switch (typeOperation) {
      case "plus":
        result = number1 + number2;
        break;
      case "minus":
        result = number1 - number2;
        break;
      case "divide":
        result = number1 / number2;
        break;
      case "multiple":
        result = number1 * number2;
        break;
    }

    result === Infinity
      ? ($screen.textContent = "ERROR")
      : ($screen.textContent = result);
  };

  operation === "clear"
    ? ($screen.textContent = "0")
    : getResult(number1, typeOperation);
};

calculator();
