import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function KategorijosForma({ onSubmit, pradineReiksme, klaida }) {
  const pradzia = pradineReiksme || {};
  const [pavadinimas, setPavadinimas] = useState(pradzia.pavadinimas || '');
  const [aprasymas, setAprasymas] = useState(pradzia.aprasymas || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ pavadinimas, aprasymas });
  };

  return (
    <Form onSubmit={handleSubmit} style={{maxWidth: 400}}>
      <h4>Kategorijos forma</h4>
      {klaida && <Alert variant="danger">{klaida}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Pavadinimas</Form.Label>
        <Form.Control value={pavadinimas} onChange={e => setPavadinimas(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Aprašymas</Form.Label>
        <Form.Control as="textarea" rows={2} value={aprasymas} onChange={e => setAprasymas(e.target.value)} />
      </Form.Group>
      <Button type="submit" variant="primary">Išsaugoti</Button>
    </Form>
  );
}

export default KategorijosForma;
