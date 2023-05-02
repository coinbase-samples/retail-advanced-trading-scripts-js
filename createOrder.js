/**
 * Copyright 2023-present Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { getSignature } from './generateSignature.js';

const { BASE_URL, PRODUCT_ID } = process.env;
const url = `${BASE_URL}/orders`;
const clientOrderId = Math.random().toString();

const body = {
  clientOrderId,
  product_id: PRODUCT_ID,
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
      '/api/v3/brokerage/orders',
      method,
      payload
    );

    const response = await fetch(url, {
      method,
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
