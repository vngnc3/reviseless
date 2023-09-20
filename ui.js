// reviseless/ui.js

// Dependencies:
// 1. calculate() function from exponential.js: This function performs the main calculation for our app.
//    It takes four parameters: curveValue, baseFee, revisionCount, and a boolean. It returns an object
//    with a 'fees' array and a 'total' sum of all fees.
// 2. Table() function from table.js: This function updates a table component on the webpage.
//    It takes an array of fees and doesn't return anything.
// 3. CurveInputWarning() function from warnings.js: This function generates a warning message
//    based on the curveValue. It takes the curveValue as a parameter and returns a string message.
// 4. showToast() function from toast.js to show notification toasts. Accepts message, color, container, and timeout as arguments.
//    Returns nothing and append generated toast element to the container div.
// 5. applyShakeAnimation() function fromn shake.js to apply shake animation on a selected element.
//    Accepts HTML element and duration in ms as arguments.
// 6. storeData() and retrieveData() functions from storage.js to store and retrieve data from localStorage.
//    storage.js handles HTML5 storage support (or lack thereof).
// 7. downloadCsv() function from downloadCsv.js to download the table data as CSV file.
// 8. generateChartWithConfig() function from generateChart.js to generate chart in a prepared canvas.
//    generateChart.js requires Chart.js included in /lib/ directory.

// Define all input & output elements.
const curveValueDisplay = document.querySelector("#curveValue");
const curveSlider = document.querySelector("#curveSlider");
const curveInput = document.querySelector("#curveInput");
const curveInputWarningSpan = document.querySelector("#curveInputWarningSpan");
const baseRateInput = document.querySelector("#baseRateInput");
const currencySelector = document.querySelector("#currency-select");
const roundingCheckbox = document.querySelector("#enableRounding");
const revisionCountInput = document.querySelector("#revisionCountInput");
const output = document.querySelector("#outputTotal");
const amountDifference = document.querySelector("#amountDifference");
const percentDifference = document.querySelector("#percentDifference");

// Define Table() elements to be passed down to table.js
const tableContainerElement = document.querySelector("#tableContainer");

// Define toastContainer element to be passed down to toast.js
const toastContainer = document.querySelector("#toastContainer");

// Initialize consts.
const maxCurveInput = 2;
const maxRevisionInput = 128;
const supportedRegions = [
  { region: "id-ID", currency: "IDR" },
  { region: "en-US", currency: "USD" },
  { region: "de-DE", currency: "EUR" },
  { region: "ja-JP", currency: "JPY" },
  { region: "zh-CN", currency: "CNY" },
  { region: "en-GB", currency: "GBP" },
  { region: "en-GB", currency: "SGD" },
  { region: "en-AU", currency: "AUD" },
];

// Initialize variables.
let curveValue = 1.05;
let baseFee = 150;
let revisionCount = 10;
let selectedCurrency = retrieveData("selectedCurrency", "");
let darkModeState = Number(retrieveData("darkModeState", 0));
let enableRoundingInt = 1;
let enableRounding = true;
let tableDataAsCsvString = "";

// Trigger calculation and update the DOM.
// Uses update() -> trigger() processing pattern.
function trigger() {

  // calculate() function from exponential.js returns an object.
  // calculated.fees is an array of fees with arbitrary length set by the user.
  // calculated.total is the sum of all fees.
  let calculated = calculate(
    curveValue,
    baseFee,
    revisionCount,
    enableRounding
  );

  let linearCalculated = calculate(
    1, baseFee, revisionCount, enableRounding
  );

  let totalAllFees = Number(calculated.total);
  let totalLinearFees = Number(linearCalculated.total);
  let totalFeeDifference = totalAllFees - totalLinearFees;
  let totalPctDifference = totalFeeDifference/totalLinearFees;
  let roundedPctDifference = `${Math.round((totalPctDifference + Number.EPSILON) * 100) / 100}%`

  const useCurrency = selectedCurrency != ""; // Returns true if currency is selected.
  output.textContent = useCurrency ? numberToCurrency(totalAllFees) : totalAllFees;
  amountDifference.textContent = useCurrency ? numberToCurrency(totalFeeDifference) : totalFeeDifference;
  percentDifference.textContent = roundedPctDifference;

  // Call the table component update.
  let calculatedToCurrency = [];
  function numberToCurrencyAndPush(number) {
    let n = numberToCurrency(number);
    calculatedToCurrency.push(n);
  }
  if (useCurrency == true) {
    calculated.fees.forEach(numberToCurrencyAndPush);
    Table(calculatedToCurrency, tableContainerElement);
  } else {
    Table(calculated.fees, tableContainerElement);
  }

  // Append the total fees into CSV string.
  addLineToCsvString("Total revision fee", output.textContent);
}

function update() {
  // Updates the UI display based on curveSlider's value.
  // Updates the chart through generateChartWithConfig() function.
  curveValue = Number(curveSlider.value);
  curveValueDisplay.innerHTML = curveValue;
  curveInputWarningSpan.textContent = CurveInputWarning(curveValue);
  generateChartWithConfig(baseFee, curveValue, revisionCount);
  trigger();
}

