const buda = require('./buda');
const TIMER = process.env.TIMER;

exports.getMarketValues = async () => {
  const marketsCodes = await buda.getCodeMarkets();
  console.log(TIMER);
    setInterval(async () => {
        const actualValues = await Promise.all(
          marketsCodes.map(async (marketCode) => {
            return buda.getExchange(marketCode);
          })
        );
      console.log(actualValues);
    }, TIMER);
};
