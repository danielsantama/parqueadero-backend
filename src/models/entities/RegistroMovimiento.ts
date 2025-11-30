import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Vehiculo } from './Vehiculo';
import { Celda } from './Celda';

@Entity('registro_movimiento')
export class RegistroMovimiento {
    @PrimaryGeneratedColumn({ name: 'id_registro' })
    id_registro!: number;

    @Column({ type: 'datetime', name: 'hora_entrada' })
    hora_entrada!: Date;

    @Column({ type: 'datetime', name: 'hora_salida', nullable: true })
    hora_salida?: Date;

    @Column({ name: 'id_vehiculo' })
    id_vehiculo!: number; 
    
    @Column({ name: 'id_celda' })
    id_celda!: number;

    @Column({ name: 'id_admin' })
    id_admin!: number;

    @ManyToOne(() => Vehiculo, vehiculo => vehiculo.registros)
    @JoinColumn({ name: 'id_vehiculo' })
    vehiculo!: Vehiculo;

    @ManyToOne(() => Celda, celda => celda.registros)
    @JoinColumn({ name: 'id_celda' })
    celda!: Celda;
}