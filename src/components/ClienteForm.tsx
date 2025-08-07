import React from 'react';
import { useForm } from 'react-hook-form';
import type { ClienteCreateDto, ClienteUpdateDto, ClienteResponseDto } from '../types/cliente';

type Mode = 'create' | 'edit';

type Props =
  | { mode: 'create'; initial?: Partial<ClienteCreateDto>; submitting?: boolean;
      onSubmit: (data: ClienteCreateDto) => void | Promise<void>; }
  | { mode: 'edit'; initial: ClienteResponseDto; submitting?: boolean;
      onSubmit: (data: ClienteUpdateDto) => void | Promise<void>; };

export default function ClienteForm(props: Props) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: props.initial as any
  });

  React.useEffect(() => { reset(props.initial as any); }, [props.initial, reset]);

  const isCreate = props.mode === 'create';

  return (
    <form className="card" onSubmit={handleSubmit((values) => {
      if (isCreate) {
        const payload = values as unknown as ClienteCreateDto;
        return (props as any).onSubmit(payload);
      } else {
        const v = values as any;
        const payload: ClienteUpdateDto = {
          id: (props as any).initial.id,
          telefono: v.telefono,
          correoElectronico: v.correoElectronico,
          direccionPrincipal: v.direccionPrincipal
        };
        return (props as any).onSubmit(payload);
      }
    })}>
      {isCreate && (
        <>
          <div><label>Nombre</label>
            <input {...register('nombre', { required: 'Requerido' })} /></div>

          <div><label>Apellido</label>
            <input {...register('apellido', { required: 'Requerido' })} /></div>

          <div><label>Notas generales</label>
            <textarea {...register('notasGenerales')} rows={3} /></div>
        </>
      )}

      {/* Campos comunes / de contacto */}
      <div><label>Teléfono</label>
        <input {...register('telefono', { required: 'Requerido' })} /></div>

      <div><label>Correo electrónico</label>
        <input type="email" {...register('correoElectronico', {
          required: 'Requerido', pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' }
        })} /></div>

      <div><label>Dirección principal</label>
        <input {...register('direccionPrincipal', { required: 'Requerido' })} /></div>

      {/* errores simples */}
      <div style={{ color: 'crimson', marginTop: 8 }}>
        {Object.values(errors).map((e, i) => <div key={i}>{(e as any).message}</div>)}
      </div>

      <button className="btn" disabled={(props as any).submitting} style={{ marginTop: 12 }}>
        {(props as any).submitting ? 'Guardando…' : (isCreate ? 'Crear cliente' : 'Guardar cambios')}
      </button>
    </form>
  );
}
