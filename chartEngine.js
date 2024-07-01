function renderChartEngine(stockData, movingAverage) {
    const maxClose = Math.max(...stockData.map(d => d.close), ...movingAverage.filter(val => val !== null));
    const minClose = Math.min(...stockData.map(d => d.close), ...movingAverage.filter(val => val !== null));
    
    const chartHeight = canvas.height;
    const chartWidth = canvas.width;
    const padding = 50;
    const dataLength = stockData.length;

    // This calculates the width of each segment on the x-axis by dividing the available width (excluding padding) by the number of data points.
    const xScale = (index) => (chartWidth - padding * 2) / dataLength * index + padding;
    const yScale = (value) => chartHeight - padding - ((value - minClose) / (maxClose - minClose) * (chartHeight - padding * 2));


    ctx.clearRect(0, 0, chartWidth, chartHeight);

    // Draw horizontal and vertical lines
    ctx.beginPath();
    ctx.moveTo(padding, chartHeight - padding);
    ctx.lineTo(chartWidth - padding, chartHeight - padding);
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, chartHeight - padding);
    ctx.strokeStyle = '#ccc';
    ctx.stroke();


    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText('Date', chartWidth / 2 + 20, chartHeight - 20); 


    ctx.save();
    ctx.translate(10, chartHeight / 2); 
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText('Price', 0, 0);
    ctx.restore();


    ctx.beginPath();
    ctx.moveTo(xScale(0), yScale(stockData[0].close));
    stockData.forEach((d, i) => ctx.lineTo(xScale(i), yScale(d.close)));
    ctx.strokeStyle = '#007bff'; // Blue color for stock data
    ctx.stroke();

    // Draw moving average line
    ctx.beginPath();
    const validMovingAverage = movingAverage.filter(val => val !== null);
    ctx.moveTo(xScale(0), yScale(validMovingAverage[0]));
    validMovingAverage.forEach((avg, i) => {
        ctx.lineTo(xScale(i), yScale(avg));
    });
    ctx.strokeStyle = '#dc3545';
    ctx.stroke();

    // Draw x-axis labels (dates)
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const step = Math.max(1, Math.floor(dataLength / 10)); 
    for (let i = 0; i < dataLength; i += step) {
        const date = stockData[i].date;
        ctx.fillText(date, xScale(i), chartHeight - padding + 10);
    }

    // Draw y-axis labels (closing prices)
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    const priceStep = (maxClose - minClose) / 5; 
    for (let i = 0; i <= 5; i++) {
        const price = minClose + i * priceStep;
        ctx.fillText(price.toFixed(2), padding - 10, yScale(price));
    }
}