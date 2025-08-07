import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import CrearCliente from './pages/CrearCliente';
import VerCliente from './pages/VerCliente';
import EditarCliente from './pages/EditarCliente';

export default function App() {
  return (
    <BrowserRouter>
      <div className="container" style={{ marginBottom: 16 }}>
        <h1 style={{ marginBottom: 8 }}>Clientes CRM</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link className="btn" to="/clientes/nuevo">Crear cliente</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/clientes/nuevo" />} />
        <Route path="/clientes/nuevo" element={<CrearCliente />} />
        <Route path="/clientes/:id" element={<VerCliente />} />
        <Route path="/clientes/:id/editar" element={<EditarCliente />} />
      </Routes>
    </BrowserRouter>
  );
}

