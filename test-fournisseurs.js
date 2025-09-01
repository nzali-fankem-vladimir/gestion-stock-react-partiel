// Test simple pour vérifier les endpoints fournisseurs
const axios = require('axios');

const baseURL = 'http://localhost:8081';

// Test des endpoints
async function testerEndpoints() {
  console.log('🔍 Test des endpoints fournisseurs...\n');
  
  try {
    // Test GET /fournisseurs/all
    console.log('1. Test GET /fournisseurs/all');
    const response = await axios.get(`${baseURL}/fournisseurs/all`);
    console.log('✅ Succès:', response.status);
    console.log('📊 Données:', response.data?.length || 0, 'fournisseurs\n');
  } catch (error) {
    console.log('❌ Erreur GET /fournisseurs/all:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    }
    console.log('');
  }

  try {
    // Test POST /fournisseurs/create
    console.log('2. Test POST /fournisseurs/create');
    const nouveauFournisseur = {
      nom: 'Test',
      prenom: 'Fournisseur',
      mail: 'test@fournisseur.com',
      numTel: '0123456789',
      adresse: {
        adresse1: '123 Rue Test',
        ville: 'Paris',
        codePostale: '75001',
        pays: 'France'
      }
    };
    
    const response = await axios.post(`${baseURL}/fournisseurs/create`, nouveauFournisseur);
    console.log('✅ Succès création:', response.status);
    console.log('📊 Fournisseur créé avec ID:', response.data?.id);
  } catch (error) {
    console.log('❌ Erreur POST /fournisseurs/create:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    }
  }
}

testerEndpoints();