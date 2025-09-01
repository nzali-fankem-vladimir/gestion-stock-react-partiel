import React from 'react';
import { Navigate } from 'react-router-dom';
import { utiliserAuth } from '../../context/AuthContext';

/**
 * Composant de route protégée
 * Vérifie si l'utilisateur est authentifié avant d'afficher le contenu
 * Redirige vers la page de connexion si non authentifié
 */
const RouteProtegee = ({ children }) => {
  const { estAuthentifie, chargement } = utiliserAuth();

  // Affichage du loader pendant la vérification d'authentification
  if (chargement) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  // Retourne le contenu si authentifié, sinon redirige vers login
  return estAuthentifie() ? children : <Navigate to="/login" replace />;
};

export default RouteProtegee;