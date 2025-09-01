import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { utiliserAuth } from '../../context/AuthContext';
import { serviceAuth } from '../../services/api';
import './Login.css';

const Connexion = () => {
  const naviguer = useNavigate();
  const { seConnecter } = utiliserAuth();

  const [donneesFormulaire, setDonneesFormulaire] = useState({
    login: '',
    motDePasse: ''
  });
  const [messageErreur, setMessageErreur] = useState('');
  const [chargement, setChargement] = useState(false);

  const gererChangement = (e) => {
    const { name, value } = e.target;
    setDonneesFormulaire(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Détermine la route de redirection selon le rôle utilisateur
   */
  const obtenirRouteRedirection = (utilisateur) => {
    if (!utilisateur?.roles || utilisateur.roles.length === 0) {
      return '/';
    }
    
    const rolePrincipal = utilisateur.roles[0].roleName;
    
    switch (rolePrincipal) {
      case 'ADMIN':
        return '/?dashboard=admin';
      case 'MANAGER':
        return '/?dashboard=manager';
      case 'USER':
      default:
        return '/?dashboard=user';
    }
  };

  const gererSoumission = async (e) => {
    e.preventDefault();
    setChargement(true);
    setMessageErreur('');

    try {
      const reponseAuth = await serviceAuth.seConnecter({
        login: donneesFormulaire.login,
        password: donneesFormulaire.motDePasse
      });

      console.log('Authentification réussie');
      
      const reponseUtilisateur = await serviceAuth.obtenirUtilisateurParEmail(donneesFormulaire.login);
      console.log('Utilisateur récupéré avec succès');
      
      seConnecter(reponseUtilisateur.data, reponseAuth.data.accessToken);
      
      // Redirection basée sur le rôle
      const routeRedirection = obtenirRouteRedirection(reponseUtilisateur.data);
      naviguer(routeRedirection);
      
    } catch (erreur) {
      setMessageErreur('Email et/ou mot de passe incorrect(s)');
      console.error('Erreur de connexion:', erreur);
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="page-connexion">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="card shadow-lg">
        <div className="card-header text-center">
          <h3>Se connecter</h3>
        </div>
              <div className="card-body">
                {messageErreur && (
                  <div className="alert alert-danger" role="alert">
                    {messageErreur}
                  </div>
                )}

                <form onSubmit={gererSoumission}>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="login"
                      placeholder="E-mail"
                      value={donneesFormulaire.login}
                      onChange={gererChangement}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="motDePasse"
                      placeholder="Mot de passe"
                      value={donneesFormulaire.motDePasse}
                      onChange={gererChangement}
                      required
                    />
                  </div>
                  
                  <div className="mb-3 d-flex justify-content-between">
                    <Link to="/inscrire" className="btn btn-link">
                      S'inscrire
                    </Link>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={chargement}
                    >
                      {chargement ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Connexion...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check"></i>&nbsp;Se connecter
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connexion;