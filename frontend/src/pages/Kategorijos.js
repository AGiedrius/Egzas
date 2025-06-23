import React, { useEffect, useState } from 'react';
import KategorijosForma from './KategorijosForma';
import { Table, Button, Modal, Alert } from 'react-bootstrap';

function Kategorijos() {
  const [kategorijos, setKategorijos] = useState([]);
  const [klaida, setKlaida] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [redaguojama, setRedaguojama] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchKategorijos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setKategorijos(data);
    } catch {
      setKategorijos([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchKategorijos(); }, []);

  const handleSave = async (values) => {
    setKlaida('');
    try {
      const res = await fetch(redaguojama ? `/api/categories/${redaguojama.id}` : '/api/categories', {
        method: redaguojama ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (!res.ok) {
        const err = await res.json();
        setKlaida(err.message || 'Klaida išsaugant.');
        return;
      }
      setShowModal(false);
      setRedaguojama(null);
      fetchKategorijos();
    } catch {
      setKlaida('Serverio klaida.');
    }
  };

  const handleEdit = (k) => {
    setRedaguojama(k);
    setShowModal(true);
    setKlaida('');
  };

  return (
    <div>
      <h2>Knygų kategorijos</h2>
      <Button className="mb-3" onClick={()=>{setRedaguojama(null);setShowModal(true);}}>Nauja kategorija</Button>
      {loading && <div>Kraunama...</div>}
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pavadinimas</th>
            <th>Aprašymas</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {kategorijos.map(k => (
            <tr key={k.id}>
              <td>{k.id}</td>
              <td>{k.pavadinimas}</td>
              <td>{k.aprasymas}</td>
              <td><Button size="sm" onClick={()=>handleEdit(k)}>Redaguoti</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={()=>setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{redaguojama ? 'Redaguoti' : 'Nauja'} kategorija</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <KategorijosForma onSubmit={handleSave} pradineReiksme={redaguojama} klaida={klaida} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Kategorijos;
