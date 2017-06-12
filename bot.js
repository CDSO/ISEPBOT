const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.js')

const Translate = require('@google-cloud/translate')
const projectId = 'discordchatbottranslation'
const translateClient = Translate({
  projectId: projectId
})

const pokemonClient = require('pokeapi')
var pokeAPI = pokemonClient.v1()
var pokemonToBe = ''
var trueBotName = ''

var YouTube = require('youtube-node')
var youTube = new YouTube()
youTube.setKey('AIzaSyAGo3CB1AHk8okk32VDQ3F9qAyi47oMPq0')

var Twit = require('twit')
var T = new Twit(config)

client.on('ready', () => {
  console.log('Logged in as ' + client.user.username + '!')
  pokemonToBe = client.user.username
  trueBotName = client.user.username
})

client.on('message', (message) => {
  var author = message.author
  var messageArray = message.content.split(' ')

  if (message.channel.type !== 'dm' && (config.channel[message.channel.id] !== message.author.id === client.user.id)) {
    return
  } else if (message.content === 'botname') {
    message.channel.sendMessage(trueBotName)
  } else if (messageArray[0] === '!translate') {
    const targetLanguage = messageArray[messageArray.length - 1]
    var messageToTranslate = messageArray.slice(1, messageArray.length - 1)
    var text = ''
    var i = 0
    for (i = 0; i < messageToTranslate.length; i++) {
      text = text + messageToTranslate[i] + ' '
    }
    text = ' says : ' + text
    translateClient.translate(text, targetLanguage)
      .then((results) => {
        const translation = results[0]
        message.channel.send(author + translation)
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
          if (evolutionChain.evolves_to[0] != null) {
            pokemonToBe = evolutionChain.evolves_to[0].species.name
            trueBotName = pokemonToBe
          } else {
            pokemonToBe = trueBotName
          }
          setPokemon(pokemonToBe, message)
        })
      })
    } else {
      pokemonToBe = messageArray[1]
      trueBotName = pokemonToBe
      setPokemon(pokemonToBe, message)
    }
  } else if (messageArray[0] === '!youtube') {
    var searchTerms = messageArray.slice(1, messageArray.length)
    var searchText = ''
    for (i = 0; i < searchTerms.length; i++) {
      searchText = searchText + searchTerms[i]
      if (i < searchTerms.length - 1) {
        searchText = searchText + ' '
      }
    }
    youTube.search(searchText, 3, function (error, result) {
      if (error) {
        console.log(error)
      }

      if (JSON.stringify(result.items[0].id.kind, null, 2) === '"youtube#playlist"') {
        message.channel.sendMessage('https://www.youtube.com/watch?v=' + JSON.stringify(result.items[0].snippet.thumbnails.default.url, null, 2).substring(24, 35) + '&list=' + JSON.stringify(result.items[0].id.playlistId, null, 2).substring(1, JSON.stringify(result.items[0].id.playlistId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[0].id.kind, null, 2) === '"youtube#channel"') {
        message.channel.sendMessage('https://www.youtube.com/channel/' + JSON.stringify(result.items[0].id.channelId, null, 2).substring(1, JSON.stringify(result.items[0].id.channelId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[0].id.kind, null, 2) === '"youtube#video"') {
        message.channel.sendMessage('https://www.youtube.com/watch?v=' + JSON.stringify(result.items[0].id.videoId, null, 2).substring(1, JSON.stringify(result.items[0].id.videoId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[1].id.kind, null, 2) === '"youtube#playlist"') {
        message.channel.sendMessage('https://www.youtube.com/watch?v=' + JSON.stringify(result.items[1].snippet.thumbnails.default.url, null, 2).substring(24, 35) + '&list=' + JSON.stringify(result.items[1].id.playlistId, null, 2).substring(1, JSON.stringify(result.items[1].id.playlistId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[1].id.kind, null, 2) === '"youtube#channel"') {
        message.channel.sendMessage('https://www.youtube.com/channel/' + JSON.stringify(result.items[1].id.channelId, null, 2).substring(1, JSON.stringify(result.items[1].id.channelId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[1].id.kind, null, 2) === '"youtube#video"') {
        message.channel.sendMessage('https://www.youtube.com/watch?v=' + JSON.stringify(result.items[1].id.videoId, null, 2).substring(1, JSON.stringify(result.items[1].id.videoId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[2].id.kind, null, 2) === '"youtube#playlist"') {
        message.channel.sendMessage('https://www.youtube.com/watch?v=' + JSON.stringify(result.items[2].snippet.thumbnails.default.url, null, 2).substring(24, 35) + '&list=' + JSON.stringify(result.items[2].id.playlistId, null, 2).substring(1, JSON.stringify(result.items[2].id.playlistId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[2].id.kind, null, 2) === '"youtube#channel"') {
        message.channel.sendMessage('https://www.youtube.com/channel/' + JSON.stringify(result.items[2].id.channelId, null, 2).substring(1, JSON.stringify(result.items[2].id.channelId, null, 2).length - 1))
      }

      if (JSON.stringify(result.items[2].id.kind, null, 2) === '"youtube#video"') {
        message.channel.sendMessage('https://www.youtube.com/watch?v=' + JSON.stringify(result.items[2].id.videoId, null, 2).substring(1, JSON.stringify(result.items[2].id.videoId, null, 2).length - 1))
      }
    })
  } else if (messageArray[0] === '!tweet') {
    var tweetWords = messageArray.slice(1, messageArray.length)
    var tweetStatus = ''
    for (i = 0; i < tweetWords.length; i++) {
      tweetStatus = tweetStatus + tweetWords[i]
      if (i < tweetWords.length - 1) {
        tweetStatus = tweetStatus + ' '
      }
    }
    if (tweetStatus.length < 141) {
      /* var tweet = {
        status: caractere
      } */
      T.post('statuses/update', tweetStatus)
      message.channel.sendMessage("C'est bon, je tweet !")
    } else {
      message.channel.sendMessage('Ton tweet est trop long. Tu te moques de moi !? ')
    }
  }

  var stream = T.stream('user')

  stream.on('tweet', function (Msg) {
    var replyto = Msg.in_reply_to_screen_name
    if (replyto === 'Munchkin_ISEP') {
      message.channel.sendMessage('@' + Msg.user.screen_name + ' vous a envoyé le tweet suivant : ' + Msg.text)
    }
  })
})

function setPokemon (pokemonToBe, message) {
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

    message.channel.send(finalMessage)
  })
}

client.login(config.token)
