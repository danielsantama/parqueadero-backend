import { Request, Response } from 'express';
import { MovimientoService } from '../services/movimiento.service';
import { RegistroMovimientoDTO } from '../dto/movimiento.dto';

export class MovimientoController {
    private movimientoService: MovimientoService;

    constructor() {
        this.movimientoService = new MovimientoService();
    }

    public async registrarEntrada(req: Request, res: Response): Promise<Response> {
        const body: any = req.body as RegistroMovimientoDTO;

        const placa = body.placa || body.vehiculo?.placa;
        const idCelda = body.idCelda ?? body.id_celda ?? body.celda?.id_celda;
        const idAdmin = body.idAdmin ?? body.id_admin ?? body.admin?.id_usuario;

        if (!placa || idCelda == null || idAdmin == null) {
            return res.status(400).json({ message: 'Faltan campos requeridos: placa, idCelda, idAdmin' });
        }

        try {
            const resultado = await this.movimientoService.registrarEntrada({
                placa: String(placa),
                idCelda: Number(idCelda),
                idAdmin: Number(idAdmin),
            });
            return res.status(201).json({ message: 'Registro de entrada exitoso', data: resultado });
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(400).json({ message: msg });
        }
    }

    public async registrarSalida(req: Request, res: Response): Promise<Response> {
        const placa = (req.params.placa || req.query.placa || req.body.placa) as string | undefined;
        if (!placa) {
            return res.status(400).json({ message: 'Parámetro placa es requerido' });
        }

        try {
            const resultado = await this.movimientoService.registrarSalida(String(placa));
            return res.status(200).json({ message: 'Registro de salida exitoso', data: resultado });
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(400).json({ message: msg });
        }
    }
}

export const movimientoController = new MovimientoController();