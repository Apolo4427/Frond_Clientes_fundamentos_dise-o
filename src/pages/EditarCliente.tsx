import { useNavigate, useParams } from 'react-router-dom';
import { ClienteEditForm } from '../components/ClienteForm';
import { useActualizarCliente, useClienteById } from '../hooks/useClientes';

// NOTA: tus tipos actuales piden más campos en ClienteUpdateDto.
//       Aprovechamos los que ya vienen en "c" (nombre, apellido, notasGenerales)
//       para cumplir el tipo sin tocar nada más.
export default function EditarCliente() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const { data: c, isLoading } = useClienteById(id);
  const update = useActualizarCliente();

  if (isLoading || !c) return <div className="container">Cargando…</div>;

  return (
    <div className="container">
      <h2 style={{ marginBottom: 12 }}>Editar cliente</h2>
      <ClienteEditForm
        initial={c}
        submitting={update.isPending}
        onSubmit={async (values) => {
          await update.mutateAsync({
            id: c.id,
            telefono: values.telefono,
            correoElectronico: values.correoElectronico,
            direccionPrincipal: values.direccionPrincipal,
            // extra para satisfacer tu ClienteUpdateDto actual:
            nombre: c.nombre,
            apellido: c.apellido,
            notasGenerales: c.notasGenerales,
          } as any); // <-- si tu hook está generics-tipado, puedes quitar "as any"
          nav(`/clientes/${c.id}`);
        }}
      />
    </div>
  );
}

