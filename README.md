# Conteneurisation MERN

Le projet contient une API Express, un client React construit avec Vite et une base MongoDB. Docker Compose orchestre les trois services sur le réseau `mern-network`. Les données MongoDB sont persistées dans le volume `mongo_data`.

## Prérequis

- Docker avec Docker Compose (commande `docker compose`)

## Construire les images séparément

Depuis la racine du projet :

```powershell
docker build -t mern-server ./Server
docker build -t mern-client ./Client
```

Le serveur écoute sur le port 9000. Le client Vite est construit puis servi sur le port 3000. Compose fournit au serveur `MONGO_URI=mongodb://mongodb:27017/mern_app`.

## Démarrer avec Compose

```powershell
docker compose up --build -d
```

Ouvrir le client à <http://localhost:3000> et l’API à <http://localhost:9000/api/health>.

## Consulter les logs

```powershell
docker compose logs -f
```

Pour suivre un seul service, utiliser par exemple `docker compose logs -f server`.

## Arrêter les services

```powershell
docker compose down
```

Cette commande conserve le volume de données MongoDB. Pour supprimer aussi les données persistées, utiliser `docker compose down -v`.

## Fichiers Docker

- `Server/Dockerfile` installe les dépendances serveur puis lance `npm start`.
- `Client/Dockerfile` construit les fichiers statiques Vite dans `dist/` et les sert avec `serve` sur le port 3000.
- Les fichiers `.dockerignore` excluent notamment les dépendances locales, les fichiers `.env`, les logs et les répertoires de build du contexte Docker.
- `docker-compose.yml` configure MongoDB, le serveur, le client, le réseau partagé et le volume persistant.
