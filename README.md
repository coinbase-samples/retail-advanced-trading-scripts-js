# Retail-Advanced-Trading-scripts-js

# Purpose

This repository demonstrates REST APIs supported by Coinbase Retail Advanced Trading.

API Home here: [https://docs.cloud.coinbase.com/advanced-trade-api/docs/welcome](https://docs.cloud.coinbase.com/advanced-trade-api/docs/welcome)

## Installation

Simply clone the repo to run scripts from your command line. 

```bash
git clone https://github.com/coinbase-samples/retail-advanced-trading-scripts-js.git
```

Executing a call:

### Step 1
Configure env

```bash
API_KEY={{Your API key}}
API_SECRET={{your API secret}} 
BASE_URL=https://api.coinbase.com/api/v3/brokerage
ACCOUNT_UUID={{Your Account UUID}}
ORDER_ID={{any valid order Id}}
PRODUCT_ID=BTC-USD
```

### Step 2

execute an API call (make sure to use Node 18+ i.e., nvm use 18.14.0 or nvm use 18)

```bash
node listAccounts.js
```

## Contributing
Pull requests are welcome. For major changes, please open an issue to discuss what you would like to change.
