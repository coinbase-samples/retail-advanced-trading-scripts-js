import { getSignature } from './generateSignature.js';

const baseURL = process.env.BASE_URL;
const product_id = process.env.PRODUCT_ID;

console.log(product_id);
const url = `${baseURL}/products/${product_id}`;

async function getProductById() {
  try {
    const signature = await getSignature(
      'GET',
      `/api/v3/brokerage/products/${product_id}`,
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

getProductById();
