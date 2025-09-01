import React from 'react';

/**
 * Tableau de bord Utilisateur - accès limité
 */
const TableauDeBordUtilisateur = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2><i className="fas fa-user text-success"></i> Tableau de bord Utilisateur</h2>
          <p className="text-muted">Consultation des informations et opérations de base</p>
          
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card text-white bg-primary mb-3">
                <div className="card-header"><i className="fas fa-eye"></i> Articles</div>
                <div className="card-body">
                  <h4 className="card-title">150</h4>
                  <p className="card-text">Consultation seule</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-header"><i className="fas fa-chart-bar"></i> Statistiques</div>
                <div className="card-body">
                  <h4 className="card-title">Accès</h4>
                  <p className="card-text">Lecture seule</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card text-white bg-info mb-3">
                <div className="card-header"><i className="fas fa-user-circle"></i> Profil</div>
                <div className="card-body">
                  <h4 className="card-title">Modifiable</h4>
                  <p className="card-text">Vos informations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="alert alert-success">
                <h5><i className="fas fa-info-circle"></i> Accès Utilisateur</h5>
                <ul className="mb-0">
                  <li>Consultation des articles et stocks</li>
                  <li>Visualisation des statistiques</li>
                  <li>Modification de votre profil personnel</li>
                  <li>Accès aux rapports de base</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableauDeBordUtilisateur;