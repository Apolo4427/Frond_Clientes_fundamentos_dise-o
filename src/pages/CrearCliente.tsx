import { useNavigate } from 'react-router-dom';
import { ClienteCreateForm } from '../components/ClienteForm';
import { useCrearCliente } from '../hooks/useClientes';

export default function CrearCliente() {
  const nav = useNavigate();
  const create = useCrearCliente();

  return (
    <div className="container">
      <h2 style={{ marginBottom: 12 }}>Crear cliente</h2>
      <ClienteCreateForm
        submitting={create.isPending}
        onSubmit={async (data) => {
          const nuevo = await create.mutateAsync(data);
          nav(`/clientes/${nuevo.id}`);
        }}
      />
    </div>
  );
}
