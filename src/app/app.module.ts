import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvioComponent } from './components/envio/envio.component';
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './components/home/home.component';
import { ProductoFormComponent } from './components/envio/producto-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClienteComponent } from './components/cliente/cliente.component';
import { TarifaComponent } from './components/tarifa/tarifa.component';
import { CaracteristicaFormComponent } from './components/tarifa/caracteristica-form.component';
import { CaracteristicaTComponent } from './components/tarifa/caracteristica-t.component';
import { TarifaFormComponent } from './components/tarifa/tarifa-form.component';
import { LoginComponent } from './components/usuarios/login.component';
import { EnviosComponent } from './components/historial/envios.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistorialEnvioComponent } from './components/historial/historial-envio.component';
import { RastreoComponent } from './components/rastreador/rastreo.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { RegionComponent } from './components/region/region.component';

@NgModule({
  declarations: [
    AppComponent,
    EnvioComponent,
    HomeComponent,
    ProductoFormComponent,
    ClienteComponent,
    TarifaComponent,
    TarifaFormComponent,
    CaracteristicaFormComponent,
    CaracteristicaTComponent,
    LoginComponent,
    EnviosComponent,
    HistorialEnvioComponent,
    RastreoComponent,
    SucursalComponent,
    RegionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
