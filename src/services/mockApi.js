import {
  utilisateursFictifs,
  categoriesFictives,
  articlesFictifs,
  clientsFictifs,
  fournisseursFictifs,
  mouvementsStockFictifs,
  commandesClientsFictives,
  commandesFournisseursFictives
} from '../data/mockData';

/**
 * Services API fictifs pour les tests sans backend
 */

// Simulation d'un délai réseau
const delaiSimule = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Services d'authentification fictifs
export const serviceAuthFictif = {
  seConnecter: async (identifiants) => {
    await delaiSimule();
    const utilisateur = utilisateursFictifs.find(u => 
      u.email === identifiants.login && u.motDePasse === identifiants.password
    );
    
    if (utilisateur) {
      return {
        data: {
          accessToken: 'fake-jwt-token-' + Date.now()
        }
      };
    } else {
      throw new Error('Identifiants incorrects');
    }
  },

  sInscrire: async (donneesUtilisateur) => {
    await delaiSimule();
    const nouvelUtilisateur = {
      id: utilisateursFictifs.length + 1,
      ...donneesUtilisateur,
      roles: [{ roleName: 'USER' }]
    };
    utilisateursFictifs.push(nouvelUtilisateur);
    return { data: nouvelUtilisateur };
  },

  obtenirUtilisateurParEmail: async (email) => {
    await delaiSimule();
    const utilisateur = utilisateursFictifs.find(u => u.email === email);
    if (utilisateur) {
      return { data: utilisateur };
    } else {
      throw new Error('Utilisateur non trouvé');
    }
  }
};

// Services pour les articles fictifs
export const serviceArticleFictif = {
  obtenirTous: async () => {
    await delaiSimule();
    return { data: articlesFictifs };
  },

  obtenirParId: async (id) => {
    await delaiSimule();
    const article = articlesFictifs.find(a => a.id === parseInt(id));
    return { data: article };
  },

  creer: async (article) => {
    await delaiSimule();
    const nouvelArticle = {
      id: articlesFictifs.length + 1,
      ...article,
      prixUnitaireTtc: parseFloat(article.prixUnitaireHt) * (1 + parseFloat(article.tauxTva) / 100)
    };
    articlesFictifs.push(nouvelArticle);
    return { data: nouvelArticle };
  },

  modifier: async (article) => {
    await delaiSimule();
    const index = articlesFictifs.findIndex(a => a.id === article.id);
    if (index !== -1) {
      articlesFictifs[index] = { ...article };
    }
    return { data: article };
  },

  supprimer: async (id) => {
    await delaiSimule();
    const index = articlesFictifs.findIndex(a => a.id === parseInt(id));
    if (index !== -1) {
      articlesFictifs.splice(index, 1);
    }
    return { data: true };
  }
};

// Services pour les catégories fictives
export const serviceCategorieFictif = {
  obtenirTous: async () => {
    await delaiSimule();
    return { data: categoriesFictives };
  },

  obtenirParId: async (id) => {
    await delaiSimule();
    const categorie = categoriesFictives.find(c => c.id === parseInt(id));
    return { data: categorie };
  },

  creer: async (categorie) => {
    await delaiSimule();
    const nouvelleCategorie = {
      id: categoriesFictives.length + 1,
      ...categorie
    };
    categoriesFictives.push(nouvelleCategorie);
    return { data: nouvelleCategorie };
  },

  modifier: async (categorie) => {
    await delaiSimule();
    const index = categoriesFictives.findIndex(c => c.id === categorie.id);
    if (index !== -1) {
      categoriesFictives[index] = { ...categorie };
    }
    return { data: categorie };
  },

  supprimer: async (id) => {
    await delaiSimule();
    const index = categoriesFictives.findIndex(c => c.id === parseInt(id));
    if (index !== -1) {
      categoriesFictives.splice(index, 1);
    }
    return { data: true };
  }
};

// Services pour les clients fictifs
export const serviceClientFictif = {
  obtenirTous: async () => {
    await delaiSimule();
    return { data: clientsFictifs };
  },

  obtenirParId: async (id) => {
    await delaiSimule();
    const client = clientsFictifs.find(c => c.id === parseInt(id));
    return { data: client };
  },

  creer: async (client) => {
    await delaiSimule();
    const nouveauClient = {
      id: clientsFictifs.length + 1,
      ...client
    };
    clientsFictifs.push(nouveauClient);
    return { data: nouveauClient };
  },

  modifier: async (client) => {
    await delaiSimule();
    const index = clientsFictifs.findIndex(c => c.id === client.id);
    if (index !== -1) {
      clientsFictifs[index] = { ...client };
    }
    return { data: client };
  },

  supprimer: async (id) => {
    await delaiSimule();
    const index = clientsFictifs.findIndex(c => c.id === parseInt(id));
    if (index !== -1) {
      clientsFictifs.splice(index, 1);
    }
    return { data: true };
  }
};

// Services pour les fournisseurs fictifs
export const serviceFournisseurFictif = {
  obtenirTous: async () => {
    await delaiSimule();
    return { data: fournisseursFictifs };
  },

  obtenirParId: async (id) => {
    await delaiSimule();
    const fournisseur = fournisseursFictifs.find(f => f.id === parseInt(id));
    return { data: fournisseur };
  },

  creer: async (fournisseur) => {
    await delaiSimule();
    const nouveauFournisseur = {
      id: fournisseursFictifs.length + 1,
      ...fournisseur
    };
    fournisseursFictifs.push(nouveauFournisseur);
    return { data: nouveauFournisseur };
  },

  modifier: async (fournisseur) => {
    await delaiSimule();
    const index = fournisseursFictifs.findIndex(f => f.id === fournisseur.id);
    if (index !== -1) {
      fournisseursFictifs[index] = { ...fournisseur };
    }
    return { data: fournisseur };
  },

  supprimer: async (id) => {
    await delaiSimule();
    const index = fournisseursFictifs.findIndex(f => f.id === parseInt(id));
    if (index !== -1) {
      fournisseursFictifs.splice(index, 1);
    }
    return { data: true };
  }
};

