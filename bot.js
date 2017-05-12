const Discord = require('discord.js')
var Twit = require('twit')
const config = require('./config.js')
var T = new Twit(config)
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself

  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  if (msg.channel.type !== 'dm' && (!config.channel[msg.channel.id] || msg.author.id === client.user.id)) return

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
      T.post('statuses/update', tweet)
      msg.channel.sendMessage("C'est bon, je tweet !")
    } else {
      msg.channel.sendMessage('Ton tweet est trop long. Tu te moques de moi !? ')
    }
  }

  var stream = T.stream('user')

  stream.on('tweet', function (Msg) {
    var replyto = Msg.in_reply_to_screen_name
    if (replyto === 'Munchkin_ISEP') {
      msg.channel.sendMessage('@' + Msg.user.screen_name + ' vous a envoyé le tweet suivant : ' + Msg.text)
    }
  })
})

client.login(config.token)