// Update the corresponding input controls based on other inputs.
// updateSlider, updateInput, updateBaseFee, updateRevisionCount.
function updateSlider() {
  // Updates curveSlider value based on curveInput's value.
  // And then call the update() fn.
  if (isNumericDotComma(curveInput.value) == false) {
    showToast(
      "⚠️ Curve rate must be a valid number.",
      "#da373c",
      toastContainer,
      8000
    );
    applyShakeAnimation(document.querySelector("#curveFormContainer"), 5000);
    return null;
  } else {
    if (curveInput.value > maxCurveInput) {
      curveInput.value = maxCurveInput;
    }
    curveValue = Number(curveInput.value);
    curveSlider.value = curveValue;
    update();
  }
}

function updateInput() {
  // Updates curveInput value based on curveSlider's value.
  // And then call the update() fn.
  // curveSlider value will always be a number,
  // Since it's inputted from HTML range input.

  curveValue = Number(curveSlider.value);
  curveInput.value = curveValue;
  update();
}

function updateBaseFee() {
  if (isNumeric(baseRateInput.value) == false) {
    showToast(
      "⚠️ Base revision rate must be a number.",
      "#da373c",
      toastContainer,
      8000
    );
    applyShakeAnimation(document.querySelector("#baseFeeFormContainer"), 5000);
    return null;
  } else {
    baseFee = Number(baseRateInput.value);
    update();
  }
}

function updateRevisionCount() {
  if (isNumeric(revisionCountInput.value) == false) {
    showToast(
      "⚠️ Number of revisions must be a number.",
      "#da373c",
      toastContainer,
      8000
    );
    applyShakeAnimation(
      document.querySelector("#revisionCountFormContainer"),
      5000
    );
    return null;
  } else {
    if (revisionCountInput.value > maxRevisionInput) {
      revisionCountInput.value = maxRevisionInput;
    }
    revisionCount = Number(revisionCountInput.value);
    update();
  }
}

// Check functions. isNumeric, isNumericDotComma
// Use with number-sensitive values.
function isNumeric(str) {
  return /^\d+$/.test(str);
}

function isNumericDotComma(str) {
  return /^[\d.,]+$/.test(str);
}

// Currency-related functions.
// Finding region, converting number to currency formatted string.
function findRegionByCurrency(currency) {
  // Use the find method to find the first object where the currency matches the input.
  const region = supportedRegions.find(
    (region) => region.currency === currency
  );

  // Return the found region, or null if no match was found.
  return region || null;
}

function numberToCurrency(number) {
  // @todo: create a new variable/function outside of this function to set the region and currency.
  // such variable can be changed by a dropdown input in the page.
  return new Intl.NumberFormat(findRegionByCurrency(selectedCurrency).region, {
    style: "currency",
    currency: findRegionByCurrency(selectedCurrency).currency,
  }).format(number);
}

function setCurrencyTo(currencyString) {
  currencySelector.value = currencyString;
  selectedCurrency = currencySelector.value;
}

function updateCurrency() {
  selectedCurrency = currencySelector.value;
  storeData("selectedCurrency", selectedCurrency);
  update();
}

function updateRoundingMode() {
  // Simple boolean switch. Value set to true by default.
  enableRoundingInt = 1 - enableRoundingInt;
  if (enableRoundingInt === 1) {
    enableRounding = true;
  } else {
    enableRounding = false;
  }
  update();
}

// Dark mode settings.
// Setting it, getting value from storage, etc.
function setDarkMode() {
  const switchIcon = document.querySelector(".darkSwitch");
  const headerImage = document.querySelector(".headerImage");
  if (darkModeState === 1) {
    headerImage.classList.add("headerImageDark");
    document.querySelector("body").classList.add("dark-mode");
    switchIcon.classList.add("darkSwitched");
    setTimeout(() => {
      switchIcon.textContent = 'dark_mode';
    }, 500)
  } else {
    document.querySelector("body").classList.remove("dark-mode");
    headerImage.classList.remove("headerImageDark");
    switchIcon.classList.remove("darkSwitched");
    setTimeout(() => {
      switchIcon.textContent = 'light_mode';
    }, 500)
  }
}

function toggleDarkMode() {
  darkModeState = 1 - darkModeState;
  storeData("darkModeState", darkModeState);
  setDarkMode();
  darkModeState = Number(retrieveData("darkModeState", 0));
}

// CSV-related functions.
// Downloading, storing to string variable, clearing, etc.
function downloadTable() {
  const date = new Date();
  let region = "en-US";
  if (selectedCurrency !== "") {
    region = findRegionByCurrency(selectedCurrency).region;
  }
  const filename = `reviseless-${date.toLocaleDateString(
    region
  )}-${date.toLocaleTimeString(region)}.csv`;
  downloadCSV(tableDataAsCsvString, filename);
}

function addLineToCsvString(index, data) {
  // Encapsulate the data in double quotes to handle possible commas.
  let escapedData = `"${data}"`;

  tableDataAsCsvString += `${index},${escapedData}\n`;
}

function clearCsvString() {
  tableDataAsCsvString = "";
}

// Show-hide formula toggle.
function toggleFormula(element) {
  const formula = element.nextElementSibling;
  formula.classList.toggle('hiddenFormula');
  element.textContent = formula.classList.contains('hiddenFormula') ? 'Show function' : 'Hide function';
}

// Initialization functions.
// Runs when document loaded.
setDarkMode();
setCurrencyTo(retrieveData("selectedCurrency", ""));
// update();