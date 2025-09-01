import React, { createContext, useContext, useState, useEffect } from 'react';

// Création du contexte d'authentification
const ContexteAuth = createContext();

/**
 * Hook personnalisé pour utiliser le contexte d'authentification
 * @returns {Object} Contexte d'authentification
 */
export const useAuth = () => {
  const contexte = useContext(ContexteAuth);
  if (!contexte) {
    throw new Error('useAuth doit être utilisé dans un FournisseurAuth');
  }
  return contexte;
};

// Alias pour compatibilité
export const utiliserAuth = useAuth;

/**
 * Fournisseur de contexte d'authentification
 * Gère l'état global de l'authentification de l'utilisateur
 */
export const FournisseurAuth = ({ children }) => {
  // États pour gérer l'utilisateur connecté
  const [utilisateur, setUtilisateur] = useState(null);
  const [jeton, setJeton] = useState(localStorage.getItem('jeton'));
  const [chargement, setChargement] = useState(true);

  /**
   * Effet pour récupérer les données utilisateur au chargement
   */
  useEffect(() => {
    const utilisateurStocke = localStorage.getItem('utilisateur');
    if (utilisateurStocke && jeton) {
      setUtilisateur(JSON.parse(utilisateurStocke));
    }
    setChargement(false);
  }, [jeton]);

  /**
   * Fonction de connexion
   * @param {Object} donneesUtilisateur - Données de l'utilisateur
   * @param {string} jetonAuth - Token d'authentification
   */
  const seConnecter = (donneesUtilisateur, jetonAuth) => {
    setUtilisateur(donneesUtilisateur);
    setJeton(jetonAuth);
    localStorage.setItem('utilisateur', JSON.stringify(donneesUtilisateur));
    localStorage.setItem('jeton', jetonAuth);
  };

  /**
   * Fonction de déconnexion
   * Supprime toutes les données d'authentification
   */
  const seDeconnecter = () => {
    setUtilisateur(null);
    setJeton(null);
    localStorage.removeItem('utilisateur');
    localStorage.removeItem('jeton');
  };

  /**
   * Vérifie si l'utilisateur est authentifié
   * @returns {boolean} True si authentifié, false sinon
   */
  const estAuthentifie = () => {
    return !!jeton && !!utilisateur;
  };

  // Valeurs exposées par le contexte
  const valeur = {
    utilisateur,
    jeton,
    seConnecter,
    seDeconnecter,
    estAuthentifie,
    chargement
  };

  return (
    <ContexteAuth.Provider value={valeur}>
      {children}
    </ContexteAuth.Provider>
  );
};