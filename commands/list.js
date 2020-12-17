const axios = require('axios');
const moment = require('moment');
const apiUrl = process.env.API_BASE_URL;

module.exports = {
  name: '$list',
  description: 'List all your trade records',
  execute: async (msg) => {
    console.log(msg.author);

    try {
      let result = await axios.get(`${apiUrl}trades/${msg.author.id}`);
      console.log(result);
      msg.reply('successfully retrieved all trades for you');
    } catch (err) {
      console.log('Error in executing command $open');
      console.log(error);
      msg.reply('there was an error trying to execute that command!');
    }
  }
};