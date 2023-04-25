import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Envio } from 'src/app/models/envio';
import { HistorialEnvio } from 'src/app/models/historial-envio';
import { HistorialHistorialEnvioService } from 'src/app/services/historial-envio.service';
import Swal from 'sweetalert2';
import { EnvioService } from '../../services/envio.service';

@Component({
  selector: 'app-rastreo',
  templateUrl: './rastreo.component.html'
})
export class RastreoComponent implements OnInit {

  lista: HistorialEnvio[] = [];
  titulo: string = 'Ver estado Pedido';
  bandera: boolean = false;
  id: number;
  error: any;

  constructor(private serviceEnvio: EnvioService, private service: HistorialHistorialEnvioService, private router: Router) { }

  ngOnInit(): void {
  }

  buscarTrazaHistorico() {
    this.serviceEnvio.ver(this.id).subscribe(envio => {
      this.service.verEnvio(envio)?.subscribe(historiales => {
        this.lista = historiales;
        this.bandera = true;
      });
    },err => {
      if (err.status === 400) {
        this.error = err.error;
      }
      if (err.status === 404) {
        this.error = err.error;
        Swal.fire('Info:', `ID de rastreo no existe`, 'info');
      }
    });
  }
}
