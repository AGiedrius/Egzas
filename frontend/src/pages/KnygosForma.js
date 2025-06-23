import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function KnygosForma({ onSubmit, pradineReiksme, kategorijos = [], klaida }) {
  const pradzia = pradineReiksme || {};
  const [pavadinimas, setPavadinimas] = useState(pradzia.pavadinimas || '');
  const [autorius, setAutorius] = useState(pradzia.autorius || '');
  const [isbn, setIsbn] = useState(pradzia.isbn || '');
  const [leidimoMetai, setLeidimoMetai] = useState(pradzia.leidimoMetai || '');
  const [kategorijaId, setKategorijaId] = useState(pradzia.kategorijaId || '');
  const [aprasymas, setAprasymas] = useState(pradzia.aprasymas || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ pavadinimas, autorius, isbn, leidimoMetai, kategorijaId, aprasymas });
  };

  return (
    <Form onSubmit={handleSubmit} style={{maxWidth: 500}}>
      <h4>Knygos forma</h4>
      {klaida && <Alert variant="danger">{klaida}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Pavadinimas</Form.Label>
        <Form.Control value={pavadinimas} onChange={e => setPavadinimas(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Autorius</Form.Label>
        <Form.Control value={autorius} onChange={e => setAutorius(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>ISBN</Form.Label>
        <Form.Control value={isbn} onChange={e => setIsbn(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Leidimo metai</Form.Label>
        <Form.Control type="number" value={leidimoMetai} onChange={e => setLeidimoMetai(e.target.value)} min="0" max={new Date().getFullYear()} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Kategorija</Form.Label>
        <Form.Select value={kategorijaId} onChange={e => setKategorijaId(e.target.value)} required>
          <option value="">Pasirinkite kategoriją</option>
          {kategorijos.map(k => (
            <option key={k.id} value={k.id}>{k.pavadinimas}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Aprašymas</Form.Label>
        <Form.Control as="textarea" rows={2} value={aprasymas} onChange={e => setAprasymas(e.target.value)} />
      </Form.Group>
      <Button type="submit" variant="primary">Išsaugoti</Button>
    </Form>
  );
}

export default KnygosForma;
