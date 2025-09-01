import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serviceClient } from '../../services/api';
import './NewClient.css';

/**
 * Page de création/modification d'un client
 * Gère le formulaire d'ajout et de modification des clients
 */
const NouveauClient = () => {
  const naviguer = useNavigate();
  const { id } = useParams();
  const estModification = !!id;

  // États pour le formulaire
  const [client, setClient] = useState({
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
      chargerClient();
    }
  }, [id]);

  /**
   * Charge les données du client à modifier
   */
  const chargerClient = async () => {
    try {
      setChargement(true);
      const reponse = await serviceClient.obtenirParId(id);
      setClient(reponse.data);
    } catch (erreur) {
      console.error('Erreur lors du chargement du client:', erreur);
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
      setClient(prev => ({
        ...prev,
        adresse: {
          ...prev.adresse,
          [champAdresse]: value
        }
      }));
    } else {
      setClient(prev => ({
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

    if (!client.nom.trim()) {
      nouvellesErreurs.nom = 'Le nom est obligatoire';
    }
    if (!client.prenom.trim()) {
      nouvellesErreurs.prenom = 'Le prénom est obligatoire';
    }
    if (!client.email.trim()) {
      nouvellesErreurs.email = 'L\'email est obligatoire';
    } else if (!/\S+@\S+\.\S+/.test(client.email)) {
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
        await serviceClient.modifier(client);
      } else {
        await serviceClient.creer(client);
      }
      
      naviguer('/clients');
    } catch (erreur) {
      console.error('Erreur lors de la sauvegarde:', erreur);
      setErreurs({ general: 'Erreur lors de la sauvegarde du client' });
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
    <div className="page-nouveau-client">
      {/* En-tête */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <i className="fas fa-user-plus"></i>
            {estModification ? 'Modifier le client' : 'Nouveau client'}
          </h2>
          <p className="text-muted">
            {estModification ? 'Modifiez les informations du client' : 'Ajoutez un nouveau client à votre base de données'}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => naviguer('/clients')}
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
                    value={client.nom}
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
                    value={client.prenom}
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
                    value={client.email}
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
                    value={client.numTel}
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
                    value={client.dateNaissance}
                    onChange={gererChangement}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Photo (URL)</label>
                  <input
                    type="url"
                    className="form-control"
                    name="photo"
                    value={client.photo}
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
                    value={client.adresse.adresse1}
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
                    value={client.adresse.adresse2}
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
                    value={client.adresse.codePostal}
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
                    value={client.adresse.ville}
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
                    value={client.adresse.pays}
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
                onClick={() => naviguer('/clients')}
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

export default NouveauClient;