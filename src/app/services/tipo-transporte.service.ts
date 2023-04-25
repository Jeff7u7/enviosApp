import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoTransporte } from '../models/tipo-transporte';

@Injectable({
  providedIn: 'root'
})
export class TipoTransporteService {

  private urlEndPoint: string = 'http://localhost:8090/api/transportes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  listar(): Observable<TipoTransporte[]> {
    return this.http.get<TipoTransporte[]>(this.urlEndPoint);
  }

  ver(id: number): Observable<TipoTransporte> {
    return this.http.get<TipoTransporte>(`${this.urlEndPoint}/$id`);
  }

  crear(tipoTransporte: TipoTransporte): Observable<TipoTransporte> {
    return this.http.post<TipoTransporte>(this.urlEndPoint, tipoTransporte, { headers: this.httpHeaders });
  }

  modificar(tipoTransporte: TipoTransporte): Observable<TipoTransporte> {
    return this.http.put<TipoTransporte>(`${this.urlEndPoint}/${tipoTransporte.id}`, tipoTransporte, { headers: this.httpHeaders });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }
}
