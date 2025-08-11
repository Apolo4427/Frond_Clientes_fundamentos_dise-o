import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [id, setId] = useState('');
  const nav = useNavigate();

  const goToId = (e: FormEvent) => {
    e.preventDefault();
    const v = id.trim();
    if (!v) return;
    nav(`/clientes/${v}`);
    setId('');
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/clientes/nuevo" className="brand">Clientes CRM</Link>
        <Link to="/clientes/nuevo" className="btn btn-light">Crear cliente</Link>
      </div>
      <div className="nav-left">
        <Link to="/clientes" className="brand">Clientes CRM</Link>
        <Link to="/clientes" className="btn btn-light">Lista</Link>       {/* +++ */}
        <Link to="/clientes/nuevo" className="btn btn-light">Crear cliente</Link>
      </div>

      <form className="nav-right" onSubmit={goToId}>
        <input
          className="input"
          placeholder="ID de cliente…"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="btn" type="submit">Ir</button>
      </form>
    </header>
  );
}
