import { getSignature } from './utils/generateSignature.js';
import fetch from 'node-fetch';

const baseURL = process.env.BASE_URL;
const order_id = process.env.ORDER_ID;
console.log(order_id);
const url = baseURL + `/orders/historical/${order_id}`;

async function OrderById() {
  try {
    const signature = await getSignature(
      'GET',
      `/api/v3/brokerage/orders/historical/${order_id}`,
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

OrderById();
