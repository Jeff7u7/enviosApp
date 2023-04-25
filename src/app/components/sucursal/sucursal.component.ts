import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Sucursal } from '../../models/sucursal';
import { SucursalService } from '../../services/sucursal.service';
import { Region } from '../../models/region';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html'
})
export class SucursalComponent implements OnInit {

  titulo: string = "Crear Sucursal";
  sucursal: Sucursal = new Sucursal();
  error: any;
  listaRegiones: Region[] = [];

  constructor(private serviceRegion: RegionService,private serviceSucursal: SucursalService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarSucursales();
  }

  cargarSucursales() {
    this.serviceRegion.listar().subscribe(s => {
      this.listaRegiones = s as Region[];
    });
  }

  crear() {
    this.serviceSucursal.crear(this.sucursal).subscribe(sucursal => {
      Swal.fire('Nuevo:', `Sucursal ${sucursal.nombre} ${sucursal.nombre}  creado con exito`, 'success');
      this.router.navigate(['/home']);
    }, err => {
      if (err.status === 400) {
        this.error = err.error;
      }
    });
  }
}
