import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Celda } from './Celda';

@Entity('estado_celda')
export class EstadoCelda {
    @PrimaryGeneratedColumn({ name: 'id' })
    id!: number;

    @Column()
    nombre!: string;

}