import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Signup, Dashboard } from './pages';
import Forgot from './pages/Forgot';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/Forgot" Component={Forgot} />
          <Route path="/Signup" Component={Signup} />
          <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> {/**Protected Route */}
          <Route path="/Signup" Component={Signup} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
