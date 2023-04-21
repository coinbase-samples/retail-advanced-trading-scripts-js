import { getSignature } from './generateSignature.js';

const baseURL = process.env.BASE_URL;
const product_id = process.env.PRODUCT_ID;
const method = method;
const contentType = 'application/json';

console.log(product_id);
const url = `${baseURL}/products/${product_id}/ticker`;

async function getMarketTrades() {
  try {
    const signature = await getSignature(
      method,
      `/api/v3/brokerage/products/${product_id}/ticker`,
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

getMarketTrades();
