import { api } from './axiosClient';
import type { ClienteCreateDto, ClienteUpdateDto, ClienteResponseDto } from '../types/cliente';

const R = '/clientes';

export function getClienteById(id: string): Promise<ClienteResponseDto> {
  return api.get<ClienteResponseDto>(`${R}/${id}`).then(r => r.data);
}

export function createCliente(data: ClienteCreateDto): Promise<ClienteResponseDto> {
  return api.post<ClienteResponseDto>(R, data).then(r => r.data);
}

export function updateCliente(data: ClienteUpdateDto): Promise<ClienteResponseDto> {
  const { id, ...body } = data;              // id va en la URL
  return api.put<ClienteResponseDto>(`${R}/${id}`, body).then(r => r.data);
}

export function deleteCliente(id: string): Promise<void> {
  return api.delete<void>(`${R}/${id}`).then(() => {});
}


