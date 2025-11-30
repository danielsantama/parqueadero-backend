import { createConnection, Connection, ConnectionOptions, getConnectionManager } from 'typeorm';
import { Usuario } from '../models/entities/Usuario';
import { Rol } from '../models/entities/Rol';
import { EstadoCelda } from '../models/entities/EstadoCelda';
import { TipoVehiculo } from '../models/entities/TipoVehiculo';
import { Cliente } from '../models/entities/Cliente';
import { Mensualidad } from '../models/entities/Mensualidad';
import { Vehiculo } from '../models/entities/Vehiculo';
import { Celda } from '../models/entities/Celda';
import { RegistroMovimiento } from '../models/entities/RegistroMovimiento';

const dbOptions: ConnectionOptions = {
    name: 'default',
    type: 'mssql',
    host: process.env.DB_HOST || 'WORTIZ\\MSSQLSERVER16',
    port: parseInt(process.env.DB_PORT || '1433', 10),
    username: process.env.DB_USERNAME || 'parqueadero',
    password: process.env.DB_PASSWORD || 'parqueadero',
    database: process.env.DB_NAME || 'Parqueadero',
    entities: [
        Usuario,
        Rol,
        EstadoCelda,
        TipoVehiculo,
        Cliente,
        Mensualidad,
        Vehiculo,
        Celda,
        RegistroMovimiento
    ],
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    options: {
        encrypt: true
    }
};

export const connectDB = async (): Promise<Connection> => {
    try {
        const connectionManager = getConnectionManager();
        
        // Verificar si ya existe una conexión
        if (connectionManager.has('default')) {
            const existingConnection = connectionManager.get('default');
            if (existingConnection.isConnected) {
                console.log('Using existing database connection');
                return existingConnection;
            }
            // Si existe pero no está conectada, conectar
            await existingConnection.connect();
            console.log('Reconnected to existing database connection');
            return existingConnection;
        }

        // Crear nueva conexión
        const connection = await createConnection(dbOptions);
        console.log('Database connected successfully');
        return connection;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

export const getDBConnection = (): Connection => {
    const connectionManager = getConnectionManager();
    if (!connectionManager.has('default')) {
        throw new Error('Database connection not initialized. Call connectDB() first.');
    }
    const conn = connectionManager.get('default');
    if (!conn.isConnected) {
        throw new Error('Database connection exists but is not connected.');
    }
    return conn;
};