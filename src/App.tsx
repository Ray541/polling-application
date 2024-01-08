// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Forgot from './components/Forgot/Forgot';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/Forgot" Component={Forgot} />
          <Route path="/SignUp" Component={SignUp} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
