import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serviceUtilisateur } from '../../services/api';
import './NewUser.css';

/**
 * Page de création/modification d'un utilisateur
 */
const NouvelUtilisateur = () => {
  const naviguer = useNavigate();
  const { id } = useParams();
  const estModification = !!id;

  const [utilisateur, setUtilisateur] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    confirmerMotDePasse: '',
    numTel: '',
    dateNaissance: '',
    photo: '',
    adresse: {
      adresse1: '',
      ville: '',
      codePostal: '',
      pays: 'France'
    }
  });
  const [chargement, setChargement] = useState(false);
  const [erreurs, setErreurs] = useState({});

  useEffect(() => {
    if (estModification) {
      chargerUtilisateur();
    }
  }, [id]);

  const chargerUtilisateur = async () => {
    try {
      setChargement(true);
      const reponse = await serviceUtilisateur.obtenirParId(id);
      setUtilisateur(reponse.data);
    } catch (erreur) {
      console.error('Erreur:', erreur);
    } finally {
      setChargement(false);
    }
  };

  const gererChangement = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('adresse.')) {
      const champAdresse = name.split('.')[1];
      setUtilisateur(prev => ({
        ...prev,
        adresse: {
          ...prev.adresse,
          [champAdresse]: value
        }
      }));
    } else {
      setUtilisateur(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (erreurs[name]) {
      setErreurs(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validerFormulaire = () => {
    const nouvellesErreurs = {};

    if (!utilisateur.nom.trim()) {
      nouvellesErreurs.nom = 'Le nom est obligatoire';
    }
    if (!utilisateur.prenom.trim()) {
      nouvellesErreurs.prenom = 'Le prénom est obligatoire';
    }
    if (!utilisateur.email.trim()) {
      nouvellesErreurs.email = 'L\'email est obligatoire';
    }
    if (!estModification && !utilisateur.motDePasse) {
      nouvellesErreurs.motDePasse = 'Le mot de passe est obligatoire';
    }
    if (!estModification && utilisateur.motDePasse !== utilisateur.confirmerMotDePasse) {
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
      
      if (estModification) {
        await serviceUtilisateur.modifier(utilisateur);
      } else {
        await serviceUtilisateur.creer(utilisateur);
      }
      
      naviguer('/utilisateurs');
    } catch (erreur) {
      setErreurs({ general: 'Erreur lors de la sauvegarde' });
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="page-nouvel-utilisateur">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-user-plus"></i>
            {estModification ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
          </h2>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => naviguer('/utilisateurs')}
        >
          <i className="fas fa-arrow-left"></i> Retour
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          {erreurs.general && (
            <div className="alert alert-danger" role="alert">
              {erreurs.general}
            </div>
          )}

          <form onSubmit={gererSoumission}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Nom *</label>
                <input
                  type="text"
                  className={`form-control ${erreurs.nom ? 'is-invalid' : ''}`}
                  name="nom"
                  value={utilisateur.nom}
                  onChange={gererChangement}
                />
                {erreurs.nom && <div className="invalid-feedback">{erreurs.nom}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Prénom *</label>
                <input
                  type="text"
                  className={`form-control ${erreurs.prenom ? 'is-invalid' : ''}`}
                  name="prenom"
                  value={utilisateur.prenom}
                  onChange={gererChangement}
                />
                {erreurs.prenom && <div className="invalid-feedback">{erreurs.prenom}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className={`form-control ${erreurs.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={utilisateur.email}
                  onChange={gererChangement}
                />
                {erreurs.email && <div className="invalid-feedback">{erreurs.email}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Téléphone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="numTel"
                  value={utilisateur.numTel}
                  onChange={gererChangement}
                />
              </div>

              {!estModification && (
                <>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mot de passe *</label>
                    <input
                      type="password"
                      className={`form-control ${erreurs.motDePasse ? 'is-invalid' : ''}`}
                      name="motDePasse"
                      value={utilisateur.motDePasse}
                      onChange={gererChangement}
                    />
                    {erreurs.motDePasse && <div className="invalid-feedback">{erreurs.motDePasse}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Confirmer mot de passe *</label>
                    <input
                      type="password"
                      className={`form-control ${erreurs.confirmerMotDePasse ? 'is-invalid' : ''}`}
                      name="confirmerMotDePasse"
                      value={utilisateur.confirmerMotDePasse}
                      onChange={gererChangement}
                    />
                    {erreurs.confirmerMotDePasse && <div className="invalid-feedback">{erreurs.confirmerMotDePasse}</div>}
                  </div>
                </>
              )}

              <div className="col-md-6 mb-3">
                <label className="form-label">Date de naissance</label>
                <input
                  type="date"
                  className="form-control"
                  name="dateNaissance"
                  value={utilisateur.dateNaissance}
                  onChange={gererChangement}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Photo (URL)</label>
                <input
                  type="url"
                  className="form-control"
                  name="photo"
                  value={utilisateur.photo}
                  onChange={gererChangement}
                />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => naviguer('/utilisateurs')}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={chargement}
              >
                {chargement ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i>
                    {estModification ? ' Modifier' : ' Créer'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NouvelUtilisateur;