import { Region } from './region';
export class Sucursal {
    id: number = 0;
    nombre: string = '';
    direccion: string = '';
    estado: boolean = true;
    region : Region = new Region();
}


