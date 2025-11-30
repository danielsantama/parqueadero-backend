import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Mensualidad } from './Mensualidad';
import { Vehiculo } from './Vehiculo';

@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn({ name: 'id_cliente' })
    id_cliente!: number;

    @Column({ name: 'nombre' })
    nombre!: string;

    @Column({ name: 'telefono' })
    telefono!: string;

    @Column({ name: 'email' })
    email!: string;

    @OneToMany(() => Mensualidad, mensualidad => mensualidad.cliente)
    mensualidades?: Mensualidad[];

    @OneToMany(() => Vehiculo, vehiculo => vehiculo.cliente)
    vehiculos?: Vehiculo[];
}