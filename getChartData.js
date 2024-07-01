const baseURL = 'https://query1.finance.yahoo.com';
// Function to fetch IBM stock data
async function fetchStockData() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    try {
        // To Generate the date and timestamp https://www.epochconverter.com/
        const response = await fetch(`${baseURL}/v7/finance/download/IBM?period1=1672531200&period2=1704067200&interval=1d&events=history&includeAdjustedClose=true`);
        const data = await response.text();
        return data.split('\n').slice(1).map(row => row.split(',')).map(cols => ({
            date: cols[0],
            close: parseFloat(cols[4])
        })).filter(stock => !isNaN(stock.close));
    } catch (error) {
        console.error('Failed to fetch stock data:', error);
        return []; 
    } finally {
        loader.style.display = 'none';
    }
}
