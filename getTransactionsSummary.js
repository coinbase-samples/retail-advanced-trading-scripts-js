import { getSignature } from './generateSignature.js';

const baseURL = process.env.BASE_URL;
const product_type = 'SPOT';
const method = 'GET';
const contentType = 'application/json';
const start_date = '2021-01-01T00:00:00.000Z';
const end_date = '2021-04-01T00:00:00.000Z';
const user_native_currency = 'USD';

const url =
  baseURL +
  '/transaction_summary?start_date=' +
  start_date +
  '&end_date=' +
  end_date +
  '&user_native_currency=' +
  user_native_currency +
  '&product_type=' +
  product_type;

async function getProductCandles() {
  try {
    const signature = await getSignature(
      method,
      '/api/v3/brokerage/transaction_summary',
      ''
    );

    const response = await fetch(url, {
      method: method,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': contentType,
        'CB-ACCESS-KEY': signature.authResponse.API_KEY,
        'CB-ACCESS-TIMESTAMP': signature.authResponse.timestamp,
        'CB-ACCESS-SIGN': signature.authResponse.signature,
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('this is the error', error);
  }
}

getProductCandles();
