import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './St.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';



ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function St() {
  const [symbol, setSymbol] = useState('');
  const [stockInfo, setStockInfo] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);
    setStockInfo(null);

    try {
      const response = await fetch(`http://localhost:5000/api/stock/${symbol}`);
      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }
      const data = await response.json();
      const quote = data.quote;
      const history = data.history.quotes; // 修改此處，引用 data.history.quotes

      // 檢查 history 是否為陣列
      if (!Array.isArray(history)) {
        throw new Error('Invalid history data');
      }

      setStockInfo({
        symbol: quote.symbol,
        open: quote.regularMarketOpen,
        high: quote.regularMarketDayHigh,
        low: quote.regularMarketDayLow,
        volume: quote.regularMarketVolume,
      });

      setChartData({
        labels: history.map(day => new Date(day.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Price',
            data: history.map(day => day.close),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          }
        ]
      });

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='st'>
      <div className='st_search'>
        <h1>Stock Search</h1>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol"
          className='st_input'
        />
        <button onClick={handleSearch} className='st_but'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>

      </div>
      
      {error && <div>{error}</div>}
    
      {stockInfo && (
        <div className='st_info'>
          <h2>{stockInfo.symbol} </h2>
          <div className='st_op st_price'>
            <p>Open: {stockInfo.open}</p>
          </div>
          <div className='st_hi st_price'>
            <p>High: {stockInfo.high}</p>
          </div>
          <div className='st_lo st_price'>
            <p>Low: {stockInfo.low}</p>
          </div>
          <div className='st_vo st_price'>
            <p>Volume: {stockInfo.volume}</p>
          </div>
          
        </div>
      )}

      {chartData && (
        <div className='st_ch'>
          <h2>Price Change (Last 5 Days)</h2>
          <Line data={chartData}  className='st_line'/>
        </div>
      )}
    </div>
  );
}

export default St;
