const Discord = require('discord.js')
var Twit = require('twit')
const config = require('./config.js')
var T = new Twit(config)
const client = new Discord.Client()

//
//  filter the twitter public stream by the word 'mango'.
//

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
      T.post('statuses/update', tweet)
      msg.channel.send("C'est bon, je tweet !")
    } else {
      msg.channel.send('Ton tweet est trop long. Tu te moques de moi !? ')
    }
  }

  var stream = T.stream('user')

  stream.on('tweet', function (tweet) {
    var replyto = tweet.in_reply_to_screen_name
    var text = tweet.text
    var from = tweet.user.screen_name
    if (replyto === 'Munchkin_ISEP') {
      msg.channel.sendMessage('@' + from + " t'a taggué dans ce tweet : " + text)
    }
  })
})

client.login(config.token)
