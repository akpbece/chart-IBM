
// Function to calculate the 20-day moving average
function calculateMovingAverage(data, days) {
    let movingAverage = [];
    for (let i = 0; i < data.length; i++) {
        if (i >= days - 1) {
            const sum = data.slice(i - days + 1, i + 1).reduce((acc, val) => acc + val.close, 0);
            movingAverage.push(sum / days);
        } else {
            movingAverage.push(null);
        }
    }
    return movingAverage;
}


// Function to get the closest data point to the mouse
function getClosestDataPoint(x, stockData) {
    const dataLength = stockData.length;
    const index = Math.round((x - 50) * dataLength / (canvas.width - 100));
    return stockData[Math.min(dataLength - 1, Math.max(0, index))];
}

// Function to show tooltip
function showTooltip(event, text) {
    tooltip.innerHTML = text;
    tooltip.style.left = event.clientX + 'px';
    tooltip.style.top = event.clientY + 'px';
    tooltip.style.display = 'block';
}
