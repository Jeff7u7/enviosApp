import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Envio } from 'src/app/models/envio';
import { HistorialHistorialEnvioService } from 'src/app/services/historial-envio.service';
import Swal from 'sweetalert2';
import { HistorialEnvio } from '../../models/historial-envio';

@Component({
  selector: 'app-historial-envio',
  templateUrl: './historial-envio.component.html'
})
export class HistorialEnvioComponent implements OnInit {

  lista: HistorialEnvio[] = [];
  titulo: string = 'Historial de envios Por estado';
  totalRegistros = 0;
  totalPorPagina = 5;
  paginaActual = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private service: HistorialHistorialEnvioService,private router: Router) { }

  ngOnInit(): void {
    this.calcularRangos();
  }

  private calcularRangos() {
    this.service.listarPagina(this.paginaActual.toString(), this.totalPorPagina.toString()).subscribe(p => {
      this.lista = p.content as HistorialEnvio[];
      this.totalRegistros = p.totalElements as number;
    });
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();
  }

  actualizarState(historialEnvio: HistorialEnvio){
    this.service.actualizarState(historialEnvio)?.subscribe(h => {
      Swal.fire('Actualizado:', `El Envio se actualizo de ${historialEnvio.estado} a ${h.estado} `, 'success');
      this.router.navigate(['/historialEnvio']);
    });
  }


}
