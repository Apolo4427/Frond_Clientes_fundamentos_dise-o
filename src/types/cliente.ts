export interface ClienteBase {
  nombre: string;
  apellido: string;
  telefono: string;
  correoElectronico: string;
  direccionPrincipal: string;
  notasGenerales: string;
}

export interface ClienteCreateDto extends ClienteBase {}

export interface ClienteUpdateDto extends ClienteBase {
  id: string;
}

export interface ClienteResponseDto extends ClienteUpdateDto {}
