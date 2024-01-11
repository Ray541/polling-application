import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Signup, Dashboard, ForgotPassword, Home, Profile } from './pages';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' Component={Home}/>
        </Routes>
        <Routes>
          <Route path="/Login" Component={Login} />
          <Route path="/Signup" Component={Signup} />
          <Route path="/Forgot" Component={ForgotPassword} />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/Signup" Component={Signup} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
