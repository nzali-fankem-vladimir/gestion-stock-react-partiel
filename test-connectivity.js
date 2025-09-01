const axios = require('axios');

const testConnectivity = async () => {
  console.log('Test de connectivité avec le backend...\n');
  
  const baseURL = 'http://localhost:8081';
  
  try {
    // Test de base
    console.log('1. Test de base...');
    const response = await axios.get(`${baseURL}/articles/all`);
    console.log('✅ Backend accessible');
    console.log(`   Status: ${response.status}`);
    console.log(`   Articles trouvés: ${response.data.length}`);
    
    // Test des utilisateurs
    console.log('\n2. Test des utilisateurs...');
    const usersResponse = await axios.get(`${baseURL}/utilisateurs/all`);
    console.log('✅ Endpoint utilisateurs accessible');
    console.log(`   Status: ${usersResponse.status}`);
    console.log(`   Utilisateurs trouvés: ${usersResponse.data.length}`);
    
  } catch (error) {
    console.log('❌ Erreur de connectivité:');
    if (error.code === 'ECONNREFUSED') {
      console.log('   Le backend n\'est pas démarré sur le port 8081');
    } else if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Message: ${error.response.data}`);
    } else {
      console.log(`   Erreur: ${error.message}`);
    }
  }
};

testConnectivity();