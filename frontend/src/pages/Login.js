import React, { useState } from 'react';

function Login({ onLogin }) {
  const [form, setForm] = useState({ el_pastas: '', slaptazodis: '' });
  const [klaida, setKlaida] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        <form className="border rounded p-4 bg-white shadow-sm" onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center">Prisijungimas</h2>
          {klaida && <div className="alert alert-danger">{klaida}</div>}
          <div className="mb-3">
            <label className="form-label">El. paštas</label>
            <input type="email" className="form-control" name="el_pastas" value={form.el_pastas} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Slaptažodis</label>
            <input type="password" className="form-control" name="slaptazodis" value={form.slaptazodis} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Jungiama...' : 'Prisijungti'}</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
