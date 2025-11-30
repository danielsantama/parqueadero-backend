import { Router } from 'express';
import { movimientoController } from '../controllers/movimiento.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

/**
 * @openapi
 * /api/movimiento/entrada:
 *   post:
 *     tags:
 *       - Movimiento
 *     summary: Registrar entrada de vehículo
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
 *                 example: "ABC-123"
 *               idCelda:
 *                 type: integer
 *                 example: 1
 *               idAdmin:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - placa
 *               - idCelda
 *               - idAdmin
 *     responses:
 *       201:
 *         description: Entrada registrada exitosamente
 *       400:
 *         description: Error en los datos o vehículo ya activo
 *       401:
 *         description: No autorizado
 */
router.post('/entrada', authMiddleware, (req, res) => movimientoController.registrarEntrada(req, res));

/**
 * @openapi
 * /api/movimiento/salida:
 *   post:
 *     tags:
 *       - Movimiento
 *     summary: Registrar salida de vehículo
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
 *                 example: "ABC-123"
 *             required:
 *               - placa
 *     responses:
 *       200:
 *         description: Salida registrada exitosamente
 *       400:
 *         description: Vehículo no encontrado o sin entrada activa
 *       401:
 *         description: No autorizado
 */
router.post('/salida', authMiddleware, (req, res) => movimientoController.registrarSalida(req, res));

export default router;