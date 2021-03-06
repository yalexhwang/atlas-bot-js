const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const moment = require('moment');
const apiUrl = process.env.API_BASE_URL;

module.exports = {
  name: '$open',
  description: 'Open a new trade',
  execute: async (msg, args) => {
    // ticker, positionType, strikePrice, expiration, startingPrice, traderId
    if (args.length !== 5) {
      msg.reply(`try again (example: $open CRWD CALL 999.99 12/25/2020 599.00)`);
      return;
    }
  
    let embed = new MessageEmbed();
    try {
      const payload = {
        ticker: args[0],
        positionType: args[1].toUpperCase(),
        strikePrice: args[2],
        expiration: args[3],
        contractPriceAtOpen: args[4],
        traderId: msg.author.id
      };
      const result = await axios.post(`${apiUrl}trade`, payload);
      const trade = result.data;
      console.log(trade);
      embed
        .setTitle('New trade is open')
        .setDescription(`ID: ${trade._id}`)
        .setColor('GREEN')
        .addFields([
          { name: 'Ticker', value: trade.ticker, inline: true },
          { name: 'Position', value: trade.positionType, inline: true },
          { name: 'Strike Price', value: trade.strikePrice, inline: true },
          { name: 'Expires', value: moment(trade.expiration).format('MM/DD/YYYY'), inline: true },
          { name: 'Price at Open', value: trade.contractPriceAtOpen, inline: true },
          { name: 'Price at Close', value: 'TBA', inline: true },
          { name: 'status', value: trade.status, inline: true },
          { name: 'ROI', value: 'TBA', inline: true },
          { name: 'Trader', value: msg.author.username, inline: true },
        ]);
    } catch (err) {
      console.log(err.response);
      embed
        .setTitle('Failed to open a trade')
        .setColor('RED');
      if (err.response && err.response.data) {
        embed.setDescription(err.response.data);
      }
    } finally {
      msg.reply(embed);
    }
  }
};