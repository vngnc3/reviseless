// Accepts string to be parsed as CSV.
// Generates blob and downlaod through URL.

function downloadCSV(csvData, filename) {
  // Create a Blob from the CSV data.
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

  // Create a URL for the Blob.
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element.
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  // Temporarily add the anchor to the document so we can trigger a click on it.
  document.body.appendChild(link);

  // Trigger a click on the anchor to start the download.
  link.click();

  // Clean up: remove the temporary anchor and revoke the Blob URL.
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Usage:
// downloadCSV("column1,column2\nvalue1,value2\n", "mydata.csv");
