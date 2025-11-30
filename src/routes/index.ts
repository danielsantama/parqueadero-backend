import { Router } from 'express';
import authRoutes from './auth.routes';
import movimientoRoutes from './movimiento.routes';
import vehiculoRoutes from './vehiculo.routes';
import reporteRoutes from './reporte.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/movimiento', movimientoRoutes);
router.use('/vehiculo', vehiculoRoutes);
router.use('/reporte', reporteRoutes);

export default router;