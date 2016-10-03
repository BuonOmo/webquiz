# WebQuiz

WebQuiz vous permet de tester vos connaissances et de suivre vos résultats facilement !

- [Dépendances](#dépendances)
- [Installation](#installation)
	- [Installation simple](#installation-simple)
		- [Linux & OS X](#linux-os-x)
		- [Windows](#windows)
	- [Environnement de travail](#environnement-de-travail)
- [Scripts](#scripts)
	- [npm](#npm)
	- [build](#build)
	- [watch](#watch)
- [Auteurs](#auteurs)

## Dépendances

Parmi les librairies de nodejs nous utilisons fs (FileSystem) pour la compilation du code pug et less. Celle-ci peut être installé globalement grâce au gestionnaire de paquets npm.

```sh
npm install fs --global
```

Certains des scripts utilisent le langage [ruby](http://ruby-lang.org), mais celui-ci n’est pas nécessaire.

## Installation
### Installation simple

L’installation ci-dessous suppose que vous avez `git` sur votre machine, si ce n’est pas le cas vous pouvez télécharger [l’archive zip](https://github.com/BuonOmo/webquiz/archive/master.zip), la décompresser, vous rendre à la racine du projet, et suivre la suite de l’installation (ligne 3).

#### Linux & OS X

```sh
git clone https://github.com/buonomo/webquiz.git
cd webquiz
npm install && npm run build && gulp
```

#### Windows

```sh
git clone https://github.com/buonomo/webquiz.git
cd webquiz
npm install && npm run w-build && gulp
```

### Environnement de travail

WebQuiz étant un projet de cours, la mise en place de l’environnement de travail est importante et nous avons choisi d’utiliser `gulp` pour avoir une compilation à la volée de l’ensemble du travail. Pour mettre en place cette environnement de travail **sur une machine UNIX** à partir de rien, exécutez les lignes suivantes dans votre console :

```sh
git clone https://github.com/buonomo/webquiz.git
cd webquiz && npm install && npm run watch
```

Après l’execution de ces commandes, vous devriez voir la page http://localhost:3000 s’ouvrir dans votre navigateur par défaut. Celle-ci se réactualisera à chaque modification de votre travail, que ce soit en `pug` ou en `less`. Pour plus d’informations sur l’execution de cette commande, vous pouvez regarder les détails des scripts [build](#build) et [watch](#watch).

## Scripts

### npm

Les scripts `npm` spécifiques peuvent être lancés avec la commande `npm run <script>`. Dans ce projet nous en avons crée quelques uns qui interagissent avec les scripts disponibles dans le dossier `bin`.

build
: alias pour l’utilisation du scripts [`bin/build`](#build)

clean
: supprime tous les fichiers compilés et les logs (dossiers respectifs webroot et log). Les dossiers **assets** et **lib** sont protégés.

watch
: lance `gulp` et `bin/watch` afin de mettre en place l’[environnement de travail](environnement-de-travail).

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

# Auteurs

Ce travail est réalisé dans le cadre des cours, et sous license MIT par Lucas Boudereaux et [Ulysse Buonomo](mailto:buonomo.ulysse@gmail.com).
