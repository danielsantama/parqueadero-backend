import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'WORTIZ\\MSSQLSERVER16',
        port: process.env.DB_PORT || 1433,
        user: process.env.DB_USER || 'parqueadero',
        password: process.env.DB_PASSWORD || 'parqueadero',
        database: process.env.DB_NAME || 'parqueadero',
    },
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    jwtExpiration: process.env.JWT_EXPIRATION || '1h',
};

export default config;