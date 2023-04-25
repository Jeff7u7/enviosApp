import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Tarifa } from '../../models/tarifa';
import { TarifaService } from '../../services/tarifa.service';
import { CaracteristicaT } from '../../models/caracteristicaT';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarifa',
  templateUrl: './tarifa.component.html'
})
export class TarifaComponent implements OnInit {

  titulo: String = 'Tarifas';
  lista: Tarifa[] = [];

  constructor(private tarifaService: TarifaService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarTarifa();
  }

  private listarTarifa() {
    this.tarifaService.listar().subscribe(t => {
      this.lista = t as Tarifa[];
    });
  }
  
  public eliminar(tarifa: Tarifa): void {
    Swal.fire({
      title: 'Alerta!',
      text: `Seguro de eliminar a ${tarifa.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tarifaService.eliminar(tarifa.id).subscribe(() => {
          Swal.fire('Eliminado:', `Producto ${tarifa.nombre} eliminado con exito`, 'success');
          this.router.navigate(['/tarifa']);
        }) 
      }
    })
  }


}
