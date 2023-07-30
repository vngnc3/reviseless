// Generate table based on calculated data.
const alternateBgColor = "#f0f0f0";
function addRow(revision, fee, alternate) {
  // Create a new row
  let row = document.createElement("div");
  row.className = "tableRow";
  if (alternate == true) {
    row.style.backgroundColor = alternateBgColor;
  }

  // Create the revision cell
  let revisionCell = document.createElement("div");
  revisionCell.className = "tableItem";
  revisionCell.textContent = revision;

  // Create the fee cell
  let feeCell = document.createElement("div");
  feeCell.className = "tableItem";
  feeCell.textContent = fee;

  // Append the cells to the row
  row.appendChild(revisionCell);
  row.appendChild(feeCell);

  return row;
}

function initializeTable() {
  return addRow("Revision #", "Fee", false);
}

function Table(data, tableContainer) {
  // Accepts an array of fees as data.
  // addRow() for every piece of data in the array.
  // Use the index+1 and the actual fees.
  // Returns HTML code to visualize data as HTML flex divs.

  tableContainer.textContent = "";
  tableContainer.appendChild(initializeTable());

  function appendToContainer(rowElement){
    tableContainer.appendChild(rowElement);
  };

  function addRowAndAppend(value, index) {
    appendToContainer(addRow(index+1, value, index % 2 == 0))
  };

  data.forEach(addRowAndAppend);

}