import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
})
export class ClienteComponent implements OnInit {

  titulo: string = "Crear Cliente";
  cliente: Cliente = new Cliente();
  error: any;
  constructor(private serviceCliente: ClienteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  crear() {
    this.serviceCliente.crear(this.cliente).subscribe(cliente => {
      Swal.fire('Nuevo:', `Cliente ${cliente.nombre} ${cliente.apellido}  creado con exito`, 'success');
      this.router.navigate(['/home']);
    }, err => {
      if (err.status === 400) {
        this.error = err.error;
      }
    });
  }


}
