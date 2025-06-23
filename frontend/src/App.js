import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Sveciai from './pages/Sveciai';
import Kategorijos from './pages/Kategorijos';
import Knygos from './pages/Knygos';

function App() {
  const [vartotojas, setVartotojas] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !vartotojas) {
      fetch('/api/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('not authorized');
          return res.json();
        })
        .then(user => setVartotojas(user))
        .catch(() => {
          setVartotojas(null);
          localStorage.removeItem('token');
        });
    }
  }, []);

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
      <div className="main-container py-5">
        <h1 className="mb-4 text-center">Bibliotekos sistema</h1>
        <Routes>
          {!vartotojas && <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>}
          {vartotojas && vartotojas.role === 'admin' && <>
            <Route path="/admin" element={<div>Administracinė sritis (modulis)</div>} />
            <Route path="/admin/sveciai" element={<Sveciai />} />
            <Route path="/admin/kategorijos" element={<Kategorijos />} />
            <Route path="/admin/knygos" element={<Knygos />} />
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
