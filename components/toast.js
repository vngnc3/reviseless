// Create a toast element, mount it on the DOM, can be dismissed, will disappear after X seconds.
// If another toast is still mounted, put the new one under it.
// toastContainer element must be passed as an argument to the function.
// Use a custom CSS to set the styling. toastStyle.css is available in /styles/

function showToast(message, color, container, timeout) {
    console.log('showToast triggered.');
  // Create the toast element.
  const toast = document.createElement("div");

  // Apply styles to the toast element.
  toast.classList.add("toast");
  toast.style.backgroundColor = color;

  // Set the animation duration to match the timeout
  // Convert timeout from milliseconds to seconds for the CSS
  toast.style.animationDuration = `${timeout / 1000}s`;

  // Set the inner HTML to the message.
  toast.textContent = message;

  // Add the toast to the container.
  container.appendChild(toast);

  // Make the toast disappear after X seconds.
  setTimeout(function () {
    toast.remove();
  }, timeout);

  // Make the toast disappear when clicked.
  toast.addEventListener("click", function () {
    toast.remove();
  });
}

// Example usage:
// const container = document.querySelector("#toastContainer");
// showToast("This is a toast message!", container);