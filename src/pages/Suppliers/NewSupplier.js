import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serviceFournisseur } from '../../services/api';
import './NewSupplier.css';

/**
 * Page de création/modification d'un fournisseur
 * Gère le formulaire d'ajout et de modification des fournisseurs
 */
const NouveauFournisseur = () => {
  const naviguer = useNavigate();
  const { id } = useParams();
  const estModification = !!id;

  // États pour le formulaire
  const [fournisseur, setFournisseur] = useState({
    nom: '',
    prenom: '',
    email: '',
    numTel: '',
    dateNaissance: '',
    photo: '',
    adresse: {
      adresse1: '',
      adresse2: '',
      ville: '',
      codePostal: '',
      pays: 'France'
    }
  });
  const [chargement, setChargement] = useState(false);
  const [erreurs, setErreurs] = useState({});

  /**
   * Charge les données au montage du composant
   */
  useEffect(() => {
    if (estModification) {
      chargerFournisseur();
    }
  }, [id]);

  /**
   * Charge les données du fournisseur à modifier
   */
  const chargerFournisseur = async () => {
    try {
      setChargement(true);
      const reponse = await serviceFournisseur.obtenirParId(id);
      setFournisseur(reponse.data);
    } catch (erreur) {
      console.error('Erreur lors du chargement du fournisseur:', erreur);
    } finally {
      setChargement(false);
    }
  };

  /**
   * Gère les changements dans le formulaire
   */
  const gererChangement = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('adresse.')) {
      const champAdresse = name.split('.')[1];
      setFournisseur(prev => ({
        ...prev,
        adresse: {
          ...prev.adresse,
          [champAdresse]: value
        }
      }));
    } else {
      setFournisseur(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Supprimer l'erreur du champ modifié
    if (erreurs[name]) {
      setErreurs(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Valide le formulaire
   */
  const validerFormulaire = () => {
    const nouvellesErreurs = {};

    if (!fournisseur.nom.trim()) {
      nouvellesErreurs.nom = 'Le nom est obligatoire';
    }
    if (!fournisseur.prenom.trim()) {
      nouvellesErreurs.prenom = 'Le prénom est obligatoire';
    }
    if (!fournisseur.email.trim()) {
      nouvellesErreurs.email = 'L\'email est obligatoire';
    } else if (!/\S+@\S+\.\S+/.test(fournisseur.email)) {
      nouvellesErreurs.email = 'L\'email n\'est pas valide';
    }

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  /**
   * Soumet le formulaire
   */
  const gererSoumission = async (e) => {
    e.preventDefault();
    
    if (!validerFormulaire()) {
      return;
    }

    try {
      setChargement(true);
      
      if (estModification) {
        await serviceFournisseur.modifier(fournisseur);
      } else {
        await serviceFournisseur.creer(fournisseur);
      }
      
      naviguer('/fournisseurs');
    } catch (erreur) {
      console.error('Erreur lors de la sauvegarde:', erreur);
      setErreurs({ general: 'Erreur lors de la sauvegarde du fournisseur' });
    } finally {
      setChargement(false);
    }
  };

  if (chargement && estModification) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page-nouveau-fournisseur">
      {/* En-tête */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-truck"></i>
            {estModification ? 'Modifier le fournisseur' : 'Nouveau fournisseur'}
          </h2>
          <p className="text-muted">
            {estModification ? 'Modifiez les informations du fournisseur' : 'Ajoutez un nouveau fournisseur à votre réseau'}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => naviguer('/fournisseurs')}
        >
          <i className="fas fa-arrow-left"></i> Retour
        </button>
      </div>

      {/* Formulaire */}
      <div className="card">
        <div className="card-body">
          {erreurs.general && (
            <div className="alert alert-danger" role="alert">
              {erreurs.general}
            </div>
          )}

          <form onSubmit={gererSoumission}>
            {/* Informations personnelles */}
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
                    value={fournisseur.nom}
                    onChange={gererChangement}
                    placeholder="Nom de famille"
                  />
                  {erreurs.nom && (
                    <div className="invalid-feedback">{erreurs.nom}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Prénom *</label>
                  <input
                    type="text"
                    className={`form-control ${erreurs.prenom ? 'is-invalid' : ''}`}
                    name="prenom"
                    value={fournisseur.prenom}
                    onChange={gererChangement}
                    placeholder="Prénom"
                  />
                  {erreurs.prenom && (
                    <div className="invalid-feedback">{erreurs.prenom}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className={`form-control ${erreurs.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={fournisseur.email}
                    onChange={gererChangement}
                    placeholder="adresse@email.com"
                  />
                  {erreurs.email && (
                    <div className="invalid-feedback">{erreurs.email}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Téléphone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="numTel"
                    value={fournisseur.numTel}
                    onChange={gererChangement}
                    placeholder="06 12 34 56 78"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Date de naissance</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateNaissance"
                    value={fournisseur.dateNaissance}
                    onChange={gererChangement}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Photo (URL)</label>
                  <input
                    type="url"
                    className="form-control"
                    name="photo"
                    value={fournisseur.photo}
                    onChange={gererChangement}
                    placeholder="https://exemple.com/photo.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Adresse */}
            <div className="section-formulaire">
              <h5 className="section-titre">
                <i className="fas fa-map-marker-alt"></i>
                Adresse
              </h5>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Adresse ligne 1</label>
                  <input
                    type="text"
                    className="form-control"
                    name="adresse.adresse1"
                    value={fournisseur.adresse.adresse1}
                    onChange={gererChangement}
                    placeholder="Numéro et nom de rue"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Adresse ligne 2</label>
                  <input
                    type="text"
                    className="form-control"
                    name="adresse.adresse2"
                    value={fournisseur.adresse.adresse2}
                    onChange={gererChangement}
                    placeholder="Complément d'adresse"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Code postal</label>
                  <input
                    type="text"
                    className="form-control"
                    name="adresse.codePostal"
                    value={fournisseur.adresse.codePostal}
                    onChange={gererChangement}
                    placeholder="75000"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Ville</label>
                  <input
                    type="text"
                    className="form-control"
                    name="adresse.ville"
                    value={fournisseur.adresse.ville}
                    onChange={gererChangement}
                    placeholder="Paris"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Pays</label>
                  <input
                    type="text"
                    className="form-control"
                    name="adresse.pays"
                    value={fournisseur.adresse.pays}
                    onChange={gererChangement}
                    placeholder="France"
                  />
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => naviguer('/fournisseurs')}
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

export default NouveauFournisseur;