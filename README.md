# MealMate — démarrer le site

## Prérequis
1. Installer Node.js (version LTS) : https://nodejs.org/
2. Installer VS Code : https://code.visualstudio.com/

## Lancer le site sur ton ordinateur
1. Décompresse le dossier `mealmate-website`.
2. Ouvre ce dossier dans VS Code (`Fichier > Ouvrir le dossier`).
3. Ouvre le terminal intégré (`Terminal > Nouveau terminal`).
4. Exécute :

```bash
npm install
npm run dev
```

5. Ouvre dans ton navigateur l'adresse affichée par Vite, généralement `http://localhost:5173`.

## Publier le site gratuitement avec Vercel
1. Crée un compte GitHub et un compte Vercel.
2. Crée un dépôt GitHub et envoie-y le contenu de ce dossier.
3. Dans Vercel, choisis `Add New > Project`, puis importe le dépôt.
4. Vercel détecte Vite automatiquement. Clique sur `Deploy`.
5. Tu obtiendras une adresse publique en `vercel.app`.

## Limites de cette première version
- Les recettes et prix sont des exemples intégrés au code.
- Le choix du magasin est déjà présent dans l'interface, mais ne récupère pas encore les catalogues réels.
- Le calcul de budget est indicatif. Il faudra ensuite connecter des sources de prix fiables, gérer les formats de paquets et recalculer le panier réel.
