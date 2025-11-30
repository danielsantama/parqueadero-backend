import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';

@Entity('rol')
export class Rol {
    @PrimaryGeneratedColumn({ name: 'id_rol' })
    id_rol!: number;

    @Column({ name: 'nombre_rol' })
    nombre_rol!: string;

    @OneToMany(() => Usuario, usuario => usuario.rol)
    usuarios?: Usuario[];
}