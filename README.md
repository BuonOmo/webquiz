# WebQuiz

[![Build Status](https://travis-ci.org/BuonOmo/webquiz.svg?branch=master)](https://travis-ci.org/BuonOmo/webquiz)

WebQuiz vous permet de tester vos connaissances et de suivre vos résultats facilement !

**Sommaire :** [Dépendances](#dépendances) — [Installation](#installation) — [Routes](#routes) — [API](#api) — [Tests](#tests) — [Auteurs](#auteurs)

## Dépendances

WebQuiz utilise essentiellement des dépendances associées au gestionnaire de projets node [npm][]. Pour les tests, certaines dépendances sont à installer globalement, voir [Tests](#tests).

## Installation

Récuperez d’abord le code source, soit grace à [l’archive zip](https://github.com/BuonOmo/webquiz/archive/master.zip). Soit en utilisant `git` :

    git clone https://github.com/buonomo/webquiz.git
    cd webquiz

Ensuite pour lancer le programme il vous suffit d’executer les commandes suivantes.

    npm install && npm start


Après l’execution de ces commandes, vous pourrez acceder au site sur la page http://localhost:3000.

## Routes

En plus des routes générées par express pour pug, tous le contenu du dossier style est lié au projet gràce à la route `/less-css`.


Les routes `/jquery` et `/modernizr` permettent d’accerder aux scripts des paquets respectifs.

## API

L’API n’est documentée qu’au sein du code pour l’instant, voir `routes/api.js`. Toutes les routes de l’API sont précédées de `/api`.

## Tests

Pour plus de clarté les tests sont fait en [coffee script][], avec les outils de test [mocha][] pour la mise en forme générale des tests et [chai][] pour les assertions. Pour les requetes asynchrones, ce projet utilise aussi le plugin [chai as promised][].


### Tests d’interfaces

Les tests d’interfaces utilisent [Selenium Webdriver][] et le navigateur [PhantomJS][] pour simuler une interface directement dans un terminal, avec de marcher aussi sur les machines virtuelles de [travis-ci][]. Pour faire tourner ceux-ci il vous faudra installer globalement PhantomJS, mocha et lancer la commande npm de tests :


    npm install -g phantomjs-prebuilt mocha
    npm test

Si vous ne souhaitez pas ou ne pouvez faire d’installation, vous pouvez les installer relativement au projet, dans ce cas il faut **impérativement** ajouter les scripts au chemin d’execution (`path`) de votre terminal.


    npm test


Si vous voulez rendre ces tests plus visuels sur votre machine vous pouvez installer chromedriver sur votre machine avec npm :

    npm install -g chromedriver

Modifiez ensuite la fonction before du fichier `tests/interfaces.coffee` comme indiqué dans le commentaire de code.


Remplacez donc la ligne :

```coffee
.forBrowser 'phantomjs'
```

par :

```coffee
.forBrowser 'chrome'
```

Il est aussi possible de faire la même manipulation avec firefox et le `geckodriver`. Une fois l’installation faite lancez `npm test` et vous verrez une fenetre de votre navigateur s’ouvrir et executer les tests. Le resultat reste ecrit dans le terminal depuis lequel vous avez lancé les tests.

## Auteurs

Ce travail est réalisé dans le cadre des cours, et sous license MIT par Lucas Boudereaux et [Ulysse Buonomo](mailto:buonomo.ulysse@gmail.com).

[chai]: http://chaijs.com/
[chai as promised]: http://chaijs.com/plugins/chai-as-promised/
[coffee script]: http://coffeescript.org/
[mocha]: https://mochajs.org/
[npm]: https://npmjs.com
[phantomjs]: http://phantomjs.org/
[selenium webdriver]: http://seleniumhq.github.io/selenium/docs/api/javascript/index.html
[travis-ci]: https://travis-ci.org/
