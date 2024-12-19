# ArgentBank

Argent Bank est une nouvelle banque qui démarre et essaye de percer dans le secteur.

Versions utilisées :

    node : 20.11.0
    yarn : 1.22.21
    npm : 10.2.4

Pour installer les dépendances du backend :

    npm install

Pour installer les dépendances du frontend :

    cd frontend
    yarn ou yarn install

Pour lancer le backend du projet en local :

    brew services start mongodb-community@8.0
    npm run dev:server
    npm run populate-db

Pour arrêter mongoDB en local :

    brew services stop mongodb-community@8.0

Pour lancer le frontend du projet en local :

    cd frontend
    yarn dev

Ce projet a été réalisé dans le cadre de ma formation de développeuse d'application. Il s'agit d'une application bancaire responsive comprenant une page d'accueil, une page de connexion et une page profil utilisateur. L'axe principal de travail est l'utilisation de redux / redux toolkit pour gérer les données utilisateurs ainsi que la création des endpoints pour la gestion des transactions sur Swagger. Ce projet est réalisé avec Typescript, Redux et Tailwind.
