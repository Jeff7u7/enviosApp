import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Envio } from '../models/envio';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {

  private urlEndPoint: string = 'http://localhost:8090/api/envios';
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

  listar(): Observable<Envio[]> {
    return this.http.get<Envio[]>(this.urlEndPoint);
  }

  listarPagina(page: string, size: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<any>(`${this.urlEndPoint}/pagina`, { params: params });
  }

  ver(id: number): Observable<Envio> {
    return this.http.get<Envio>(`${this.urlEndPoint}/${id}`);
  }

  crear(envio: Envio): Observable<Envio> {
    return this.http.post<Envio>(`${this.urlEndPoint}/crearEnvio`, envio, { headers: this.agregarAuthorizationHeader() });
  }

  modificar(envio: Envio): Observable<Envio> {
    return this.http.put<Envio>(`${this.urlEndPoint}/${envio.id}`, envio, { headers: this.agregarAuthorizationHeader() });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() });
  }
}
