const buda = require('./buda');
const TIMER = process.env.TIMER;

const funds = [
  {
    divisa: 'BTC',
    value: '0.007194',
    precio: '27799958'
  }
];
const fund = '0.007194';
const precioCompra = 27799958;

exports.getMarketValues = async () => {
  try {
    let marketCodes = await buda.getCodeMarkets();
    marketCodes = marketCodes.filter(
      (x) => x.includes('btc') || x.includes('clp')
    );
    console.log(TIMER);
    setInterval(async () => {
      const result = await buda.getExchange(marketCodes);
      const precioVentaRaw = result.get('BTC-CLP').maxBid;
      const precioVenta =
        typeof Number(precioVentaRaw[0]) === 'number'
          ? Number(precioVentaRaw[0])
          : Number(precioVentaRaw[1]);
      console.log(
        'Precio de venta',
        precioVenta,
        'Precio que compraste',
        precioCompra,
        'Es momento de vender?',
        precioVenta > precioCompra
      );
    }, TIMER);
  } catch (err) {
    console.log(err);
  }
};

function isNumber(n) {
  return Number(n) === n;
}
