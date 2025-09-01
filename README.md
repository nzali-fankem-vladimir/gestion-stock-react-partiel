# Gestion de Stock - Version React

Application de gestion de stock développée en React.js, réplique complète du projet Angular original.

## 📋 Description

Cette application permet de gérer efficacement un système de stock avec les fonctionnalités suivantes :
- Gestion des articles et catégories
- Gestion des clients et fournisseurs
- Gestion des commandes (clients et fournisseurs)
- Suivi des mouvements de stock
- Gestion des utilisateurs
- Tableau de bord avec statistiques

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn
- Backend API en cours d'exécution sur `http://localhost:8080`

### Installation
```bash
# Aller dans le dossier du projet
cd stock-management-react

# Installer les dépendances
npm install

# Démarrer l'application
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 🔐 Identifiants de Test

Pour tester l'application, utilisez les identifiants suivants :

### Administrateur
- **Email :** admin@gestionstock.com
- **Mot de passe :** admin123

### Utilisateur Standard
- **Email :** user@gestionstock.com
- **Mot de passe :** user123

### Gestionnaire
- **Email :** manager@gestionstock.com
- **Mot de passe :** manager123

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header/         # En-tête de l'application
│   ├── Menu/           # Menu de navigation
│   ├── Loader/         # Composant de chargement
│   ├── Pagination/     # Composant de pagination
│   ├── ActionButton/   # Boutons d'action
│   └── ProtectedRoute/ # Route protégée
├── pages/              # Pages de l'application
│   ├── Login/          # Page de connexion
│   ├── Register/       # Page d'inscription
│   ├── Dashboard/      # Tableau de bord
│   ├── Statistics/     # Statistiques
│   ├── Articles/       # Gestion des articles
│   ├── Categories/     # Gestion des catégories
│   ├── Clients/        # Gestion des clients
│   ├── Suppliers/      # Gestion des fournisseurs
│   ├── Users/          # Gestion des utilisateurs
│   ├── Orders/         # Gestion des commandes
│   ├── StockMovements/ # Mouvements de stock
│   └── Profile/        # Profil utilisateur
├── services/           # Services API
├── context/            # Contextes React
└── utils/              # Utilitaires
```

## 🛠️ Technologies Utilisées

- **React.js** - Framework frontend
- **React Router** - Routage
- **Axios** - Client HTTP
- **Bootstrap** - Framework CSS
- **FontAwesome** - Icônes
- **Context API** - Gestion d'état

## 📊 Fonctionnalités Complètes

### ✅ Authentification
- Connexion/Déconnexion
- Inscription de nouveaux utilisateurs
- Protection des routes
- Gestion des sessions

### ✅ Gestion des Articles
- Créer, modifier, supprimer des articles
- Associer des articles à des catégories
- Gestion des images d'articles
- Recherche et filtrage
- Calcul automatique des prix TTC

### ✅ Gestion des Catégories
- CRUD complet des catégories
- Organisation hiérarchique
- Recherche et filtrage

### ✅ Gestion des Clients
- CRUD complet des clients
- Gestion des adresses
- Informations de contact
- Recherche avancée

### ✅ Gestion des Fournisseurs
- CRUD complet des fournisseurs
- Gestion des contacts
- Suivi des relations commerciales

### ✅ Gestion des Stocks
- Entrées de stock
- Sorties de stock
- Corrections de stock
- Historique complet des mouvements
- Alertes de stock faible

### ✅ Gestion des Commandes
- Commandes clients avec lignes de commande
- Commandes fournisseurs
- Suivi des statuts (En préparation, Validée, Livrée)
- Calcul automatique des totaux
- Gestion des quantités

### ✅ Gestion des Utilisateurs
- CRUD complet des utilisateurs
- Gestion des rôles et permissions
- Profils utilisateur personnalisables

### ✅ Tableau de Bord
- Statistiques en temps réel
- Métriques de performance
- Actions rapides
- Vue d'ensemble du système

