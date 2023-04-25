import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CaracteristicaT } from '../../models/caracteristicaT';
import { CaracteristicaTService } from '../../services/caracteristica-t.service';

@Component({
  selector: 'app-caracteristica-form',
  templateUrl: './caracteristica-form.component.html'
})
export class CaracteristicaFormComponent implements OnInit {

  titulo: string = "Crear Detalle de Tarifa";
  caracteristicaT: CaracteristicaT = new CaracteristicaT();
  error: any;

  @Output() propagar: EventEmitter<CaracteristicaT> = new EventEmitter();

  constructor(private service: CaracteristicaTService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editar();
  }

  crear() {
    this.propagar.emit(this.caracteristicaT);
    this.caracteristicaT = new CaracteristicaT();
  }

  editar(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.service.ver(id).subscribe((caracteristicaT) => this.caracteristicaT = this.caracteristicaT);
      }
    })
  }

  modificar() {
    this.service.modificar(this.caracteristicaT).subscribe(caracteristicaT => {
      Swal.fire('Modificado:', `Tarifa ${caracteristicaT.descripcion} actualizado con exito`, 'success');
      this.router.navigate(['/tarifa']);
    }, err => {
      if (err.status === 400) {
        this.error = err.error;
      }
    });
  }


}
