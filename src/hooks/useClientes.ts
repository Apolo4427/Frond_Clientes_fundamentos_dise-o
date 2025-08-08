import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
} from '../api/clientes';
import type {
  ClienteCreateDto,
  ClienteUpdateDto,
  ClienteResponseDto,
} from '../types/cliente';

export const useClienteById = (id?: string) =>
  useQuery<ClienteResponseDto, Error>({
    queryKey: ['cliente', id],
    queryFn: () => getClienteById(id!),
    enabled: !!id,
  });

export const useCrearCliente = () => {
  const qc = useQueryClient();
  return useMutation<ClienteResponseDto, Error, ClienteCreateDto>({
    mutationFn: (data) => createCliente(data),
    onSuccess: (c) => {
      qc.setQueryData(['cliente', c.id], c);
    },
  });
};

export const useActualizarCliente = () => {
  const qc = useQueryClient();
  return useMutation<ClienteResponseDto, Error, ClienteUpdateDto>({
    mutationFn: (data) => updateCliente(data),
    onSuccess: (c) => {
      qc.setQueryData(['cliente', c.id], c);
    },
  });
};

export const useBorrarCliente = () =>
  useMutation<void, Error, string>({
    mutationFn: (id) => deleteCliente(id),
  });
