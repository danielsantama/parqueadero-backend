import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class ReporteDto {
    @IsNotEmpty()
    @IsString()
    fechaInicio: string | undefined;

    @IsNotEmpty()
    @IsString()
    fechaFin: string | undefined;

    @IsOptional()
    @IsString()
    tipoVehiculo?: string;

    @IsOptional()
    @IsString()
    estadoCelda?: string;

    @IsOptional()
    @IsDate()
    fechaGeneracion: Date;
}