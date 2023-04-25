import { Component, OnInit } from '@angular/core';
import { CaracteristicaTService } from 'src/app/services/caracteristica-t.service';
import Swal from 'sweetalert2';
import { CaracteristicaT } from '../../models/caracteristicaT';

@Component({
  selector: 'app-caracteristica-t',
  templateUrl: './caracteristica-t.component.html'
})
export class CaracteristicaTComponent implements OnInit {

  titulo: String = 'Tarifas';
  lista: CaracteristicaT[] = [];

  constructor(private tarifaService: CaracteristicaTService) { }

  ngOnInit(): void {
    this.listar();
  }

  private listar() {
    this.tarifaService.listar().subscribe(c => {
      this.lista = c as CaracteristicaT[];
    });
  }

  public eliminar(caracteristicaT: CaracteristicaT): void {
    Swal.fire({
      title: 'Alerta!',
      text: `Seguro de eliminar a ${caracteristicaT.descripcion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tarifaService.eliminar(caracteristicaT.id).subscribe(() => {
          Swal.fire('Eliminado:', `El detalle ${caracteristicaT.descripcion} eliminado con exito`, 'success');
        })
      }
    })
  }

}
