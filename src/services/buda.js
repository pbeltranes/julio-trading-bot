const Buda = require('buda-promise');
const publicBuda = new Buda();
const Currency = require('../models/currencies');

//publicBuda.ticker('btc-clp').then(function(result) { console.log(result) });
//publicBuda.order_book('btc-clp').then(function(result) { console.log(result) });
//publicBuda.trades('btc-clp',1528768062310).then(function(result) { console.log(result) });
//publicBuda.markets().then(function(result) { console.log(result) });
//publicBuda.fees('btc', 'deposit').then(function(result) { console.log(result) });
//publicBuda.get_quotation('btc-clp', 'bid_given_earned_base', 0.01).then(function(result) { console.log(result) });

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
const privateBuda = new Buda(api_key, api_secret);

//    commented out for your protection

//privateBuda.me().then(function(result) { console.log(result) });
//privateBuda.balance('clp').then(function(result) { console.log(result) });
//privateBuda.order_pages('btc-clp').then(function(result) { console.log(result) });
//privateBuda.new_order("btc-clp", "bid", "limit", 835875, 0.05).then(function(result) { console.log(result) });
//privateBuda.cancel_order(3262406).then(function(result) { console.log(result) });
//privateBuda.single_order(588).then(function(result) { console.log(result) });
//privateBuda.deposits('clp').then(function(result) { console.log(result) });
//privateBuda.withdrawals('clp').then(function(result) { console.log(result) });
//privateBuda.withdrawal('btc',2.5,'mo366JJaDU5B1hmnPygyjQVMbUKnBC7DsY').then(function(result) { console.log(result) });
//privateBuda.new_fiat_deposit('CLP', 250000).then(function(result) { console.log(result) });
//privateBuda.new_crypto_address('BTC').then(function(result) { console.log(result) });
//privateBuda.get_address('BTC',30216).then(function(result) { console.log(result) });
exports.getExchange = async (currency) => {
  try {
    const exch = await privateBuda.ticker(currency);
    const exchToSave = {
      marketId: exch.ticker.market_id,
      lastPrice: exch.ticker.last_price,
      minAsk: exch.ticker.min_ask,
      maxBid: exch.ticker.max_bid,
      volume: exch.ticker.volume,
      priceVariation24h: exch.ticker.price_variation_24h,
      priceVariation7d: exch.ticker.price_variation_7d
    };

    return Currency.create({ currency: exchToSave });
  } catch (err) {
    console.log(err);
  }
};

exports.getCodeMarkets = async () => {
  try {
    const markets = await publicBuda.markets();
    return markets.markets.map((market) => market.name);
  } catch (err) {
    console.log(err);
  }
};
