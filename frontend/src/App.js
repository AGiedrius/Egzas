import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import NavBar from './components/NavBar';

function App() {
  const [vartotojas, setVartotojas] = useState(null);

  const handleLogin = (data) => {
    setVartotojas(data.vartotojas);
    localStorage.setItem('token', data.token);
  };
  const handleLogout = () => {
    setVartotojas(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <NavBar vartotojas={vartotojas} onLogout={handleLogout} />
      <div className="container py-5">
        <h1 className="mb-4 text-center">Bibliotekos sistema</h1>
        <Routes>
          {!vartotojas && <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>}
          {vartotojas && vartotojas.role === 'admin' && <>
            <Route path="/admin" element={<div>Administracinė sritis (modulis)</div>} />
            <Route path="*" element={<Navigate to="/admin" />} />
          </>}
          {vartotojas && vartotojas.role === 'svecias' && <>
            <Route path="/" element={<div>Viesoji sritis (knygos, rezervacijos)</div>} />
            <Route path="*" element={<Navigate to="/" />} />
          </>}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