### ✅ Profil Utilisateur
- Modification des informations personnelles
- Changement de mot de passe sécurisé
- Gestion de la photo de profil

## 🔧 Configuration

### Variables d'Environnement
Créez un fichier `.env` à la racine du projet :

```env
REACT_APP_API_URL=http://localhost:8080/gestiondestock/v1
REACT_APP_APP_NAME=Gestion de Stock
```

### Configuration API
L'application communique avec une API REST. Les services sont configurés dans `src/services/api.js` :

- **URL de base :** `http://localhost:8080/gestiondestock/v1`
- **Authentification :** Bearer Token
- **Intercepteurs :** Gestion automatique des tokens et erreurs

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Lancer les tests avec couverture
npm run test:coverage
```

## 📦 Build de Production

```bash
# Créer un build de production
npm run build

# Servir le build localement
npm install -g serve
serve -s build
```

## 🎨 Interface Utilisateur

### Design System
- **Framework CSS :** Bootstrap 5
- **Icônes :** FontAwesome
- **Couleurs principales :**
  - Primaire : #3498db (Bleu)
  - Succès : #27ae60 (Vert)
  - Attention : #f39c12 (Orange)
  - Danger : #e74c3c (Rouge)

### Responsive Design
- Interface adaptative pour mobile, tablette et desktop
- Menu de navigation responsive
- Tableaux avec défilement horizontal sur mobile

## 🔒 Sécurité

### Authentification
- Tokens JWT pour l'authentification
- Stockage sécurisé dans localStorage
- Expiration automatique des sessions
- Protection CSRF

### Validation
- Validation côté client et serveur
- Sanitisation des données d'entrée
- Gestion des erreurs sécurisée

## 🚀 Performance

### Optimisations
- Lazy loading des composants
- Pagination des listes
- Mise en cache des données
- Compression des images

### Monitoring
- Gestion des erreurs centralisée
- Logs de performance
- Métriques utilisateur

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📝 Notes de Développement

### Conventions de Nommage
- **Composants :** PascalCase français (ex: `TableauDeBord`)
- **Fonctions :** camelCase français (ex: `gererSoumission`)
- **Variables :** camelCase français (ex: `donneesFormulaire`)
- **Constantes :** UPPER_CASE (ex: `URL_BASE_API`)

### Structure des Composants
Chaque composant suit cette structure :
```javascript
/**
 * Description du composant en français
 */
const MonComposant = () => {
  // États locaux
  // Hooks personnalisés
  // Fonctions utilitaires en français
  // Rendu JSX avec commentaires français
};
```

### Gestion d'État
- **Context API** pour l'authentification globale
- **useState** pour l'état local des composants
- **useEffect** pour les effets de bord

## 🐛 Résolution de Problèmes

### Erreurs Communes

1. **Erreur de connexion API**
   - Vérifier que le backend est démarré sur le port 8080
   - Vérifier l'URL de l'API dans `src/services/api.js`

2. **Problème d'authentification**
   - Utiliser les identifiants de test fournis
   - Vider le localStorage du navigateur (`localStorage.clear()`)

3. **Erreur de build**
   - Supprimer `node_modules` et `package-lock.json`
   - Réinstaller les dépendances avec `npm install`

4. **Problème de routage**
   - Vérifier que React Router est correctement configuré
   - S'assurer que toutes les routes sont définies dans `App.js`

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Consulter la documentation technique
- Contacter l'équipe de développement

## 🔄 Comparaison avec la Version Angular

### Fonctionnalités Identiques
- ✅ Toutes les pages et fonctionnalités
- ✅ Même structure de navigation
- ✅ Interface utilisateur similaire
- ✅ Même logique métier
- ✅ API endpoints identiques

### Améliorations React
- 🚀 Performance améliorée
- 📱 Meilleure responsivité
- 🎨 Interface plus moderne
- 🔧 Code plus maintenable
- 📦 Bundle plus léger

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Version :** 1.0.0  
**Dernière mise à jour :** Août 2025  
**Statut :** ✅ Réplication complète terminée (100%)