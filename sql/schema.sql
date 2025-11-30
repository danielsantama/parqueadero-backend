CREATE TABLE ROL (
    id_rol INT PRIMARY KEY IDENTITY(1,1),
    nombre_rol VARCHAR(50) NOT NULL
);

CREATE TABLE USUARIO (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    id_rol INT,
    FOREIGN KEY (id_rol) REFERENCES ROL(id_rol)
);

CREATE TABLE ESTADO_CELDA (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE TIPO_VEHICULO (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE CLIENTE (
    id_cliente INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE MENSUALIDAD (
    id_mensualidad INT PRIMARY KEY IDENTITY(1,1),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    costo DECIMAL(10, 2) NOT NULL,
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente)
);

CREATE TABLE VEHICULO (
    id_vehiculo INT PRIMARY KEY IDENTITY(1,1),
    placa VARCHAR(10) NOT NULL UNIQUE,
    id_tipo INT,
    id_cliente INT,
    FOREIGN KEY (id_tipo) REFERENCES TIPO_VEHICULO(id),
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente)
);

CREATE TABLE CELDA (
    id_celda INT PRIMARY KEY IDENTITY(1,1),
    nombre_celda VARCHAR(10) NOT NULL UNIQUE,
    id_tipo_vehiculo INT,
    id_estado INT,
    FOREIGN KEY (id_tipo_vehiculo) REFERENCES TIPO_VEHICULO(id),
    FOREIGN KEY (id_estado) REFERENCES ESTADO_CELDA(id)
);

CREATE TABLE REGISTRO_MOVIMIENTO (
    id_registro INT PRIMARY KEY IDENTITY(1,1),
    hora_entrada DATETIME NOT NULL,
    hora_salida DATETIME,
    id_vehiculo INT,
    id_celda INT,
    id_admin INT,
    FOREIGN KEY (id_vehiculo) REFERENCES VEHICULO(id_vehiculo),
    FOREIGN KEY (id_celda) REFERENCES CELDA(id_celda),
    FOREIGN KEY (id_admin) REFERENCES USUARIO(id_usuario)
);