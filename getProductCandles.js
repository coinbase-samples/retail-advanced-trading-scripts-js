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
import { getStartDate, getEndDate } from './utils/dates.js';

const baseURL = process.env.BASE_URL;
const productId = process.env.PRODUCT_ID;
const contentType = 'application/json';
const start = getStartDate(3);
const end = getEndDate(6);
const granularity = 'ONE_HOUR';

const url = `${baseURL}/products/${productId}/candles?start=${start}&end=${end}&granularity=${granularity}`;

async function getProductCandles() {
  try {
    const signature = await getSignature(
      `/api/v3/brokerage/products/${productId}/candles`
    );

    const response = await fetch(url, {
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
