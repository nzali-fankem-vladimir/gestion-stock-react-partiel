import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { utiliserAuth } from '../../context/AuthContext';
import './Menu.css';

/**
 * Composant de menu - identique à Angular avec accordéon
 */
const Menu = () => {
  const naviguer = useNavigate();
  const emplacement = useLocation();
  const { utilisateur } = utiliserAuth();
  const [dernierMenuSelectionne, setDernierMenuSelectionne] = useState(null);

  /**
   * Vérifie si l'utilisateur a accès à un élément de menu
   */
  const aAcces = (rolesRequis) => {
    if (!utilisateur?.roles || utilisateur.roles.length === 0) {
      return false;
    }
    
    const roleUtilisateur = utilisateur.roles[0].roleName;
    return rolesRequis.includes(roleUtilisateur);
  };

  /**
   * Structure du menu avec contrôle d'accès par rôle
   */
  const proprietesMenu = [
    {
      id: '1',
      titre: 'Tableau de bord',
      icon: 'fas fa-chart-line',
      url: '',
      roles: ['ADMIN', 'MANAGER', 'USER'],
      sousMenu: [
        {
          id: '11',
          titre: 'Vue d\'ensemble',
          icon: 'fas fa-chart-pie',
          url: '',
          roles: ['ADMIN', 'MANAGER', 'USER']
        },
        {
          id: '12',
          titre: 'Statistiques',
          icon: 'fas fa-chart-bar',
          url: 'statistiques',
          roles: ['ADMIN', 'MANAGER', 'USER']
        }
      ]
    },
    {
      id: '2',
      titre: 'Articles',
      icon: 'fas fa-boxes',
      url: '',
      roles: ['ADMIN', 'MANAGER', 'USER'],
      sousMenu: [
        {
          id: '21',
          titre: 'Articles',
          icon: 'fas fa-boxes',
          url: 'articles',
          roles: ['ADMIN', 'MANAGER', 'USER']
        },
        {
          id: '22',
          titre: 'Mouvements du stock',
          icon: 'fab fa-stack-overflow',
          url: 'mvtstk',
          roles: ['ADMIN', 'MANAGER']
        }
      ]
    },
    {
      id: '3',
      titre: 'Clients',
      icon: 'fas fa-users',
      url: '',
      roles: ['ADMIN', 'MANAGER'],
      sousMenu: [
        {
          id: '31',
          titre: 'Clients',
          icon: 'fas fa-users',
          url: 'clients',
          roles: ['ADMIN', 'MANAGER']
        },
        {
          id: '32',
          titre: 'Commandes clients',
          icon: 'fas fa-shopping-basket',
          url: 'commandesclient',
          roles: ['ADMIN', 'MANAGER']
        }
      ]
    },
    {
      id: '4',
      titre: 'Fournisseurs',
      icon: 'fas fa-users',
      url: '',
      roles: ['ADMIN', 'MANAGER'],
      sousMenu: [
        {
          id: '41',
          titre: 'Fournisseurs',
          icon: 'fas fa-users',
          url: 'fournisseurs',
          roles: ['ADMIN', 'MANAGER']
        },
        {
          id: '42',
          titre: 'Commandes fournisseurs',
          icon: 'fas fa-truck',
          url: 'commandesfournisseur',
          roles: ['ADMIN', 'MANAGER']
        }
      ]
    },
    {
      id: '5',
      titre: 'Parametrages',
      icon: 'fas fa-cogs',
      url: '',
      roles: ['ADMIN'],
      sousMenu: [
        {
          id: '51',
          titre: 'Categories',
          icon: 'fas fa-tools',
          url: 'categories',
          roles: ['ADMIN', 'MANAGER']
        },
        {
          id: '52',
          titre: 'Utilisateurs',
          icon: 'fas fa-users-cog',
          url: 'utilisateurs',
          roles: ['ADMIN']
        }
      ]
    }
  ];

  /**
   * Filtre les menus selon les droits d'accès
   */
  const menusAutorises = proprietesMenu.filter(menu => aAcces(menu.roles));

  /**
   * Navigation identique à Angular
   */
  const naviguerVers = (menu) => {
    if (dernierMenuSelectionne) {
      dernierMenuSelectionne.active = false;
    }
    menu.active = true;
    setDernierMenuSelectionne(menu);
    naviguer(`/${menu.url}`);
  };

  /**
   * Vérifie si un menu est actif
   */
  const estActif = (url) => {
    return emplacement.pathname === `/${url}` || (url === '' && emplacement.pathname === '/');
  };

  return (
    <div className="accordion" id="appMenuAccordion">
      {menusAutorises.map((menu) => (
        <div className="card" key={menu.id}>
          <div className="card-header" id={`menu${menu.id}`}>
            <h2 className="mb-0">
              <button 
                className="btn btn-link btn-block text-left" 
                type="button" 
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${menu.id}`} 
                aria-expanded="true" 
                aria-controls={`collapse${menu.id}`}
              >
                <i className={menu.icon}></i>&nbsp;
                {menu.titre}
              </button>
            </h2>
          </div>

          <div 
            id={`collapse${menu.id}`} 
            className="collapse" 
            aria-labelledby={`menu${menu.id}`} 
            data-bs-parent="#appMenuAccordion"
          >
            <div className="card">
              <ul className="list-group list-group-flush">
                {menu.sousMenu.filter(sousMenu => aAcces(sousMenu.roles)).map((sousMenu) => (
                  <li 
                    key={sousMenu.id}
                    className={`list-group-item ${estActif(sousMenu.url) ? 'text-white bg-primary' : ''}`}
                  >
                    <button 
                      type="button"
                      className="btn btn-link p-0 text-start w-100"
                      onClick={() => naviguerVers(sousMenu)}
                      style={{color: 'inherit', textDecoration: 'none', border: 'none', background: 'none'}}
                    >
                      <i className={sousMenu.icon}></i>&nbsp;
                      {sousMenu.titre}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;