import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Region } from 'src/app/models/region';
import Swal from 'sweetalert2';
import { RegionService } from '../../services/region.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html'
})
export class RegionComponent implements OnInit {

  titulo: string = "Crear Region";
  region: Region = new Region();
  error: any;
  constructor(private serviceRegion: RegionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  crear() {
    this.serviceRegion.crear(this.region).subscribe(region => {
      Swal.fire('Nuevo:', ` Region ${region.nombre} creado con exito`, 'success');
      this.router.navigate(['/home']);
    }, err => {
      if (err.status === 400) {
        this.error = err.error;
      }
    });
  }

}
