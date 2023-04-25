import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Envio } from 'src/app/models/envio';
import { HistorialEnvio } from '../models/historial-envio';

@Injectable({
  providedIn: 'root'
})
export class HistorialHistorialEnvioService {
  private urlEndPoint: string = 'http://localhost:8090/api/historiales';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private authService: AuthService) { }

  headers: HttpHeaders = new HttpHeaders();

  protected agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', `Bearer ${token}`);
    }
    return this.httpHeaders;
  }

  listar(): Observable<HistorialEnvio[]> {
    return this.http.get<HistorialEnvio[]>(this.urlEndPoint);
  }

  listarPagina(page: string, size: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<any>(`${this.urlEndPoint}/pagina`, { params: params });
  }

  ver(id: number): Observable<HistorialEnvio> {
    return this.http.get<HistorialEnvio>(`${this.urlEndPoint}/$id`);
  }

  verEnvio(envio: Envio): Observable<HistorialEnvio[]> {
    return this.http.post<HistorialEnvio[]>(`${this.urlEndPoint}/buscarEnvio`, envio, { headers: this.httpHeaders });
  }

  actualizarState(historialEnvio: HistorialEnvio): Observable<HistorialEnvio> | undefined {
    if (historialEnvio.estado === "Recibido") {
      historialEnvio.estado = "Viajando";
      return this.http.post<HistorialEnvio>(`${this.urlEndPoint}/registrarActualizacionEnvioHistorial`, historialEnvio, { headers: this.httpHeaders });
    } else if (historialEnvio.estado === "Viajando") {
      historialEnvio.estado = "Entregado";
      return this.http.post<HistorialEnvio>(`${this.urlEndPoint}/registrarActualizacionEnvioHistorial`, historialEnvio, { headers: this.httpHeaders });
    }
    return undefined;
  }

}
