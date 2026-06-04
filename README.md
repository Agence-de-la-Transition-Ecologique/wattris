# Wattris — Simulateur de puissance

Application Next.js permettant de simuler la consommation électrique de vos appareils.

## Prérequis & dépendances projet

- [Node.js](https://nodejs.org/) >= 18 [20.20 installé avec Dockerfile]
- [Yarn](https://yarnpkg.com/)
- Docker installé sur votre poste

## Installation

Cloner le dépôt puis installer les dépendances :

```bash
git clone <url-du-repo>

cd wattris

docker compose up -d --build
```

>Les commandes utiles disponibles avec la commande `make`
```bash
make yarn.install        # Installe les dépendances yarn (mode lockfile)
make yarn.fresh-install  # Installe les dépendances yarn (installation complète)
make yarn.dev            # Lance le serveur de développement
make yarn.build          # Compile l'iframe et génère le build de production
make yarn.start          # Démarre le serveur en mode production (après build)
make yarn.build-static   # Génère le build statique
make lint                # Analyse le code avec ESLint
make build               # Build l'image Docker sans cache
make start               # Démarre les conteneurs Docker en arrière-plan
make stop                # Arrête les conteneurs Docker
make restart             # Redémarre les conteneurs Docker
make logs.watch          # Affiche les logs en temps réel
```
> Rendez-vous ensuite sur [http://localhost:3000](http://localhost:3000) pour voir l'application