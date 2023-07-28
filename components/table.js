// Generate table based on calculated data.

// Get the table container
const tableContainer = document.querySelector("#tableContainer");

function addRow(revision, fee) {
  // Create a new row
  let row = document.createElement("div");
  row.className = "tableRow";

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
  return addRow("Revision #", "Fee");
}

function Table(data) {
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
    appendToContainer(addRow(index+1, value))
  };

  data.forEach(addRowAndAppend);

}