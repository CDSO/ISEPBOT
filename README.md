ISEPBOT (Architecture des SI)
=================
Bot Discord développé dans le cadre d'un devoir en architecture des SI

Auteurs : Pauline Creppy, Stéphane Dennery, Alexandra Obertelli, Benjamin Song

Spotify
----------
#### Installation
```
npm install spotify-web-api-node
```
#### Commandes
Commande principale
```
!spotify <query>           //Retourne un résulat artiste, un album et un titre
```
Pour ne pas avoir un résultat de chaque, on peut préciser à l'aide d'une autre commande
```
!spotify !artist <query>   //Retourne un résultat artiste
!spotify !album <query>    //Retourne un résultat album
!spotify !track <query>    //Retourne un résultat tritre
```
OpenWeatherMap
----------
#### Installation
```
npm install openweather-node
```
#### Commandes
Pour obtenir la météo actuelle d'une ville (le nom de ville doit être en anglais) : 
```
!weather <ville>           
```
Pour obtenir les prévisions de la météo sur 5 jours d'une ville (le nom de ville doit être en anglais) : 
```
!forecast <ville>           
```

Google Translate
---------
#### Installation
Suivre les indications d'installations sur ces deux liens (pour  Windows) :
https://cloud.google.com/sdk/docs/quickstart-windows
https://cloud.google.com/translate/docs/reference/libraries#client-libraries-resources-nodejs
Il faudra créer un nouveau projet, lors du suivi des instructions : le nommer "Google ChatBot"

#### Commandes
Les commandes pour demander au bot de traduire sont : 
```
!translate <phrase> <lang>         
```
Commencer sa phrase par "!translate"

\<phrase> : Ecrire ce que  l'on veut traduire

\<lang> : Donner les deux lettres de la langue dans laquelle on veut traduire (fr, en, ru, ...)

Pokemon
-------
#### Installation
```
npm install pokeapi
```
#### Commandes
Les commandes sont : 
```
!pokemon <nomDuPokemon>
!pokemon evolve
```
Son avatar change, et le pokemon donne ses caractéristiques. Il existe encore quelques problèmes avec le changement de nom (qui surviennent à cause de la limite de changement de nom) et l'évolution du pokemon


Youtube
-------
#### Installation
```
npm install youtube-node
```
#### Commandes
Commande principale pour obtenir 3 résultats :
```
!youtube <recherche souhaitée>
```
Twitter
-------
#### Installation
```
npm install twitter
npm install twit
```
#### Commandes
Commande pour écrire un tweet :
```
!tweet <ce qu'on veut écrire>
```
Lorsque quelqu'un nous tague dans un tweet, le tweet s'affiche automatiquement.
Les tweets ne doivent pas faire plus de 140 caractères.
