// Define all input & output elements.
const curveValueDisplay = document.querySelector("#curveValue");
const curveSlider = document.querySelector("#curveSlider");
const curveInput = document.querySelector("#curveInput");
const curveInputWarningSpan = document.querySelector("#curveInputWarningSpan");
const baseRateInput = document.querySelector("#baseRateInput");
const useCurrencyElement = document.querySelector("#useCurrency");
const revisionCountInput = document.querySelector("#revisionCountInput");
const output = document.querySelector("#outputTotal");

// Import the curve by html script tag.
// Uses exponential.js by default.
// Initialize variables.
let curveValue = 1.05;
let baseFee = 150;
let revisionCount = 4;
let useCurrency = false;

function trigger() {
  // calculate() function from exponential.js returns an object.
  // calculated.fees is an array of fees with arbitrary length set by the user.
  // calculated.total is the sum of all fees.

  let calculated = calculate(curveValue, baseFee, revisionCount, true);
  let previousValue = Number(output.innerHTML);
  let totalAllFees = Number(calculated.total);
  // output.textContent = totalAllFees;
  output.textContent = useCurrency ? numberToCurrency(totalAllFees) : totalAllFees;

  // Call the table component update.
  let calculatedToCurrency = [];
  function numberToCurrencyAndPush(number) {
    let n = numberToCurrency(number);
    calculatedToCurrency.push(n);
  }
  if (useCurrency == true) {
    calculated.fees.forEach(numberToCurrencyAndPush);
    Table(calculatedToCurrency);
  } else {
    Table(calculated.fees);
  }
}

function update() {
  // Updates the UI display based on curveSlider's value.
  curveValue = Number(curveSlider.value);
  curveValueDisplay.innerHTML = curveValue;
  curveInputWarningSpan.textContent = CurveInputWarning(curveValue);
  useCurrency = useCurrencyElement.checked
  trigger();
}

function updateSlider() {
  // Updates curveSlider value based on curveInput's value.
  // And then call the update() fn.
  if (curveInput.value > 2) {
    curveInput.value = 2;
  }
  curveValue = Number(curveInput.value);
  curveSlider.value = curveValue;
  update();
}

function updateInput() {
  // Updates curveInput value based on curveSlider's value.
  // And then call the update() fn.
  curveValue = Number(curveSlider.value);
  curveInput.value = curveValue;
  update();
}

function updateBaseFee() {
  baseFee = Number(baseRateInput.value);
  update();
}

function updateRevisionCount() {
  if (revisionCountInput.value > 255) {
    revisionCountInput.value = 255;
  }
  revisionCount = Number(revisionCountInput.value);
  update();
}

function isNumeric(str) {
  return /^\d+$/.test(str);
}

function numberToCurrency(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}