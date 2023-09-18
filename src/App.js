import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const apiKey = '9c358b11fbb54e0abf5d4abe47b87b23';
        const response = await fetch(`https://api.currencyfreaks.com/latest?apikey=${apiKey}`);
        const data = await response.json();

        // Filter desired currencies
        const currenciesList = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];
        const currencyRates = Object.entries(data.rates)
          .filter(([currency]) => currenciesList.includes(currency))
          .sort((a, b) => currenciesList.indexOf(a[0]) - currenciesList.indexOf(b[0]))
          .map(([currency, rate]) => ({
            currency,
            exchangeRate: parseFloat(rate),
            weBuy: parseFloat(rate) * 1.05,
            weSell: parseFloat(rate) * 0.95,
          }));

        setCurrency(currencyRates);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    fetchCurrency();
  }, []);

  return (
    <div className="App">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {currency.map((currency) => (
              <tr key={currency.currency}>
                <td>{currency.currency}</td>
                <td>{currency.weBuy.toFixed(4)}</td>
                <td>{currency.exchangeRate.toFixed(4)}</td>
                <td>{currency.weSell.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='desc'>
        <p>Rates are based from 1 USD</p>
        <p>This application uses API from https://currencyfreaks.com</p>
      </div>
    </div>
  );
}

export default App;
