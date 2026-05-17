import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your newly created components
// (Adjust the file paths if your folder structure is slightly different)
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects to the login page */}
          <Route path="/" element={<Navigate to="/app/login" />} />
          
          {/* Route for the Login Page */}
          <Route path="/app/login" element={<LoginPage />} />
          
          {/* Route for the Register Page */}
          <Route path="/app/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
