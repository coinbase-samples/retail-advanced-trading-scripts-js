import { getSignature } from './utils/generateSignature.js';
import fetch from 'node-fetch';

const baseURL = process.env.BASE_URL;
const url = baseURL + `/orders/historical/fills?limit=11`;

async function listFills() {
  try {
    const signature = await getSignature(
      'GET',
      '/api/v3/brokerage/orders/historical/fills',
      ''
    );

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

listFills();
