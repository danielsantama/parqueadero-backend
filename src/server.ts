import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import movimientoRoutes from './routes/movimiento.routes';
import reporteRoutes from './routes/reporte.routes';
import vehiculoRoutes from './routes/vehiculo.routes';
import celdaRoutes from './routes/celda.routes';
import usuarioRoutes from './routes/usuario.routes';
import { swaggerUi, specs } from './config/swagger';

const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/movimiento', movimientoRoutes);
app.use('/api/reporte', reporteRoutes);
app.use('/api/vehiculo', vehiculoRoutes);
app.use('/api/celda', celdaRoutes);
app.use('/api/usuario', usuarioRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

(async () => {
    try {
        await connectDB(); 
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
        });
    } catch (err) {
        console.error('Failed to start application', err);
        process.exit(1);
    }
})();