import React, { useEffect, useState } from 'react';
import KnygosForma from './KnygosForma';
import { Table, Button, Modal, Alert } from 'react-bootstrap';

function Knygos() {
  const [knygos, setKnygos] = useState([]);
  const [kategorijos, setKategorijos] = useState([]);
  const [klaida, setKlaida] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [redaguojama, setRedaguojama] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchKnygos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/books');
      const data = await res.json();
      setKnygos(data);
    } catch {
      setKnygos([]);
    }
    setLoading(false);
  };
  const fetchKategorijos = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setKategorijos(data);
    } catch {
      setKategorijos([]);
    }
  };
  useEffect(() => { fetchKnygos(); fetchKategorijos(); }, []);

  const handleSave = async (values) => {
    setKlaida('');
    try {
      const res = await fetch(redaguojama ? `/api/books/${redaguojama.id}` : '/api/books', {
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
      fetchKnygos();
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
      <h2>Knygos</h2>
      <Button className="mb-3" onClick={()=>{setRedaguojama(null);setShowModal(true);}}>Nauja knyga</Button>
      {loading && <div>Kraunama...</div>}
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pavadinimas</th>
            <th>Autorius</th>
            <th>ISBN</th>
            <th>Leidimo metai</th>
            <th>Kategorija</th>
            <th>Aprašymas</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {knygos.map(k => (
            <tr key={k.id}>
              <td>{k.id}</td>
              <td>{k.pavadinimas}</td>
              <td>{k.autorius}</td>
              <td>{k.isbn}</td>
              <td>{k.leidimoMetai}</td>
              <td>{kategorijos.find(kk=>kk.id===k.kategorijaId)?.pavadinimas||''}</td>
              <td>{k.aprasymas}</td>
              <td><Button size="sm" onClick={()=>handleEdit(k)}>Redaguoti</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={()=>setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{redaguojama ? 'Redaguoti' : 'Nauja'} knyga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <KnygosForma onSubmit={handleSave} pradineReiksme={redaguojama} kategorijos={kategorijos} klaida={klaida} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Knygos;
