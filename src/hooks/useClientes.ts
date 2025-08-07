import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/clientes';
import type { ClienteCreateDto, ClienteUpdateDto } from '../types/cliente';

export const useClienteById = (id?: string) =>
  useQuery({
    queryKey: ['cliente', id],
    queryFn: () => api.getClienteById(id!),
    enabled: !!id
  });

export const useCrearCliente = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ClienteCreateDto) => api.createCliente(data),
    onSuccess: (c) => {
      qc.setQueryData(['cliente', c.id], c);
    }
  });
};

export const useActualizarCliente = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ClienteUpdateDto) => api.updateCliente(data),
    onSuccess: (c) => {
      qc.setQueryData(['cliente', c.id], c);
    }
  });
};

export const useBorrarCliente = () =>
  useMutation({ mutationFn: (id: string) => api.deleteCliente(id) });
