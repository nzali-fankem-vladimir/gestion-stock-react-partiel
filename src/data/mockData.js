/**
 * Données fictives pour les tests sans backend
 */

// Utilisateurs fictifs
export const utilisateursFictifs = [
  {
    id: 1,
    nom: 'Admin',
    prenom: 'Système',
    email: 'admin@gestionstock.com',
    motDePasse: 'admin123',
    numTel: '06 12 34 56 78',
    photo: null,
    roles: [{ roleName: 'ADMIN' }],
    adresse: {
      adresse1: '123 Rue de la Paix',
      ville: 'Paris',
      codePostal: '75001',
      pays: 'France'
    }
  },
  {
    id: 2,
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'user@gestionstock.com',
    motDePasse: 'user123',
    numTel: '06 98 76 54 32',
    photo: null,
    roles: [{ roleName: 'USER' }]
  },
  {
    id: 3,
    nom: 'Martin',
    prenom: 'Marie',
    email: 'manager@gestionstock.com',
    motDePasse: 'manager123',
    numTel: '06 11 22 33 44',
    photo: null,
    roles: [{ roleName: 'MANAGER' }]
  }
];

// Catégories fictives
export const categoriesFictives = [
  {
    id: 1,
    designation: 'Électronique',
    codeCategory: 'ELEC001',
    description: 'Appareils électroniques et accessoires'
  },
  {
    id: 2,
    designation: 'Informatique',
    codeCategory: 'INFO001',
    description: 'Matériel informatique et logiciels'
  },
  {
    id: 3,
    designation: 'Mobilier',
    codeCategory: 'MOBI001',
    description: 'Meubles et équipements de bureau'
  }
];

// Articles fictifs
export const articlesFictifs = [
  {
    id: 1,
    designation: 'Ordinateur portable HP',
    codeArticle: 'HP-LAP-001',
    prixUnitaireHt: 599.99,
    tauxTva: 20,
    prixUnitaireTtc: 719.99,
    quantite: 15,
    photo: null,
    category: categoriesFictives[1]
  },
  {
    id: 2,
    designation: 'Smartphone Samsung Galaxy',
    codeArticle: 'SAM-GAL-001',
    prixUnitaireHt: 399.99,
    tauxTva: 20,
    prixUnitaireTtc: 479.99,
    quantite: 8,
    photo: null,
    category: categoriesFictives[0]
  },
  {
    id: 3,
    designation: 'Bureau en bois',
    codeArticle: 'BUR-BOI-001',
    prixUnitaireHt: 249.99,
    tauxTva: 20,
    prixUnitaireTtc: 299.99,
    quantite: 5,
    photo: null,
    category: categoriesFictives[2]
  }
];

// Clients fictifs
export const clientsFictifs = [
  {
    id: 1,
    nom: 'Durand',
    prenom: 'Pierre',
    email: 'pierre.durand@email.com',
    numTel: '01 23 45 67 89',
    photo: null,
    adresse: {
      adresse1: '45 Avenue des Champs',
      ville: 'Lyon',
      codePostal: '69000',
      pays: 'France'
    }
  },
  {
    id: 2,
    nom: 'Moreau',
    prenom: 'Sophie',
    email: 'sophie.moreau@email.com',
    numTel: '02 34 56 78 90',
    photo: null,
    adresse: {
      adresse1: '12 Rue de la République',
      ville: 'Marseille',
      codePostal: '13000',
      pays: 'France'
    }
  }
];

// Fournisseurs fictifs
export const fournisseursFictifs = [
  {
    id: 1,
    nom: 'TechSupply',
    prenom: 'SARL',
    email: 'contact@techsupply.com',
    numTel: '03 45 67 89 01',
    photo: null,
    adresse: {
      adresse1: '78 Zone Industrielle',
      ville: 'Toulouse',
      codePostal: '31000',
      pays: 'France'
    }
  },
  {
    id: 2,
    nom: 'ElectroDistrib',
    prenom: 'SA',
    email: 'info@electrodistrib.fr',
    numTel: '04 56 78 90 12',
    photo: null,
    adresse: {
      adresse1: '156 Boulevard Commercial',
      ville: 'Nice',
      codePostal: '06000',
      pays: 'France'
    }
  }
];

// Mouvements de stock fictifs
export const mouvementsStockFictifs = [
  {
    id: 1,
    typeMouvement: 'ENTREE',
    quantite: 10,
    dateMouvement: '2024-01-15T10:30:00',
    article: articlesFictifs[0]
  },
  {
    id: 2,
    typeMouvement: 'SORTIE',
    quantite: 2,
    dateMouvement: '2024-01-16T14:20:00',
    article: articlesFictifs[0]
  },
  {
    id: 3,
    typeMouvement: 'ENTREE',
    quantite: 5,
    dateMouvement: '2024-01-17T09:15:00',
    article: articlesFictifs[1]
  }
];

// Commandes clients fictives
export const commandesClientsFictives = [
  {
    id: 1,
    code: 'CMD-2024-001',
    dateCommande: '2024-01-20',
    etatCommande: 'EN_PREPARATION',
    client: clientsFictifs[0],
    ligneCommandeClients: [
      {
        id: 1,
        quantite: 2,
        prixUnitaire: 599.99,
        article: articlesFictifs[0]
      }
    ]
  },
  {
    id: 2,
    code: 'CMD-2024-002',
    dateCommande: '2024-01-21',
    etatCommande: 'VALIDEE',
    client: clientsFictifs[1],
    ligneCommandeClients: [
      {
        id: 2,
        quantite: 1,
        prixUnitaire: 399.99,
        article: articlesFictifs[1]
      }
    ]
  }
];

// Commandes fournisseurs fictives
export const commandesFournisseursFictives = [
  {
    id: 1,
    code: 'CMDF-2024-001',
    dateCommande: '2024-01-18',
    etatCommande: 'COMMANDEE',
    fournisseur: fournisseursFictifs[0],
    ligneCommandeFournisseurs: [
      {
        id: 1,
        quantite: 20,
        prixUnitaire: 550.00,
        article: articlesFictifs[0]
      }
    ]
  }
];