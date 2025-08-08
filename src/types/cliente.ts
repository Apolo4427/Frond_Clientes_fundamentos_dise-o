export interface ClienteResponseDto {
  id: string;                   
  nombre: string;
  apellido: string;
  telefono: string;
  correoElectronico: string;
  direccionPrincipal: string;    // coincide con el JSON de la API
  notasGenerales: string;
}

// Crear: todos menos id
export type ClienteCreateDto = Omit<ClienteResponseDto, 'id'>;

// Update: solo contacto + id
export type ClienteUpdateDto = Pick<
  ClienteResponseDto,
  'id' | 'telefono' | 'correoElectronico' | 'direccionPrincipal'
>;

