const curveValueDisplay = document.querySelector("#curveValue");
const curveSlider = document.querySelector("#curveSlider");
const curveInput = document.querySelector("#curveInput");
const baseRateInput = document.querySelector("#baseRateInput");
const revisionCountInput = document.querySelector("#revisionCountInput");
const output = document.querySelector("#outputTotal");

// Import the curve by html script tag.
// Uses exponential.js by default.

let curveValue = 1.05;
let baseFee = 150;
let revisionCount = 4;

function trigger() {
  // calculate() function from exponential.js returns an object.
  // calculated.fees is an array of fees with arbitrary length set by the user.
  // calculated.total is the sum of all fees.

  let calculated = calculate(curveValue, baseFee, revisionCount, true);
  let previousValue = Number(output.innerHTML);
  let totalAllFees = calculated.total;
  animateValue(output, previousValue, totalAllFees, 500);

  // Call the table component update.
  Table(calculated.fees);
}

function update() {
  // Updates the UI display based on curveSlider's value.
  curveValue = Number(curveSlider.value);
  curveValueDisplay.innerHTML = curveValue;
  trigger();
}

function updateSlider() {
  // Updates curveSlider value based on curveInput's value.
  // And then call the update() fn.
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
  revisionCount = Number(revisionCountInput.value);
  update();
}

function isNumeric(str) {
  return /^\d+$/.test(str);
}

function animateValue(target, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    target.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
