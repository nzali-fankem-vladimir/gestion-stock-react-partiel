import React from 'react';
import { Navigate } from 'react-router-dom';
import { utiliserAuth } from '../../context/AuthContext';

/**
 * Composant de protection des routes basé sur les rôles
 */
const RouteProtegeeParRole = ({ children, rolesAutorises }) => {
  const { utilisateur, estAuthentifie } = utiliserAuth();

  if (!estAuthentifie()) {
    return <Navigate to="/login" replace />;
  }

  const aAcces = () => {
    if (!utilisateur?.roles || utilisateur.roles.length === 0) {
      return false;
    }
    
    const roleUtilisateur = utilisateur.roles[0].roleName;
    return rolesAutorises.includes(roleUtilisateur);
  };

  if (!aAcces()) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h4><i className="fas fa-exclamation-triangle"></i> Accès refusé</h4>
          <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default RouteProtegeeParRole;