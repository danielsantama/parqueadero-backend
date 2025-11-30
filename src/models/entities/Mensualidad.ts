import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './Cliente';

@Entity('mensualidad')
export class Mensualidad {
    @PrimaryGeneratedColumn({ name: 'id_mensualidad' })
    id_mensualidad!: number;

    @Column({ type: 'date', name: 'fecha_inicio' })
    fecha_inicio!: Date;

    @Column({ type: 'date', name: 'fecha_fin' })
    fecha_fin!: Date;

    @Column('decimal', { precision: 10, scale: 2, name: 'costo' })
    costo!: number;

    @Column({ name: 'id_cliente', nullable: true }) 
    id_cliente!: number; 

    @ManyToOne(() => Cliente, cliente => cliente.mensualidades)
    @JoinColumn({ name: 'id_cliente' })
    cliente!: Cliente;
}