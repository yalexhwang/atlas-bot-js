const { MessageEmbed, Message } = require('discord.js');
const axios = require('axios');
const moment = require('moment');
const apiUrl = process.env.API_BASE_URL;

module.exports = {
  name: '$delete',
  description: 'Delete a trade no longer valid or applicable',
  execute: async (msg, args) => {
    if (args.length !== 1) {
      msg.reply(`try again (example: $delete [trade ID]`);
      return;
    }
  
    let embed = new MessageEmbed();
    try {
      const payload = {
        traderId: msg.author.id
      };
      const result = await axios.delete(`${apiUrl}trade/${args[0]}`, { data: payload });
      console.log(result);
      embed
        .setTitle(`Trade is deleted`)
        .setDescription(`ID: ${args[0]}`)
        .setColor('GREEN');
    } catch (err) {
      console.log(err.response);
      embed
        .setTitle('Failed to delete a trade')
        .setColor('RED');
      if (err.response && err.response.data) {
        embed.setDescription(err.response.data);
      }
    } finally {
      msg.reply(embed);
    }
  }
};