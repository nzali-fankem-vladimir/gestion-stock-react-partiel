const axios = require('axios');

const testAuth = async () => {
  console.log('Test d\'authentification...\n');
  
  const baseURL = 'http://localhost:8081';
  
  try {
    // Test de connexion avec admin
    console.log('1. Test connexion admin...');
    const response = await axios.post(`${baseURL}/auth/authenticate`, {
      login: 'admin@gestionstock.com',
      password: 'admin123'
    });
    
    console.log('✅ Connexion admin réussie');
    console.log(`   Token reçu: ${response.data.accessToken ? 'Oui' : 'Non'}`);
    
    // Test avec le token
    if (response.data.accessToken) {
      console.log('\n2. Test avec token...');
      const articlesResponse = await axios.get(`${baseURL}/articles/all`, {
        headers: {
          'Authorization': `Bearer ${response.data.accessToken}`
        }
      });
      console.log('✅ Accès aux articles avec token réussi');
      console.log(`   Articles trouvés: ${articlesResponse.data.length}`);
    }
    
  } catch (error) {
    console.log('❌ Erreur d\'authentification:');
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Message: ${error.response.data}`);
    } else {
      console.log(`   Erreur: ${error.message}`);
    }
  }
};

testAuth();