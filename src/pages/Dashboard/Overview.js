import React from 'react';
import { utiliserAuth } from '../../context/AuthContext';
import TableauDeBordAdmin from './AdminDashboard';
import TableauDeBordGestionnaire from './ManagerDashboard';
import TableauDeBordUtilisateur from './UserDashboard';

/**
 * Page Vue d'ensemble - tableau de bord basé sur le rôle utilisateur
 */
const VueEnsemble = () => {
  const { utilisateur } = utiliserAuth();

  /**
   * Détermine le rôle principal de l'utilisateur
   */
  const obtenirRolePrincipal = () => {
    if (!utilisateur?.roles || utilisateur.roles.length === 0) {
      return 'USER';
    }
    return utilisateur.roles[0].roleName;
  };

  const rolePrincipal = obtenirRolePrincipal();

  // Affichage du tableau de bord selon le rôle
  switch (rolePrincipal) {
    case 'ADMIN':
      return <TableauDeBordAdmin />;
    case 'MANAGER':
      return <TableauDeBordGestionnaire />;
    case 'USER':
    default:
      return <TableauDeBordUtilisateur />;
  }
};

export default VueEnsemble;