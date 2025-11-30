import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vehiculo } from './Vehiculo';
import { Celda } from './Celda';

@Entity('tipo_vehiculo')
export class TipoVehiculo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @OneToMany(() => Vehiculo, vehiculo => vehiculo.tipoVehiculo)
    vehiculos?: Vehiculo[];
}