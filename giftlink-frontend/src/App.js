import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import existing components
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';

// Task 1 Hint: Import your newly created SearchPage component
import SearchPage from './components/SearchPage/SearchPage';

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

          {/* Task 1 Hint: Route for the Search Page */}
          <Route path="/app/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
