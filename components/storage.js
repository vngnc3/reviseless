// storage.js
// Handles HTML5 storage for preferences.

let storageSupport = true;

if (typeof Storage !== "undefined") {
  // Code for localStorage/sessionStorage.
  storageSupport = true;
  console.log("✅ reviseless/storage.js: HTML5 Storage OK.");
} else {
  storageSupport = false;
  console.log("❌ reviseless/storage.js: HTML5 Storage not supported.");
}

function storeData(key, value) {
    // Both key and value must be provided. Only strings are accepted.
    // Returns nothing.
    if (storageSupport == true) {
        localStorage.setItem(key, value);
    } else {
        console.error(`⚠️ reviseless/storage.js: HTML5 Storage not supported. Unable to store ${key}.`);
    }
}

function retrieveData(key, fallbackValue) {
    // Provide fallbackValue in case of non-existent data.
    // Returns stored value if found. Otherwise return the fallbackValue.
    if (storageSupport == true) {
        if (localStorage.getItem(key) !== null) {
            return localStorage.getItem(key);
        } else {
            return fallbackValue;
        }
    } else {
        console.error(`⚠️ reviseless/storage.js: HTML5 Storage not supported. Unable to retrieve ${key}.`);
        return null;
    }
}