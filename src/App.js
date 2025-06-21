import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AlunoDashboard from './pages/AlunoDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProfessorDashboard from './pages/ProfessorDashboard';
import RecepcionistaDashboard from './pages/RecepcionistaDashboard';
import ProfessorWorkoutEditor from './pages/ProfessorWorkoutEditor';
import PhysicalAssessment from './pages/PhysicalAssessment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aluno" element={<AlunoDashboard />} />
        <Route path="/recepcionista" element={<RecepcionistaDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/exercicios" element={<ProfessorWorkoutEditor />} />
        <Route path="/avaliacao-fisica" element={<PhysicalAssessment />}  />
        <Route path="/professor" element={<ProfessorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;