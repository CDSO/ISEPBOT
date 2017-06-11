const Discord = require('discord.js')
var Twit = require('twit')
const config = require('./config.js')

var T = new Twit(config)

const Translate = require('@google-cloud/translate')
const pokemonClient = require('pokeapi')
var pokeAPI = pokemonClient.v1()

const client = new Discord.Client()
const projectId = 'Google ChatBot'
var pokemonToBe = ''

// Instantiates a client
const translateClient = Translate({
  projectId: projectId
})

client.on('ready', () => {
  console.log('Logged in as ' + client.user.username + '!')
  pokemonToBe = client.user.username
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

client.on('message', (message) => {
  var author = message.author
  var messageArray = message.content.split(' ')

  if (messageArray[0] === '!translate') {
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
      pokeAPI.get({ resource_uri: '/api/v2/pokemon-species/' + client.user.username.toLowerCase() + '/' }).then(function (evolve) {
        var chainEvolution = evolve.evolution_chain.url.split('/')
        console.log(chainEvolution)
        pokeAPI.get({ resource_uri: '/api/v2/evolution-chain/' + chainEvolution[chainEvolution.length - 2] + '/' }).then(function (pokemonEvolutionChain) {
          var evolutionChain = pokemonEvolutionChain.chain
          var pokemonNameTest = evolutionChain.species.name
          while (pokemonNameTest !== client.user.username.toLowerCase()) {
            console.log(pokemonNameTest)
            evolutionChain = evolutionChain.evolves_to[0]
            pokemonNameTest = evolutionChain.species.name
            console.log(pokemonNameTest)
          }
          pokemonToBe = evolutionChain.evolves_to[0].species.name
        })
      })
    } else {
      pokemonToBe = messageArray[1]
    }
    console.log(pokemonToBe)
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
// bot Translate et bot Pokemon (quelques soucis avec le bot Pokemon)
  }
})

client.login(config.token)