// Services pour les utilisateurs fictifs
export const serviceUtilisateurFictif = {
  obtenirTous: async () => {
    await delaiSimule();
    return { data: utilisateursFictifs };
  },

  obtenirParId: async (id) => {
    await delaiSimule();
    const utilisateur = utilisateursFictifs.find(u => u.id === parseInt(id));
    return { data: utilisateur };
  },

  creer: async (utilisateur) => {
    await delaiSimule();
    const nouvelUtilisateur = {
      id: utilisateursFictifs.length + 1,
      ...utilisateur,
      roles: [{ roleName: 'USER' }]
    };
    utilisateursFictifs.push(nouvelUtilisateur);
    return { data: nouvelUtilisateur };
  },

  modifier: async (utilisateur) => {
    await delaiSimule();
    const index = utilisateursFictifs.findIndex(u => u.id === utilisateur.id);
    if (index !== -1) {
      utilisateursFictifs[index] = { ...utilisateur };
    }
    return { data: utilisateur };
  },

  supprimer: async (id) => {
    await delaiSimule();
    const index = utilisateursFictifs.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
      utilisateursFictifs.splice(index, 1);
    }
    return { data: true };
  },

  changerMotDePasse: async (donneesMotDePasse) => {
    await delaiSimule();
    return { data: true };
  }
};

// Services pour les mouvements de stock fictifs
export const serviceMouvementStockFictif = {
  obtenirTous: async () => {
    await delaiSimule();
    return { data: mouvementsStockFictifs };
  },

  obtenirParArticle: async (idArticle) => {
    await delaiSimule();
    const mouvements = mouvementsStockFictifs.filter(m => m.article.id === parseInt(idArticle));
    return { data: mouvements };
  },

  entreeStock: async (mouvement) => {
    await delaiSimule();
    const nouveauMouvement = {
      id: mouvementsStockFictifs.length + 1,
      typeMouvement: 'ENTREE',
      ...mouvement,
      dateMouvement: new Date().toISOString()
    };
    mouvementsStockFictifs.push(nouveauMouvement);
    return { data: nouveauMouvement };
  },

  sortieStock: async (mouvement) => {
    await delaiSimule();
    const nouveauMouvement = {
      id: mouvementsStockFictifs.length + 1,
      typeMouvement: 'SORTIE',
      ...mouvement,
      dateMouvement: new Date().toISOString()
    };
    mouvementsStockFictifs.push(nouveauMouvement);
    return { data: nouveauMouvement };
  },

  correctionStock: async (mouvement) => {
    await delaiSimule();
    const nouveauMouvement = {
      id: mouvementsStockFictifs.length + 1,
      typeMouvement: 'CORRECTION',
      ...mouvement,
      dateMouvement: new Date().toISOString()
    };
    mouvementsStockFictifs.push(nouveauMouvement);
    return { data: nouveauMouvement };
  }
};

// Services pour les commandes clients fictives
export const serviceCommandeClientFictif = {
  obtenirTous: async () => {
    await delaiSimule();
    return { data: commandesClientsFictives };
  },

  obtenirParId: async (id) => {
    await delaiSimule();
    const commande = commandesClientsFictives.find(c => c.id === parseInt(id));
    return { data: commande };
  },

  creer: async (commande) => {
    await delaiSimule();
    const nouvelleCommande = {
      id: commandesClientsFictives.length + 1,
      ...commande
    };
    commandesClientsFictives.push(nouvelleCommande);
    return { data: nouvelleCommande };
  },

  modifier: async (commande) => {
    await delaiSimule();
    const index = commandesClientsFictives.findIndex(c => c.id === commande.id);
    if (index !== -1) {
      commandesClientsFictives[index] = { ...commande };
    }
    return { data: commande };
  },

  supprimer: async (id) => {
    await delaiSimule();
    const index = commandesClientsFictives.findIndex(c => c.id === parseInt(id));
    if (index !== -1) {
      commandesClientsFictives.splice(index, 1);
    }
    return { data: true };
  }
};

// Services pour les commandes fournisseurs fictives
export const serviceCommandeFournisseurFictif = {
  obtenirTous: async () => {
    await delaiSimule();
    return { data: commandesFournisseursFictives };
  },

  obtenirParId: async (id) => {
    await delaiSimule();
    const commande = commandesFournisseursFictives.find(c => c.id === parseInt(id));
    return { data: commande };
  },

  creer: async (commande) => {
    await delaiSimule();
    const nouvelleCommande = {
      id: commandesFournisseursFictives.length + 1,
      ...commande
    };
    commandesFournisseursFictives.push(nouvelleCommande);
    return { data: nouvelleCommande };
  },

  modifier: async (commande) => {
    await delaiSimule();
    const index = commandesFournisseursFictives.findIndex(c => c.id === commande.id);
    if (index !== -1) {
      commandesFournisseursFictives[index] = { ...commande };
    }
    return { data: commande };
  },

  supprimer: async (id) => {
    await delaiSimule();
    const index = commandesFournisseursFictives.findIndex(c => c.id === parseInt(id));
    if (index !== -1) {
      commandesFournisseursFictives.splice(index, 1);
    }
    return { data: true };
  }
};