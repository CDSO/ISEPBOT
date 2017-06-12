const Discord = require('discord.js')
var Twit = require('twit')
const config = require('./config.js')

var T = new Twit(config)

const pokemonClient = require('pokeapi')
var pokeAPI = pokemonClient.v1()
var pokemonToBe = ''
var trueBotName = ''

const client = new Discord.Client()
var weather = require('Openweather-Node')
// set your API key if you have one
weather.setAPPID('e7ee6e42be52218f259c8060581b6a3c')
// set the culture
weather.setCulture('fr')
// set the forecast type
weather.setForecastType('daily')

const Translate = require('@google-cloud/translate')
const projectId = 'Google ChatBot'
const translateClient = Translate({
  projectId: projectId
})

var YouTube = require('youtube-node')
var youTube = new YouTube()
youTube.setKey('AIzaSyAGo3CB1AHk8okk32VDQ3F9qAyi47oMPq0')

client.on('ready', () => {
  console.log('Logged in as ' + client.user.username + '!')
  pokemonToBe = client.user.username
  trueBotName = pokemonToBe
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel[msg.channel.id] !== msg.author.id === client.user.id)) return

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

  caractere = msg.content
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

  var author = msg.author
  var messageArray = msg.content.split(' ')

  if (messageArray[0] === '!translate') {
    const targetLanguage = messageArray[messageArray.length - 1]
    var messageToTranslate = messageArray.slice(1, messageArray.length - 1)
    var text = messageToTranslate.join(' ')
    translateClient.translate(text, targetLanguage)
        .then((results) => {
          const translation = results[0]
          msg.channel.send(author + 'says : ' + translation)
        })
        .catch((err) => {
          console.error('ERROR:', err)
        })
  } else if (messageArray[0] === '!pokemon') {
    if (messageArray[1] === 'evolve') {
      pokeAPI.get({ resource_uri: '/api/v2/pokemon-species/' + trueBotName.toLowerCase() + '/' }).then(function (evolve) {
        var chainEvolution = evolve.evolution_chain.url.split('/')
        pokeAPI.get({ resource_uri: '/api/v2/evolution-chain/' + chainEvolution[chainEvolution.length - 2] + '/' }).then(function (pokemonEvolutionChain) {
          var evolutionChain = pokemonEvolutionChain.chain
          var pokemonNameTest = evolutionChain.species.name
          while (pokemonNameTest !== trueBotName.toLowerCase()) {
            evolutionChain = evolutionChain.evolves_to[0]
            pokemonNameTest = evolutionChain.species.name
          }
          if (evolutionChain.evolves_to[0] !== null) {
            pokemonToBe = evolutionChain.evolves_to[0].species.name
            trueBotName = pokemonToBe
          } else {
            pokemonToBe = trueBotName
          }
          setPokemon(pokemonToBe, msg)
        })
      })
    } else {
      pokemonToBe = messageArray[1]
      trueBotName = pokemonToBe
      setPokemon(pokemonToBe, msg)
    }
  }

  var stream = T.stream('user')

  stream.on('tweet', function (Msg) {
    var replyto = Msg.in_reply_to_screen_name
    if (replyto === 'Munchkin_ISEP') {
      msg.channel.sendMessage('@' + Msg.user.screen_name + ' vous a envoyé le tweet suivant : ' + Msg.text)
    }
  })

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

  if (msg.content.startsWith('!weather') || msg.content.startsWith('!forecast')) {
    var location = msg.content.split(' ').slice(1)
    if (msg.content.startsWith('!weather')) {
      weather.now(location, function (err, data) {
        if (err) {
          console.log('Something wrong', err)
        }
        msg.channel.send('Météo d\'aujoud\'hui à ' + location + ' : ' + data[0].getDegreeTemp().temp.toFixed(2) + '°C, ' + data[0].values.weather[0].description)
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
          msg.channel.send(dayName + ' il fera : ' + (data.values.list[i].temp.day - 273.15).toFixed(2) + '°C à ' + location)
        }
      })
    }
  }
})

function setPokemon (pokemonToBe, msg) {
  pokeAPI.get({ resource_uri: '/api/v2/pokemon/' + pokemonToBe + '/' }).then(function (pokemon) {
    var nationalID = pokemon.id
    var pokemonName = pokemon.name
    var typesList = pokemon.types
    var typesListLength = typesList[0].slot
    var typesFinal = ''
    var pokemonHeight = pokemon.height
    var pokemonWeight = pokemon.weight
    var pokemonSprites = pokemon.sprites.front_default

    client.user.setAvatar(pokemonSprites)
    client.user.setUsername(pokemonName)

    if (typesListLength === 1) {
      typesFinal = 'My type is ' + typesList[0].type.name + '.\n'
    } else if (typesListLength > 1) {
      typesFinal = 'My types are '
      var j = 0
      for (j = 0; j < typesListLength; j++) {
        typesFinal = typesFinal + typesList[j].type.name
        if (j < typesListLength - 1) {
          typesFinal = typesFinal + ' and '
        }
      }
      typesFinal = typesFinal + '.\n'
    } else {
      typesFinal = "I don't have any type. \n"
    }

    var finalMessage = "Hello, I'm " + pokemonName + '. In the pokedex, you will find me at id ' + nationalID + '.\n' + typesFinal + 'I weigth ' + pokemonWeight / 10 + ' kg and measure ' + pokemonHeight / 10 + ' m.'

    msg.channel.send(finalMessage)
  })
}

client.login(config.token)
