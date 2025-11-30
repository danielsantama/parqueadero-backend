import { Router } from 'express';
import { vehiculoController } from '../controllers/vehiculo.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

/**
 * @openapi
 * /api/vehiculo:
 *   post:
 *     tags:
 *       - Vehículo
 *     summary: Crear nuevo vehículo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *                 example: "XYZ-789"
 *               id_tipo:
 *                 type: integer
 *                 example: 1
 *               id_cliente:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - placa
 *     responses:
 *       201:
 *         description: Vehículo creado exitosamente
 *       400:
 *         description: Datos inválidos o placa duplicada
 *       401:
 *         description: No autorizado
 */
router.post('/', authMiddleware, (req, res) => vehiculoController.crearVehiculo(req, res));

/**
 * @openapi
 * /api/vehiculo:
 *   get:
 *     tags:
 *       - Vehículo
 *     summary: Obtener todos los vehículos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vehículos
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, (req, res) => vehiculoController.obtenerVehiculos(req, res));

/**
 * @openapi
 * /api/vehiculo/{placa}:
 *   get:
 *     tags:
 *       - Vehículo
 *     summary: Obtener vehículo por placa
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placa
 *         required: true
 *         schema:
 *           type: string
 *         example: "ABC-123"
 *     responses:
 *       200:
 *         description: Vehículo encontrado
 *       404:
 *         description: Vehículo no encontrado
 *       401:
 *         description: No autorizado
 */
router.get('/:placa', authMiddleware, (req, res) => vehiculoController.obtenerVehiculoPorPlaca(req, res));

/**
 * @openapi
 * /api/vehiculo/{placa}:
 *   put:
 *     tags:
 *       - Vehículo
 *     summary: Actualizar vehículo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placa
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_tipo:
 *                 type: integer
 *               id_cliente:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Vehículo actualizado
 *       404:
 *         description: Vehículo no encontrado
 *       401:
 *         description: No autorizado
 */
router.put('/:placa', authMiddleware, (req, res) => vehiculoController.actualizarVehiculo(req, res));

/**
 * @openapi
 * /api/vehiculo/{placa}:
 *   delete:
 *     tags:
 *       - Vehículo
 *     summary: Eliminar vehículo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placa
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Vehículo eliminado
 *       404:
 *         description: Vehículo no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete('/:placa', authMiddleware, (req, res) => vehiculoController.eliminarVehiculo(req, res));

/**
 * @openapi
 * /api/vehiculo/movimientos/pendientes:
 *   get:
 *     tags:
 *       - Vehículo
 *     summary: Obtener movimientos de vehículos pendientes (activos en el parqueadero)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vehículos con movimientos pendientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_registro:
 *                     type: integer
 *                     example: 1
 *                   placa:
 *                     type: string
 *                     example: "ABC-123"
 *                   tipo_vehiculo:
 *                     type: string
 *                     example: "Automóvil"
 *                   celda_asignada:
 *                     type: string
 *                     example: "A-01"
 *                   hora_entrada:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-11-17T10:30:00Z"
 *                   tiempo_transcurrido:
 *                     type: string
 *                     example: "2 horas 30 minutos"
 *       401:
 *         description: No autorizado
 */
router.get('/movimientos/pendientes', authMiddleware, (req, res) => vehiculoController.obtenerMovimientosPendientes(req, res));


export default router;