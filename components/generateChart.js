const canvasId = "curveChart";
let xValues = [];
let yValues = [];

Chart.defaults.global.defaultFontFamily = '"Poppins", sans-serif';

// Create the chart once, without any data.
let myChart = new Chart(canvasId, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        fill: true,
        pointRadius: 1,
        borderColor: "#808080",
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: false,
      text: "",
      fontSize: 10,
    },
    aspectRatio: 1.33,
  },
});

function generateChart(value, i1, i2, step = 1) {
  // Accepts value as string
  xValues = [];
  yValues = [];
  for (let x = i1; x <= i2; x += step) {
    yValues.push(eval(value));
    xValues.push(x);
  }
}

function generateChartWithConfig(baseFee, curveValue, revisionCount) {
  const value = `(${baseFee}*(${curveValue}**(x-1)))`;
  generateChart(value, 1, revisionCount, 1);

  // Update the chart's data.
  myChart.data.labels = xValues;
  myChart.data.datasets[0].data = yValues;

  // Update the chart to reflect the new data.
  myChart.update();
}

generateChartWithConfig(150, 1.05, 4);