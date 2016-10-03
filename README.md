# WebQuiz

## Dépendances

Parmi les librairies de nodejs nous utilisons fs (FileSystem) pour la compilation du code pug et less. Celle-ci peut être installé globalement grâce au gestionnaire de paquets npm.

```sh
npm install fs --global
```

Certains des scripts utilisent le langage [ruby](http://ruby-lang.org), mais celui-ci n’est pas nécessaire.


## Déploiement d’un environnement de travail

## Déploiement de l’application

## Scripts

### npm

Les scripts `npm` spécifiques peuvent être lancés avec la commande `npm run <script>`. Dans ce projet nous en avons crée quelques uns qui interagissent avec les scripts disponibles dans le dossier `bin`.

build
: alias pour l’utilisation du scripts [`bin/build`](#build)

clean
: supprime tous les fichiers compilés et les logs (dossiers respectifs webroot et log). Les dossiers **assets** et **lib** sont protégés.

watch
: lance `gulp` et `bin/watch` afin de mettre en place l’[environnement de travail](d&#xE9;ploiement-dun-environnement-de-travail).

### build

```
bin/build [less|pug]
```

Ce scripts permet de compiler les fichiers pug et less, il permet aussi de parametrer cette compilation. L’utilisation d’argument permet de restreindre la compilation à l’ensemble des fichiers pug ou less seulement

### watch

```
bin/watch [path = .]
```

Cette commande va regarder les hash de chaque fichiers, s’il y a un changement, la commande [build](#build) est déclenchée. On peut limité son champ d’action en choisissant un dossier d’execution précis passé en argument.
