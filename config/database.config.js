const mongoose = require('mongoose');

mongoose.connect(
  // "mongodb://localhost:27017/loansetu-database",
  "mongodb+srv://loansetudb:SqHPmAnEsLc7gics@cluster0.jtuysp5.mongodb.net/loansetu",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
});