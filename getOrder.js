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

const baseURL = process.env.BASE_URL;
const orderId = process.env.ORDER_ID;

const url = `${baseURL}/orders/historical/${orderId}`;

async function getOrder() {
  try {
    const headers = await getSignature(
      `/api/v3/brokerage/orders/historical/${orderId}`
    );

    const response = await fetch(url, {
      mode: 'cors',
      headers,
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('this is the error', error);
  }
}

getOrder();
