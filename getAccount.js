import { getSignature } from './generateSignature.js';

const baseURL = process.env.BASE_URL;
const account_uuid = process.env.ACCOUNT_UUID;
const url = `${baseURL}/accounts/${account_uuid}`;
const method = 'GET';
const contentType = 'application/json';

async function listAccounts() {
  try {
    const signature = await getSignature(
      method,
      `/api/v3/brokerage/accounts/${account_uuid}`,
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

listAccounts();
