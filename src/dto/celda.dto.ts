export interface CeldaDto {
    nombre_celda: string;
    id_tipo_vehiculo: number;
    id_estado: number;
}

export interface CrearCeldaDto {
    nombre_celda: string;
    id_tipo_vehiculo: number;
    id_estado?: number; // Opcional, por defecto se puede asignar Disponible
}

export interface ActualizarCeldaDto {
    nombre_celda?: string;
    id_tipo_vehiculo?: number;
    id_estado?: number;
}

export interface ActualizarEstadoCeldaDto {
    id_estado: number;
}

export interface FiltrarCeldasDto {
    id_tipo_vehiculo?: number;
    id_estado?: number;
}

export interface CeldaResponseDto {
    id_celda: number;
    nombre_celda: string;
    id_tipo_vehiculo: number;
    id_estado: number;
}

export interface DisponibilidadResponseDto {
    id_tipo_vehiculo: number;
    celdas_disponibles: number;
}
