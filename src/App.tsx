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
        <Navbar />
        <Routes>
          {/* <Route path="/LogIn" Component={Login} />
          <Route path="/Signup" Component={Signup} /> */}
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
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Voting/:pollId"
            element={
              <ProtectedRoute>
                <Voting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PollResult/:pollId"
            element={
              <ProtectedRoute>
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
          <Route path="/*" Component={Dashboard} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
