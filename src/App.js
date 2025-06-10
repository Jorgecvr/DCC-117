import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AlunoDashboard from './pages/AlunoDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RecepcionistaDashboard from './pages/RecepcionistaDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aluno" element={<AlunoDashboard />} />
        {/* <Route path="/funcionario" element={<AdminDashboard />} /> */}
        <Route path="/funcionario" element={<RecepcionistaDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;