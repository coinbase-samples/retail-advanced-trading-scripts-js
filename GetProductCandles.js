import { getSignature } from './generateSignature.js';

const baseURL = process.env.BASE_URL;
const product_id = process.env.PRODUCT_ID;
const method = 'GET';
const contentType = 'application/json';
const start = '1609459200';
const end = '1609545600';
const granularity = 'FIVE_MINUTE';

const url = `${baseURL}/products/${product_id}/candles?start=${start}&end=${end}&granularity=${granularity}`;

async function getProductCandles() {
  try {
    const signature = await getSignature(
      method,
      `/api/v3/brokerage/products/${product_id}/candles`,
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
