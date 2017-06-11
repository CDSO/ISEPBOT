const Discord = require('discord.js')
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
    msg.channel.send('Hello to you too, fellow !')
  }
  if (msg.content === 'Quoi') {
    msg.channel.send('Feur')
  }
//  Old code for Spotify library
/*  var spotify = require('spotify')
  if (msg.content.startsWith('!spotify')) {
    var args = msg.content.split(' ').slice(1)
    if (args[0] !== '!artist' && args[0] !== '!track' && args[0] !== '!album') {
      spotify.search({ type: 'artist,track,album', query: args.join(' ') }, function (err, data) {
        if (err) {
          msg.channel.send('Il y eu une erreur')
        }
        msg.channel.send('__**Artiste**__ : ' + data.artists.items[0].name)
        msg.channel.send(data.artists.items[0].external_urls.spotify)
        msg.channel.send('__**Album**__ : ' + data.albums.items[0].name)
        msg.channel.send(data.albums.items[0].external_urls.spotify)
        msg.channel.send('__**Titre**__ : ' + data.tracks.items[0].name)
        msg.channel.send(data.tracks.items[0].external_urls.spotify)
      })
    }
    if (args[0] === '!artist') {
      spotify.search({ type: 'artist', query: args.join(' ').substring(7) }, function (err, data) {
        if (err) {
          msg.channel.send('Il y eu une erreur')
        }
        msg.channel.send('__**Artiste**__ : ' + data.artists.items[0].name)
        msg.channel.send(data.artists.items[0].external_urls.spotify)
      })
    }
    if (args[0] === '!album') {
      spotify.search({ type: 'album', query: args.join(' ').substring(6) }, function (err, data) {
        if (err) {
          msg.channel.send('Il y eu une erreur')
        }
        msg.channel.send('__**Album**__ : ' + data.albums.items[0].name)
        msg.channel.send(data.albums.items[0].external_urls.spotify)
      })
    }
    if (args[0] === '!track') {
      spotify.search({ type: 'track', query: args.join(' ').substring(6) }, function (err, data) {
        if (err) {
          msg.channel.send('Il y eu une erreur')
        }
        msg.channel.send('__**Titre**__ : ' + data.tracks.items[0].name)
        msg.channel.send(data.tracks.items[0].external_urls.spotify)
      })
    }
  } */

  if (msg.content.startsWith('!spotify')) {
    // Create the api object with the credentials
    var SpotifyWebApi = require('spotify-web-api-node')
    var spotifyApi = new SpotifyWebApi({
      clientId: '4d3c749c8112468fbeeee15c53a59135',
      clientSecret: '935e7bf613e34383b562994f27102128'
    })
    var args = msg.content.split(' ').slice(1)
    // Retrieve an access token.
    spotifyApi.clientCredentialsGrant()
    .then(function (data) {
      spotifyApi.setAccessToken(data.body['access_token'])
      if (args[0] !== '!artist' && args[0] !== '!track' && args[0] !== '!album') {
        spotifyApi.search(args.join(' '), ['artist', 'album', 'track'], {limit: 1}, function (err, data) {
          if (err) {
            console.error('Something wrong', err)
          }
          msg.channel.send('__**Artiste**__ : ' + data.body.artists.items[0].name)
          msg.channel.send(data.body.artists.items[0].external_urls.spotify)
          msg.channel.send('__**Album**__ : ' + data.body.albums.items[0].name)
          msg.channel.send(data.body.albums.items[0].external_urls.spotify)
          msg.channel.send('__**Titre**__ : ' + data.body.tracks.items[0].name)
          msg.channel.send(data.body.tracks.items[0].external_urls.spotify)
        })
      }
      if (args[0] === '!artist') {
        spotifyApi.searchArtists(args.join(' ').substring(7), {limit: 1}, function (err, data) {
          if (err) {
            console.error('Something wrong', err)
          }
          msg.channel.send('__**Artiste**__ : ' + data.body.artists.items[0].name)
          msg.channel.send(data.body.artists.items[0].external_urls.spotify)
        })
      }
      if (args[0] === '!album') {
        spotifyApi.searchAlbums(args.join(' ').substring(6), {limit: 1}, function (err, data) {
          if (err) {
            console.error('Something wrong', err)
          }
          msg.channel.send('__**Album**__ : ' + data.body.albums.items[0].name)
          msg.channel.send(data.body.albums.items[0].external_urls.spotify)
        })
      }
      if (args[0] === '!track') {
        spotifyApi.searchTracks(args.join(' ').substring(6), {limit: 1}, function (err, data) {
          if (err) {
            console.error('Something wrong', err)
          }
          msg.channel.send('__**Titre**__ : ' + data.body.tracks.items[0].name)
          msg.channel.send(data.body.tracks.items[0].external_urls.spotify)
        })
      }
    }, function (err) {
      console.log('Something went wrong when retrieving an access token', err)
    })
  }
  var weather = require('Openweather-Node')
    // set your API key if you have one
  weather.setAPPID('e7ee6e42be52218f259c8060581b6a3c')
    // set the culture
  weather.setCulture('fr')
    // set the forecast type
  weather.setForecastType('daily')

  if (msg.content.startsWith('!weather') || msg.content.startsWith('!forecast')) {
    var location = msg.content.split(' ').slice(1)
    if (msg.content.startsWith('!weather')) {
      weather.now(location, function (err, data) {
        if (err) {
          console.log('Something wrong', err)
        }
        msg.channel.send('Météo d\'aujoud\'hui à ' + location + ' : ' + data[0].getDegreeTemp().temp + '°C, ' + data[0].values.weather[0].description)
      })
    }
    if (msg.content.startsWith('!forecast')) {
      weather.forecast(location, function (err, data) {
        if (err) {
          console.log('Something wrong', err)
        }
        var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
        var d = new Date()
        for (var i = 1; i < 6; i++) {
          var dayName = days[d.getDay() + i]
          msg.channel.send(dayName + ' il fera : ' + data[0].getDegreeTemp(i).temp + '°C à ' + location)
        }
      })
    }
  }
})

client.login(config.token)
