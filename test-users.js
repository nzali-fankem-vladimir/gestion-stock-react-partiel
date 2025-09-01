const axios = require('axios');

const testUsers = async () => {
  console.log('Test des utilisateurs en base...\n');
  
  const baseURL = 'http://localhost:8081';
  
  try {
    // Test récupération des utilisateurs
    console.log('1. Récupération des utilisateurs...');
    const response = await axios.get(`${baseURL}/utilisateurs/all`);
    
    console.log('✅ Utilisateurs récupérés');
    console.log(`   Nombre d'utilisateurs: ${response.data.length}`);
    
    response.data.forEach(user => {
      console.log(`   - ${user.email} (${user.nom} ${user.prenom})`);
      console.log(`     Rôles: ${user.roles?.map(r => r.roleName).join(', ') || 'Aucun'}`);
    });
    
    // Test authentification pour chaque utilisateur
    const testUsers = [
      { email: 'admin@gestionstock.com', password: 'admin123' },
      { email: 'user@gestionstock.com', password: 'user123' },
      { email: 'manager@gestionstock.com', password: 'manager123' }
    ];
    
    console.log('\n2. Test d\'authentification...');
    for (const testUser of testUsers) {
      try {
        const authResponse = await axios.post(`${baseURL}/auth/authenticate`, {
          login: testUser.email,
          password: testUser.password
        });
        console.log(`✅ ${testUser.email}: Connexion réussie`);
      } catch (error) {
        console.log(`❌ ${testUser.email}: ${error.response?.data || error.message}`);
      }
    }
    
  } catch (error) {
    console.log('❌ Erreur:');
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Message: ${error.response.data}`);
    } else {
      console.log(`   Erreur: ${error.message}`);
    }
  }
};

testUsers();