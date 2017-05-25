const Discord = require('discord.js')
var Twit = require('twit')
const config = require('./config.js')
var T = new Twit(config)
const client = new Discord.Client()

var tweet = {
  status: 'Je vaincrai !!'
}

T.post('statuses/update', tweet, tweeted)

function tweeted (err, data, response) {
  if (err) {
    console.log('Il y a une erreur')
  } else {
    console.log('Ca roule')
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage("Hello Warrior, Let's fight !")
  }
})

client.login(config.token)
