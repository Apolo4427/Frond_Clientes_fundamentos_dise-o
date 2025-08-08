import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBorrarCliente, useClienteById } from '../hooks/useClientes';

export default function VerCliente() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const { data: c, isLoading, error } = useClienteById(id);
  const borrar = useBorrarCliente();

  if (isLoading) return <div className="container">Cargando…</div>;
  if (error || !c) return <div className="container">No se encontró el cliente.</div>;

  return (
    <div className="container">
      <h2 style={{ marginBottom: 12 }}>Cliente #{c.id}</h2>

      <div className="card">
        <p><b>Nombre:</b> {c.nombre} {c.apellido}</p>
        <p><b>Teléfono:</b> {c.telefono}</p>
        <p><b>Correo:</b> {c.correoElectronico}</p>
        <p><b>Dirección:</b> {c.direccionPrincipal}</p>
        <p><b>Notas:</b> {c.notasGenerales}</p>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <Link className="btn" to={`/clientes/${c.id}/editar`}>Editar</Link>
        <button
          className="btn"
          onClick={async () => {
            await borrar.mutateAsync(c.id);
            nav('/clientes/nuevo');
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
