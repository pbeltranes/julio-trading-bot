const buda = require('./buda');
const mailing = require('./mailing');
const EventEmitter = require('events');
const TIMER = process.env.TIMER;
let purchasedPrice = 29000000;
let pesos = 0;
let bitcoin = 0;
let ethereum = 0;
let action = 'BUY'; // BUY, SELL
isNotify = false;
const funds = [
  {
    divisa: 'BTC',
    value: '0.007194',
    precio: '27799958'
  }
];
//const getMarketValues = new MyEmitter();

/**
 * @task conectarme con binance
 * @task obtener mis valores de buda
 * @task Armar API de simulación de ordenes compra
 * @task Armar API para obtener mis valores
 * @task Mejorar las acciones de Compra y venta
 * @task Comenzar a hacer estudio y analisis 
 * @task comenzar el desarrollo de un dashboard
 */

exports.getMarketValues = async () => {
  try {
    let marketCodes = await buda.getCodeMarkets();
    marketCodes = marketCodes.filter(
      (x) => x.includes('clp') // x.includes('btc') ||
    );

    console.log(marketCodes);
    setInterval(async () => {
      const result = await buda.getExchange(marketCodes);
      console.log(result);
      const precioVentaRaw = result.get('BTC-CLP').maxBid;
      const precioCompraRaw = result.get('BTC-CLP').minAsk;
      const precioVenta =
        typeof Number(precioVentaRaw[0]) === 'number'
          ? Number(precioVentaRaw[0])
          : Number(precioVentaRaw[1]);
      const precioCompra =
        typeof Number(precioCompraRaw) === 'number'
          ? Number(precioVentaRaw[0])
          : Number(precioVentaRaw[1]);
     
      if (precioCompra <= purchasedPrice && action === 'BUY' && !isNotify) {
        isNotify = !isNotify;
        mailing.buy();
        action = 'SELL';
      }
      if (precioVenta >= purchasedPrice && action === 'SELL' && !isNotify) {
        isNotify = !isNotify;
        mailing.sell();
        action = 'BUY';
      }
    }, TIMER);
  } catch (err) {
    console.log(err);
  }
};

function isNumber(n) {
  return Number(n) === n;
}
