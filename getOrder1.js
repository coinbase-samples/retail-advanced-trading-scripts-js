import { getSignature } from './generateSignature.js';

const baseURL = process.env.BASE_URL;
const order_id = process.env.ORDER_ID;
const method = 'GET';
const contentType = 'application/json';

const url = `${baseURL}/orders/historical/${order_id}`;

async function getOrder() {
  try {
    const signature = await getSignature(
      method,
      `/api/v3/brokerage/orders/historical/${order_id}`,
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

getOrder();
