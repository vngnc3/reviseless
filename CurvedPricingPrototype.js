// All rates are in thousand rupiah.
const manhourRate = 150;
const curveSlope = 1.05;
// f(x) = a^x; where curveSlope is a.

function getCurvedRateFor(x) {
    // Find Y in the curve.
    return Math.ceil((curveSlope**(x-1))*manhourRate);
}

function getTotalRate(from, n) {
    // Sum the amount of curved rate;
    const array = [];
    let i;

    for (i=from; i < from+n; i++) {
        let rate = getCurvedRateFor(i);
        array.push(rate);
    }

    let sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum;
}

function formatRupiah(x) {
    const thousand = x*1000;
    const numberWithComma = thousand.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const rp = `Rp ` + numberWithComma;
    return rp;
}

const priceTotal = (formatRupiah(getTotalRate(1, 4)));
console.log(priceTotal)