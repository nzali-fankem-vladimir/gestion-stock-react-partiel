import React from 'react';
import { useNavigate } from 'react-router-dom';
import { utiliserAuth } from '../../context/AuthContext';
import './Header.css';

/**
 * Composant d'en-tête - identique à Angular
 */
const EnTete = () => {
  const naviguer = useNavigate();
  const { utilisateur, seDeconnecter } = utiliserAuth();

  /**
   * Navigue vers la page de profil
   */
  const allerAuProfil = (e) => {
    e.preventDefault();
    naviguer('/profil');
  };

  return (
    <div className="row">
      {/* Barre de recherche - identique à Angular */}
      <div className="col-md-8">
        <div className="input-group flex-nowrap">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Username" 
            aria-label="Username" 
            aria-describedby="addon-wrapping"
          />
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
      </div>

      {/* Informations utilisateur - identique à Angular */}
      <div className="col-md-4">
        <div className="row align-items-center">
          <div className="col-md-6 text-right">
            <span>Bonjour {utilisateur?.nom}&nbsp;</span>
            {utilisateur?.roles && utilisateur.roles.length > 0 && (
              <small className="text-muted d-block">
                ({utilisateur.roles[0].roleName})
              </small>
            )}
          </div>
          <div className="col-md-3">
            <button 
              onClick={allerAuProfil}
              style={{background: 'none', border: 'none', padding: 0}}
            >
              <img src="/favicon.ico" className="rounded-circle" alt="Profile" />
            </button>
          </div>
          <div className="col-md-3">
            <button 
              onClick={seDeconnecter}
              className="btn btn-outline-danger btn-sm"
              title="Déconnexion"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnTete;