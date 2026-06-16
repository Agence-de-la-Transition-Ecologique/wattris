# Déploiement

Wattris possède 2 environnements de déploiement : un environnement de preview et un environnement de production.

Le déploiement est réalise via GitLab CI/CD, à partir de la branche `develop` pour l'environnement de preview et de la branche `main` + tag pour l'environnement de production.

GitLab de Wattris : https://gitlab.ademe.fr/ademe-group/wattris/wattris

## Preview

1. Créer une merge request de la branche de travail vers la `develop`
2. Merger la merge request une fois que les tests sont passés et que la revue de code est validée 

Le déploiement de la de preview est automatique à chaque modification sur la branche `develop`

Une fois CI/CD terminé pour que les changements sont visibles sur https://develop.wattris-wattris.pages.dev/

## Production

1. Vérifier que le numéro de version dans le fichier `package.json` est à jour et respecte la convention [semver](https://semver.org/) (ex: `1.12.3`)
2. Mettre à jour le fichier `CHANGELOG.md`
3. Créer une merge request de la branche `develop` vers la `main` en pensant à décocher l'option "Squash commits" pour que les commits soient bien visibles dans la branche `main`
4. Merger la merge request une fois que les tests sont passés.
5. Créer un tag à partir de la branche `main`

Le déploiement de la production est automatique après la création d'un tag.

Une fois CI/CD terminé pour que les changements sont visibles sur https://wattris.ademe.fr/