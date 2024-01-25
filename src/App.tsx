import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Navbar,
  Login,
  Signup,
  Dashboard,
  ForgotPassword,
  Voting,
  PollResult,
  Profile,
  Feeds,
} from './pages';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes';
import AnonymousRoute from './ProtectedRoutes/AnonRoute';

function App() {
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route
            path="/*"
            element={
              <AnonymousRoute>
                <Login />
              </AnonymousRoute>
            }
          />
          <Route
            path="/"
            element={
              <AnonymousRoute>
                <Login />
              </AnonymousRoute>
            }
          />
          <Route
            path="/Signup"
            element={
              <AnonymousRoute>
                <Signup />
              </AnonymousRoute>
            }
          />
          <Route path="/Forgot" Component={ForgotPassword} />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Voting/:pollId"
            element={
              <ProtectedRoute>
                <Navbar />
                <Voting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PollResult/:pollId"
            element={
              <ProtectedRoute>
                <Navbar />
                <PollResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Feeds"
            element={
              <ProtectedRoute>
                <Navbar />
                <Feeds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <Navbar />
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/*" Component={Dashboard} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
