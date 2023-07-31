// Generate table based on calculated data.
// Use tableDataAsCsvString defined in ui.js to store data.
// New line is defined by \n character.

const alternateRowClassName = 'tableRowAlternate';

function addRow(revision, fee, alternate) {
  // Create a new row
  let row = document.createElement("div");
  row.className = "tableRow";
  if (alternate == true) {
    row.classList.add(alternateRowClassName)
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

  // Add the row to CSV string
  addLineToCsvString(revision, fee);

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

  clearCsvString();
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