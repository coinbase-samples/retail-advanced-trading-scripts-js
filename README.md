# Retail Advanced Trading Scripts

# Purpose

This repository demonstrates the [Coinbase Retail Advanced Trading REST APIs](https://docs.cloud.coinbase.com/advanced-trade-api/docs/welcome)

## Install

Clone the repo and run the scripts from the command line

```bash
git clone https://github.com/coinbase-samples/retail-advanced-trading-scripts-js.git
```

## Run

### Configure credentials
Add and configure .env file like below:

```bash
export API_KEY={{Your API key}}
export API_SECRET={{your API secret}}
export BASE_URL=https://api.coinbase.com/api/v3/brokerage
export ACCOUNT_UUID={{Your Account UUID}}
export ORDER_ID={{any valid order Id}}
export PRODUCT_ID=BTC-USD
```

```
source .env
```

### Execute

Execute an API call (make sure to use Node 18+ i.e., nvm use 18.14.0 or nvm use 18)

```bash
node listAccounts.js
```
