import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import CrearCliente from './pages/CrearCliente';
import VerCliente from './pages/VerCliente';
import EditarCliente from './pages/EditarCliente';
import ListadoClientes from './pages/ListadoClientes'; // +++

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/clientes" />} />
        <Route path="/clientes" element={<ListadoClientes />} />           {/* +++ */}
        <Route path="/clientes/nuevo" element={<CrearCliente />} />
        <Route path="/clientes/:id" element={<VerCliente />} />
        <Route path="/clientes/:id/editar" element={<EditarCliente />} />
        <Route path="*" element={<div className="container">Página no encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}
