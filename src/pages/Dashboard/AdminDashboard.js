import React from 'react';

/**
 * Tableau de bord Administrateur - accès complet
 */
const TableauDeBordAdmin = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2><i className="fas fa-user-shield text-danger"></i> Tableau de bord Administrateur</h2>
          <p className="text-muted">Accès complet à toutes les fonctionnalités du système</p>
          
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="card text-white bg-danger mb-3">
                <div className="card-header"><i className="fas fa-users-cog"></i> Utilisateurs</div>
                <div className="card-body">
                  <h4 className="card-title">12</h4>
                  <p className="card-text">Gestion complète</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card text-white bg-primary mb-3">
                <div className="card-header"><i className="fas fa-boxes"></i> Articles</div>
                <div className="card-body">
                  <h4 className="card-title">150</h4>
                  <p className="card-text">Articles en stock</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card text-white bg-success mb-3">
                <div className="card-header"><i className="fas fa-chart-line"></i> Revenus</div>
                <div className="card-body">
                  <h4 className="card-title">€45,230</h4>
                  <p className="card-text">Ce mois</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card text-white bg-warning mb-3">
                <div className="card-header"><i className="fas fa-exclamation-triangle"></i> Alertes</div>
                <div className="card-body">
                  <h4 className="card-title">3</h4>
                  <p className="card-text">Nécessitent attention</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="alert alert-info">
                <h5><i className="fas fa-info-circle"></i> Privilèges Administrateur</h5>
                <ul className="mb-0">
                  <li>Gestion complète des utilisateurs et rôles</li>
                  <li>Accès à toutes les statistiques et rapports</li>
                  <li>Configuration système et paramètres avancés</li>
                  <li>Supervision de toutes les opérations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableauDeBordAdmin;