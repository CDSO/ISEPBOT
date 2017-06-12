ISEPBOT (Architecture des SI)
=================
Bot Discord développé dans le cadre d'un devoir en architecture des SI

Auteurs : Pauline Creppy, Stéphane Dennery, Alexandra Obertelli, Benjamin Song

Lien pour lancer le bot (Microsoft Azure) : http://isepbot.azurewebsites.net/

Spotify
----------
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
#### Commandes
Pour obtenir la météo actuelle d'une ville (le nom de ville doit être en anglais) : 
```
!weather <ville>           
```
Pour obtenir les prévisions de la météo sur 5 jours d'une ville (le nom de ville doit être en anglais) : 
```
!forecast <ville>           
```
**Attention** : La fonction !forecast ne fonctionne pas toujours (raison inconnue), si le bot cesse de fonctionner, relancer le bot et réessayer (A tester en dernier)

Google Translate
---------
#### Commandes
Les commandes pour demander au bot de traduire sont : 
```
!translate <phrase> <lang>         
```
Commencer sa phrase par "!translate"

\<phrase> : Ecrire ce que  l'on veut traduire

\<lang> : Donner les deux lettres de la langue dans laquelle on veut traduire (fr, en, ru, ...)

La commande translate est lente à fonctionner.

Pokemon
-------
#### Commandes
Les commandes sont : 
```
!pokemon <nomDuPokemon>
!pokemon evolve
```
Son avatar change, et le pokemon donne ses caractéristiques.

Youtube
-------
#### Commandes
Commande principale pour obtenir 3 résultats :
```
!youtube <recherche souhaitée>
```
Twitter
-------
#### Commandes
Commande pour écrire un tweet :
```
!tweet <ce qu'on veut écrire>
```
Lorsque quelqu'un nous tague dans un tweet, le tweet s'affiche automatiquement.
Les tweets ne doivent pas faire plus de 140 caractères.
