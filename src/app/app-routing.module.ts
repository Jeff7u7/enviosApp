import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvioComponent } from './components/envio/envio.component';
import { ProductoFormComponent } from './components/envio/producto-form.component';
import { HomeComponent } from './components/home/home.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { TarifaComponent } from './components/tarifa/tarifa.component';
import { TarifaFormComponent } from './components/tarifa/tarifa-form.component';
import { LoginComponent } from './components/usuarios/login.component';
import { EnviosComponent } from './components/historial/envios.component';
import { HistorialEnvioComponent } from './components/historial/historial-envio.component';
import { RastreoComponent } from './components/rastreador/rastreo.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { RegionComponent } from './components/region/region.component';

const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'home' },
{ path: 'envio', component: EnvioComponent },
{ path: 'productos/form', component: ProductoFormComponent },
{path: 'tarifa', component: TarifaComponent},
{path: 'tarifa/form', component: TarifaFormComponent},
{path: 'tarifa/form/:id', component: TarifaFormComponent},
{path: 'caracteristica/form', component: TarifaFormComponent},
{path: 'caracteristica/form/:id', component: TarifaFormComponent},
{path: 'historial', component: EnviosComponent},
{path: 'historialEnvio', component: HistorialEnvioComponent},
{path: 'rastreo', component: RastreoComponent},
{path: 'sucursal', component: SucursalComponent},
{path: 'region', component: RegionComponent},
{path: 'login',component: LoginComponent},
{ path: 'cliente', component: ClienteComponent },
{ path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
