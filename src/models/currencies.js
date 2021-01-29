const mongoose = require('mongoose');

const { Schema } = mongoose;

const currencySchema = new Schema(
  {
    marketId: {
      type: String,
      required: true,
      default: null
    },
    lastPrice: [String],
    minAsk: [String],
    maxBid: [String],
    volume: [String],
    priceVariation24h: {
      type: String,
      required: false
    },
    priceVariation7d: {
      type: String,
      required: false
    },
    created: { type: Date, default: Date.now }
  },
  {
    minimize: false
  }
);

// Export model
module.exports = mongoose.model('currency', currencySchema);
