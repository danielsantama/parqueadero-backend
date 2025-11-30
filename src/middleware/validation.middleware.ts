import { Request, Response, NextFunction } from 'express';

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email y contraseña son requeridos' });
        return;
    }

    if (typeof email !== 'string' || !email.includes('@')) {
        res.status(400).json({ message: 'Email inválido' });
        return;
    }

    if (typeof password !== 'string' || password.length < 6) {
        res.status(400).json({ message: 'Contraseña debe tener al menos 6 caracteres' });
        return;
    }

    next();
};

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password || !rol) {
        res.status(400).json({ message: 'Nombre, email, contraseña y rol son requeridos' });
        return;
    }

    if (typeof nombre !== 'string' || nombre.trim().length === 0) {
        res.status(400).json({ message: 'Nombre inválido' });
        return;
    }

    if (typeof email !== 'string' || !email.includes('@')) {
        res.status(400).json({ message: 'Email inválido' });
        return;
    }

    if (typeof password !== 'string' || password.length < 6) {
        res.status(400).json({ message: 'Contraseña debe tener al menos 6 caracteres' });
        return;
    }

    if (typeof rol !== 'number' || rol <= 0) {
        res.status(400).json({ message: 'Rol inválido' });
        return;
    }

    next();
};

// Historia 3: Validación para crear celda
export const validateCrearCelda = (req: Request, res: Response, next: NextFunction): void => {
    const { nombre_celda, id_tipo_vehiculo, id_estado } = req.body;

    if (!nombre_celda || !id_tipo_vehiculo || !id_estado) {
        res.status(400).json({ message: 'nombre_celda, id_tipo_vehiculo e id_estado son requeridos' });
        return;
    }

    if (typeof nombre_celda !== 'string' || nombre_celda.trim().length === 0) {
        res.status(400).json({ message: 'nombre_celda inválido' });
        return;
    }

    if (typeof id_tipo_vehiculo !== 'number' || id_tipo_vehiculo <= 0) {
        res.status(400).json({ message: 'id_tipo_vehiculo inválido' });
        return;
    }

    if (typeof id_estado !== 'number' || id_estado <= 0) {
        res.status(400).json({ message: 'id_estado inválido' });
        return;
    }

    next();
};

// Historia 4: Validación para actualizar estado de celda
export const validateActualizarEstado = (req: Request, res: Response, next: NextFunction): void => {
    const { id_estado } = req.body;

    if (!id_estado) {
        res.status(400).json({ message: 'id_estado es requerido' });
        return;
    }

    if (typeof id_estado !== 'number' || id_estado <= 0 || id_estado > 3) {
        res.status(400).json({ message: 'id_estado inválido (1=Disponible, 2=Ocupada, 3=Mantenimiento)' });
        return;
    }

    next();
};

export default validateLogin;