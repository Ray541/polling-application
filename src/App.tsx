import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Login,
  Signup,
  Dashboard,
  ForgotPassword,
  PollResult,
  Profile,
  Feeds,
} from './pages';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" Component={Login} />
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
            path="/PollResult/:pollId"
            element={
              <ProtectedRoute skipLoginCheck={true}>
                <PollResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Feeds"
            element={
              <ProtectedRoute>
                <Feeds />
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
          <Route path="/*" Component={Login} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
