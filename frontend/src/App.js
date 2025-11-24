import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'; // <--- THIS IMPORT IS MANDATORY FOR DARK MODE

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardLayout from './components/DashboardLayout'; 
import MilkEntry from './pages/MilkEntry';
import Customers from './pages/Customers';
import Payments from './pages/Payments';
import Summary from './pages/Summary';

// New Pages
import UserProfile from './pages/UserProfile';
import Security from './pages/Security';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
           <Route index element={<Navigate to="milk-entry" replace />} />
           
           {/* Business Pages */}
           <Route path="milk-entry" element={<MilkEntry />} />
           <Route path="customers" element={<Customers />} />
           <Route path="payments" element={<Payments />} />
           <Route path="summary" element={<Summary />} />
           
           {/* Account Pages */}
           <Route path="profile" element={<UserProfile />} />
           <Route path="security" element={<Security />} />
           <Route path="settings" element={<Settings />} />
           <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;