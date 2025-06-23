import React, { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';

function Login({ onLogin }) {
  const [form, setForm] = useState({ el_pastas: '', slaptazodis: '' });
  const [klaida, setKlaida] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [regVardas, setRegVardas] = useState('');
  const [regPavarde, setRegPavarde] = useState('');
  const [regGimData, setRegGimData] = useState('');
  const [regElPastas, setRegElPastas] = useState('');
  const [regSlaptazodis, setRegSlaptazodis] = useState('');
  const [regKlaida, setRegKlaida] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegKlaida('');
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vardas: regVardas,
          pavarde: regPavarde,
          gim_data: regGimData,
          el_pastas: regElPastas,
          slaptazodis: regSlaptazodis
        })
      });
      if (!res.ok) {
        const err = await res.json();
        setRegKlaida(err.message || 'Registracijos klaida');
        return;
      }
      setShowRegister(false);
      setRegVardas(''); setRegPavarde(''); setRegGimData(''); setRegElPastas(''); setRegSlaptazodis('');
      alert('Registracija sėkminga! Galite prisijungti.');
    } catch {
      setRegKlaida('Serverio klaida');
    }
  };

  const validate = () => {
    if (!form.el_pastas || !form.slaptazodis) {
      setKlaida('Įveskite el. paštą ir slaptažodį');
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.el_pastas)) {
      setKlaida('Neteisingas el. pašto formatas');
      return false;
    }
    setKlaida('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setKlaida('');
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setKlaida(data.message || 'Klaida jungiantis');
      } else {
        // Patikriname statusus
        if (data.vartotojas.patvirtintas === false) {
          setKlaida('Atsiprašome. Jūsų statusas dar nėra patvirtintas. Bandykite vėliau');
        } else if (data.vartotojas.blokuotas === true) {
          setKlaida('Už ypatingus nuopelnus jums neleidžiama prisijungti prie sistemos');
        } else {
          onLogin(data);
        }
      }
    } catch {
      setKlaida('Serverio klaida');
    }
    setLoading(false);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <Form className="border rounded p-4 bg-white shadow-sm" onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center">Prisijungimas</h2>
          {klaida && <div className="alert alert-danger">{klaida}</div>}
          <Form.Group className="mb-3">
            <Form.Label>El. paštas</Form.Label>
            <Form.Control type="email" name="el_pastas" value={form.el_pastas} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Slaptažodis</Form.Label>
            <Form.Control type="password" name="slaptazodis" value={form.slaptazodis} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100" disabled={loading}>{loading ? 'Jungiama...' : 'Prisijungti'}</Button>
        </Form>
        <div className="text-center mt-3">
          <Button variant="secondary" onClick={() => setShowRegister(true)}>Registruotis</Button>
        </div>

        <Modal show={showRegister} onHide={() => setShowRegister(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Registracija</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-2">
                <Form.Label>Vardas</Form.Label>
                <Form.Control value={regVardas} onChange={e => setRegVardas(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Pavardė</Form.Label>
                <Form.Control value={regPavarde} onChange={e => setRegPavarde(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Gimimo data</Form.Label>
                <Form.Control type="date" value={regGimData} onChange={e => setRegGimData(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>El. paštas</Form.Label>
                <Form.Control type="email" value={regElPastas} onChange={e => setRegElPastas(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Slaptažodis</Form.Label>
                <Form.Control type="password" value={regSlaptazodis} onChange={e => setRegSlaptazodis(e.target.value)} required />
              </Form.Group>
              {regKlaida && <div className="alert alert-danger">{regKlaida}</div>}
              <Button variant="primary" type="submit">Registruotis</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Login;
