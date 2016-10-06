# WebQuiz

WebQuiz vous permet de tester vos connaissances et de suivre vos résultats facilement !

- [Dépendances](#dépendances)
- [Installation](#installation)
- [Routes](#routes)
- [Auteurs](#auteurs)

## Dépendances

WebQuiz utilise essentiellement des dépendances associées à `npm`. Allez sur [leur site pour plus d’informations](https://npmjs.com).

## Installation

Récuperez d’abord le code source, soit grace à [l’archive zip](https://github.com/BuonOmo/webquiz/archive/master.zip). Soit en utilisant `git` :

```sh
git clone https://github.com/buonomo/webquiz.git
cd webquiz
```
Ensuite pour lancer le programme il vous suffit d’executer les commandes suivantes.

```sh
npm install && npm run start
```

Après l’execution de ces commandes, vous pourrez acceder au site sur la page http://localhost:3000.

## Routes

En plus des routes générées par express pour pug, tous le contenu du dossier style est lié au projet gràce à la route `/less-css`.

## Auteurs

Ce travail est réalisé dans le cadre des cours, et sous license MIT par Lucas Boudereaux et [Ulysse Buonomo](mailto:buonomo.ulysse@gmail.com).
