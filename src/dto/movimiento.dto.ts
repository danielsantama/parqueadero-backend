export interface RegistroMovimientoDTO {
    idRegistro?: number;
    horaEntrada: Date;
    horaSalida?: Date;
    idVehiculo: number;
    idCelda: number;
    idAdmin: number;
}

export interface CrearMovimientoDTO {
    idVehiculo: number;
    idCelda: number;
    idAdmin: number;
}

export interface ActualizarMovimientoDTO {
    idRegistro: number;
    horaSalida: Date;
}