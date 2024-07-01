# chart-IBM
plot a chart for IBM and a 20-day moving average of the Closing price of IBM.

Access to fetch at 'https://query1.finance.yahoo.com/ from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

CORs issues can be resolved by the following way

1.  If you're running your code from a local file (file://), you can avoid CORS issues by serving your files through a local    server. You can use tools like http-server to do this:

**npm install -g http-server
http-server .**

2.  Using a Browser Extension 
 you can use browser extensions that disable CORS, such as the Moesif Origin & CORS Changer for Chrome. However, this is not recommended for production use due to security concerns.

3. Enable CORS on the Server
const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Your routes here

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


