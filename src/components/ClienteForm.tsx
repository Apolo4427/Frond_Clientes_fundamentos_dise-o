import React from 'react';
import { useForm } from 'react-hook-form';
import type { ClienteCreateDto, ClienteResponseDto } from '../types/cliente';

// --- Formulario para CREAR ---
export function ClienteCreateForm({
  initial,
  submitting,
  onSubmit,
}: {
  initial?: Partial<ClienteCreateDto>;
  submitting?: boolean;
  onSubmit: (data: ClienteCreateDto) => void | Promise<void>;
}) {
  const { register, handleSubmit, formState: { errors }, reset } =
    useForm<ClienteCreateDto>({
      defaultValues: {
        nombre: '',
        apellido: '',
        telefono: '',
        correoElectronico: '',
        direccionPrincipal: '',
        notasGenerales: '',
        ...initial,
      },
    });

  React.useEffect(() => { if (initial) reset({ ...initial } as ClienteCreateDto); }, [initial, reset]);

  return (
    <form className="card" onSubmit={handleSubmit(onSubmit)}>
      <div><label>Nombre</label>
        <input {...register('nombre', { required: 'Requerido' })} /></div>

      <div><label>Apellido</label>
        <input {...register('apellido', { required: 'Requerido' })} /></div>

      <div><label>Teléfono</label>
        <input {...register('telefono', { required: 'Requerido' })} /></div>

      <div><label>Correo electrónico</label>
        <input type="email" {...register('correoElectronico', {
          required: 'Requerido',
          pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' }
        })} /></div>

      <div><label>Dirección principal</label>
        <input {...register('direccionPrincipal', { required: 'Requerido' })} /></div>

      <div><label>Notas generales</label>
        <textarea rows={3} {...register('notasGenerales')} /></div>

      <div style={{ color: 'crimson', marginTop: 8 }}>
        {Object.values(errors).map((e, i) => <div key={i}>{(e as any).message}</div>)}
      </div>

      <button className="btn" disabled={submitting} style={{ marginTop: 12 }}>
        {submitting ? 'Guardando…' : 'Crear cliente'}
      </button>
    </form>
  );
}

// --- Formulario para EDITAR (solo datos de contacto) ---
type EditValues = Pick<ClienteResponseDto, 'telefono' | 'correoElectronico' | 'direccionPrincipal'>;

export function ClienteEditForm({
  initial,
  submitting,
  onSubmit,
}: {
  initial: ClienteResponseDto;
  submitting?: boolean;
  onSubmit: (values: EditValues) => void | Promise<void>;
}) {
  const { register, handleSubmit, formState: { errors }, reset } =
    useForm<EditValues>({
      defaultValues: {
        telefono: initial.telefono,
        correoElectronico: initial.correoElectronico,
        direccionPrincipal: initial.direccionPrincipal,
      },
    });

  React.useEffect(() => {
    reset({
      telefono: initial.telefono,
      correoElectronico: initial.correoElectronico,
      direccionPrincipal: initial.direccionPrincipal,
    });
  }, [initial, reset]);

  return (
    <form className="card" onSubmit={handleSubmit(onSubmit)}>
      <div><label>Teléfono</label>
        <input {...register('telefono', { required: 'Requerido' })} /></div>

      <div><label>Correo electrónico</label>
        <input type="email" {...register('correoElectronico', {
          required: 'Requerido',
          pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' }
        })} /></div>

      <div><label>Dirección principal</label>
        <input {...register('direccionPrincipal', { required: 'Requerido' })} /></div>

      <div style={{ color: 'crimson', marginTop: 8 }}>
        {Object.values(errors).map((e, i) => <div key={i}>{(e as any).message}</div>)}
      </div>

      <button className="btn" disabled={submitting} style={{ marginTop: 12 }}>
        {submitting ? 'Guardando…' : 'Guardar cambios'}
      </button>
    </form>
  );
}


