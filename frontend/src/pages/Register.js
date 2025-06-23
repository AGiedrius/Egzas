import React, { useState } from 'react';

function Register() {
  const [form, setForm] = useState({
    vardas: '',
    pavarde: '',
    gim_data: '',
    el_pastas: '',
    slaptazodis: ''
  });
  const [klaida, setKlaida] = useState('');
  const [sekme, setSekme] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.vardas || !form.pavarde || !form.gim_data || !form.el_pastas || !form.slaptazodis) {
      setKlaida('Visi laukai privalomi');
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.el_pastas)) {
      setKlaida('Neteisingas el. pašto formatas');
      return false;
    }
    if (form.slaptazodis.length < 6) {
      setKlaida('Slaptažodis turi būti bent 6 simbolių');
      return false;
    }
    setKlaida('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSekme('');
    if (!validate()) return;
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setKlaida(data.message || 'Klaida registruojantis');
      } else {
        setSekme('Registracija sėkminga!');
        setForm({ vardas: '', pavarde: '', gim_data: '', el_pastas: '', slaptazodis: '' });
      }
    } catch {
      setKlaida('Serverio klaida');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <form className="border rounded p-4 bg-white shadow-sm" onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center">Registracija</h2>
          {klaida && <div className="alert alert-danger">{klaida}</div>}
          {sekme && <div className="alert alert-success">{sekme}</div>}
          <div className="mb-3">
            <label className="form-label">Vardas</label>
            <input type="text" className="form-control" name="vardas" value={form.vardas} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Pavardė</label>
            <input type="text" className="form-control" name="pavarde" value={form.pavarde} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Gimimo data</label>
            <input type="date" className="form-control" name="gim_data" value={form.gim_data} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">El. paštas</label>
            <input type="email" className="form-control" name="el_pastas" value={form.el_pastas} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Slaptažodis</label>
            <input type="password" className="form-control" name="slaptazodis" value={form.slaptazodis} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Registruotis</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
