import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { serviceEntreprise, serviceAuth } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Register.css';

/**
 * Page d'inscription - Logique identique à Angular
 * Crée une entreprise + utilisateur admin + connexion auto + redirection
 */
const Inscription = () => {
  const naviguer = useNavigate();
  const { seConnecter } = useAuth();
  
  // États pour le formulaire entreprise
  const [entrepriseDto, setEntrepriseDto] = useState({
    nom: '',
    codeFiscal: '',
    email: '',
    description: '',
    numTel: '',
    steWeb: ''
  });
  
  // États pour l'adresse
  const [adresse, setAdresse] = useState({
    adresse1: '',
    adresse2: '',
    ville: '',
    codePostale: '',
    pays: ''
  });
  
  const [errorsMsg, setErrorsMsg] = useState([]);
  const [chargement, setChargement] = useState(false);

  /**
   * Gère les changements dans le formulaire entreprise
   */
  const gererChangementEntreprise = (e) => {
    const { name, value } = e.target;
    setEntrepriseDto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Gère les changements dans le formulaire adresse
   */
  const gererChangementAdresse = (e) => {
    const { name, value } = e.target;
    setAdresse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Connexion automatique après inscription (logique Angular)
   */
  const connectEntreprise = async () => {
    try {
      const authenticationRequest = {
        login: entrepriseDto.email,
        password: 'som3R@nd0mP@$$word'
      };
      
      const response = await serviceAuth.seConnecter(authenticationRequest);
      const utilisateur = await serviceAuth.obtenirUtilisateurParEmail(authenticationRequest.login);
      
      seConnecter(utilisateur.data, response.data.accessToken);
      localStorage.setItem('origin', 'inscription');
      naviguer('/changermotdepasse');
      
    } catch (erreur) {
      console.error('Erreur connexion auto:', erreur);
      setErrorsMsg(['Inscription réussie mais erreur de connexion. Veuillez vous connecter manuellement.']);
      setTimeout(() => naviguer('/login'), 3000);
    }
  };

  /**
   * Inscription - Logique identique à Angular
   */
  const inscrire = async () => {
    try {
      setChargement(true);
      setErrorsMsg([]);
      
      // Préparer les données comme dans Angular
      const donneesEntreprise = {
        ...entrepriseDto,
        adresse: adresse
      };
      
      await serviceEntreprise.sInscrire(donneesEntreprise);
      await connectEntreprise();
      
    } catch (erreur) {
      console.error('Erreur inscription:', erreur);
      if (erreur.response?.data?.errors) {
        setErrorsMsg(erreur.response.data.errors);
      } else if (erreur.response?.data?.message) {
        setErrorsMsg([erreur.response.data.message]);
      } else if (typeof erreur.response?.data === 'string') {
        setErrorsMsg([erreur.response.data]);
      } else {
        setErrorsMsg(['Erreur lors de l\'inscription. Veuillez réessayer.']);
      }
    } finally {
      setChargement(false);
    }
  };

  /**
   * Gère la soumission du formulaire
   */
  const gererSoumission = (e) => {
    e.preventDefault();
    inscrire();
  };

  return (
    <div className="page-inscription">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg">
              <div className="card-header text-center">
                <h3>S'inscrire</h3>
              </div>
              <div className="card-body">
                {errorsMsg.length > 0 && (
                  <div className="alert alert-danger">
                    {errorsMsg.map((msg, index) => (
                      <div key={index}>{msg}</div>
                    ))}
                  </div>
                )}

                <form onSubmit={gererSoumission}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="nom"
                      placeholder="Nom"
                      value={entrepriseDto.nom}
                      onChange={gererChangementEntreprise}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="codeFiscal"
                      placeholder="Code fiscal"
                      value={entrepriseDto.codeFiscal}
                      onChange={gererChangementEntreprise}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="E-mail"
                      value={entrepriseDto.email}
                      onChange={gererChangementEntreprise}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="adresse1"
                      placeholder="Adresse 1"
                      value={adresse.adresse1}
                      onChange={gererChangementAdresse}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="adresse2"
                      placeholder="Adresse 2"
                      value={adresse.adresse2}
                      onChange={gererChangementAdresse}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="ville"
                      placeholder="Ville"
                      value={adresse.ville}
                      onChange={gererChangementAdresse}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="codePostale"
                      placeholder="Code postal"
                      value={adresse.codePostale}
                      onChange={gererChangementAdresse}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="pays"
                      placeholder="Pays"
                      value={adresse.pays}
                      onChange={gererChangementAdresse}
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      name="description"
                      placeholder="Description"
                      rows="3"
                      value={entrepriseDto.description}
                      onChange={gererChangementEntreprise}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="numTel"
                      placeholder="Numero de telephone"
                      value={entrepriseDto.numTel}
                      onChange={gererChangementEntreprise}
                    />
                  </div>

                  <div className="mb-3 d-flex justify-content-between">
                    <Link to="/login" className="btn btn-link">
                      Se connecter
                    </Link>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={chargement}
                    >
                      {chargement ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Inscription...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check"></i>&nbsp;S'inscrire
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

export default Inscription;