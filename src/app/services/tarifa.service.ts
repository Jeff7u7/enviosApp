import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarifa } from '../models/tarifa';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  private urlEndPoint: string = 'http://localhost:8090/api/tarifas';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  listar(): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(`${this.urlEndPoint}/listar/tarifas`);
  }

  ver(id: number): Observable<Tarifa> {
    return this.http.get<Tarifa>(`${this.urlEndPoint}/tarifa/${id}`);
  }

  calcularValorTarifa(valor: number, tarifa: Tarifa): Observable<number> {
    return this.http.post<number>(`${this.urlEndPoint}/calcularValorTarifa/${valor}`, tarifa, { headers: this.httpHeaders });
  }

  crear(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.post<Tarifa>(`${this.urlEndPoint}/tarifa`, tarifa, { headers: this.httpHeaders });
  }

  modificar(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.put<Tarifa>(`${this.urlEndPoint}/tarifa/${tarifa.id}`, tarifa, { headers: this.httpHeaders });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/tarifa/${id}`, { headers: this.httpHeaders });
  }
}
