function calculate(a, baseFee, count, ceilRounding) {
  // Calculate input parameters,
  // then return the array of fees, and the total fees as an object.

  // f(x) = a^x; where x is the revision nonce.

  let output = {
    fees: [],
    total: 0,
  };

  function updateOutput(fees, total) {
    output.fees = fees;
    output.total = total;
  }

  function getCurvedRateFor(x) {
    // Find Y in the curve.
    let manhourRate = baseFee;
    let curveSlope = a;

    // ceilRounding defaults to true if left empty.
    if (ceilRounding == null) {
      ceilRounding = true;
    }

    // floor rounding is used when ceil is set to false.
    if (ceilRounding == true) {
      return Math.round(curveSlope ** (x - 1) * manhourRate);
    } else {
      return curveSlope ** (x - 1) * manhourRate;
    }
  }

  function getTotalRate(from, n) {
    // Sum and reduce the amount of curved rate
    // for n amount of revisions.

    let i;
    let array = [];

    for (i = from; i < from + n; i++) {
      let rate = getCurvedRateFor(i);
      array.push(rate);
    }

    let sum = array.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    updateOutput(array, sum); // Update output object values.
    return sum;
  }

  const totalResult = getTotalRate(1, count); // returns sum of all fees.
  return output; // return output object.
}