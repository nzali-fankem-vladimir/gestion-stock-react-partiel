import axios from 'axios';
import {
  serviceAuthFictif,
  serviceArticleFictif,
  serviceCategorieFictif,
  serviceClientFictif,
  serviceFournisseurFictif,
  serviceUtilisateurFictif,
  serviceMouvementStockFictif,
  serviceCommandeClientFictif,
  serviceCommandeFournisseurFictif
} from './mockApi';

// Configuration pour basculer entre API réelle et fictive
const UTILISER_DONNEES_FICTIVES = false; // Utiliser l'API réelle

// URL de base de l'API backend
const URL_BASE_API = 'http://localhost:8081';

/**
 * Instance axios configurée avec les paramètres de base
 */
const api = axios.create({
  baseURL: URL_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Intercepteur pour ajouter automatiquement le token d'authentification
 */
api.interceptors.request.use(
  (config) => {
    // Ne pas ajouter le token pour les endpoints publics
    const urlsPubliques = ['/auth/authenticate', '/auth/register', '/entreprises/save'];
    const estUrlPublique = urlsPubliques.some(url => config.url?.includes(url));
    
    if (!estUrlPublique) {
      const jeton = localStorage.getItem('jeton');
      if (jeton) {
        config.headers.Authorization = `Bearer ${jeton}`;
      } else {
        // Rediriger vers login si pas de token
        console.warn('Token manquant pour l\'endpoint protégé:', config.url);
      }
    }
    return config;
  },
  (erreur) => {
    return Promise.reject(erreur);
  }
);

/**
 * Intercepteur pour gérer les erreurs de réponse
 */
api.interceptors.response.use(
  (reponse) => reponse,
  (erreur) => {
    if (erreur.response?.status === 401) {
      localStorage.removeItem('jeton');
      localStorage.removeItem('utilisateur');
      window.location.href = '/login';
    }
    return Promise.reject(erreur);
  }
);

// Services d'authentification
export const serviceAuth = UTILISER_DONNEES_FICTIVES ? serviceAuthFictif : {
  seConnecter: (identifiants) => api.post('/auth/authenticate', identifiants),
  sInscrire: (donneesUtilisateur) => api.post('/auth/register', donneesUtilisateur),
  obtenirUtilisateurParEmail: (email) => api.get(`/utilisateurs/find/${email}`),
};

// Services pour les articles
export const serviceArticle = UTILISER_DONNEES_FICTIVES ? serviceArticleFictif : {
  obtenirTous: () => api.get('/articles/all'),
  obtenirParId: (id) => api.get(`/articles/${id}`),
  creer: (article) => api.post('/articles/create', article),
  modifier: (article) => api.post('/articles/create', article),
  supprimer: (id) => api.delete(`/articles/delete/${id}`),
};

// Services pour les catégories
export const serviceCategorie = UTILISER_DONNEES_FICTIVES ? serviceCategorieFictif : {
  obtenirTous: () => api.get('/categories/all'),
  obtenirParId: (id) => api.get(`/categories/${id}`),
  creer: (categorie) => api.post('/categories/create', categorie),
  modifier: (categorie) => api.post('/categories/create', categorie),
  supprimer: (id) => api.delete(`/categories/delete/${id}`),
};

// Services pour les clients
export const serviceClient = UTILISER_DONNEES_FICTIVES ? serviceClientFictif : {
  obtenirTous: () => api.get('/clients/all'),
  obtenirParId: (id) => api.get(`/clients/${id}`),
  creer: (client) => api.post('/clients/create', client),
  modifier: (client) => api.post('/clients/create', client),
  supprimer: (id) => api.delete(`/clients/delete/${id}`),
};

// Services pour les fournisseurs
export const serviceFournisseur = UTILISER_DONNEES_FICTIVES ? serviceFournisseurFictif : {
  obtenirTous: () => api.get('/fournisseurs/all'),
  obtenirParId: (id) => api.get(`/fournisseurs/${id}`),
  creer: (fournisseur) => api.post('/fournisseurs/create', fournisseur),
  modifier: (fournisseur) => api.post('/fournisseurs/create', fournisseur),
  supprimer: (id) => api.delete(`/fournisseurs/delete/${id}`),
};

// Services pour les utilisateurs
export const serviceUtilisateur = UTILISER_DONNEES_FICTIVES ? serviceUtilisateurFictif : {
  obtenirTous: () => api.get('/utilisateurs/all'),
  obtenirParId: (id) => api.get(`/utilisateurs/${id}`),
  creer: (utilisateur) => api.post('/utilisateurs/create', utilisateur),
  modifier: (utilisateur) => api.post('/utilisateurs/create', utilisateur),
  supprimer: (id) => api.delete(`/utilisateurs/delete/${id}`),
  changerMotDePasse: (donneesMotDePasse) => api.post('/utilisateurs/update/password', donneesMotDePasse),
};

// Services pour les mouvements de stock
export const serviceMouvementStock = UTILISER_DONNEES_FICTIVES ? serviceMouvementStockFictif : {
  obtenirTous: () => api.get('/mvtstk/all'),
  obtenirParArticle: (idArticle) => api.get(`/mvtstk/filter/article/${idArticle}`),
  entreeStock: (mouvement) => api.post('/mvtstk/entree', mouvement),
  sortieStock: (mouvement) => api.post('/mvtstk/sortie', mouvement),
  correctionStock: (mouvement) => api.post('/mvtstk/correctionpos', mouvement),
};

// Services pour les commandes clients
export const serviceCommandeClient = UTILISER_DONNEES_FICTIVES ? serviceCommandeClientFictif : {
  obtenirTous: () => api.get('/commandesclients/all'),
  obtenirParId: (id) => api.get(`/commandesclients/${id}`),
  creer: (commande) => api.post('/commandesclients/create', commande),
  modifier: (commande) => api.post('/commandesclients/create', commande),
  supprimer: (id) => api.delete(`/commandesclients/delete/${id}`),
};

// Services pour les commandes fournisseurs
export const serviceCommandeFournisseur = UTILISER_DONNEES_FICTIVES ? serviceCommandeFournisseurFictif : {
  obtenirTous: () => api.get('/commandesfournisseurs/all'),
  obtenirParId: (id) => api.get(`/commandesfournisseurs/${id}`),
  creer: (commande) => api.post('/commandesfournisseurs/create', commande),
  modifier: (commande) => api.post('/commandesfournisseurs/create', commande),
  supprimer: (id) => api.delete(`/commandesfournisseurs/delete/${id}`),
};

// Services pour les entreprises
export const serviceEntreprise = {
  sInscrire: (entreprise) => api.post('/entreprises/save', entreprise),
};

export default api;