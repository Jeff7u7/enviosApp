import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CaracteristicaT } from 'src/app/models/caracteristicaT';
import Swal from 'sweetalert2';
import { Tarifa } from '../../models/tarifa';
import { TarifaService } from '../../services/tarifa.service';

@Component({
  selector: 'app-tarifa-form',
  templateUrl: './tarifa-form.component.html'
})
export class TarifaFormComponent implements OnInit {

  titulo: string = "Crear Tarifa";
  tarifa: Tarifa = new Tarifa();
  error: any;
  listaCaracteristicaT: CaracteristicaT[]=[];

  constructor(private service: TarifaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editar();
  }

  cargarCaracteristicas(caracteristicaT: CaracteristicaT) {
    this.listaCaracteristicaT.push(caracteristicaT);
  }

  crear() {
    this.tarifa.caracteristicaT = this.listaCaracteristicaT;
    this.service.crear(this.tarifa).subscribe(producto => {
      Swal.fire('Nuevo:', `Tarifa ${this.tarifa.nombre} creado con exito`, 'success');
      this.router.navigate(['/tarifa']);
    }, err => {
      if (err.status === 400) {
        this.error = err.error;
      }
    });
  }

  editar(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.service.ver(id).subscribe((tarifa) => this.tarifa = this.tarifa);
      }
    })
  }

  modificar() {
    this.service.modificar(this.tarifa).subscribe(tarifa => {
      Swal.fire('Modificado:', `Tarifa ${tarifa.nombre} actualizado con exito`, 'success');
      this.router.navigate(['/tarifa']);
    }, err => {
      if (err.status === 400) {
        this.error = err.error;
      }
    });
  }

  public eliminarCaracteristica(index: number, caracteristicaT: CaracteristicaT): void {
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
        this.listaCaracteristicaT = this.listaCaracteristicaT.filter((p, i) => i != index);
        Swal.fire('Eliminado:', `Descripcion ${caracteristicaT.descripcion} eliminado con exito`, 'success');
      }
    })
  }
  
}
