import React from 'react';
import { Outlet } from 'react-router-dom';
import EnTete from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import './Dashboard.css';

/**
 * Layout principal - Menu à gauche, contenu à droite couvrant toute la largeur
 */
const TableauDeBord = () => {
  return (
    <div className="main-container">
      {/* Menu latéral à gauche */}
      <div className="menu-lateral">
        <div className="titre-menu">
          <h4>Gestion de stock</h4>
          <small className="form-text text-muted">By Ali Bouali</small>
        </div>
        <Menu />
      </div>

      {/* Zone de contenu à droite - prend tout l'espace restant */}
      <div className="zone-contenu-droite">
        {/* Header fixe en haut */}
        <div className="header-fixe">
          <EnTete />
        </div>
        
        {/* Contenu principal avec scroll */}
        <div className="contenu-principal">
          <Outlet />
        </div>
        
        {/* Footer fixe en bas */}
        <div className="footer-fixe">
          footer
        </div>
      </div>
    </div>
  );
};

export default TableauDeBord;