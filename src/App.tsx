import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes';
import { Login, Signup, Dashboard } from './pages';
import Forgot from './pages/Forgot';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/Forgot" Component={Forgot} />
          <Route path="/Signup" Component={Signup} />
          <ProtectedRoute>
          <Route path="/Dashboard" Component={Dashboard} />
          </ProtectedRoute>
          <Route path="/Signup" Component={Signup} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
