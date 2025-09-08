const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 6501;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'P360 Backend API',
    version: '1.0.0'
  });
});

// API routes
app.get('/api/auth/status', (req, res) => {
  res.json({ 
    authenticated: false,
    message: 'P360 Authentication API Ready'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 P360 Backend API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth/status`);
});
