import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TipoVehiculo } from './TipoVehiculo';
import { EstadoCelda } from './EstadoCelda';
import { RegistroMovimiento } from './RegistroMovimiento';

@Entity('celda')
export class Celda {
    @PrimaryGeneratedColumn({ name: 'id_celda' })
    id_celda!: number;

    @Column({ name: 'nombre_celda' })
    nombre_celda!: string;

    @Column({ name: 'id_tipo_vehiculo' })
    id_tipo_vehiculo!: number;

    @Column({ name: 'id_estado' })
    id_estado!: number;

    @OneToMany(() => RegistroMovimiento, registro => registro.celda)
    registros?: RegistroMovimiento[];
}