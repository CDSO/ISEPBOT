const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var YouTube = require('youtube-node')
var youTube = new YouTube()
youTube.setKey('AIzaSyAGo3CB1AHk8okk32VDQ3F9qAyi47oMPq0')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel[msg.channel.id] !== msg.author.id === client.user.id)) return

  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('hello to you too')
  }

  var caractere = msg.content
  caractere = caractere.substring(9)
  if (msg.content === '!youtube ' + caractere) {
    youTube.search(caractere, 3, function (error, result) {
      if (error) {
        console.log(error)
      }

      if (JSON.stringify(result.items[0].id.kind, null, 2) === '"youtube#playlist"') {
        msg.channel.sendMessage('https://www.youtube.com/watch?v=' + JSON.stringify(result.items[0].snippet.thumbnails.default.url, null, 2).substring(24, 35) + '&list=' + JSON.stringify(result.items[0].id.playlistId, null, 2).substring(1, JSON.stringify(result.items[0].id.playlistId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[0].id.kind, null, 2) === '"youtube#channel"') {
        msg.channel.sendMessage('https://www.youtube.com/channel/' + JSON.stringify(result.items[0].id.channelId, null, 2).substring(1, JSON.stringify(result.items[0].id.channelId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[0].id.kind, null, 2) === '"youtube#video"') {
        msg.channel.sendMessage('https://www.youtube.com/watch?v=' + JSON.stringify(result.items[0].id.videoId, null, 2).substring(1, JSON.stringify(result.items[0].id.videoId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[1].id.kind, null, 2) === '"youtube#playlist"') {
        msg.channel.sendMessage('https://www.youtube.com/watch?v=' + JSON.stringify(result.items[1].snippet.thumbnails.default.url, null, 2).substring(24, 35) + '&list=' + JSON.stringify(result.items[1].id.playlistId, null, 2).substring(1, JSON.stringify(result.items[1].id.playlistId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[1].id.kind, null, 2) === '"youtube#channel"') {
        msg.channel.sendMessage('https://www.youtube.com/channel/' + JSON.stringify(result.items[1].id.channelId, null, 2).substring(1, JSON.stringify(result.items[1].id.channelId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[1].id.kind, null, 2) === '"youtube#video"') {
        msg.channel.sendMessage('https://www.youtube.com/watch?v=' + JSON.stringify(result.items[1].id.videoId, null, 2).substring(1, JSON.stringify(result.items[1].id.videoId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[2].id.kind, null, 2) === '"youtube#playlist"') {
        msg.channel.sendMessage('https://www.youtube.com/watch?v=' + JSON.stringify(result.items[2].snippet.thumbnails.default.url, null, 2).substring(24, 35) + '&list=' + JSON.stringify(result.items[2].id.playlistId, null, 2).substring(1, JSON.stringify(result.items[2].id.playlistId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[2].id.kind, null, 2) === '"youtube#channel"') {
        msg.channel.sendMessage('https://www.youtube.com/channel/' + JSON.stringify(result.items[2].id.channelId, null, 2).substring(1, JSON.stringify(result.items[2].id.channelId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[2].id.kind, null, 2) === '"youtube#video"') {
        msg.channel.sendMessage('https://www.youtube.com/watch?v=' + JSON.stringify(result.items[2].id.videoId, null, 2).substring(1, JSON.stringify(result.items[2].id.videoId, null, 2).length - 1))
      }
    })
  }
})

client.login(config.token)

