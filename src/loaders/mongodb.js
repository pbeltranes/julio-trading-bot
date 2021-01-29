const mongoose = require('mongoose');

exports.init = () => {
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  mongoose.set('useCreateIndex', true);
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};
