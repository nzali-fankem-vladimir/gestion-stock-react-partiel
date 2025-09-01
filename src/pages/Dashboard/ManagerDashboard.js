import React from 'react';

/**
 * Tableau de bord Gestionnaire - accès étendu
 */
const TableauDeBordGestionnaire = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2><i className="fas fa-user-tie text-warning"></i> Tableau de bord Gestionnaire</h2>
          <p className="text-muted">Gestion des stocks, commandes et relations clients/fournisseurs</p>
          
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="card text-white bg-primary mb-3">
                <div className="card-header"><i className="fas fa-boxes"></i> Articles</div>
                <div className="card-body">
                  <h4 className="card-title">150</h4>
                  <p className="card-text">Gestion complète</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card text-white bg-success mb-3">
                <div className="card-header"><i className="fas fa-users"></i> Clients</div>
                <div className="card-body">
                  <h4 className="card-title">45</h4>
                  <p className="card-text">Clients actifs</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card text-white bg-info mb-3">
                <div className="card-header"><i className="fas fa-truck"></i> Fournisseurs</div>
                <div className="card-body">
                  <h4 className="card-title">12</h4>
                  <p className="card-text">Partenaires</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card text-white bg-warning mb-3">
                <div className="card-header"><i className="fas fa-shopping-cart"></i> Commandes</div>
                <div className="card-body">
                  <h4 className="card-title">23</h4>
                  <p className="card-text">En cours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="alert alert-warning">
                <h5><i className="fas fa-briefcase"></i> Responsabilités Gestionnaire</h5>
                <ul className="mb-0">
                  <li>Gestion des articles et catégories</li>
                  <li>Supervision des stocks et mouvements</li>
                  <li>Gestion des clients et fournisseurs</li>
                  <li>Traitement des commandes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableauDeBordGestionnaire;