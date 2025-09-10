const jwt = require('jsonwebtoken');

// Test JWT generation and verification
const testUser = {
  userId: 'test-user-id',
  tenantId: 'test-tenant-id',
  email: 'test@p360.com',
  role: 'admin'
};

const JWT_SECRET = process.env.JWT_SECRET || 'p360-dev-secret-key';
console.log('JWT_SECRET:', JWT_SECRET);

// Generate token
const token = jwt.sign(testUser, JWT_SECRET, { expiresIn: '1h' });
console.log('\nGenerated Token:', token);

// Verify token
try {
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log('\nDecoded Token:', decoded);
} catch (error) {
  console.error('\nToken verification failed:', error.message);
}

// Test with curl
console.log('\nTest with curl:');
console.log(`curl -X GET "http://localhost:6601/api/v1/organizations" \\`);
console.log(`  -H "Authorization: Bearer ${token}" \\`);
console.log(`  -H "Content-Type: application/json"`);
