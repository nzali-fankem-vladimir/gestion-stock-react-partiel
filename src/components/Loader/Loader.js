import React from 'react';
import './Loader.css';

/**
 * Composant de chargement réutilisable
 * Affiche un spinner avec message personnalisable
 */
const Chargeur = ({ message = 'Chargement...', taille = 'normal' }) => {
  const getClasseTaille = () => {
    switch (taille) {
      case 'petit': return 'spinner-border-sm';
      case 'grand': return 'spinner-border-lg';
      default: return '';
    }
  };

  return (
    <div className="conteneur-chargeur">
      <div className={`spinner-border text-primary ${getClasseTaille()}`} role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      {message && taille !== 'petit' && (
        <div className="message-chargeur mt-2">
          {message}
        </div>
      )}
    </div>
  );
};

export default Chargeur;