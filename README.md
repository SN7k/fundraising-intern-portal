# Fundraising Intern Portal

A modern, responsive fundraising intern portal built with React frontend and Node.js backend, ready for deployment.

## 🚀 Project Overview

This is a full-stack application with:
- **Frontend**: React + Tailwind CSS (in `client/` folder)
- **Backend**: Node.js + Express API (in `server/` folder)
- **Data**: JSON-based data storage
- **Deployment**: Ready for Render/Vercel deployment

## 📁 Project Structure

```
fundraising-intern-portal/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Leaderboard.js
│   │   │   └── Navbar.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                 # Node.js Backend
│   ├── index.js           # Main server file
│   ├── data.json          # Data source
│   └── package.json       # Backend dependencies
└── README.md              # This file
```

## 🎯 Features

### Frontend (React)
- **🔐 Login System** - Simple authentication with localStorage
- **📊 Dashboard** - Intern information and rewards progress
- **🏆 Rewards System** - Bronze, Silver, Gold badges with progress
- **📈 Leaderboard** - Rankings with medals and statistics
- **📱 Responsive Design** - Works on all devices
- **🎨 Modern UI** - Beautiful design with Tailwind CSS

### Backend (Node.js)
- **RESTful API** - Clean endpoints for data
- **JSON Data Source** - Easy to modify without code changes
- **CORS Enabled** - Ready for frontend integration
- **Health Check** - Monitoring endpoint for deployment
- **Error Handling** - Graceful fallbacks

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **File System** - JSON data storage

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Backend Dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Start Backend Server:**
   ```bash
   cd server
   npm start
   ```
   Backend will run on: http://localhost:5000

4. **Start Frontend Development Server:**
   ```bash
   cd client
   npm start
   ```
   Frontend will run on: http://localhost:3000

## 📋 API Endpoints

### Backend API (Port 5000)

#### `GET /`
API information and available endpoints
```json
{
  "message": "Fundraising Intern Portal API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "intern": "/api/intern",
    "leaderboard": "/api/leaderboard"
  }
}
```

#### `GET /health`
Health check endpoint
```json
{
  "status": "OK",
  "message": "Fundraising Intern Portal API is running"
}
```

#### `GET /api/intern`
Get intern information
```json
{
  "name": "Shombhunath Karan",
  "referralCode": "shombhunath2025",
  "donations": 6500
}
```

#### `GET /api/leaderboard`
Get sorted leaderboard data
```json
[
  {
    "name": "Priya Sharma",
    "referralCode": "priya2025",
    "donations": 12500,
    "rank": 1
  }
]
```

## 🎯 Features in Detail

### Login Page
- Simple form with "Full Name" input
- Stores user data in localStorage
- Redirects to dashboard on successful login
- Loading state with spinner

### Dashboard
- **User Information Cards:**
  - Intern Name
  - Referral Code
  - Total Donations Raised

- **Rewards & Unlockables:**
  - Bronze Badge (₹1,000)
  - Silver Badge (₹5,000)
  - Gold Badge (₹10,000)
  - Progress indicators
  - Locked/Unlocked status

### Leaderboard
- **Statistics Cards:**
  - Total Participants
  - Top Donation
  - Average Donation
  - Total Raised

- **Ranking Table:**
  - Rank with medals (🥇🥈🥉)
  - Intern names with avatars
  - Referral codes
  - Donation amounts
  - Badge status

## 🚀 Deployment

### Backend Deployment (Render)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add fundraising intern portal"
   git push origin main
   ```

2. **Deploy on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - **Configure:**
     - **Name:** `fundraising-intern-portal-backend`
     - **Environment:** `Node`
     - **Build Command:** `cd server && npm install`
     - **Start Command:** `cd server && npm start`
     - **Root Directory:** Leave empty (root)

3. **Get Your API URL:**
   - Render will give you: `https://your-app-name.onrender.com`
   - Test: `https://your-app-name.onrender.com/health`

### Frontend Deployment (Vercel/Netlify)

1. **Update API URL:**
   ```bash
   # In client/.env
   REACT_APP_API_URL=https://your-app-name.onrender.com
   ```

2. **Deploy to Vercel:**
   - Connect GitHub repository to Vercel
   - Set root directory to `client`
   - Deploy automatically

3. **Deploy to Netlify:**
   - Connect GitHub repository to Netlify
   - Set build command: `cd client && npm run build`
   - Set publish directory: `client/build`

## 🔧 Data Management

### Update Data
Edit `server/data.json` to modify:
- Intern information
- Leaderboard participants
- Donation amounts

### Data Format
```json
{
  "intern": {
    "name": "Intern Name",
    "referralCode": "referralcode2025",
    "donations": 6500
  },
  "leaderboard": [
    {
      "name": "Participant Name",
      "referralCode": "code2025",
      "donations": 12500
    }
  ]
}
```

## 🎨 Design Features

- **Responsive Design** - Mobile-first approach
- **Modern UI** - Clean, professional design
- **Smooth Animations** - CSS transitions and hover effects
- **Loading States** - Spinners and skeleton screens
- **Color-coded Rankings** - Gold, silver, bronze gradients
- **Progress Indicators** - Visual progress bars for rewards

## 🔧 Customization

### Adding New Interns
Edit `server/data.json`:
```json
{
  "leaderboard": [
    { "name": "New Intern", "referralCode": "newintern2025", "donations": 5000 }
  ]
}
```

### Modifying Rewards
Edit the rewards array in `client/src/components/Dashboard.js`:
```javascript
const rewards = [
  {
    name: 'Custom Badge',
    amount: 2000,
    icon: '🏆',
    description: 'Custom milestone!'
  }
];
```

## 📊 Monitoring

### Health Check
- **URL:** `/health`
- **Use:** Monitor service status
- **Response:** JSON with status and message

### Logs
- Check deployment platform logs
- Monitor API responses
- Debug deployment issues

## 🔒 Security

- **CORS:** Configured for frontend access
- **Environment Variables:** Use for sensitive data
- **Error Handling:** Graceful error responses
- **Input Validation:** Add as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with React and Tailwind CSS
- Icons from Heroicons
- Design inspiration from modern web applications

---

**Happy Fundraising! 🎉** 