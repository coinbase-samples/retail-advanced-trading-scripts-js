import { getSignature } from './utils/generateSignature.js';

const baseURL = process.env.BASE_URL;
const url = baseURL + '/orders/';

const body = {
  client_order_id: '12122',
  product_id: 'BTC-USD',
  side: 'BUY',
  order_configuration: {
    market_market_ioc: {
      quote_size: '1',
    },
  },
};

let payload = JSON.stringify(body);

async function CreateOrder() {
  try {
    const signature = await getSignature(
      'POST',
      '/api/v3/brokerage/orders/',
      payload
    );

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: payload,
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

CreateOrder();
