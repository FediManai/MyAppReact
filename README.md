# TP4 : Docker et Docker Compose — Application MERN (`MyAppReact`)

Ce projet correspond au **TP4 (Introduction au DevOps — 3e année LIG, ISG Sousse)** sur la conteneurisation et l'orchestration d'une application MERN (`MongoDB`, `Express`, `React`, `Node.js`) avec **Docker**, **Docker Compose** et **Jenkins**.

## Structure du projet

- `client/` : Application frontend React et son `Dockerfile` (expose le port `3000`).
- `server/` : API backend Express/Node.js et son `Dockerfile` (expose le port `9000`, utilise `MONGO_URI`).
- `docker-compose.yml` : Orchestration des services `mongodb`, `server` et `client` sur le réseau `mern-network` (`bridge`).
- `README.md` : Documentation des étapes réalisées.

## Étapes réalisées

1. **Clonage et fork du dépôt** : Récupération du projet `MyAppReact` (`client` et `server`) dans mon propre dépôt GitHub.
2. **Création des Dockerfiles** :
   - `server/Dockerfile` basé sur `node:lts-alpine`, installation des dépendances (`npm install`), exposition du port `9000` et démarrage avec `npm start`.
   - `client/Dockerfile` basé sur `node:lts-alpine`, build de l'application (`npm run build`), installation d'un serveur léger (`serve`), exposition du port `3000` et lancement du serveur sur les fichiers de build.
3. **Réseau et exécution des conteneurs** :
   - Création du réseau `mern-network` (`docker network create mern-network`).
   - Lancement des conteneurs `mongodb`, `server` (`9000:9000`) et `client` (`3000:3000`) connectés à `mern-network`.
4. **Configuration de `docker-compose.yml`** : Définition des services `mongodb`, `server` et `client`, de la variable d'environnement `MONGO_URI`, des dépendances (`depends_on`) et du réseau `mern-network` en mode `bridge`.
5. **Automatisation avec Jenkins** : Mise en place d'un pipeline Jenkins récupérant le dépôt GitHub et exécutant le build / lancement des conteneurs.

## Commandes utiles

Lancer l'application avec Docker Compose :

```bash
docker compose up -d --build
