import { Envio } from './envio';
export class HistorialEnvio {
    id: number = 0;
    estado : string ='';
    fecha_registro:string ='';
    novedad:string ='';
    envio : Envio = new Envio();
}
