const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Function to read data from JSON file
const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    // Fallback data if file doesn't exist
    return {
      intern: {
        name: "Shombhunath Karan",
        referralCode: "shombhunath2025",
        donations: 6500
      },
      leaderboard: [
        { name: "Priya Sharma", referralCode: "priya2025", donations: 12500 },
        { name: "Rahul Kumar", referralCode: "rahul2025", donations: 9800 },
        { name: "Aanya Patel", referralCode: "aanya2025", donations: 7200 },
        { name: "Shombhunath", referralCode: "shombhunath2025", donations: 6500 },
        { name: "Vikram Singh", referralCode: "vikram2025", donations: 5200 },
        { name: "Meera Reddy", referralCode: "meera2025", donations: 4800 },
        { name: "Arjun Malhotra", referralCode: "arjun2025", donations: 4200 },
        { name: "Zara Khan", referralCode: "zara2025", donations: 3800 },
        { name: "Anjali Desai", referralCode: "anjali2025", donations: 3200 },
        { name: "Krishna Verma", referralCode: "krishna2025", donations: 2800 }
      ]
    };
  }
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Fundraising Intern Portal API is running' });
});

// API Routes
app.get('/api/intern', (req, res) => {
  const data = readDataFromFile();
  res.json(data.intern);
});

app.get('/api/leaderboard', (req, res) => {
  const data = readDataFromFile();
  
  // Sort by donations in descending order and add rank
  const sortedData = data.leaderboard
    .sort((a, b) => b.donations - a.donations)
    .map((intern, index) => ({
      ...intern,
      rank: index + 1
    }));
  
  res.json(sortedData);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Fundraising Intern Portal API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      intern: '/api/intern',
      leaderboard: '/api/leaderboard'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`📁 Data loaded from: ${path.join(__dirname, 'data.json')}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
}); 