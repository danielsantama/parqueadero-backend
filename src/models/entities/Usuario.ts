import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Rol } from './Rol';
import { RegistroMovimiento } from './RegistroMovimiento';

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id_usuario!: number;

    @Column()
    nombre!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    contrasena!: string;

    @Column({ name: 'id_rol' }) 
    id_rol!: number;

    @ManyToOne(() => Rol)
    @JoinColumn({ name: 'id_rol' })
    rol?: Rol;
}