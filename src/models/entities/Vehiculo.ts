import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TipoVehiculo } from './TipoVehiculo';
import { Cliente } from './Cliente';
import { RegistroMovimiento } from './RegistroMovimiento';

@Entity('vehiculo')
export class Vehiculo {
    @PrimaryGeneratedColumn({ name: 'id_vehiculo' })
    id_vehiculo!: number;

    @Column({ unique: true })
    placa!: string;

    @Column({ name: 'id_tipo' })
    id_tipo!: number;

    @Column({ name: 'id_cliente', nullable: true }) 
    id_cliente!: number; 

    @ManyToOne(() => TipoVehiculo, tipoVehiculo => tipoVehiculo.vehiculos)
    @JoinColumn({ name: 'id_tipo' })
    tipoVehiculo!: TipoVehiculo;

    @ManyToOne(() => Cliente, cliente => cliente.vehiculos, { nullable: true })
    @JoinColumn({ name: 'id_cliente' })
    cliente?: Cliente | null;

    @OneToMany(() => RegistroMovimiento, registro => registro.vehiculo)
    registros?: RegistroMovimiento[];
}