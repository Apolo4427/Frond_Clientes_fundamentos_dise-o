import { Link } from 'react-router-dom';
import { useClientes } from '../hooks/useClientes';

export default function ListadoClientes() {
  const { data, isLoading, error } = useClientes();

  if (isLoading) return <div className="container">Cargando…</div>;
  if (error)     return <div className="container">Error cargando clientes</div>;
  if (!data || data.length === 0) {
    return (
      <div className="container">
        <h2 style={{ marginBottom: 12 }}>Clientes</h2>
        <div className="card">No hay clientes aún. <Link to="/clientes/nuevo">Crear cliente</Link></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: 12 }}>Clientes</h2>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Nombre</th>
              <th style={{ width: '30%' }}>Teléfono</th>
              <th style={{ width: '30%' }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map(c => (
              <tr key={c.id}>
                <td>{c.nombre} {c.apellido}</td>
                <td>{c.telefono}</td>
                <td style={{ textAlign: 'right' }}>
                  <Link className="btn" to={`/clientes/${c.id}`}>Detalle</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link className="btn" to="/clientes/nuevo">Crear cliente</Link>
    </div>
  );
}
