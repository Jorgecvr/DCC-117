import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import AlunoDashboard from './pages/AlunoDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RecepcionistaDashboard from './pages/RecepcionistaDashboard';
import ProfessorDashboard from './pages/ProfessorDashboard';
import ProfessorWorkoutEditor from './pages/ProfessorWorkoutEditor';
import PhysicalAssessment from './pages/PhysicalAssessment';

import ProtectedRoute from './pages/ProtectedRoute'; // 👈 novo import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* Rotas protegidas */}
        <Route
          path="/aluno"
          element={
            <ProtectedRoute allowedRole="aluno">
              <AlunoDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recepcionista"
          element={
            <ProtectedRoute allowedRole="recepcionista">
              <RecepcionistaDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor"
          element={
            <ProtectedRoute allowedRole="professor">
              <ProfessorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor/aluno/:id"
          element={
            <ProtectedRoute allowedRole="professor">
              <ProfessorWorkoutEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor/avaliacao/:id"
          element={
            <ProtectedRoute allowedRole="professor">
              <PhysicalAssessment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
