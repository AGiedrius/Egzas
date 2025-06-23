import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Badge, Modal } from 'react-bootstrap';

function Sveciai() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [patvirtintas, setPatvirtintas] = useState('');
  const [nepatvirtintas, setNepatvirtintas] = useState(false);
  const [blokuotas, setBlokuotas] = useState('');
  const [aktyvus, setAktyvus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({ vardas: '', pavarde: '', gim_data: '', el_pastas: '', patvirtintas: false, blokuotas: false });
  const [klaida, setKlaida] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    let params = [];
    if (search) params.push(`query=${encodeURIComponent(search)}`);
    // Jei pažymėtas tik "Patvirtinti"
    if (patvirtintas === 'true' && !nepatvirtintas) params.push(`patvirtintas=true`);
    // Jei pažymėtas tik "Nepatvirtinti"
    if (nepatvirtintas && patvirtintas !== 'true') params.push(`patvirtintas=false`);
    // Jei pažymėtas tik "Blokuoti"
    if (blokuotas === 'true' && !aktyvus) params.push(`blokuotas=true`);
    // Jei pažymėtas tik "Aktyvūs"
    if (aktyvus && blokuotas !== 'true') params.push(`blokuotas=false`);
    const url = '/api/users/search' + (params.length ? '?' + params.join('&') : '');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      setUsers(data);
    } catch {
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, [search, patvirtintas, nepatvirtintas, blokuotas, aktyvus]);

  const handleEdit = (user) => {
    setEditUser(user);
    setEditForm({
      vardas: user.vardas,
      pavarde: user.pavarde,
      gim_data: user.gim_data ? user.gim_data.slice(0,10) : '',
      el_pastas: user.el_pastas,
      patvirtintas: !!user.patvirtintas,
      blokuotas: !!user.blokuotas
    });
    setShowModal(true);
    setKlaida('');
  };

  const handleSave = async () => {
    setKlaida('');
    try {
      const token = localStorage.getItem('token');
      const patchBody = {
        vardas: editForm.vardas,
        pavarde: editForm.pavarde,
        gim_data: editForm.gim_data,
        el_pastas: editForm.el_pastas,
        patvirtintas: !!editForm.patvirtintas,
        blokuotas: !!editForm.blokuotas
      };
      console.log('PATCH /api/users/' + editUser.id, patchBody);
      const res = await fetch(`/api/users/${editUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(patchBody)
      });
      const text = await res.text();
      let err = null;
      try { err = JSON.parse(text); } catch {}
      console.log('Atsakymas:', text);
      if (!res.ok) {
        setKlaida((err && err.message) || text || 'Nepavyko išsaugoti.');
        return;
      }
      setShowModal(false);
      fetchUsers();
    } catch {
      setKlaida('Serverio klaida.');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Vartotojų sąrašas</h2>
      <div className="d-flex gap-2 mb-3">
        <Form.Control type="text" placeholder="Ieškoti pagal vardą, pavardę ar el. paštą" value={search} onChange={e => setSearch(e.target.value)} style={{maxWidth: 300}} />
        <Form.Check type="checkbox" label="Patvirtinti" checked={patvirtintas === 'true'} onChange={e => setPatvirtintas(e.target.checked ? 'true' : '')} />
        <Form.Check type="checkbox" label="Nepatvirtinti" checked={nepatvirtintas} onChange={e => setNepatvirtintas(e.target.checked)} />
        <Form.Check type="checkbox" label="Blokuoti" checked={blokuotas === 'true'} onChange={e => setBlokuotas(e.target.checked ? 'true' : '')} />
        <Form.Check type="checkbox" label="Aktyvūs (neblokuoti)" checked={aktyvus} onChange={e => setAktyvus(e.target.checked)} />
        <Button variant="secondary" onClick={()=>{setSearch('');setPatvirtintas('');setNepatvirtintas(false);setBlokuotas('');setAktyvus(false);}}>Išvalyti</Button>
      </div>
      <Table bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>Gimimo data</th>
            <th>El. paštas</th>
            <th>Patvirtintas</th>
            <th>Blokuotas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={u.blokuotas ? { background: '#ffd6d6' } : {}}>
              <td>{u.id}</td>
              <td>{u.vardas} {u.patvirtintas ? '' : <Badge bg="warning" title="Nepatvirtintas">!</Badge>}</td>
              <td>{u.pavarde}</td>
              <td>{u.gim_data ? u.gim_data.slice(0,10) : ''}</td>
              <td>{u.el_pastas}</td>
              <td>{u.patvirtintas ? 'Taip' : 'Ne'}</td>
              <td>{u.blokuotas ? 'Taip' : 'Ne'}</td>
              <td><Button size="sm" onClick={()=>handleEdit(u)}>Redaguoti</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={()=>setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Redaguoti vartotoją</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {klaida && <div className="alert alert-danger">{klaida}</div>}
          <Form.Group className="mb-2">
            <Form.Label>Vardas</Form.Label>
            <Form.Control value={editForm.vardas} onChange={e=>setEditForm(f=>({...f, vardas: e.target.value}))} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Pavardė</Form.Label>
            <Form.Control value={editForm.pavarde} onChange={e=>setEditForm(f=>({...f, pavarde: e.target.value}))} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Gimimo data</Form.Label>
            <Form.Control type="date" value={editForm.gim_data} onChange={e=>setEditForm(f=>({...f, gim_data: e.target.value}))} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>El. paštas</Form.Label>
            <Form.Control value={editForm.el_pastas} onChange={e=>setEditForm(f=>({...f, el_pastas: e.target.value}))} />
          </Form.Group>
          <Form.Check className="mb-2" type="checkbox" label="Patvirtintas" checked={editForm.patvirtintas} onChange={e=>setEditForm(f=>({...f, patvirtintas: e.target.checked}))} />
          <Form.Check className="mb-2" type="checkbox" label="Blokuotas" checked={editForm.blokuotas} onChange={e=>setEditForm(f=>({...f, blokuotas: e.target.checked}))} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowModal(false)}>Atšaukti</Button>
          <Button variant="primary" onClick={handleSave}>Išsaugoti</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Sveciai;
