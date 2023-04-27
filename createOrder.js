import { getSignature } from './generateSignature.js';

const baseURL = process.env.BASE_URL;
const url = `${baseURL}/orders`;
const client_order_id = Math.random().toString();

const body = {
  client_order_id,
  product_id: 'DOGE-USD',
  side: 'BUY',
  order_configuration: {
    market_market_ioc: {
      quote_size: '1',
    },
  },
};

let payload = JSON.stringify(body);
const method = 'POST';
const contentType = 'application/json';
async function CreateOrder() {
  try {
    const signature = await getSignature(
      method,
      '/api/v3/brokerage/orders',
      payload
    );

    const response = await fetch(url, {
      method: method,
      mode: 'cors',
      body: payload,
      headers: {
        Accept: contentType,
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

CreateOrder();
