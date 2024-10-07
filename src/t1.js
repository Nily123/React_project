import { createRequire } from 'module'; // 用來支援 require
const require = createRequire(import.meta.url);
const yahooFinance = require('yahoo-finance2').default;
const express = require('express');
const cors = require('cors'); // 引入 cors
const app = express();
app.use(cors()); 
// import syntax (recommended)
app.get('/api/stock/AAPL', async (req, res) => {

  try {
    const query = 'AAPL';
    const queryOptions = { period1: '2024-10-01', /* ... */ };
    const res0 = await yahooFinance.chart(query, queryOptions);
    
    res.json(res0);
    console.log(res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});


app.listen(3000, () => console.log('Server running on port 3000'));