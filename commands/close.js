const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const moment = require('moment');
const apiUrl = process.env.API_BASE_URL;

module.exports = {
  name: '$close',
  description: 'Close a trade; update contract price at close',
  execute: async (msg, args) => {
    if (args.length !== 2) {
      msg.reply(`try again (example: $close [trade ID] [closing price])`);
      return;
    }

    let embed = new MessageEmbed();
    try {
      const payload = {
        traderId: msg.author.id,
        contractPriceAtClose: args[1]
      };
      let result = await axios.put(`${apiUrl}trade/${args[0]}`, payload);
      const trade = result.data;
      console.log(trade);
      embed
        .setTitle('Trade is closed')
        .setDescription(`ID: ${trade._id}`)
        .setColor('GREEN')
        .addFields([
          { name: 'Ticker', value: trade.ticker, inline: true },
          { name: 'Position', value: trade.positionType, inline: true },
          { name: 'Strike Price', value: trade.strikePrice, inline: true },
          { name: 'Expires', value: moment(trade.expiration).format('MM/DD/YYYY'), inline: true },
          { name: 'Price at Open', value: trade.contractPriceAtOpen, inline: true },
          { name: 'Price at Close', value: trade.contractPriceAtClose, inline: true },
          { name: 'status', value: trade.status, inline: true },
          { name: 'ROI', value: trade.roi, inline: true },
          { name: 'Trader', value: msg.author.username, inline: true }
        ]);
    } catch (err) {
      console.log(err.response);
      embed
        .setTitle('Failed to close a trade')
        .setColor('RED');
      if (err.response && err.response.data) {
        embed.setDescription(err.response.data);
      }
    } finally {
      msg.reply(embed);
    }
  }
};