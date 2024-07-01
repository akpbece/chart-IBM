const canvas = document.getElementById('stockChart');
const ctx = canvas.getContext('2d');
const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');
document.body.appendChild(tooltip);
let stockData = [];
let movingAverage = [];

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;

    const dataPoint = getClosestDataPoint(mouseX, stockData, (index) => (canvas.width - 100) / stockData.length * index + 50);
    const avgPoint = movingAverage[stockData.indexOf(dataPoint)];
   
    if (dataPoint) {
        const text = `Date: ${dataPoint.date}, Close: ${dataPoint.close.toFixed(2)}`;
        showTooltip(event, text);
    }

    if (avgPoint) {
        const text = `Date: ${dataPoint.date}, 20-Day Avg: ${avgPoint.toFixed(2)}`;
        showTooltip(event, text);
    }
});


canvas.addEventListener('mouseout', () => {
    tooltip.style.display = 'none';
});

   // Event listener for dropdown change
   const select = document.getElementById('movingAverageSelect');
   select.addEventListener('change', async () => {
       selectedPeriod = parseInt(select.value, 10);
       movingAverage = calculateMovingAverage(stockData, selectedPeriod);
       renderChartEngine(stockData, movingAverage);
   });



// Main function to fetch data and draw the chart
(async function() {
    stockData = await fetchStockData();
    movingAverage = calculateMovingAverage(stockData, 20);
    renderChartEngine(stockData, movingAverage);
})();
