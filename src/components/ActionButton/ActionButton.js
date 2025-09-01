import React from 'react';
import './ActionButton.css';

/**
 * Composant de boutons d'action pour les tableaux
 * Fournit les actions modifier et supprimer
 */
const BoutonAction = ({ onModifier, onSupprimer, onVoir }) => {
  return (
    <div className="boutons-action">
      {onVoir && (
        <button
          className="btn btn-sm btn-outline-info me-1"
          onClick={onVoir}
          title="Voir les détails"
        >
          <i className="fas fa-eye"></i>
        </button>
      )}
      
      {onModifier && (
        <button
          className="btn btn-sm btn-outline-primary me-1"
          onClick={onModifier}
          title="Modifier"
        >
          <i className="fas fa-edit"></i>
        </button>
      )}
      
      {onSupprimer && (
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={onSupprimer}
          title="Supprimer"
        >
          <i className="fas fa-trash"></i>
        </button>
      )}
    </div>
  );
};

export default BoutonAction;