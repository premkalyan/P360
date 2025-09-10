const jwt = require('jsonwebtoken');

// Generate a test JWT token
const testUser = {
  userId: 'test-user-id',
  tenantId: 'test-tenant-id',
  email: 'test@p360.com',
  role: 'admin'
};

const JWT_SECRET = process.env.JWT_SECRET || 'p360-dev-secret-key';
const token = jwt.sign(testUser, JWT_SECRET, { expiresIn: '1h' });

console.log('Test JWT Token:', token);
console.log('\nTesting Organizations API...\n');

// Test the API
const testAPI = async () => {
  const baseURL = 'http://localhost:6601/api/v1';
  
  // Test health endpoint
  console.log('1. Testing health endpoint:');
  try {
    const response = await fetch('http://localhost:6601/health');
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Health check failed:', error.message);
  }
  
  console.log('\n2. Testing organizations list (empty):');
  try {
    const response = await fetch(`${baseURL}/organizations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('List organizations failed:', error.message);
  }
  
  console.log('\n3. Testing create organization:');
  try {
    const response = await fetch(`${baseURL}/organizations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test API Organization',
        type: 'advertiser',
        description: 'Created via test script',
        website: 'https://test-api.com',
        industry: 'Technology',
        size: 'medium'
      })
    });
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    
    if (data.data && data.data.id) {
      const orgId = data.data.id;
      
      console.log('\n4. Testing get organization by ID:');
      const getResponse = await fetch(`${baseURL}/organizations/${orgId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const getData = await getResponse.json();
      console.log(JSON.stringify(getData, null, 2));
      
      console.log('\n5. Testing update organization:');
      const updateResponse = await fetch(`${baseURL}/organizations/${orgId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Updated Test API Organization',
          description: 'Updated via test script',
          status: 'inactive'
        })
      });
      const updateData = await updateResponse.json();
      console.log(JSON.stringify(updateData, null, 2));
      
      console.log('\n6. Testing organizations list (with data):');
      const listResponse = await fetch(`${baseURL}/organizations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const listData = await listResponse.json();
      console.log(JSON.stringify(listData, null, 2));
    }
    
  } catch (error) {
    console.error('Create organization failed:', error.message);
  }
};

// Use dynamic import for fetch if not available
(async () => {
  if (typeof fetch === 'undefined') {
    const { default: fetch } = await import('node-fetch');
    global.fetch = fetch;
  }
  await testAPI();
})();
