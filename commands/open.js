const axios = require('axios');
const moment = require('moment');
const apiUrl = process.env.API_BASE_URL;

module.exports = {
  name: '$open',
  description: 'Open a new trade record for yourself',
  execute: async (msg, args) => {
    console.log(msg.author);
    console.log(args);
    // ticker, positionType, strikePrice, expiration, startingPrice, traderId
    if (args.length !== 5) {
      msg.reply(`you're missing something. Try again.`);
      msg.reply(`example: $open CRWD CALL 999.99 12/25/2020 599.00`);
      return;
    }

    try {
      const payload = {
        ticker: args[0],
        positionType: args[1].toUpperCase(),
        strikePrice: args[2],
        expiration: args[3],
        contractPriceAtOpen: args[4],
        traderId: msg.author.id
      };
      console.log(payload);
      let result = await axios.post(`${apiUrl}trade`, payload);
      console.log(result);
      msg.reply('successfully opened a trade');
    } catch (err) {
      console.log('Error in executing command $open');
      console.log(err);
      msg.reply('there was an error trying to execute that command!');
    }
  }
};