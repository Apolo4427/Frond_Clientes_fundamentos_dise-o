import { api } from './axiosClient';
import type { ClienteCreateDto, ClienteUpdateDto, ClienteResponseDto } from '../types/cliente';

const R = '/clientes';

export const getClienteById = (id: string) =>
  api.get<ClienteResponseDto>(`${R}/${id}`).then(r => r.data);

export const createCliente = (data: ClienteCreateDto) =>
  api.post<ClienteResponseDto>(R, data).then(r => r.data);

export const updateCliente = (data: ClienteUpdateDto) =>
  api.put<ClienteResponseDto>(`${R}/${data.id}`, data).then(r => r.data);

export const deleteCliente = (id: string) =>
  api.delete<void>(`${R}/${id}`).then(r => r.data);
