import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { utiliserAuth } from '../../context/AuthContext';
import { serviceUtilisateur } from '../../services/api';
import './Profile.css';

/**
 * Page de profil utilisateur
 */
const Profil = () => {
  const naviguer = useNavigate();
  const { utilisateur, seConnecter } = utiliserAuth();

  const [profil, setProfil] = useState({
    nom: '',
    prenom: '',
    email: '',
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
  const [succes, setSucces] = useState('');

  useEffect(() => {
    if (utilisateur) {
      setProfil({
        ...utilisateur,
        adresse: utilisateur.adresse || {
          adresse1: '',
          ville: '',
          codePostal: '',
          pays: 'France'
        }
      });
    }
  }, [utilisateur]);

  const gererChangement = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('adresse.')) {
      const champAdresse = name.split('.')[1];
      setProfil(prev => ({
        ...prev,
        adresse: {
          ...prev.adresse,
          [champAdresse]: value
        }
      }));
    } else {
      setProfil(prev => ({
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

    if (!profil.nom.trim()) {
      nouvellesErreurs.nom = 'Le nom est obligatoire';
    }
    if (!profil.prenom.trim()) {
      nouvellesErreurs.prenom = 'Le prénom est obligatoire';
    }
    if (!profil.email.trim()) {
      nouvellesErreurs.email = 'L\'email est obligatoire';
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
      
      await serviceUtilisateur.modifier(profil);
      
      // Mettre à jour le contexte utilisateur
      seConnecter(profil, localStorage.getItem('jeton'));
      setSucces('Profil mis à jour avec succès');
      
    } catch (erreur) {
      setErreurs({ general: 'Erreur lors de la mise à jour du profil' });
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="page-profil">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-user-edit"></i>
            Mon profil
          </h2>
          <p className="text-muted">Gérez vos informations personnelles</p>
        </div>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => naviguer('/changer-mot-de-passe')}
        >
          <i className="fas fa-key"></i> Changer mot de passe
        </button>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="avatar-profil mb-3">
                {profil.photo ? (
                  <img
                    src={profil.photo}
                    alt="Photo de profil"
                    className="photo-profil"
                  />
                ) : (
                  <div className="avatar-initiales-profil">
                    {profil.nom?.charAt(0)}{profil.prenom?.charAt(0)}
                  </div>
                )}
              </div>
              <h5>{profil.nom} {profil.prenom}</h5>
              <p className="text-muted">{profil.email}</p>
              <span className="badge bg-primary">
                {utilisateur?.roles?.[0]?.roleName || 'Utilisateur'}
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              {erreurs.general && (
                <div className="alert alert-danger" role="alert">
                  {erreurs.general}
                </div>
              )}

              {succes && (
                <div className="alert alert-success" role="alert">
                  {succes}
                </div>
              )}

              <form onSubmit={gererSoumission}>
                <div className="section-formulaire">
                  <h5 className="section-titre">
                    <i className="fas fa-user"></i>
                    Informations personnelles
                  </h5>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nom *</label>
                      <input
                        type="text"
                        className={`form-control ${erreurs.nom ? 'is-invalid' : ''}`}
                        name="nom"
                        value={profil.nom}
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
                        value={profil.prenom}
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
                        value={profil.email}
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
                        value={profil.numTel}
                        onChange={gererChangement}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date de naissance</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dateNaissance"
                        value={profil.dateNaissance}
                        onChange={gererChangement}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Photo (URL)</label>
                      <input
                        type="url"
                        className="form-control"
                        name="photo"
                        value={profil.photo}
                        onChange={gererChangement}
                      />
                    </div>
                  </div>
                </div>

                <div className="section-formulaire">
                  <h5 className="section-titre">
                    <i className="fas fa-map-marker-alt"></i>
                    Adresse
                  </h5>
                  
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label">Adresse</label>
                      <input
                        type="text"
                        className="form-control"
                        name="adresse.adresse1"
                        value={profil.adresse.adresse1}
                        onChange={gererChangement}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Code postal</label>
                      <input
                        type="text"
                        className="form-control"
                        name="adresse.codePostal"
                        value={profil.adresse.codePostal}
                        onChange={gererChangement}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Ville</label>
                      <input
                        type="text"
                        className="form-control"
                        name="adresse.ville"
                        value={profil.adresse.ville}
                        onChange={gererChangement}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Pays</label>
                      <input
                        type="text"
                        className="form-control"
                        name="adresse.pays"
                        value={profil.adresse.pays}
                        onChange={gererChangement}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
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
                        <i className="fas fa-save"></i> Sauvegarder
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
  );
};

export default Profil;