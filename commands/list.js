const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const apiUrl = process.env.API_BASE_URL;

module.exports = {
  name: '$list',
  description: 'List all your trades',
  execute: async (msg) => {
    try {
      let result = await axios.get(`${apiUrl}trades/${msg.author.id}`);
      console.log(result.data);
      // TODO: provide a URL link for the list
    } catch (err) {
      console.log(err.response);
      const embed = new MessageEmbed()
        .setTitle('Failed to get list of all your trades')
        .setColor('RED');
      if (err.response && err.response.data) {
        embed.setDescription(err.response.data);
      }
      msg.reply(embed);
    }
  }
};

function processEmbedContent() {

}