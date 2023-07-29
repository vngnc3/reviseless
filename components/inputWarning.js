function CurveInputWarning(value) {
  // Returns empty string for curve value less than threshold.
  // At each threshold level, returns a string to warn curve input value.

  function warningString(level) {
    if (level < 4) {
        return `The revision fee will exceed 10x base fee by the ${warningValueStrings[level]}th revision.`;
    } else {
        return `wow`
    }
  }

  const warningValues = [1.29, 1.33, 1.39, 1.78, 2];
  const warningValueStrings = ["10", "9", "8", "5", "😡"];

  if (value < warningValues[0]) {
    return `\u00A0`;
  }

  // Input value is clamped between 1 and 2.
  // The expected output for an input value of 1.5 is a string `The fee will exceed 10x base fee by the 8th revision.`
  // An exception is made for input value equals to 2. The expected output for this input is just the string 'bro'.

  for (let i = 0; i < warningValues.length; i++) {
    if (value < warningValues[i]) {
      return warningString(i - 1);
    }
  }

  return warningString(warningValueStrings.length - 1);
}
