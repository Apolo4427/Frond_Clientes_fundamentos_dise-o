import { useNavigate, useParams } from 'react-router-dom';
import ClienteForm from '../components/ClienteForm';
import { useActualizarCliente, useClienteById } from '../hooks/useClientes';

export default function EditarCliente() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const { data: c, isLoading } = useClienteById(id);
  const update = useActualizarCliente();

  if (isLoading || !c) return <div className="container">Cargando…</div>;

  return (
    <div className="container">
      <h2 style={{ marginBottom: 12 }}>Editar cliente</h2>
      <ClienteForm
        mode="edit"
        initial={c}
        submitting={update.isPending}
        onSubmit={async (data) => {
          await update.mutateAsync(data);
          nav(`/clientes/${id}`);
        }}
      />
    </div>
  );
}
