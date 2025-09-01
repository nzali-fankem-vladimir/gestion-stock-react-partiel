# Backend Spring Boot - Gestion de Stock

## 🚀 Démarrage rapide

### Prérequis
- Java 17 ou supérieur
- Maven 3.6+

### Installation et démarrage

1. **Installer les dépendances et démarrer:**
```bash
mvn spring-boot:run
```

2. **Le backend sera disponible sur:** `http://localhost:8081`

### 🔐 Comptes de test

Les mêmes identifiants que le frontend React :

- **Admin:** `admin@gestionstock.com` / `admin123`
- **Manager:** `manager@gestionstock.com` / `manager123`  
- **User:** `user@gestionstock.com` / `user123`

### 📊 Base de données H2

- **Console H2:** http://localhost:8081/h2-console
- **JDBC URL:** `jdbc:h2:mem:testdb`
- **Username:** `sa`
- **Password:** `password`

### 🔧 Endpoints principaux

- **Auth:** `POST /auth/authenticate`
- **Utilisateurs:** `GET /utilisateurs/all`
- **Articles:** `GET /articles/all`
- **Catégories:** `GET /categories/all`

### ✅ Test de connexion

1. Démarrer le backend
2. Démarrer le frontend React (`npm start`)
3. Se connecter avec `admin@gestionstock.com` / `admin123`

Le frontend est maintenant configuré pour utiliser l'API réelle !