# Guide de Démarrage - Gestion de Stock

## Problèmes identifiés et corrigés

### 1. Configuration incorrecte du port API
- **Problème** : L'API frontend pointait vers le port 8080 mais le backend utilise 8081
- **Solution** : Correction de l'URL dans `src/services/api.js`

### 2. Configuration de sécurité trop permissive
- **Problème** : Tous les endpoints étaient accessibles sans authentification
- **Solution** : Modification de `SecurityConfig.java` pour protéger les endpoints

### 3. Gestion d'erreur insuffisante
- **Problème** : Pas de vérification d'existence avant suppression
- **Solution** : Ajout de vérifications dans les contrôleurs

### 4. Logs non sécurisés
- **Problème** : Données sensibles dans les logs
- **Solution** : Sanitisation des logs dans `Login.js`

## Étapes pour démarrer l'application

### 1. Démarrer la base de données PostgreSQL
```bash
# Assurez-vous que PostgreSQL est démarré
# Base de données : gestion_stock
# Utilisateur : postgres
# Mot de passe : vladimir
```

### 2. Démarrer le backend
```bash
cd backend-springboot
# Option 1 : Avec Maven (si installé)
mvn spring-boot:run

# Option 2 : Avec le script
run-backend.bat

# Option 3 : Avec Java directement
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### 3. Tester la connectivité
```bash
cd ..
node test-connectivity.js
```

### 4. Démarrer le frontend
```bash
npm start
```

## Identifiants de test
- **Admin** : admin@gestionstock.com / admin123
- **User** : user@gestionstock.com / user123
- **Manager** : manager@gestionstock.com / manager123

## Vérifications importantes

1. **Backend accessible** : http://localhost:8081/articles/all
2. **Frontend accessible** : http://localhost:3000
3. **Base de données connectée** : Vérifier les logs du backend
4. **Authentification fonctionnelle** : Tester la connexion

## Résolution des problèmes courants

### Articles/Utilisateurs ne s'affichent pas
1. Vérifier que le backend est démarré
2. Vérifier la connectivité avec `test-connectivity.js`
3. Vérifier l'authentification (token présent)
4. Consulter la console du navigateur pour les erreurs

### Erreur 401 Unauthorized
1. Se reconnecter pour obtenir un nouveau token
2. Vérifier que l'utilisateur existe en base
3. Vérifier la configuration JWT

### Erreur de connexion à la base
1. Vérifier que PostgreSQL est démarré
2. Vérifier les paramètres dans `application.yml`
3. Créer la base `gestion_stock` si nécessaire