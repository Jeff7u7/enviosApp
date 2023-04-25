import { Cliente } from './cliente';
import { TipoTransporte } from './tipo-transporte';
import { Producto } from './producto';

export class Envio {
    id: number;
    sucursalDestino: number = 0;
    sucursalOrigen: number = 0;
    descripcion: string = '';
    peso: number = 0;
    fecha: string;
    valorEnvio: number =0;
    estadoActual: string = '';
    cliente: Cliente = new Cliente();
    transporte: TipoTransporte = new TipoTransporte();
    productos: Producto[] = [];
}