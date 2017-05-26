const Discord = require('discord.js')
var Twit = require('twit')
const config = require('./config.js')
const client = new Discord.Client()

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

  var caractere = msg.content
  caractere = caractere.substring(7)

  if (msg.content === '!tweet ' + caractere) {
    if (caractere.length < 141) {
      var tweet = {
        status: caractere
      }
      var T = new Twit(config)
      T.post('statuses/update', tweet)
      msg.channel.send("C'est bon, je tweet !")
    } else {
      msg.channel.send('Ton tweet est trop long. Tu te moques de moi !? ')
    }
  }
})



client.login(config.token)
