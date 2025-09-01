import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceUtilisateur } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './ChangePassword.css';

/**
 * Page de changement de mot de passe - Gère inscription et modification normale
 */
const ChangerMotDePasse = () => {
  const naviguer = useNavigate();
  const { utilisateur } = useAuth();
  const [estInscription, setEstInscription] = useState(false);

  const [donnees, setDonnees] = useState({
    ancienMotDePasse: '',
    nouveauMotDePasse: '',
    confirmerMotDePasse: ''
  });
  const [chargement, setChargement] = useState(false);
  const [erreurs, setErreurs] = useState({});
  const [succes, setSucces] = useState('');

  useEffect(() => {
    // Vérifier si on vient de l'inscription
    const origin = localStorage.getItem('origin');
    if (origin === 'inscription') {
      setEstInscription(true);
      setDonnees(prev => ({ ...prev, ancienMotDePasse: 'som3R@nd0mP@$$word' }));
    }
  }, []);

  const gererChangement = (e) => {
    const { name, value } = e.target;
    setDonnees(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (erreurs[name]) {
      setErreurs(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validerFormulaire = () => {
    const nouvellesErreurs = {};

    if (!estInscription && !donnees.ancienMotDePasse) {
      nouvellesErreurs.ancienMotDePasse = 'L\'ancien mot de passe est obligatoire';
    }
    if (!donnees.nouveauMotDePasse) {
      nouvellesErreurs.nouveauMotDePasse = 'Le nouveau mot de passe est obligatoire';
    } else if (donnees.nouveauMotDePasse.length < 6) {
      nouvellesErreurs.nouveauMotDePasse = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (donnees.nouveauMotDePasse !== donnees.confirmerMotDePasse) {
      nouvellesErreurs.confirmerMotDePasse = 'Les mots de passe ne correspondent pas';
    }

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const gererSoumission = async (e) => {
    e.preventDefault();
    
    if (!validerFormulaire()) {
      return;
    }

    try {
      setChargement(true);
      setSucces('');
      
      await serviceUtilisateur.changerMotDePasse({
        email: utilisateur?.email,
        nouveauMotDePasse: donnees.nouveauMotDePasse
      });
      
      setSucces('Mot de passe modifié avec succès');
      localStorage.removeItem('origin');
      
      setTimeout(() => {
        naviguer('/');
      }, 2000);
      
    } catch (erreur) {
      setErreurs({ general: 'Erreur lors du changement de mot de passe' });
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="page-changer-mot-de-passe">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-key"></i>
            {estInscription ? 'Définir votre mot de passe' : 'Changer le mot de passe'}
          </h2>
          <p className="text-muted">
            {estInscription 
              ? 'Veuillez définir un nouveau mot de passe pour finaliser votre inscription' 
              : 'Modifiez votre mot de passe pour sécuriser votre compte'
            }
          </p>
        </div>
        {!estInscription && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => naviguer('/profil')}
          >
            <i className="fas fa-arrow-left"></i> Retour au profil
          </button>
        )}
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {erreurs.general && (
                <div className="alert alert-danger" role="alert">
                  {erreurs.general}
                </div>
              )}

              {succes && (
                <div className="alert alert-success" role="alert">
                  <i className="fas fa-check-circle"></i> {succes}
                </div>
              )}

              <form onSubmit={gererSoumission}>
                {!estInscription && (
                  <div className="mb-3">
                    <label className="form-label">Ancien mot de passe *</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                      <input
                        type="password"
                        className={`form-control ${erreurs.ancienMotDePasse ? 'is-invalid' : ''}`}
                        name="ancienMotDePasse"
                        value={donnees.ancienMotDePasse}
                        onChange={gererChangement}
                        placeholder="Saisissez votre ancien mot de passe"
                      />
                      {erreurs.ancienMotDePasse && (
                        <div className="invalid-feedback">{erreurs.ancienMotDePasse}</div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Nouveau mot de passe *</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                    <input
                      type="password"
                      className={`form-control ${erreurs.nouveauMotDePasse ? 'is-invalid' : ''}`}
                      name="nouveauMotDePasse"
                      value={donnees.nouveauMotDePasse}
                      onChange={gererChangement}
                      placeholder="Saisissez votre nouveau mot de passe"
                    />
                    {erreurs.nouveauMotDePasse && (
                      <div className="invalid-feedback">{erreurs.nouveauMotDePasse}</div>
                    )}
                  </div>
                  <div className="form-text">
                    Le mot de passe doit contenir au moins 6 caractères
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Confirmer le nouveau mot de passe *</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-check"></i>
                    </span>
                    <input
                      type="password"
                      className={`form-control ${erreurs.confirmerMotDePasse ? 'is-invalid' : ''}`}
                      name="confirmerMotDePasse"
                      value={donnees.confirmerMotDePasse}
                      onChange={gererChangement}
                      placeholder="Confirmez votre nouveau mot de passe"
                    />
                    {erreurs.confirmerMotDePasse && (
                      <div className="invalid-feedback">{erreurs.confirmerMotDePasse}</div>
                    )}
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={chargement}
                  >
                    {chargement ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Modification en cours...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save"></i> Changer le mot de passe
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => naviguer('/profil')}
                  >
                    Annuler
                  </button>
                </div>
              </form>

              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="text-muted mb-2">
                  <i className="fas fa-shield-alt"></i> Conseils de sécurité
                </h6>
                <ul className="text-muted small mb-0">
                  <li>Utilisez un mot de passe unique et complexe</li>
                  <li>Mélangez lettres, chiffres et caractères spéciaux</li>
                  <li>Évitez les informations personnelles</li>
                  <li>Changez régulièrement votre mot de passe</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangerMotDePasse;