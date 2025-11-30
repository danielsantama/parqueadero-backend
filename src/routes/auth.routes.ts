import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validateLogin, validateRegister } from '../middleware/validation.middleware';

const router = Router();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Token y usuario
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', validateLogin, (req, res) => authController.login(req, res));

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registrar usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               id_rol:
 *                 type: integer
 *             required:
 *               - nombre
 *               - email
 *               - password
 *               - id_rol
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Datos inválidos
 */
router.post('/register', validateRegister, (req, res) => authController.register(req, res));

export default router;