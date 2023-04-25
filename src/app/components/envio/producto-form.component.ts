import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/models/producto';


@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
})
export class ProductoFormComponent implements OnInit {

  titulo: string = "Crear Producto";
  titulo2: string = "Modificar Producto";
  producto: Producto = new Producto();
  error: any;

  //@Input() productoDeLista: Producto;
  //@Input() indice: number;

  @Output() propagar: EventEmitter<Producto> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  agregarProducto() {
    //const productoEmit: Producto = this.producto;
    this.propagar.emit(this.producto);
    this.producto = new Producto();
  }
  
  /*
  modificarProducto() {
    this.propagar.emit(this.producto);
    this.producto = new Producto();
  }*/


}
