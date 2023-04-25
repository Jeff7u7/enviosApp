import { Component, OnInit } from '@angular/core';
import { Envio } from 'src/app/models/envio';
import Swal from 'sweetalert2';
import { PageEvent } from "@angular/material/paginator";
import { EnvioService } from '../../services/envio.service';

@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html'
})
export class EnviosComponent implements OnInit {

  listaEnvios: Envio[] = [];
  titulo: string = 'Lista Envios';
  totalRegistros = 0;
  totalPorPagina = 5;
  paginaActual = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private service: EnvioService) { }

  ngOnInit(): void {
    this.calcularRangos();
  }

  private calcularRangos() {
    this.service.listarPagina(this.paginaActual.toString(), this.totalPorPagina.toString()).subscribe(p => {
      this.listaEnvios = p.content as Envio[];
      this.totalRegistros = p.totalElements as number;
    });
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();
  }

  public eliminar(envio: Envio): void {
    Swal.fire({
      title: 'Alerta!',
      text: `Seguro de eliminar a ${envio.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(envio.id).subscribe(() => {
          // this.lista = this.lista.filter(p => p !== producto);
          this.calcularRangos();
          Swal.fire('Eliminado:', `Producto ${envio.id} eliminado con exito`, 'success');
        })
      }
    })
  }

}
