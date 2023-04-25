import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { SucursalService } from 'src/app/services/sucursal.service';
import Swal from 'sweetalert2';
import { Sucursal } from '../../models/sucursal';
import { TipoTransporte } from '../../models/tipo-transporte';
import { TipoTransporteService } from '../../services/tipo-transporte.service';
import { Envio } from '../../models/envio';
import { EnvioService } from '../../services/envio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { Tarifa } from '../../models/tarifa';
import { TarifaService } from '../../services/tarifa.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
})
export class EnvioComponent implements OnInit {

  titulo: string = 'Bienvenido a AppEnvios';
  envio: Envio = new Envio();
  tarifa: Tarifa = new Tarifa();
  valorCobrar: number;
  client: Cliente = new Cliente();
  listaSucursales: Sucursal[] = [];
  listaTransportes: TipoTransporte[] = [];
  listaproductos: Producto[] = [];
  listaTarifas: Tarifa[] = [];
  productoDeLista: Producto;
  index: number = 0;
  error: any;
  idEnvio: number;

  constructor(public authService: AuthService, private router: Router, private route: ActivatedRoute, private serviceEnvio: EnvioService, private serviceSucursal: SucursalService, private servicetipoTransporte: TipoTransporteService, private serviceClient: ClienteService, private serviceTarifa: TarifaService) { }

  ngOnInit(): void {
    this.cargarSucursales();
    this.cargarTransportes();
    this.cargarTarifas();
  }

  cargarTarifas() {
    this.serviceTarifa.listar().subscribe(t => {
      this.listaTarifas = t as Tarifa[];
    });
  }

  cargarSucursales() {
    this.serviceSucursal.listar().subscribe(s => {
      this.listaSucursales = s as Sucursal[];
    });
  }

  cargarTransportes() {
    this.servicetipoTransporte.listar().subscribe(t => {
      this.listaTransportes = t as TipoTransporte[]
    });
  }

  cargarProductos(producto: Producto) {
    this.listaproductos.push(producto);
  } 

  validarCliente(){
    this.serviceClient.ver(this.envio.cliente.num_documento).subscribe(clienteValidado => {
      console.log(clienteValidado);
      this.client = clienteValidado;
    });
  }

  crear() {
    this.validarCliente();
    if (this.client.num_documento != null && this.client.num_documento != 0) {
      this.envio.productos = this.listaproductos;
      this.envio.estadoActual = 'recibido';
      this.envio.valorEnvio = this.valorCobrar;
      this.serviceEnvio.crear(this.envio).subscribe(envio => {
        this.envio = envio;
        this.idEnvio = envio.id;
        Swal.fire('Nuevo:', `Envio del ${this.envio.cliente.num_documento}  creado con exito`, 'success');
        this.router.navigate(['/envio']);
      }, err => {
        if (err.status === 400) {
          this.error = err.error;
        }
      });
    }else{
      Swal.fire('Info:', `El cliente con el numero de identificacion : ${this.envio.cliente.num_documento}  no esta registado`, 'info');
    }
  }



  public modificarProducto(index: number, producto: Producto): void {
    this.index = index;
    this.productoDeLista = producto;

  }

  public eliminarProducto(index: number, producto: Producto): void {
    Swal.fire({
      title: 'Alerta!',
      text: `Seguro de eliminar a ${producto.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listaproductos = this.listaproductos.filter((p, i) => i != index);
        Swal.fire('Eliminado:', `Producto ${producto.nombre} eliminado con exito`, 'success');
        this.calcularCostoEnvio();
      }
    })
  }

  calcularCostoEnvio() {
    if (this.listaproductos.length > 0) {
      let totalMedida: number = 0;
      this.listaproductos.forEach(producto => {
        totalMedida += producto.peso;
      });
      this.serviceTarifa.calcularValorTarifa(totalMedida, this.tarifa).subscribe(valoCobrar => {
        this.valorCobrar = valoCobrar;
        console.log(this.valorCobrar);
      }, err => {
        if (err.status === 400) {
          this.error = err.error;
        }
      });
    }
  }



}
