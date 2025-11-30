// This file defines custom TypeScript types.

type Rol = {
    id_rol: number;
    nombre_rol: string;
};

type Usuario = {
    id_usuario: number;
    nombre: string;
    email: string;
    contraseña: string;
    id_rol: number; // FK to Rol
};

type EstadoCelda = {
    id: number;
    nombre: string;
};

type TipoVehiculo = {
    id: number;
    nombre: string;
};

type Cliente = {
    id_cliente: number;
    nombre: string;
    telefono: string;
    email: string;
};

type Mensualidad = {
    id_mensualidad: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    costo: number;
    id_cliente: number; // FK to Cliente
};

type Vehiculo = {
    id_vehiculo: number;
    placa: string; // Unique
    id_tipo: number; // FK to TipoVehiculo
    id_cliente: number; // FK to Cliente (optional)
};

type Celda = {
    id_celda: number;
    nombre_celda: string;
    id_tipo_vehiculo: number; // FK to TipoVehiculo
    id_estado: number; // FK to EstadoCelda
};

type RegistroMovimiento = {
    id_registro: number;
    hora_entrada: Date;
    hora_salida: Date;
    id_vehiculo: number; // FK to Vehiculo
    id_celda: number; // FK to Celda
    id_admin: number; // FK to Usuario (admin)
};